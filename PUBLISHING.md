# Publication et maintenance

Guide du mainteneur : mise en ligne du dépôt, releases, catalogue HACS.

## 1. Créer le dépôt GitHub

1. Sur GitHub : **New repository** → nom `pool-hydraulic-card`, **Public**, sans README ni licence (ils sont déjà dans le dépôt).
2. Dans **Settings → General** : vérifier que **Issues** est coché.
3. Sur la page d'accueil du dépôt, roue dentée **About** :
   - Description : `Animated hydraulic plan of your swimming pool for Home Assistant, with a visual editor.`
   - Topics : `home-assistant`, `hacs`, `lovelace`, `lovelace-card`, `custom-card`, `pool`, `swimming-pool`, `homeassistant`
4. Pousser le contenu :
   ```bash
   git remote add origin https://github.com/freddye83/pool-hydraulic-card.git
   git push -u origin main
   ```
5. Onglet **Actions** : le workflow **Validate** doit passer (vérification HACS, syntaxe, changelog, exemples).

## 2. Publier une version

La version est définie à un seul endroit : `PHC_VERSION` dans `dist/pool-hydraulic-card.js`.

1. Modifier le code, incrémenter `PHC_VERSION` (`1.x.y` : `y` correctif, `x` nouvelle fonction, majeure si la configuration change de façon incompatible).
2. Ajouter la section `## [1.x.y] - AAAA-MM-JJ` dans `CHANGELOG.md` (le workflow refuse une version absente du changelog) et mettre à jour les liens en bas du fichier.
3. Mettre à jour `?v=` dans les deux README (installation manuelle).
4. Committer et pousser `main`, puis attendre que **Validate** soit vert.
5. Créer la release sur GitHub : **Releases → Draft a new release → Choose a tag**, taper `1.x.y` (format sans « v », comme `1.2.1`) → **Create new tag on publish**, cible `main` → **Publish release**. Ou en ligne de commande : `git tag 1.x.y && git push origin 1.x.y`.
6. Le workflow **Release** vérifie que le tag correspond à `PHC_VERSION` (avec ou sans « v »), remplace les notes par la section du changelog et joint `pool-hydraulic-card.js`. HACS propose alors la mise à jour.

## 3. Installation par HACS en dépôt personnalisé

Dès la première release, n'importe qui peut installer la carte : HACS → ⋮ → Dépôts personnalisés → `https://github.com/freddye83/pool-hydraulic-card`, type **Tableau de bord**. Le bouton « Open in HACS » des README fait la même chose.

## 4. Inclusion dans le catalogue HACS par défaut

Pour que la carte apparaisse dans la recherche HACS sans ajouter de dépôt personnalisé :

1. Prérequis (déjà prévus dans ce dépôt, sauf ceux réglés sur GitHub) :
   - dépôt public, actif, description, topics et issues activées (étape 1) ;
   - `hacs.json` avec une clé `name` ;
   - images dans le README ;
   - licence reconnue par GitHub et approuvée OSI (MIT) ;
   - workflow **Validate** (action HACS) au vert, sans erreur ni exception ;
   - au moins une **release GitHub complète** (pas seulement un tag), créée après le passage des vérifications.
2. Forker `https://github.com/hacs/default` avec le compte personnel `freddye83` (pas une organisation).
3. Créer une branche à partir de `master`, éditer le fichier `plugin` et y insérer `freddye83/pool-hydraulic-card` **à sa place alphabétique**.
4. Ouvrir la pull request en remplissant entièrement le modèle. Le bot exige **deux liens réels** : la release (`https://github.com/freddye83/pool-hydraulic-card/releases/tag/1.x.y`) et un run **Validate** réussi (`https://github.com/freddye83/pool-hydraulic-card/actions/runs/…`). Un lien manquant ou un texte à remplacer fait fermer la PR automatiquement. Si elle est en brouillon, la passer en « Ready for review ».
5. Les vérifications automatiques de HACS doivent toutes passer. La revue peut prendre plusieurs mois ; après fusion, la carte apparaît au scan suivant.

Une fois la carte dans le catalogue par défaut, le badge `HACS-Custom` des README peut être remplacé par `HACS-Default`.
