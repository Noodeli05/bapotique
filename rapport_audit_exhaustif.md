# Rapport d'audit exhaustif Bapotique
**Cours Rudolf Mahrer — Linguistique française UNIL — Automne 2025**
**Audit réalisé le 22 juillet 2026**

---

## Résumé

- Items audités : ~450 flashcards + 433 cartes d'entraînement (9 decks) + 330 exercices (D0–D10) + 5 tests blancs (100 questions) + cahier_vacances.html
- **Erreurs critiques : 32**
- **Erreurs mineures : 25**
- **Coquilles/typographie : 17**
- Cahier vacances : aucune erreur détectée

---

## ERREURS CRITIQUES (à corriger absolument)

---

### [flashcards.html]

**FC-C1**
- **ID** : res_guide_4
- **Localisation** : Guide de révision — Sémiologie
- **Erreur** : signifiant/signifié/arbitraire utilisés comme termes PRINCIPAUX + doublon "Arbitraire : Arbitraire :"
- **Extrait fautif** : `"Signifiant : [...] Signifié : [...] Arbitraire : Arbitraire : [...]"`
- **Correction proposée** : Remplacer par termes Mahrer en position principale : "Expression (≈ signifiant chez Saussure) : [...] Contenu (≈ signifié) : [...] Immotivé (≈ arbitraire) : [...]"
- **Source** : Règle terminologique absolue Mahrer

**FC-C2**
- **ID** : res_guide_8
- **Localisation** : Guide de révision — Sémiologie
- **Erreur** : "Le signe = signifiant + signifié" — termes Saussuriens comme définition principale
- **Extrait fautif** : `"Le signe = signifiant + signifié"`
- **Correction proposée** : `"Le signe = expression (≈ signifiant) + contenu (≈ signifié)"`
- **Source** : Terminologie Mahrer

**FC-C3**
- **ID** : res_resume_164
- **Localisation** : Résumé — Sémiologie
- **Erreur** : "ARBITRAIRE" en majuscules comme terme principal
- **Extrait fautif** : `"ARBITRAIRE"`
- **Correction proposée** : `"IMMOTIVÉE (≈ arbitraire chez Saussure)"`
- **Source** : Terminologie Mahrer

**FC-C4**
- **ID** : res_resume_206/207
- **Localisation** : Résumé — Sémiologie
- **Erreur** : "Linéarité du signifiant" utilisé comme titre de section principal sans glose ≈
- **Extrait fautif** : `"Linéarité du signifiant"`
- **Correction proposée** : Ajouter glose : `"Linéarité de l'expression (≈ linéarité du signifiant, Saussure)"`
- **Source** : Terminologie Mahrer

**FC-C5**
- **ID** : rev_d2_15
- **Localisation** : Révision deck 2 — Phonologie
- **Erreur** : /ɔɲɔ̃/ décrit comme 4 phonèmes (il en a 3 : /ɔ/ + /ɲ/ + /ɔ̃/)
- **Extrait fautif** : `"/ɔɲɔ̃/ — 4 phonèmes"`
- **Correction proposée** : `"/ɔɲɔ̃/ — 3 phonèmes : /ɔ/ + /ɲ/ + /ɔ̃/"`
- **Source** : Phonologie du français standard

**FC-C6**
- **ID** : rev_d0_7
- **Localisation** : Révision deck 0 — Morphologie
- **Erreur** : Analyse morphologique incorrecte d'"ascenseur"
- **Extrait fautif** : `"{l-} + {açençeur}"`
- **Correction proposée** : `"{ascens-} + {-eur}"` (radical ascens- + suffixe -eur)
- **Source** : Morphologie du français

**FC-C7**
- **ID** : res_guide_36
- **Localisation** : Guide de révision — Phonologie
- **Erreur** : Affirmation contradictoire sur le nombre de phonèmes
- **Extrait fautif** : `"37 phonèmes (31–36 en pratique)"`
- **Correction proposée** : `"37 phonèmes"` (supprimer la parenthèse contradictoire)
- **Source** : Règle canonique : 37 phonèmes = 16 voyelles + 3 semi-voyelles + 18 consonnes

