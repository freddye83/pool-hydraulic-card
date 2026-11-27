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

## 3. Catalogue HACS

La carte fait partie du catalogue HACS par défaut depuis le 27/11/2026 (pull request hacs/default#14875). Chaque nouvelle release GitHub est proposée en mise à jour aux utilisateurs, sans autre démarche.

Rappels pour garder la carte dans le catalogue :
- le workflow **Validate** (action HACS) doit rester vert ;
- toujours publier une **release GitHub complète** (pas seulement un tag) ;
- ne pas renommer le dépôt ni le fichier `dist/pool-hydraulic-card.js` (déclaré dans `hacs.json`).
