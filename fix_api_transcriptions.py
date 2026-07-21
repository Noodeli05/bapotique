#!/usr/bin/env python3
"""
Correction universelle des transcriptions API sur tout le site Bapotique.
Version HTML-aware : n'applique les substitutions QUE dans les noeuds de texte
visibles, en ignorant les blocs <style>, <script>, les tags HTML, les attributs.
"""

import re
from pathlib import Path

# Table de substitution : caractère latin substitué -> vrai symbole IPA
MAPPING = {
    # Voyelles orales
    'é': 'e',
    'è': 'ɛ',
    'A': 'ɑ',
    'O': 'ɔ',
    'U': 'u',
    'u': 'y',
    'E': 'ø',
    'F': 'œ',
    'e': 'ə',
    # Voyelles nasales
    'C': 'ɛ̃',
    'B': 'ɑ̃',
    'D': 'œ̃',
    'I': 'ɔ̃',
    # Consonnes
    'H': 'ʃ',
    'j': 'ʒ',
    'G': 'ɲ',
    'N': 'ŋ',
    'R': 'ʁ',
    # Glides
    'J': 'j',
    'V': 'ɥ',
}

IPA_INDICATORS = set('AEBCDFGHIJNORUVéè')


def is_transcription(content):
    """Détermine si un segment [...] ou /.../ est une transcription phonétique."""
    if not content or len(content) > 80:
        return False
    # Rejeter si le contenu commence ou finit par un espace
    # (signe que les / ou [] sont des séparateurs, pas des délimiteurs phonétiques)
    if content != content.strip():
        return False
    # Les transcriptions IPA n'ont JAMAIS d'espaces internes (ex. [suʁi], /tʁɥit/)
    # Les noms propres ou asides littéraires entre crochets en ont (ex. [Bouvard et Pécuchet])
    if ' ' in content:
        return False
    # Rejeter les segments qui contiennent des signes d'attributs/CSS
    if any(c in content for c in ('=', '"', "'", '{', '}', ':', ';', '*')):
        return False
    # Rejeter les URLs/chemins
    if content.startswith('http') or content.startswith('.'):
        return False
    # Rejeter les chiffres seuls
    if content.replace(',', '').replace('.', '').replace('-', '').isdigit():
        return False
    # OK si contient au moins un indicateur IPA substitué
    if any(c in IPA_INDICATORS for c in content):
        return True
    # OK si déjà des symboles IPA Unicode
    if any(c in 'ɑɛɔyøœəɑ̃ɛ̃ɔ̃œ̃ʃʒɲŋʁɥ' for c in content):
        return True
    # Segments courts de phonèmes latins de base (p, b, m, a, etc.)
    if len(content) <= 15 and re.match(r'^[abcdefghijklmnoprstvwxyz\-()]+$', content):
        common = {'de','le','la','les','un','une','et','ou','est','sur','avec',
                  'pour','dans','par','des','du','aux','ce','ces','son','sa','ses',
                  'mon','ma','mes','ton','ta','tes','il','elle','nous','vous','ils',
                  'que','qui','car','mais','si','ne','pas','on','lui','se','au'}
        if content.lower() in common:
            return False
        return True
    return False


def convert_content(content):
    """Applique la table de substitution caractère par caractère."""
    result = []
    i = 0
    while i < len(content):
        c = content[i]
        result.append(MAPPING.get(c, c))
        i += 1
    return ''.join(result)


def fix_phonetic_in_text(text):
    """Applique les substitutions IPA dans un bloc de texte brut (noeud texte HTML)."""
    def process_bracket(m):
        content = m.group(1)
        if is_transcription(content):
            return '[' + convert_content(content) + ']'
        return m.group(0)

    def process_slash(m):
        content = m.group(1)
        if is_transcription(content):
            return '/' + convert_content(content) + '/'
        return m.group(0)

    # Crochets
    text = re.sub(r'\[([^\[\]\n]{1,80})\]', process_bracket, text)
    # Slashes — seulement si non précédé/suivi de * (exclut /* ... */)
    text = re.sub(r'(?<!\*)/([^/\n*]{1,80})/(?!\*)', process_slash, text)
    return text


# Découpe un fichier HTML en chunks: style/script blocks, tags, et texte brut
HTML_CHUNKS = re.compile(
    r'(<style\b[^>]*>.*?</style>)'   # blocs <style>
    r'|(<script\b[^>]*>.*?</script>)'  # blocs <script>
    r'|(<[^>]+>)'                    # tags HTML
    r'|([^<]+)',                     # texte brut entre tags
    re.DOTALL | re.IGNORECASE
)


def process_html(html):
    """Traite un fichier HTML en n'appliquant les corrections qu'aux noeuds texte."""
    result = []
    for m in HTML_CHUNKS.finditer(html):
        style_block = m.group(1)
        script_block = m.group(2)
        tag = m.group(3)
        text = m.group(4)

        if style_block is not None:
            result.append(style_block)  # CSS : intouché
        elif script_block is not None:
            result.append(script_block)  # JS : intouché
        elif tag is not None:
            result.append(tag)  # tag HTML : intouché
        elif text is not None:
            result.append(fix_phonetic_in_text(text))  # texte visible : traité
    return ''.join(result)


def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()
    modified = process_html(original)
    if original != modified:
        with open(str(filepath) + '.bak', 'w', encoding='utf-8') as f:
            f.write(original)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(modified)
        return True
    return False


def main():
    root = Path('.')
    targets = [
        'polycop_cours.html',
        'revision_complet.html',
        'banque_exos.html',
        'tests_blancs.html',
        'flashcards.html',
        'cahier_vacances.html',
        'ressources.html',
    ]
    for f in root.glob('carte_mentale_*.html'):
        targets.append(str(f.name))
    for f in root.glob('*.html'):
        name = f.name
        if name not in targets:
            content = f.read_text(encoding='utf-8')
            if any(p in content for p in ['/H', '/R', '/B', '/C', '/D',
                                           '[R', '[H', '[B', '[C', 'phon',
                                           'transcription', 'IPA', 'phonème']):
                targets.append(name)

    modified_count = 0
    for target in targets:
        fp = root / target
        if fp.exists():
            if process_file(fp):
                print(f'✓ Modifié : {target}')
                modified_count += 1
            else:
                print(f'  Inchangé : {target}')
        else:
            print(f'  Absent : {target}')

    print(f'\n{modified_count} fichier(s) modifié(s).')


if __name__ == '__main__':
    main()