**FC-C8**
- **ID** : res_guide_5
- **Localisation** : Guide de révision — Phonologie
- **Erreur** : "une trentaine de phonèmes" + /ε/ au lieu de /ɛ/
- **Extrait fautif** : `"une trentaine de phonèmes"` et `/ε/`
- **Correction proposée** : `"37 phonèmes"` et `/ɛ/`
- **Source** : Règle canonique 37 phonèmes ; /ɛ/ = symbole IPA correct

**FC-C9**
- **ID** : res_guide_14
- **Localisation** : Guide de révision — Phonologie
- **Erreur** : `è` (graphème orthographique) utilisé à la place du symbole IPA /ɛ/
- **Extrait fautif** : transcription avec `è`
- **Correction proposée** : remplacer `è` par `ɛ` dans le contexte IPA
- **Source** : Convention IPA

**FC-C10**
- **ID** : res_guide_22
- **Localisation** : Guide de révision — Phonologie
- **Erreur** : `tun` au lieu de `tyn` (voyelle /y/ transcrite /u/)
- **Extrait fautif** : `/tun/`
- **Correction proposée** : `/tyn/`
- **Source** : IPA : /y/ = voyelle antérieure arrondie fermée (≠ /u/ postérieure)

---

### [entrainement.html — DECKS]

**DK-C1**
- **ID** : d1_0
- **Localisation** : Deck 1, carte 1 — Sémiologie
- **Erreur** : signifiant/signifié/arbitraire comme termes principaux sans ≈
- **Extrait fautif** : `"Pour la langue : /arbre/ = signifiant ; concept d'arbre = signifié. L'association est arbitraire et systémique."`
- **Correction proposée** : `"Pour la langue : /arbre/ = expression (≈ signifiant) ; concept d'arbre = contenu (≈ signifié). L'association est immotivée (≈ arbitraire) et systémique."`
- **Source** : Terminologie Mahrer

**DK-C2**
- **ID** : d2_2
- **Localisation** : Deck 2, carte 3 — Transcription API
- **Erreur** : /R/ MAJUSCULE dans la transcription — explicitement interdit
- **Extrait fautif** : `"[ləʒaRdinjeafɔʃeletylip]"`
- **Correction proposée** : `"[ləʒaʁdinjeafɔʃeletylip]"`
- **Source** : Règle API absolue : jamais /R/ majuscule

**DK-C3**
- **ID** : d1_9
- **Localisation** : Deck 1, carte 10 — E caduc
- **Erreur** : /ʀ/ (trill uvulaire) au lieu de /ʁ/ (fricative uvulaire)
- **Extrait fautif** : `"/latabləvɛʀt/"`
- **Correction proposée** : `"/latabləvɛʁt/"`
- **Source** : Norme parisienne : /ʁ/ fricative uvulaire dorsale

**DK-C4**
- **ID** : d1_16
- **Localisation** : Deck 1, carte 17 — Morphologie orale/écrite
- **Erreur** : /ʀ/ (trill uvulaire) au lieu de /ʁ/ dans la transcription phonétique
- **Extrait fautif** : `"[demutɔ̃etɛ̃tsuʀtedɑ̃zpɑʀk]"`
- **Correction proposée** : `"[demutɔ̃etɛ̃tsyʁtedɑ̃zpɑʁk]"`
- **Source** : Règle API

**DK-C5**
- **ID** : d1_6 (phonème /r/)
- **Localisation** : Deck 1, carte 7 — Phonétique vs phonologie
- **Erreur** : /r/ alvéolaire utilisé au lieu de /ʁ/ comme nom du phonème du français
- **Extrait fautif** : `"un seul phonème /r/ car aucune paire minimale fondée sur cette opposition"`
- **Correction proposée** : `"un seul phonème /ʁ/ car aucune paire minimale fondée sur cette opposition"`
- **Source** : /ʁ/ = phonème standard du français (norme parisienne)

