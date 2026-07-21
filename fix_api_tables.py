#!/usr/bin/env python3
"""
Correction des transcriptions API dans les tableaux HTML.
Détecte les cellules <td> et <th> qui contiennent des caractères IPA isolés
et applique la table de conversion.
"""

import re
from pathlib import Path

# Mapping identique au script précédent
MAPPING = {
    'é': 'e', 'è': 'ɛ',
    'A': 'ɑ', 'O': 'ɔ', 'U': 'u', 'u': 'y', 'E': 'ø', 'F': 'œ', 'e': 'ə',
    'C': 'ɛ̃', 'B': 'ɑ̃', 'D': 'œ̃', 'I': 'ɔ̃',
    'H': 'ʃ', 'j': 'ʒ', 'G': 'ɲ', 'N': 'ŋ', 'R': 'ʁ',
    'J': 'j', 'V': 'ɥ',
}

# Caractères latins substitués qui indiquent une cellule à corriger
LATIN_IPA_CHARS = set('ABCDEFGHIJNORUV')  # majuscules substituées
LATIN_IPA_LOWER = set('éèujeV')  # minuscules avec accents ou substituées

def convert_char(c):
    """Convertit un caractère latin substitué en vrai IPA."""
    return MAPPING.get(c, c)

def convert_cell_content(content):
    """Convertit le contenu d'une cellule (peut contenir plusieurs caractères)."""
    result = []
    i = 0
    while i < len(content):
        c = content[i]
        # Gérer les caractères combinés (é, è décomposés)
        if i + 1 < len(content) and content[i+1] in ('́', '̀', '̂'):
            combined = content[i:i+2]
            if combined == 'é':
                result.append('e')
            elif combined == 'è':
                result.append('ɛ')
            else:
                result.append(combined)
            i += 2
            continue
        result.append(MAPPING.get(c, c))
        i += 1
    return ''.join(result)

MAPPING_KEYS = set(MAPPING.keys())
IPA_UNICODE = set('ɑɛɔyøœəɑ̃ɛ̃ɔ̃œ̃ʃʒɲŋʁɥ')
SEPARATORS = set('· ⋅')

def is_ipa_cell(inner_html):
    """
    Détecte une cellule contenant un phonème IPA isolé (substitut latin ou Unicode).
    Règle stricte : tous les caractères (hors séparateurs) doivent être des substituts
    du mapping ou des symboles IPA Unicode — aucun caractère alphabétique ordinaire.
    Cela évite de convertir des mots français comme COD, But, Effet, GPrép.
    """
    text = re.sub(r'<[^>]+>', '', inner_html).strip()
    text = text.replace('&nbsp;', '').replace('&amp;', '').strip()

    if len(text) == 0 or len(text) > 6:
        return False
    if any(c in text for c in '.,?!;:()[]{}"\''):
        return False

    phonetic = MAPPING_KEYS | IPA_UNICODE

    if len(text) <= 2:
        # Phonème unique (ou voyelle nasale 2 points de code comme ɛ̃)
        if not all(c in phonetic for c in text):
            return False
        return any(c in phonetic for c in text)

    # 3–6 chars : séquence "phonème · phonème" uniquement
    if not any(c in SEPARATORS for c in text):
        return False
    non_sep = [c for c in text if c not in SEPARATORS]
    if not all(c in phonetic for c in non_sep):
        return False
    return bool(non_sep) and any(c in phonetic for c in non_sep)

def process_cell(match):
    """Traite une cellule <td>...</td> ou <th>...</th>."""
    full = match.group(0)
    tag = match.group(1)      # td ou th
    attrs = match.group(2)    # attributs de la balise
    content = match.group(3)  # contenu de la cellule

    if is_ipa_cell(content):
        # Découper en morceaux (balise HTML | texte)
        parts = re.split(r'(<[^>]+>)', content)
        converted = ''
        for p in parts:
            if p.startswith('<'):
                converted += p  # Balise HTML : ne pas toucher
            else:
                converted += convert_cell_content(p)
        return f'<{tag}{attrs}>{converted}</{tag}>'
    return full

def process_text(text):
    """Applique les substitutions sur le HTML."""
    # Matcher <td...>...</td> et <th...>...</th>
    # Le contenu ne doit pas contenir de td/th imbriqués
    pattern = re.compile(
        r'<(td|th)([^>]*)>((?:(?!</?(?:td|th)\b)[\s\S])*?)</\1>',
        re.IGNORECASE
    )
    return pattern.sub(process_cell, text)

def fix_cruel(text):
    """Corrige la faute [kʁyɛl] -> [kʁɥɛl] pour 'cruel'."""
    return text.replace('kʁyɛl', 'kʁɥɛl').replace('[kʁyɛl]', '[kʁɥɛl]')

def process_file(filepath):
    """Traite un fichier HTML."""
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()
    modified = process_text(original)
    modified = fix_cruel(modified)
    if original != modified:
        backup_path = str(filepath) + '.bak2'
        with open(backup_path, 'w', encoding='utf-8') as f:
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
        'flashcards_liste.html',
        'flashcards_print.html',
        'cahier_vacances.html',
        'ressources.html',
        'entrainement_all.html',
        'tests.html',
    ]
    for f in root.glob('carte_mentale_*.html'):
        targets.append(str(f))

    modified_count = 0
    for target in targets:
        filepath = root / target
        if filepath.exists():
            if process_file(filepath):
                print(f'✓ Modifié : {target}')
                modified_count += 1
            else:
                print(f'  Inchangé : {target}')
        else:
            print(f'  Absent : {target}')

    print(f'\n{modified_count} fichier(s) modifié(s). Backups en .bak2')

if __name__ == '__main__':
    main()
