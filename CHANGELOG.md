# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`).

*Toutes les évolutions notables du projet sont listées ici. Chaque entrée est en anglais puis en français.*

## [Unreleased]

## [1.2.2] - 2026-11-26

### Security
- Colours are now validated before they reach a `style` or SVG attribute: `accent_color`, `light_color`, `fluids`, the `fluid` names, pipe `color`, and the `rgb_color` attribute of lights. Only well-formed CSS colours are used (`#hex`, names, `rgb()`/`hsl()`, `var(--…)`), anything else falls back to the default colour, and the values are also escaped. Waypoint coordinates drawn by the visual editor are converted to numbers. Reported in the HACS review.

*Sécurité : les couleurs (`accent_color`, `light_color`, `fluids`, `fluid`, `color` des tuyaux, attribut `rgb_color` des lampes) sont validées comme couleurs CSS et échappées avant d'être insérées ; une valeur invalide reprend la couleur par défaut. Les coordonnées des points de passage de l'éditeur sont converties en nombres.*

## [1.2.1] - 2026-11-24

First public release. Versions 1.0.0 to 1.2.0 were private iterations and have no tag.

*Première version publique. Les versions 1.0.0 à 1.2.0 sont des itérations privées, sans tag.*

### Added
- `documentationURL` in the card picker entry, pointing to this repository.
- Public repository: bilingual README (EN/FR) with animated demos, HACS metadata, validation and release workflows, examples.

*Ajouté : lien vers la documentation dans le sélecteur de cartes ; dépôt public avec README bilingue, démos animées, métadonnées HACS, workflows de validation et de publication, exemples.*

## [1.2.0] - 2026-11-24

### Added
- Full-screen mode for the visual editor: the interactive plan fills the screen (fit to width and height) with the settings in a side column. Exit with <kbd>Esc</kbd> or the button. Falls back to a fixed overlay when the Fullscreen API is not available.
- `light_color` option for `pool` / `spa`: water colour when the light is on (default `#00e5ff`). RGB lights still use their own colour.

### Changed
- New `light` (spotlight) pictogram: lamp with a bulb, glowing lens and rays when on (replaces the "+" symbol).
- With `light_entity` on, the whole water surface takes the light colour, with a soft pulsing glow, instead of a small halo.

*Ajouté : mode plein écran de l'éditeur visuel (plan ajusté à l'écran, réglages en colonne, Échap pour quitter) ; option `light_color` pour la couleur de l'eau éclairée.*
*Modifié : nouveau pictogramme de projecteur ; l'eau entière prend la couleur de l'éclairage quand il est allumé.*

## [1.1.0] - 2026-11-24

### Added
- `bypasses`: groups of valves toggled together with one click on any valve of the group or on its header button. Line valves close and bypass valves open; pipes that list these valves in `valves` stop or resume flowing.
- Bypass position persistence with `bypass_storage`: `system` (shared across all devices and users, live sync, admin to change), `user` (per user) or `local` (this browser). Optional `entity` per bypass (e.g. `input_boolean`) to drive it from Home Assistant instead.
- `storage_key`, `show_bypass_buttons` options.
- Visual editor: **Bypass** section in the *General* tab.

### Changed
- Badges placed `left` / `right` of an item are now stacked in a column.

*Ajouté : by-pass (groupes de vannes basculés d'un clic), mémorisation de leur position (partagée, par utilisateur ou locale), pilotage optionnel par une entité, section By-pass dans l'éditeur.*
*Modifié : badges empilés en colonne quand le libellé est à gauche ou à droite.*

## [1.0.0] - 2026-11-24

### Added
- First release: pixel-positioned pool hydraulic plan, in the spirit of `kjanas/ha-homelab-map`.
- 30 item types: pool, spa, skimmer, main drain, return inlet, pump, filter, heat pump, heater/exchanger, solar panel, salt chlorinator (electrolyser), UV lamp, controller, dosing pump, tank, probe, pressure gauge, flow meter, 2-way / 3-way / check valves, injection point, junction, robot, spotlight, level float, generic device, value badges, text, zone.
- Animated pipes: flow driven by entities, blocked by closed valves, hot-water colour from a heat source entity, configurable fluids and colours, speed from a sensor.
- Item states: running animations, availability (red dashed frame), alarm (red blinking), thresholds on badge values.
- Visual editor: drag to move, resize handle, <kbd>Shift</kbd>+click to create a pipe, draggable waypoints and endpoints, forms for every option.
- Home Assistant theme support, sections layout (`getGridOptions`), visibility, toolbar (animations / values / grid), animations paused off-screen.

*Première version : plan hydraulique positionné au pixel, 30 types d'équipements, tuyaux animés, états et alarmes, éditeur visuel complet, thème HA.*

[Unreleased]: https://github.com/freddye83/pool-hydraulic-card/compare/1.2.2...HEAD
[1.2.2]: https://github.com/freddye83/pool-hydraulic-card/compare/1.2.1...1.2.2
[1.2.1]: https://github.com/freddye83/pool-hydraulic-card/releases/tag/1.2.1