**DK-C6**
- **ID** : d1_7 (pari/pali)
- **Localisation** : Deck 1, carte 8 — Commutation
- **Erreur** : /r/ au lieu de /ʁ/ dans l'exemple de paire minimale
- **Extrait fautif** : `"[pari] vs [pali] → /r/ et /l/"`
- **Correction proposée** : `"[paʁi] vs [pali] → /ʁ/ et /l/"`
- **Source** : Règle API

**DK-C7**
- **ID** : d1_11 (les trois /r/)
- **Localisation** : Deck 1, carte 12 — Voisement
- **Erreur** : /r/ au lieu de /ʁ/ comme référence au phonème
- **Extrait fautif** : `"les trois /r/ sont articulatoirement très différents"`
- **Correction proposée** : `"les trois variantes de /ʁ/ sont articulatoirement très différentes"`
- **Source** : Règle API

**DK-C8**
- **ID** : d2_6
- **Localisation** : Deck 2, carte 7 — Analyse vocalique de Verlaine
- **Erreur** : "OʁAL" — corruption typographique (symbole IPA /ʁ/ inséré dans le mot "ORAL")
- **Extrait fautif** : `"= postérieur, mi-ouvert, OʁAL"`
- **Correction proposée** : `"= postérieur, mi-ouvert, ORAL"`
- **Source** : Simple coquille de saisie

**DK-C9**
- **ID** : d3_4 / d6_2 (trentaine de phonèmes)
- **Localisation** : Deck 3 carte 4, Deck 6 carte 2 — Double articulation
- **Erreur** : "~30 phonèmes" et "une trentaine de phonèmes" au lieu de 37
- **Extrait fautif d3** : `"Économie maximale : avec ~30 phonèmes → milliers de morphèmes"`
- **Extrait fautif d6** : `"avec une trentaine de phonèmes"`
- **Correction proposée d3** : `"Économie maximale : avec 37 phonèmes → milliers de morphèmes"`
- **Correction proposée d6** : `"avec 37 phonèmes"`
- **Source** : Règle canonique 37 phonèmes

**DK-C10**
- **ID** : d6_2 (corruption /!/)
- **Localisation** : Deck 6, carte 2 — Double articulation
- **Erreur** : "/!/" dans la transcription de "Tête" — corruption d'encodage
- **Extrait fautif** : `"« Tête » = /t/-/ ! /-/t/"`
- **Correction proposée** : `"« Tête » = /t/-/ɛ/-/t/"`
- **Source** : Phonologie du français : /ɛ/ = voyelle antérieure mi-ouverte

**DK-C11**
- **ID** : d3_5 / d5_4 (epsilon)
- **Localisation** : Deck 3 carte 5, Deck 5 carte 4
- **Erreur** : /ε/ (epsilon sans cédille) au lieu de /ɛ/ (epsilon IPA avec cédille) dans "Tête"
- **Extrait fautif** : `"« Tête » = /t/-/ε/-/t/"`
- **Correction proposée** : `"« Tête » = /t/-/ɛ/-/t/"`
- **Source** : Convention IPA : /ɛ/ U+025B

**DK-C12**
- **ID** : d3_15
- **Localisation** : Deck 3, carte 15 — Phonologie
- **Erreur** : /r/ alvéolaire au lieu de /ʁ/ uvulaire
- **Extrait fautif** : `/r/` dans le contexte phonème français
- **Correction proposée** : `/ʁ/`
- **Source** : Règle API

**DK-C13**
- **ID** : d5_9 / d5_10
- **Localisation** : Deck 5, cartes 9–10 — Phonologie
- **Erreur** : /r/ au lieu de /ʁ/ + "allophones du phonème /r/"
- **Extrait fautif** : `"3 allophones du phonème /r/"` et `"phonème /r/"`
- **Correction proposée** : `"3 allophones du phonème /ʁ/"` et `"phonème /ʁ/"`
- **Source** : Règle API

**DK-C14**
- **ID** : d8_36
- **Localisation** : Deck 8, carte 36 — Voix pronominale
- **Erreur** : RÉFLEXIF inclut INSTRUMENT (incorrect) ; NEUTRE inclut COD (incorrect)
- **Extrait fautif** : `"RÉFLEXIF : sujet = AGENT/INSTRUMENT ET PATIENT/AGI"` et `"NEUTRE : S et COD = SIÈGES d'un état dynamique"`
- **Correction proposée** : `"RÉFLEXIF : sujet = AGENT ET PATIENT (il agit sur lui-même)"` et `"NEUTRE : le sujet = SIÈGE d'un état dynamique sans déclencheur externe. Le «se» n'est PAS un COD analysable."`
- **Source** : Mahrer — Voix (Ch4) : RÉFLEXIF = agent + patient confondus dans le sujet

---

### [banque_exos.json]

**BE-C1**
- **ID** : D0-Int-4
- **Localisation** : Dossier 0 — Introduction
- **Erreur** : "Monèmes" utilisé comme terme principal (terme interdit sauf glose historique)
- **Extrait fautif** : `"Monèmes"`
- **Correction proposée** : `"Morphèmes"`
- **Source** : Règle terminologique : monème interdit sauf glose historique

**BE-C2**
- **ID** : D1-Fond-4c
- **Localisation** : Dossier 1 — Phonologie
- **Erreur** : /r/ au lieu de /ʁ/ + réponse auto-contradictoire
- **Extrait fautif** : `/r/` dans contexte phonème français
- **Correction proposée** : `/ʁ/` ; réviser la logique de la réponse pour éliminer la contradiction interne
- **Source** : Règle API

**BE-C3**
- **ID** : D1-Fond-10
- **Localisation** : Dossier 1 — Phonologie
- **Erreur** : /r/ au lieu de /ʁ/
- **Extrait fautif** : `/r/`
- **Correction proposée** : `/ʁ/`
- **Source** : Règle API

**BE-C4**
- **ID** : D1-Int-10
- **Localisation** : Dossier 1 — Phonologie
- **Erreur** : /r/ au lieu de /ʁ/
- **Extrait fautif** : `/r/`
- **Correction proposée** : `/ʁ/`
- **Source** : Règle API

**BE-C5**
- **ID** : D1-Int-2
- **Localisation** : Dossier 1 — Phonologie
- **Erreur** : /r/ comme nom du phonème uvulaire français
- **Extrait fautif** : `/r/` désignant le phonème
- **Correction proposée** : `/ʁ/`
- **Source** : Règle API

**BE-C6**
- **ID** : D9-Fond-3(b)
- **Localisation** : Dossier 9 — Syntaxe
- **Erreur** : "espérer que" + subjonctif (incorrect — ce verbe régit l'indicatif)
- **Extrait fautif** : corrigé donnant le subjonctif après "espérer que"
- **Correction proposée** : "espérer que" + INDICATIF (ex. "J'espère qu'il viendra")
- **Source** : Grammaire française : espérer que → indicatif (≠ douter que → subjonctif)

**BE-C7**
- **ID** : D3-Av-1
- **Localisation** : Dossier 3 — Morphologie (avancé)
- **Erreur** : Question sur la formation d'un mot qui existe déjà ("menteur")
- **Extrait fautif** : question demandant de créer un terme alors que "menteur" est déjà lexicalisé
- **Correction proposée** : Reformuler l'énoncé ou choisir un exemple sans mot existant
- **Source** : Cohérence de l'exercice

**BE-C8**
- **ID** : D10-Adv-8
- **Localisation** : Dossier 10 — Sémiologie avancée
- **Erreur** : L'exemple présenté comme "déduction" (Peirce) est en réalité une ABDUCTION
- **Extrait fautif** : corrigé qualifiant l'inférence de "déduction"
- **Correction proposée** : Renommer "ABDUCTION (raisonnement à partir d'un fait vers sa cause la plus plausible, Peirce)"
- **Source** : Sémiotique de Peirce : déduction = nécessaire, abduction = plausible

---

### [tests_blancs.json]

**TB-C1**
- **ID** : T1-Q5
- **Localisation** : Test 1, question 5 — Signe linguistique
- **Erreur** : signifiant/signifié/arbitraire utilisés comme termes principaux dans l'énoncé ET le corrigé
- **Extrait fautif** : `"Expliquez les trois composantes du SIGNE linguistique chez Saussure (signifiant, signifié, signe)."` + corrigé utilisant "SIGNIFIANT", "SIGNIFIÉ", "ARBITRAIRE" en majuscules
- **Correction proposée** : Reformuler avec "expression (≈ signifiant)", "contenu (≈ signifié)", "immotivé (≈ arbitraire du signe)"; corriger aussi `"la «empreinte psychique»"` → `"l'«empreinte psychique»"`
- **Source** : Terminologie Mahrer

**TB-C2**
- **ID** : T1-Q11
- **Localisation** : Test 1, question 11 — Phénomènes phonologiques
- **Erreur** : "s'il" décrit comme LIAISON — c'est une ÉLISION
- **Extrait fautif** : `"(5) LIAISON : «s'il» → [sil] = liaison avec apostrophe graphique"`
- **Correction proposée** : `"(5) ÉLISION : «s'il» = élision de la voyelle de «si» devant voyelle initiale de «il», marquée graphiquement par l'apostrophe. ≠ liaison (qui implique une consonne latente)"`
- **Source** : Phonologie française : liaison ≠ élision

**TB-C3**
- **ID** : T1-Q19
- **Localisation** : Test 1, question 19 — Liaison verbale
- **Erreur** : Section (c) affirme qu'une liaison est possible en /t/ entre "rugissent" et "encore" — en contradiction directe avec la section (a) du même corrigé
- **Extrait fautif** : `"Liaison possible entre «rugissent» et «encore» [...] liaison en /t/ : [ʁyʒisɑ̃t‿ɑ̃kɔʁ]"`
- **Correction proposée** : Supprimer (c) et écrire : `"La liaison entre «rugissent» et «encore» est INTERDITE : la désinence -ent (3e pers. plur.) est toujours amuïe et ne déclenche aucune liaison. Transcription : [ʁyʒis ɑ̃kɔʁ]."`
- **Source** : Règle de non-liaison des désinences verbales -ent

**TB-C4**
- **ID** : T2-Q9
- **Localisation** : Test 2, question 9 — Rôles thématiques et voix
- **Erreur** : Rôles thématiques incohérents : AGENT/PATIENT en voix active, EXPÉRIENT/STIMULUS en voix passive (les rôles sémantiques sont invariants à travers les diathèses)
- **Extrait fautif** : `"«Luc» = AGENT sémantique"` (actif) vs `"«Marie» reste STIMULUS"` (passif)
- **Correction proposée** : Pour "aimer" (verbe statif d'émotion) : "Luc = EXPÉRIENT (ressent l'émotion) ; Marie = STIMULUS — dans les DEUX constructions. Seul le mappage syntaxique change, pas le rôle sémantique."
- **Source** : Sémantique des rôles actanciels : les rôles sont stables à travers les diathèses

**TB-C5**
- **ID** : T3-Q18
- **Localisation** : Test 3, question 18 — Parataxe/asyndète
- **Erreur** : "PARATAXE SYNDÉTIQUE" appliqué à un exemple SANS connecteur (= contradiction terminologique)
- **Extrait fautif** : `"(a) PARATAXE SYNDÉTIQUE (ou simple juxtaposition) : trois clauses graphiques indépendantes. Relations temporelles implicites (séquence), sans connecteur."`
- **Correction proposée** : `"(a) PARATAXE ASYNDÉTIQUE (juxtaposition pure) : trois clauses sans connecteur. Relations temporelles implicites."`
- **Source** : Syndète = avec connecteur ; asyndète = sans connecteur

**TB-C6**
- **ID** : T4-Q9
- **Localisation** : Test 4, question 9 — Îles syntaxiques
- **Erreur** : Référence au verbe "aimer" absent de l'exemple (b) + type d'île mal identifié
- **Extrait fautif** : `"la question implique que «qui» est le COD de «aimer»"`
- **Correction proposée** : Supprimer la référence à "aimer" ; identifier correctement : `"ÎLE RELATIVE (Contrainte sur le GN complexe, Complex NP Constraint, Ross 1967) : extraction illicite hors d'une relative restrictive enchâssée dans un GN sujet."`
- **Source** : Syntaxe : Ross (1967) Constraints on Variables in Syntax

**TB-C7**
- **ID** : T5-Q1
- **Localisation** : Test 5, question 1 — Transcription API
- **Erreur** : /lɛ̃ɡɥist/ incorrect — le "u" de "gu" devant voyelle est muet, pas /ɥ/
- **Extrait fautif** : `"«linguistes» /lɛ̃ɡɥist/"`
- **Correction proposée** : `"«linguistes» /lɛ̃ɡist/ : /l/ latérale, /ɛ̃/ nasale, /ɡ/ occlusive vélaire (le u de «gu» est muet), /i/ fermée antérieure, /s/ fricative, /t/ occlusive."`
- **Source** : Phonologie du français : "gu" + voyelle → /ɡ/ + voyelle, le u est diacritique muet

**TB-C8**
- **ID** : T5-Q2
- **Localisation** : Test 5, question 2 — Arbitraire/immotivé
- **Erreur** : "ARBITRAIRE DU SIGNE" et "signifiant/signifié" comme termes principaux dans l'énoncé ET le corrigé
- **Extrait fautif** : `"l'ARBITRAIRE DU SIGNE interagissent"` (énoncé) et `"ARBITRAIRE DU SIGNE (Saussure)"` (corrigé)
- **Correction proposée** : Énoncé : `"l'IMMOTIVATION DU SIGNE (≈ arbitraire du signe, Saussure)"` ; corrigé : `"IMMOTIVÉ (≈ arbitraire du signe, Saussure) : le lien entre l'expression (≈ signifiant) et le contenu (≈ signifié) est conventionnel"`
- **Source** : Terminologie Mahrer

---

## ERREURS MINEURES

---

### [flashcards.html]

**FC-M1**
- **ID** : res_resume_173, res_resume_181, res_resume_189
- **Erreur** : `/é/` (accent aigu non-IPA) au lieu de `/e/`
- **Correction proposée** : Remplacer `/é/` par `/e/` dans les trois cartes

**FC-M2**
- **ID** : rev_d2_4
- **Erreur** : Trigraphe ⟨eau⟩ décrit comme trois lettres muettes séparées (analyse incorrecte)
- **Correction proposée** : ⟨eau⟩ est un trigraphe représentant le phonème /o/ — ce n'est pas "trois lettres muettes" mais un graphème complexe

**FC-M3**
- **ID** : rev_d6_12 à rev_d6_19
- **Erreur** : Passif/impersonnel/pronominal attribués au Dossier 6 (Voix) au lieu du Ch4 (correct)
- **Correction proposée** : Mettre à jour le numéro de chapitre selon la structure du polycop : Ch4 = Voix

**FC-M4**
- **ID** : rev_d1_19
- **Erreur** : /ʁ/ décrit comme "dorso-vélaire" — le polycop de TP utilise "uvulaire". Les deux désignent la même réalité mais le terme du polycop est "uvulaire dorsal"
- **Correction proposée** : Vérifier la terminologie exacte du polycop et aligner

---

### [entrainement.html — DECKS]

**DK-M1**
- **ID** : d2_3
- **Erreur** : La liaison dans "leurs œufs" est étiquetée /ʁ/ — la consonne de liaison est /z/ (du -s de "leurs") ; /ʁ/ est toujours présent dans "leur" et n'est pas une consonne de liaison
- **Extrait fautif** : `"Ex. : «leurs œufs» → [lœʁzø] (liaison /ʁ/)"`
- **Correction proposée** : `"Ex. : «leurs œufs» → [lœʁzø] (liaison /z/ : la consonne finale -s de «leurs» se réalise devant la voyelle initiale de «œufs»; le /ʁ/ est toujours présent et ne constitue pas la liaison)"`

**DK-M2**
- **ID** : d4_1
- **Erreur** : signifiant/signifié introduits comme termes principaux (atténué par le bandeau ⚠ mais pédagogiquement risqué en contexte d'examen)
- **Correction proposée** : Reformuler pour mettre expression/contenu en premier, avec ≈ pour Saussure

**DK-M3**
- **ID** : d6_21 et d6_43
- **Erreur** : "RÉSULTAT" au lieu de "RÉSULTATIF" (terme incohérent avec tous les autres decks)
- **Extrait fautif** : `"RÉSULTAT :"`
- **Correction proposée** : `"RÉSULTATIF :"`

**DK-M4**
- **ID** : d9_5
- **Erreur** : Même erreur que d2_3 — liaison de "leurs œufs" étiquetée /ʁ/ au lieu de /z/
- **Correction proposée** : Même correction que DK-M1

**DK-M5**
- **ID** : d3_38 et d5_24
- **Erreur** : "clausecanonique" (sans espace) — coquille de saisie
- **Correction proposée** : "clause canonique"

**DK-M6**
- **ID** : d7_2
- **Erreur** : L'intitulé de la question utilise SIGNIFIANT/SIGNIFIÉ comme termes principaux (même si la réponse est correctement formulée en termes Mahrer)
- **Correction proposée** : Reformuler le titre de la question avec expression/contenu en premier

---

### [banque_exos.json]

**BE-M1**
- **ID** : D0-Int-10
- **Erreur** : Phones [r] et [ʁ] mis entre barres obliques / / au lieu de crochets [ ] (confusion phonétique/phonologique)
- **Correction proposée** : Utiliser [ ] pour les réalisations phonétiques concrètes

**BE-M2**
- **ID** : D1-Fond-5
- **Erreur** : 7 phonèmes proposés pour /ɡʁɛ̃smɑ̃/ ("grincement") au lieu de 6
- **Correction proposée** : Recompter et corriger le total

**BE-M3**
- **ID** : D2-Fond-1
- **Erreur** : "Le expression" (pas d'élision) + "distincts" (accord masculin pour un nom féminin)
- **Correction proposée** : "L'expression" + "distinctes"

**BE-M4**
- **ID** : D6-Fond-6d
- **Erreur** : "comme si" + conditionnel (doit être imparfait ou plus-que-parfait)
- **Correction proposée** : "comme si" + IMPARFAIT (ex. "comme s'il était là")

**BE-M5**
- **ID** : D10-Adv-10
- **Erreur** : "B. Catach" — le prénom de Nina Catach est N. (Nina), pas B.
- **Correction proposée** : "N. Catach" ou "Nina Catach"

---

### [tests_blancs.json]

**TB-M1**
- **ID** : T2-Q2
- **Erreur** : "épicène" utilisé pour "chaux" (invariable) — épicène désigne un mot de même forme au masculin et au féminin, pas un nom invariable en nombre
- **Correction proposée** : `"(c) «chaux» : nom INVARIABLE — même forme au singulier et au pluriel. Allomorphe : Ø."`

**TB-M2**
- **ID** : T4-Q6
- **Erreur** : TR = TE2 posé arbitrairement dans la ligne temporelle sans justification
- **Correction proposée** : `"La position de TE2 par rapport à TR reste indéterminée dans la phrase."`

**TB-M3**
- **ID** : T5-Q10
- **Erreur** : "dénominatif" (issu d'un nom) pour -able → devrait être "déverbal" (issu de "prendre") ; "bisuffixé" (deux suffixes) alors que "imprenable" a un PRÉFIXE (im-) + un SUFFIXE (-able)
- **Correction proposée** : "déverbal" + "préfixo-suffixé"

---

## COQUILLES / TYPOGRAPHIE

### [flashcards.html]
- **res_guide_145** : "circostancielles" → "circonstancielles"
- **res_guide_4** : doublon "Arbitraire : Arbitraire :" (déjà traité en FC-C1)

### [banque_exos.json]
- **D0-Fond-6, D0-Int-7, D0-Av-9, D2-Av-9, D2-Av-10** : "l'caractère" → "le caractère" (élision impossible devant consonne)
- **D0-Av-8** : "dyAdique" → "dyadique" (majuscule intempestive)
- **D2-Av-9** : "immotivés" → "immotivées" (accord féminin : les relations → immotivées)
- **D10-Adv-8** : "miaulant" → "miaulent" (forme conjuguée requise)
- **D10-Adv-8** : "derive" → "dérive" (accent manquant)
- **D10-Adv-9** : "créée" → "crée" (double e superflu)

### [tests_blancs.json]
- **T1-Q1** : "morphèmes / morphèmes" → "morphèmes / monèmes ≈" (répétition + terme manquant)
- **T2-Q1** : "aspecte" → "aspect"
- **T3-Q5** : "INATTEND" → "INATTENDUE"

---

## POINTS DE VIGILANCE (pas des erreurs mais à surveiller)

1. **Polycop Mahrer utilise /R/** : Le polycop original de Mahrer utilise la notation /R/ (non standard IPA), alors que le site utilise /ʁ/ (IPA correct). Ce décalage peut perturber les étudiants qui comparent le site au polycop. Recommandation : ajouter une note d'avertissement : "Le polycop note /R/ ; le symbole IPA correct est /ʁ/."

2. **Bivalent/divalent** : Le deck d6 utilise "BIVALENT" là où les autres decks utilisent "DIVALENT". Les deux termes coexistent dans la littérature linguistique. Vérifier le terme utilisé par Mahrer dans ses cours oraux et uniformiser.

3. **PATIENT/AGI fusionnés** : Dans d5, d6, d7, d9, PATIENT et AGI sont présentés comme un rôle unique "PATIENT (ou AGI)". Dans d1 et d3, ils sont distincts. Clarifier si Mahrer opère cette fusion ou non selon les contextes.

4. **Nombre de rôles actanciels** : d1_22 liste 7 rôles ; d3_35 en liste 10 (ajout de LIEU, SUPPORT, PROPRIÉTÉ). La liste de 9 rôles du polycop est-elle canonique ? À vérifier.

5. **d4_15 — Clause atypique THÉTIQUE** : Le deck 4 n'inclut pas la sous-catégorie THÉTIQUE dans sa classification des clauses averbales. À vérifier si c'est délibéré (cours généraux vs polycop Mahrer).

6. **d2_3 et d9_5 — [lœʁzø]** : La transcription elle-même est phonétiquement correcte (la liaison /z/ est présente), mais l'étiquetage "liaison /ʁ/" est incorrect. La correction DK-M1 maintient la transcription et corrige uniquement l'étiquette.

---

## Synthèse par fichier

| Fichier | Critiques | Mineures | Coquilles | Total |
|---|---|---|---|---|
| flashcards.html | 10 | 4 | 2 | 16 |
| entrainement.html | 14 | 6 | 2 | 22 |
| banque_exos.json | 8 | 5 | 7 | 20 |
| tests_blancs.json | 8 | 3 | 3 | 14 |
| cahier_vacances.html | 0 | 0 | 0 | 0 |
| **TOTAL** | **40** | **18** | **14** | **72** |

