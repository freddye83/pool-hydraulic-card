/*!
 * pool-hydraulic-card — plan hydraulique de piscine pour Home Assistant (Lovelace)
 * Inspirée de kjanas/ha-homelab-map : équipements positionnés au pixel, tuyaux animés.
 * https://github.com/freddye83/pool-hydraulic-card — Licence MIT
 */
const PHC_VERSION = "1.3.0";
const CARD_TAG = "pool-hydraulic-card";
const EDITOR_TAG = "pool-hydraulic-card-editor";

console.info(
  `%c POOL-HYDRAULIC-CARD %c v${PHC_VERSION} `,
  "color:#fff;background:#0288d1;font-weight:700;border-radius:3px 0 0 3px",
  "color:#0288d1;background:#e1f5fe;font-weight:700;border-radius:0 3px 3px 0"
);

/* ------------------------------------------------------------------ */
/* Constantes                                                          */
/* ------------------------------------------------------------------ */

const FLUIDS_DEFAULT = {
  eau: "#29b6f6",
  chaude: "#ff7043",
  traitee: "#26c6da",
  ph: "#ba68c8",
  chlore: "#9ccc65",
  air: "#b0bec5",
  vidange: "#8d6e63",
  signal: "#9e9e9e",
  electrique: "#fbc02d",
};
/* ------------------------------------------------------------------ */
/* Traductions (anglais / français selon la langue de Home Assistant)  */
/* ------------------------------------------------------------------ */

const I18N = {
  en: {
    "type.zone": "Zone / plant room", "type.pool": "Pool", "type.spa": "Spa", "type.skimmer": "Skimmer", "type.drain": "Main drain",
    "type.inlet": "Return inlet", "type.pump": "Pump", "type.filter": "Filter", "type.heat_pump": "Heat pump", "type.heater": "Heater / heat exchanger",
    "type.solar": "Solar panel", "type.electrolyser": "Salt chlorinator", "type.uv": "UV lamp", "type.controller": "Controller", "type.dosing_pump": "Dosing pump",
    "type.tank": "Chemical tank", "type.probe": "Probe", "type.gauge": "Pressure gauge", "type.flowmeter": "Flow meter", "type.valve": "2-way valve",
    "type.valve3": "3-way valve", "type.check_valve": "Check valve", "type.injection": "Injection point", "type.junction": "Junction / tee", "type.robot": "Robot",
    "type.light": "Spotlight", "type.float": "Level float", "type.device": "Generic device (icon)", "type.badge": "Values only (badges)", "type.label": "Text",
    "fluid.eau": "Water", "fluid.chaude": "Hot water", "fluid.traitee": "Treated water", "fluid.ph": "pH (acid)", "fluid.chlore": "Chlorine", "fluid.air": "Air",
    "fluid.vidange": "Waste / drain", "fluid.signal": "Control signal", "fluid.electrique": "Electric",
    "f.type": "Item type", "f.id": "ID (unique)", "f.name": "Displayed name", "f.x": "X", "f.y": "Y", "f.w": "Width", "f.h": "Height",
    "f.entity": "State entity (running / open)", "f.on_state": "\"On\" states (comma separated)", "f.on_above": "On when value >",
    "f.status_entity": "Availability entity (offline = red frame)", "f.alarm_entity": "Alarm entity (blinks)", "f.alarm_state": "Alarm state",
    "f.label_position": "Label position", "f.fluid": "Fluid", "f.accent_color": "Accent colour", "f.icon": "Icon", "f.image": "Image (URL)",
    "f.tap_action": "Tap action", "f.temperature_entity": "Water temperature", "f.temperature_decimals": "Temperature decimals",
    "f.light_entity": "Light (tints the water)", "f.light_color": "Lit water colour", "f.cover_entity": "Cover", "f.level_entity": "Level (%)",
    "f.min": "Minimum", "f.max": "Maximum", "f.warn_above": "Orange threshold (value or entity)", "f.alarm_above": "Red threshold (value or entity)",
    "f.unit": "Unit", "f.decimals": "Decimals", "f.orientation": "Orientation", "f.default_state": "State without entity", "f.rotation": "Rotation (°)",
    "f.speed_entity": "Speed entity", "f.speed_min": "Minimum speed", "f.speed_max": "Maximum speed", "f.font_size": "Text size", "f.color": "Colour",
    "f.align": "Alignment", "f.bold": "Bold", "f.direction": "Layout", "f.bdx": "Label offset X", "f.bdy": "Label offset Y", "f.show_name": "Show name",
    "f.attribute": "Attribute (optional)", "f.thresholds": "Colour thresholds", "f.title": "Title", "f.width": "Plan width (px)", "f.height": "Plan height (px)",
    "f.pipe_width": "Pipe thickness", "f.line_radius": "Bend radius", "f.flow_speed": "Flow speed (px/s)", "f.bypass_storage": "Bypass storage",
    "f.storage_key": "Storage key (default: title)", "f.show_bypass_buttons": "Bypass buttons", "f.grid_size": "Editor grid step",
    "f.show_toggles": "Animations / Values / Grid buttons", "f.animations": "Animations on by default", "f.show_values": "Values shown by default",
    "f.debug": "Grid shown by default", "f.fluids": "Fluid colours", "f.scale": "Scale (empty = fit width)", "f.max_scale": "Maximum scale", "f.font": "Font",
    "f.start": "Start (item)", "f.start_edge": "Start side", "f.start_point": "Start position (%)", "f.end": "End (item)", "f.end_edge": "End side",
    "f.end_point": "End position (%)", "f.points_txt": "Waypoints (x,y x,y …)", "f.flow_entity": "Flows when (all these entities on)",
    "f.flow_on_above": "Flows when value >", "f.always_flow": "Always flowing", "f.reverse": "Reverse direction", "f.hot_entity": "Hot water when (entity on)",
    "f.valves": "Valves crossed (closed = no flow)", "f.style": "Animation style", "f.speed": "Speed (px/s)",
    "bp.id": "ID", "bp.name": "Name (button)", "bp.line": "Line valves (closed when the bypass is on)", "bp.bypass": "Bypass valves (open when it is on)",
    "bp.default": "On by default", "bp.entity": "Control entity (optional, e.g. input_boolean)",
    "opt.edge.top": "Top", "opt.edge.right": "Right", "opt.edge.bottom": "Bottom", "opt.edge.left": "Left", "opt.edge.center": "Centre",
    "opt.pos.bottom": "Below", "opt.pos.top": "Above", "opt.pos.left": "Left", "opt.pos.right": "Right", "opt.pos.inside": "Inside", "opt.pos.none": "Hidden",
    "opt.align.left": "Left", "opt.align.center": "Centre", "opt.align.right": "Right", "opt.dir.row": "In a row", "opt.dir.column": "In a column",
    "opt.orient.horizontal": "Horizontal", "opt.orient.vertical": "Vertical", "opt.vstate.open": "Open", "opt.vstate.closed": "Closed",
    "opt.v3.a": "Port A (right)", "opt.v3.b": "Port B (bottom)", "opt.v3route.a": "→ port A", "opt.v3route.b": "→ port B",
    "opt.style.dots": "Dots", "opt.style.dashes": "Dashes", "opt.style.none": "None",
    "opt.storage.system": "Shared (all devices and users)", "opt.storage.user": "Per user", "opt.storage.local": "This browser only",
    "ui.animations": "Animations", "ui.values": "Values", "ui.grid": "Grid", "ui.on": "on", "ui.off": "off", "ui.click_toggle": "click to toggle",
    "ui.unavailable": "unavail.", "ui.fullscreen": "Full screen", "ui.fullscreen_exit": "Exit full screen", "ui.fullscreen_title": "Interactive plan in full screen (Esc to exit)",
    "ui.hint": "Interactive plan: drag an item to move it, drag the handle at the bottom-right to resize it. <b>Shift + click</b> a second item: creates a pipe. Selected pipe: drag the points / ends (drop an end on an item to reconnect it), <b>double-click</b> the pipe: adds a point, a point: removes it. <b>Alt</b>: move without the grid.",
    "ui.tab_general": "General", "ui.tab_items": "Items", "ui.tab_pipes": "Pipes", "ui.bypasses": "Bypasses", "ui.add_bypass": "Add a bypass",
    "ui.bypass_hint": "A click on a valve of the group (or on its button) toggles the whole bypass: line valves closed, bypass valves open. The position is stored as set above (\"Shared\" needs an administrator account to change it).",
    "ui.delete": "Delete", "ui.move_up_below": "Move up (drawn below)", "ui.move_down_above": "Move down (drawn on top)", "ui.duplicate": "Duplicate", "ui.add": "Add",
    "ui.move_up": "Move up", "ui.no_items": "No items.", "ui.values_title": "Displayed values (badges)", "ui.add_value": "Add a value",
    "ui.no_pipes": "No pipes. Tip: select an item, then Shift + click another one on the plan.", "ui.reverse_pipe": "Swap start / end", "ui.add_pipe": "Add a pipe",
    "ui.pipe_title": "Pipe: {a} → {b}", "ui.clear_points": "Clear the points (automatic route)", "ui.new_bypass": "Bypass {n}",
    "err.items": "pool-hydraulic-card: the \"items\" list is required.", "err.item": "items[{i}]: invalid item.", "err.type": "items[{i}]: unknown type \"{t}\". Types: {list}",
    "err.id": "items[{i}]: \"id\" is required.", "err.dup": "items[{i}]: duplicate id \"{id}\".", "err.pipes": "pool-hydraulic-card: \"pipes\" must be a list.",
    "err.bypasses": "pool-hydraulic-card: \"bypasses\" must be a list.", "err.bp_id": "bypasses[{i}]: \"id\" is required.",
    "err.pipe_ends": "pipes[{i}]: ends not found (start \"{s}\" / end \"{e}\").", "err.pipe_unknown": "pipes[{i}]: unknown item \"{id}\".",
    "stub.zone": "Plant room",
    "card.name": "Pool hydraulic plan", "card.desc": "Animated plan of the filtration: pump, filter, heat pump, salt chlorinator, pH/chlorine dosing, probes, valves and flow.",
  },
  fr: {
    "type.zone": "Zone / local technique", "type.pool": "Bassin", "type.spa": "Spa", "type.skimmer": "Skimmer", "type.drain": "Bonde de fond",
    "type.inlet": "Buse de refoulement", "type.pump": "Pompe", "type.filter": "Filtre", "type.heat_pump": "Pompe à chaleur", "type.heater": "Réchauffeur / échangeur",
    "type.solar": "Panneau solaire", "type.electrolyser": "Électrolyseur", "type.uv": "Lampe UV", "type.controller": "Contrôleur", "type.dosing_pump": "Pompe doseuse",
    "type.tank": "Bidon / cuve", "type.probe": "Sonde", "type.gauge": "Manomètre", "type.flowmeter": "Débitmètre", "type.valve": "Vanne 2 voies",
    "type.valve3": "Vanne 3 voies", "type.check_valve": "Clapet anti-retour", "type.injection": "Point d'injection", "type.junction": "Raccord / Té", "type.robot": "Robot",
    "type.light": "Projecteur", "type.float": "Régulateur de niveau", "type.device": "Accessoire générique (icône)", "type.badge": "Valeurs seules (badges)", "type.label": "Texte",
    "fluid.eau": "Eau", "fluid.chaude": "Eau chaude", "fluid.traitee": "Eau traitée", "fluid.ph": "pH (acide)", "fluid.chlore": "Chlore", "fluid.air": "Air",
    "fluid.vidange": "Vidange / égout", "fluid.signal": "Signal (commande)", "fluid.electrique": "Électrique",
    "f.type": "Type d'équipement", "f.id": "Identifiant (unique)", "f.name": "Nom affiché", "f.x": "X", "f.y": "Y", "f.w": "Largeur", "f.h": "Hauteur",
    "f.entity": "Entité d'état (marche / ouvert)", "f.on_state": "États « marche » (séparés par ,)", "f.on_above": "Marche si valeur >",
    "f.status_entity": "Entité de disponibilité (hors ligne = cadre rouge)", "f.alarm_entity": "Entité d'alarme (clignote)", "f.alarm_state": "État d'alarme",
    "f.label_position": "Position du libellé", "f.fluid": "Fluide", "f.accent_color": "Couleur d'accent", "f.icon": "Icône", "f.image": "Image (URL)",
    "f.tap_action": "Action au clic", "f.temperature_entity": "Température de l'eau", "f.temperature_decimals": "Décimales T°",
    "f.light_entity": "Éclairage (colore l'eau)", "f.light_color": "Couleur de l'eau éclairée", "f.cover_entity": "Volet / couverture", "f.level_entity": "Niveau (%)",
    "f.min": "Minimum", "f.max": "Maximum", "f.warn_above": "Seuil orange (valeur ou entité)", "f.alarm_above": "Seuil rouge (valeur ou entité)",
    "f.unit": "Unité", "f.decimals": "Décimales", "f.orientation": "Orientation", "f.default_state": "État si pas d'entité", "f.rotation": "Rotation (°)",
    "f.speed_entity": "Entité de vitesse", "f.speed_min": "Vitesse min", "f.speed_max": "Vitesse max", "f.font_size": "Taille du texte", "f.color": "Couleur",
    "f.align": "Alignement", "f.bold": "Gras", "f.direction": "Disposition", "f.bdx": "Décalage libellé X", "f.bdy": "Décalage libellé Y", "f.show_name": "Afficher le nom",
    "f.attribute": "Attribut (optionnel)", "f.thresholds": "Seuils de couleur", "f.title": "Titre", "f.width": "Largeur du plan (px)", "f.height": "Hauteur du plan (px)",
    "f.pipe_width": "Épaisseur des tuyaux", "f.line_radius": "Rayon des coudes", "f.flow_speed": "Vitesse du flux (px/s)", "f.bypass_storage": "Mémorisation des by-pass",
    "f.storage_key": "Clé de mémorisation (défaut : titre)", "f.show_bypass_buttons": "Boutons de by-pass", "f.grid_size": "Pas de la grille d'édition",
    "f.show_toggles": "Boutons Animations / Valeurs / Grille", "f.animations": "Animations actives par défaut", "f.show_values": "Valeurs affichées par défaut",
    "f.debug": "Grille affichée par défaut", "f.fluids": "Couleurs des fluides", "f.scale": "Échelle (vide = ajustée à la largeur)", "f.max_scale": "Échelle maximale", "f.font": "Police",
    "f.start": "Départ (équipement)", "f.start_edge": "Côté départ", "f.start_point": "Position départ (%)", "f.end": "Arrivée (équipement)", "f.end_edge": "Côté arrivée",
    "f.end_point": "Position arrivée (%)", "f.points_txt": "Points de passage (x,y x,y …)", "f.flow_entity": "Flux actif si (toutes ces entités en marche)",
    "f.flow_on_above": "Flux si valeur >", "f.always_flow": "Flux permanent", "f.reverse": "Sens inverse", "f.hot_entity": "Eau chaude si (entité en marche)",
    "f.valves": "Vannes traversées (bloquent le flux si fermées)", "f.style": "Style d'animation", "f.speed": "Vitesse (px/s)",
    "bp.id": "Identifiant", "bp.name": "Nom (bouton)", "bp.line": "Vannes de la ligne (fermées quand le by-pass est activé)", "bp.bypass": "Vannes du by-pass (ouvertes quand il est activé)",
    "bp.default": "Activé par défaut", "bp.entity": "Entité de commande (optionnel, ex. input_boolean)",
    "opt.edge.top": "Haut", "opt.edge.right": "Droite", "opt.edge.bottom": "Bas", "opt.edge.left": "Gauche", "opt.edge.center": "Centre",
    "opt.pos.bottom": "Dessous", "opt.pos.top": "Dessus", "opt.pos.left": "À gauche", "opt.pos.right": "À droite", "opt.pos.inside": "À l'intérieur", "opt.pos.none": "Masqué",
    "opt.align.left": "Gauche", "opt.align.center": "Centre", "opt.align.right": "Droite", "opt.dir.row": "En ligne", "opt.dir.column": "En colonne",
    "opt.orient.horizontal": "Horizontale", "opt.orient.vertical": "Verticale", "opt.vstate.open": "Ouverte", "opt.vstate.closed": "Fermée",
    "opt.v3.a": "Voie A (droite)", "opt.v3.b": "Voie B (bas)", "opt.v3route.a": "→ voie A", "opt.v3route.b": "→ voie B",
    "opt.style.dots": "Points", "opt.style.dashes": "Tirets", "opt.style.none": "Aucune",
    "opt.storage.system": "Partagée (tous appareils et utilisateurs)", "opt.storage.user": "Par utilisateur", "opt.storage.local": "Ce navigateur seulement",
    "ui.animations": "Animations", "ui.values": "Valeurs", "ui.grid": "Grille", "ui.on": "activé", "ui.off": "désactivé", "ui.click_toggle": "cliquer pour basculer",
    "ui.unavailable": "indispo.", "ui.fullscreen": "Plein écran", "ui.fullscreen_exit": "Quitter le plein écran", "ui.fullscreen_title": "Plan interactif en plein écran (Échap pour quitter)",
    "ui.hint": "Plan interactif : glisser un équipement pour le déplacer, poignée en bas à droite pour le redimensionner. <b>Maj + clic</b> sur un 2ᵉ équipement : crée un tuyau. Tuyau sélectionné : glisser les points / extrémités (déposer une extrémité sur un équipement pour la rebrancher), <b>double-clic</b> sur le tuyau : ajoute un point, sur un point : le supprime. <b>Alt</b> : déplacement sans grille.",
    "ui.tab_general": "Général", "ui.tab_items": "Équipements", "ui.tab_pipes": "Tuyaux", "ui.bypasses": "By-pass", "ui.add_bypass": "Ajouter un by-pass",
    "ui.bypass_hint": "Un clic sur une vanne du groupe (ou sur son bouton) bascule tout le by-pass : vannes de ligne fermées, vannes de by-pass ouvertes. La position est mémorisée selon le réglage ci-dessus (« Partagée » nécessite un compte administrateur pour modifier).",
    "ui.delete": "Supprimer", "ui.move_up_below": "Monter (dessous)", "ui.move_down_above": "Descendre (dessus)", "ui.duplicate": "Dupliquer", "ui.add": "Ajouter",
    "ui.move_up": "Monter", "ui.no_items": "Aucun équipement.", "ui.values_title": "Valeurs affichées (badges)", "ui.add_value": "Ajouter une valeur",
    "ui.no_pipes": "Aucun tuyau. Astuce : sélectionne un équipement puis Maj + clic sur un autre dans le plan.", "ui.reverse_pipe": "Inverser départ / arrivée", "ui.add_pipe": "Ajouter un tuyau",
    "ui.pipe_title": "Tuyau : {a} → {b}", "ui.clear_points": "Effacer les points (tracé auto)", "ui.new_bypass": "By-pass {n}",
    "err.items": "pool-hydraulic-card : la liste « items » est obligatoire.", "err.item": "items[{i}] : élément invalide.", "err.type": "items[{i}] : type « {t} » inconnu. Types : {list}",
    "err.id": "items[{i}] : « id » obligatoire.", "err.dup": "items[{i}] : id « {id} » en double.", "err.pipes": "pool-hydraulic-card : « pipes » doit être une liste.",
    "err.bypasses": "pool-hydraulic-card : « bypasses » doit être une liste.", "err.bp_id": "bypasses[{i}] : « id » obligatoire.",
    "err.pipe_ends": "pipes[{i}] : extrémités introuvables (start « {s} » / end « {e} »).", "err.pipe_unknown": "pipes[{i}] : équipement « {id} » inconnu.",
    "stub.zone": "Local technique",
    "card.name": "Plan hydraulique piscine", "card.desc": "Plan animé de la filtration : pompe, filtre, PAC, électrolyseur, régulation pH/chlore, sondes, vannes et flux.",
  },
};

// Langue de l'interface : celle de Home Assistant (fr → français, toute autre langue → anglais).
let LANG = String((typeof navigator !== "undefined" && navigator.language) || "en").toLowerCase().startsWith("fr") ? "fr" : "en";
const setLang = (hass) => {
  const code = String(hass?.locale?.language || hass?.language || "").toLowerCase();
  if (!code) return false;
  const next = code.startsWith("fr") ? "fr" : "en";
  const changed = next !== LANG;
  LANG = next;
  return changed;
};
const T = (key, vars) => {
  let s = I18N[LANG][key] ?? I18N.en[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v));
  return s;
};
const tLabel = (prefix) => (name) => (I18N[LANG][`${prefix}.${name}`] ?? I18N.en[`${prefix}.${name}`] ?? name);

const THIN_FLUIDS = new Set(["signal", "electrique"]);

const TYPES = {
  zone: { size: [400, 200], icon: "mdi:selection" },
  pool: { size: [300, 150], icon: "mdi:pool" },
  spa: { size: [140, 110], icon: "mdi:hot-tub" },
  skimmer: { size: [40, 36], icon: "mdi:tray-arrow-down" },
  drain: { size: [40, 22], icon: "mdi:grid" },
  inlet: { size: [30, 30], icon: "mdi:water-outline" },
  pump: { size: [100, 80], icon: "mdi:pump" },
  filter: { size: [70, 108], icon: "mdi:filter" },
  heat_pump: { size: [120, 90], icon: "mdi:heat-pump" },
  heater: { size: [80, 60], icon: "mdi:radiator" },
  solar: { size: [100, 60], icon: "mdi:solar-panel" },
  electrolyser: { size: [120, 60], icon: "mdi:flash" },
  uv: { size: [120, 40], icon: "mdi:lightbulb-fluorescent-tube" },
  controller: { size: [120, 80], icon: "mdi:chip" },
  dosing_pump: { size: [64, 64], icon: "mdi:water-pump" },
  tank: { size: [50, 66], icon: "mdi:bottle-tonic" },
  probe: { size: [28, 70], icon: "mdi:test-tube" },
  gauge: { size: [54, 54], icon: "mdi:gauge" },
  flowmeter: { size: [70, 40], icon: "mdi:speedometer" },
  valve: { size: [28, 28], icon: "mdi:valve" },
  valve3: { size: [40, 40], icon: "mdi:call-split" },
  check_valve: { size: [30, 30], icon: "mdi:arrow-right-bold-circle-outline" },
  injection: { size: [18, 18], icon: "mdi:needle" },
  junction: { size: [12, 12], icon: "mdi:circle-small" },
  robot: { size: [56, 44], icon: "mdi:robot" },
  light: { size: [30, 30], icon: "mdi:light-flood-down" },
  float: { size: [30, 60], icon: "mdi:waves-arrow-up" },
  device: { size: [70, 60], icon: "mdi:puzzle" },
  badge: { size: [120, 24], icon: "mdi:numeric" },
  label: { size: [120, 24], icon: "mdi:format-text" },
};

const DEFAULT_LABEL_POS = {
  pool: "inside", spa: "inside", probe: "top", gauge: "left", tank: "bottom",
  valve: "none", valve3: "none", check_valve: "none", injection: "none", junction: "none",
  skimmer: "none", drain: "none", inlet: "none", light: "none", robot: "none", float: "right",
};
const DEFAULT_FLUID = { dosing_pump: "ph", tank: "ph", injection: "ph" };
const DEFAULT_ACCENT = { heat_pump: "@chaude", heater: "@chaude", uv: "#7c4dff", light: "#ffd54f", solar: "#ffb300" };
const BASE_DUR = { pump: 0.8, heat_pump: 1.6, dosing_pump: 2.4, flowmeter: 1.0, robot: 1.8 };
const NO_META = new Set(["label", "badge", "zone", "junction"]);

const OFF_STATES = new Set([
  "off", "closed", "closing", "false", "idle", "standby", "stop", "stopped", "not_home",
  "none", "0", "offline", "disconnected", "paused", "low",
]);
const COLORS = {
  red: "var(--error-color, #db4437)", orange: "var(--warning-color, #ffa600)",
  green: "var(--success-color, #43a047)", yellow: "#fdd835", blue: "var(--info-color, #039be5)",
  grey: "var(--disabled-text-color, #9e9e9e)", gray: "var(--disabled-text-color, #9e9e9e)",
  primary: "var(--primary-color)",
};

/* ------------------------------------------------------------------ */
/* Utilitaires                                                         */
/* ------------------------------------------------------------------ */

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clone = (o) => (o === undefined ? undefined : JSON.parse(JSON.stringify(o)));
const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : null; };
const isNumStr = (s) => typeof s === "string" && /^\s*-?\d+(\.\d+)?\s*$/.test(s);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
// Colours come from the config and from entity attributes: only well-formed CSS colours are used,
// anything else (quotes, semicolons, markup…) is dropped before it reaches a style or an attribute.
const CSS_COLOR_RE = /^(?:#[0-9a-f]{3,8}|[a-z]{3,30}|(?:rgb|rgba|hsl|hsla)\(\s*[-+0-9.%\s,/]+\)|var\(--[a-z0-9_-]+(?:\s*,\s*(?:#[0-9a-f]{3,8}|[a-z]{3,30}))?\))$/i;
const cssColor = (v) => {
  if (v == null) return null;
  const s = String(v).trim();
  return CSS_COLOR_RE.test(s) ? s : null;
};
const col = (c) => (c == null ? null : COLORS[c] || cssColor(c));
const rgbOf = (a) =>
  Array.isArray(a) && a.length >= 3 && a.slice(0, 3).every((n) => Number.isFinite(Number(n)))
    ? `rgb(${a.slice(0, 3).map((n) => Math.max(0, Math.min(255, Math.round(Number(n))))).join(",")})`
    : null;
const r2 = (v) => Math.round(v * 100) / 100;
const ENTITY_RE = /^[a-z_]+\.[a-z0-9_]+$/;
const uidOf = (s) => String(s).replace(/[^a-zA-Z0-9_-]/g, "_");

function evalOn(st, opt = {}) {
  if (!st || st.state === "unavailable" || st.state === "unknown") return null;
  const s = String(st.state);
  if (opt.on_state != null && opt.on_state !== "") {
    const list = Array.isArray(opt.on_state) ? opt.on_state : String(opt.on_state).split(",");
    return list.map((x) => String(x).trim().toLowerCase()).includes(s.toLowerCase());
  }
  if (isNumStr(s)) return parseFloat(s) > (num(opt.on_above) ?? 0);
  return !OFF_STATES.has(s.toLowerCase());
}

function thresholdColor(value, list) {
  if (value == null || !Array.isArray(list)) return null;
  let c = null;
  for (const t of list) {
    if (!t) continue;
    if (t.above != null && value > Number(t.above)) c = t.color;
    if (t.below != null && value < Number(t.below)) c = t.color;
  }
  return col(c);
}

function anchor(g, edge, pct) {
  const p = (pct == null || pct === "" ? 50 : Number(pct)) / 100;
  switch (edge) {
    case "top": return [g.x + g.w * p, g.y];
    case "bottom": return [g.x + g.w * p, g.y + g.h];
    case "left": return [g.x, g.y + g.h * p];
    case "right": return [g.x + g.w, g.y + g.h * p];
    default: return [g.x + g.w / 2, g.y + g.h / 2];
  }
}

function autoRoute(s, se, e, ee) {
  if (Math.abs(s[0] - e[0]) < 0.6 || Math.abs(s[1] - e[1]) < 0.6) return [];
  const H = (x) => x === "left" || x === "right";
  const V = (x) => x === "top" || x === "bottom";
  if (H(se) && H(ee)) { const m = Math.round((s[0] + e[0]) / 2); return [[m, s[1]], [m, e[1]]]; }
  if (V(se) && V(ee)) { const m = Math.round((s[1] + e[1]) / 2); return [[s[0], m], [e[0], m]]; }
  if (V(se)) return [[s[0], e[1]]];
  return [[e[0], s[1]]];
}

function roundedPath(raw, r) {
  const pts = [];
  for (const p of raw) {
    const l = pts[pts.length - 1];
    if (!l || Math.abs(l[0] - p[0]) > 0.01 || Math.abs(l[1] - p[1]) > 0.01) pts.push(p);
  }
  if (pts.length < 2) return "";
  const D = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
  let d = `M${r2(pts[0][0])} ${r2(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1];
    const d1 = D(p0, p1), d2 = D(p1, p2);
    const rr = Math.min(r, d1 / 2, d2 / 2);
    if (rr < 0.5) { d += ` L${r2(p1[0])} ${r2(p1[1])}`; continue; }
    const a = [p1[0] + ((p0[0] - p1[0]) * rr) / d1, p1[1] + ((p0[1] - p1[1]) * rr) / d1];
    const b = [p1[0] + ((p2[0] - p1[0]) * rr) / d2, p1[1] + ((p2[1] - p1[1]) * rr) / d2];
    d += ` L${r2(a[0])} ${r2(a[1])} Q${r2(p1[0])} ${r2(p1[1])} ${r2(b[0])} ${r2(b[1])}`;
  }
  const l = pts[pts.length - 1];
  return d + ` L${r2(l[0])} ${r2(l[1])}`;
}

function gaugeArc(n1, n2, r = 21) {
  const a1 = ((135 + 270 * n1) * Math.PI) / 180, a2 = ((135 + 270 * n2) * Math.PI) / 180;
  const x1 = 30 + r * Math.cos(a1), y1 = 30 + r * Math.sin(a1), x2 = 30 + r * Math.cos(a2), y2 = 30 + r * Math.sin(a2);
  return `M${r2(x1)} ${r2(y1)}A${r} ${r} 0 ${270 * (n2 - n1) > 180 ? 1 : 0} 1 ${r2(x2)} ${r2(y2)}`;
}

/* ------------------------------------------------------------------ */
/* Pictogrammes SVG                                                    */
/* ------------------------------------------------------------------ */

function wavePath(y, amp, len, from, to) {
  let d = `M${from} ${y}`;
  for (let x = from; x < to; x += len) d += ` q${len / 4} ${-amp} ${len / 2} 0 t${len / 2} 0`;
  return d;
}

const PICTO = {
  pool: (c) => `<svg viewBox="0 0 300 150" preserveAspectRatio="none">
    <defs><linearGradient id="pg-${c.uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${esc(c.lightColor || "var(--fl)")}" stop-opacity="${c.lightColor ? ".6" : ".45"}"/><stop offset="1" stop-color="${esc(c.lightColor || "var(--fl)")}" stop-opacity=".95"/></linearGradient>
    <radialGradient id="pl-${c.uid}" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <clipPath id="pc-${c.uid}"><rect x="9" y="9" width="282" height="132" rx="10"/></clipPath></defs>
    <rect class="coping" x="2" y="2" width="296" height="146" rx="16" vector-effect="non-scaling-stroke"/>
    <rect x="9" y="9" width="282" height="132" rx="10" fill="url(#pg-${c.uid})"/>
    <g clip-path="url(#pc-${c.uid})">
      ${c.lightColor ? `<rect class="lit" x="9" y="9" width="282" height="132" fill="url(#pl-${c.uid})"/>` : ""}
      <g class="wave"><path class="wv" d="${wavePath(34, 3, 50, -300, 600)}" vector-effect="non-scaling-stroke"/><path class="wv" d="${wavePath(80, 3, 70, -300, 600)}" vector-effect="non-scaling-stroke" opacity=".6"/><path class="wv" d="${wavePath(118, 2, 60, -300, 600)}" vector-effect="non-scaling-stroke" opacity=".4"/></g>
      ${c.cover != null && c.cover > 0 ? `<rect class="cover" x="9" y="9" width="${r2(282 * c.cover)}" height="132"/>` : ""}
    </g></svg>`,
  spa: (c) => `<svg viewBox="0 0 140 110" preserveAspectRatio="none">
    <rect class="coping" x="2" y="2" width="136" height="106" rx="22" vector-effect="non-scaling-stroke"/>
    <rect x="10" y="10" width="120" height="90" rx="16" fill="${esc(c.lightColor || "var(--fl)")}" opacity="${c.lightColor ? ".85" : ".7"}"/>
    <g>${[[30, 80], [55, 70], [80, 84], [104, 72], [42, 60], [92, 58], [68, 90]].map(([x, y], i) => `<circle class="bub" cx="${x}" cy="${y}" r="3" style="animation-delay:${(i * 0.27).toFixed(2)}s"/>`).join("")}</g>
    ${c.cover != null && c.cover > 0 ? `<rect class="cover" x="10" y="10" width="${r2(120 * c.cover)}" height="90" rx="16"/>` : ""}</svg>`,
  skimmer: () => `<svg viewBox="0 0 40 36"><rect class="b" x="3" y="4" width="34" height="28" rx="4"/><rect class="flfill" x="7" y="16" width="26" height="12" rx="2"/><path class="acc-s" d="M7 11h26"/><path class="t" d="M12 20h16M12 24h16"/></svg>`,
  drain: () => `<svg viewBox="0 0 40 22"><rect class="b" x="2" y="3" width="36" height="16" rx="4"/><path class="t" d="M9 5v12M15 5v12M21 5v12M27 5v12M33 5v12"/></svg>`,
  inlet: () => `<svg viewBox="0 0 30 30"><circle class="b" cx="15" cy="15" r="12"/><circle class="acc pulse" cx="15" cy="15" r="5.5"/></svg>`,
  pump: () => `<svg viewBox="0 0 100 80">
    <rect class="base" x="6" y="68" width="88" height="7" rx="3"/>
    <rect class="b" x="6" y="26" width="40" height="38" rx="7"/>
    <path class="t" d="M14 32v26M21 32v26M28 32v26M35 32v26"/>
    <rect class="b" x="44" y="36" width="8" height="18"/>
    <circle class="b" cx="72" cy="45" r="21"/><circle class="acc-s" cx="72" cy="45" r="15"/>
    <g class="spin"><circle class="ghost" cx="72" cy="45" r="13"/><path class="blade" d="M72 45V32M72 45l11.3 6.5M72 45l-11.3 6.5"/></g>
    <circle class="hub" cx="72" cy="45" r="3.5"/>
    <rect class="b" x="63" y="6" width="18" height="17" rx="3"/><path class="t" d="M63 14h18"/>
    <circle class="led" cx="15" cy="19" r="3.5"/></svg>`,
  filter: () => `<svg viewBox="0 0 60 100">
    <rect class="base" x="14" y="92" width="32" height="6" rx="2"/>
    <path class="b" d="M8 30Q8 10 30 10Q52 10 52 30V82Q52 92 30 92Q8 92 8 82Z"/>
    <path class="flfill" d="M10 30Q10 12 30 12Q50 12 50 30V58H10Z"/>
    <path class="sand" d="M10 58H50V82Q50 90 30 90Q10 90 10 82Z"/>
    <path class="t" d="M10 66H50M10 74H50"/>
    <rect class="b" x="20" y="2" width="20" height="10" rx="3"/><circle class="led" cx="30" cy="7" r="2.5"/></svg>`,
  heat_pump: () => `<svg viewBox="0 0 120 90">
    <rect class="base" x="12" y="82" width="20" height="6"/><rect class="base" x="88" y="82" width="20" height="6"/>
    <rect class="b" x="4" y="6" width="112" height="76" rx="7"/>
    <circle class="b" cx="42" cy="44" r="29"/>
    <g class="spin" style="--sp:1"><circle class="ghost" cx="42" cy="44" r="24"/><path class="acc" d="M42 44C40 30 48 21 55 26C58 30 52 38 42 44ZM42 44C56 42 65 50 60 57C56 60 48 54 42 44ZM42 44C44 58 36 67 29 62C26 58 32 50 42 44ZM42 44C28 46 19 38 24 31C28 28 36 34 42 44Z"/></g>
    <path class="t" d="M13 44h58M42 15v58"/><circle class="hub" cx="42" cy="44" r="4"/>
    <path class="t" d="M82 16h26M82 23h26M82 30h26M82 37h26M82 44h26"/>
    <rect class="scr" x="84" y="56" width="22" height="14" rx="2"/></svg>`,
  heater: () => `<svg viewBox="0 0 80 60"><rect class="b" x="4" y="8" width="72" height="44" rx="6"/><path class="coil" d="M12 30l6-10 7 20 7-20 7 20 7-20 7 20 7-20 6 10"/><circle class="led" cx="68" cy="16" r="3"/></svg>`,
  solar: () => `<svg viewBox="0 0 100 60"><path class="b" d="M14 6H94L86 50H6Z"/><path class="flfill sol" d="M14 6H94L86 50H6Z"/><path class="t" d="M34 6 28 50M54 6 48 50M74 6 68 50M10 28H90"/><rect class="base" x="40" y="50" width="14" height="8"/></svg>`,
  electrolyser: () => `<svg viewBox="0 0 120 60">
    <rect class="b" x="0" y="22" width="12" height="16" rx="2"/><rect class="b" x="108" y="22" width="12" height="16" rx="2"/>
    <rect class="glass" x="10" y="12" width="100" height="36" rx="16"/>
    <path class="plate" d="M34 18v24M44 18v24M54 18v24M64 18v24M74 18v24M84 18v24"/>
    <rect class="b" x="50" y="2" width="20" height="10" rx="2"/><circle class="led" cx="60" cy="7" r="2.5"/>
    ${[[39, 40], [49, 42], [59, 39], [69, 42], [79, 40], [89, 41], [29, 41]].map(([x, y], i) => `<circle class="bub" cx="${x}" cy="${y}" r="1.8" style="animation-delay:${(i * 0.23).toFixed(2)}s"/>`).join("")}</svg>`,
  uv: () => `<svg viewBox="0 0 120 40"><rect class="b" x="0" y="13" width="8" height="14" rx="2"/><rect class="b" x="112" y="13" width="8" height="14" rx="2"/><rect class="b" x="6" y="6" width="108" height="28" rx="13"/><rect class="uvl" x="18" y="15" width="84" height="10" rx="5"/></svg>`,
  controller: () => `<svg viewBox="0 0 100 72">
    <rect class="b" x="4" y="4" width="92" height="64" rx="7"/>
    <rect class="scr2" x="12" y="12" width="54" height="30" rx="3"/>
    <path class="sig" d="M16 32l8-8 6 6 8-12 8 10 6-4 10 4"/>
    <circle class="led" cx="80" cy="18" r="4"/><circle class="led blink" cx="80" cy="31" r="4"/>
    <rect class="base" x="12" y="50" width="12" height="8" rx="2"/><rect class="base" x="28" y="50" width="12" height="8" rx="2"/><rect class="base" x="44" y="50" width="12" height="8" rx="2"/>
    <path class="t" d="M72 50h16M72 56h16"/></svg>`,
  dosing_pump: () => `<svg viewBox="0 0 80 80">
    <rect class="b" x="6" y="8" width="68" height="66" rx="9"/>
    <circle class="glass" cx="40" cy="36" r="21"/>
    <g class="spin"><circle class="ghost" cx="40" cy="36" r="19"/><path class="t" d="M40 36V22M40 36l12 7M40 36l-12 7"/><circle class="accfl" cx="40" cy="21" r="4"/><circle class="accfl" cx="53" cy="43.5" r="4"/><circle class="accfl" cx="27" cy="43.5" r="4"/></g>
    <circle class="hub" cx="40" cy="36" r="3"/>
    <rect class="scr" x="22" y="62" width="36" height="6" rx="2"/></svg>`,
  tank: (c) => `<svg viewBox="0 0 60 80">
    <defs><clipPath id="tk-${c.uid}"><path d="M8 20Q8 14 14 14H46Q52 14 52 20V72Q52 76 48 76H12Q8 76 8 72Z"/></clipPath></defs>
    <rect class="b" x="18" y="4" width="16" height="10" rx="2"/>
    <path class="t" d="M40 14V6h10v8"/>
    <path class="b" d="M8 20Q8 14 14 14H46Q52 14 52 20V72Q52 76 48 76H12Q8 76 8 72Z"/>
    ${c.level != null ? `<g clip-path="url(#tk-${c.uid})"><rect class="tankfl" x="0" y="${r2(76 - 62 * c.level)}" width="60" height="80"/></g>` : `<path class="t" d="M14 70L46 22" stroke-dasharray="3 3"/>`}
    <path class="t" d="M44 30h8M44 45h8M44 60h8"/></svg>`,
  probe: () => `<svg viewBox="0 0 40 100">
    <path class="t" d="M20 6C20 0 32 0 36 4"/>
    <rect class="b" x="12" y="6" width="16" height="12" rx="3"/><circle class="led" cx="20" cy="12" r="2.5"/>
    <rect class="b" x="16" y="18" width="8" height="52"/>
    <rect class="b" x="6" y="70" width="28" height="12" rx="3"/>
    <path class="accfl" d="M16 82h8v8a4 4 0 0 1-8 0z"/></svg>`,
  gauge: (c) => {
    const g = c.gauge || { norm: 0, warn: null, alarm: null };
    const nw = g.warn ?? 1, na = g.alarm ?? 1;
    const a = ((135 + 270 * g.norm) * Math.PI) / 180;
    return `<svg viewBox="0 0 60 60"><circle class="b" cx="30" cy="30" r="27"/>
      <path class="gz" stroke="var(--success-color,#43a047)" d="${gaugeArc(0, Math.min(nw, na))}"/>
      ${nw < na ? `<path class="gz" stroke="var(--warning-color,#ffa600)" d="${gaugeArc(nw, na)}"/>` : ""}
      ${na < 1 ? `<path class="gz" stroke="var(--error-color,#db4437)" d="${gaugeArc(na, 1)}"/>` : ""}
      <line class="needle" x1="30" y1="30" x2="${r2(30 + 19 * Math.cos(a))}" y2="${r2(30 + 19 * Math.sin(a))}"/>
      <circle class="hub" cx="30" cy="30" r="3"/>
      ${c.valueText ? `<text class="gtxt" x="30" y="45" text-anchor="middle">${esc(c.valueText)}</text>` : ""}
      ${c.unitText ? `<text class="gunit" x="30" y="52" text-anchor="middle">${esc(c.unitText)}</text>` : ""}</svg>`;
  },
  flowmeter: () => `<svg viewBox="0 0 70 40"><rect class="b" x="2" y="14" width="66" height="12" rx="3"/><circle class="b" cx="35" cy="20" r="15"/><circle class="glass" cx="35" cy="20" r="11"/>
    <g class="spin"><circle class="ghost" cx="35" cy="20" r="9"/><path class="blade" style="stroke-width:3" d="M35 11v18M26 20h18"/></g><circle class="hub" cx="35" cy="20" r="2.5"/></svg>`,
  valve: (c) => {
    const open = c.vstate !== "closed";
    return `<svg viewBox="0 0 60 60"><g transform="${c.vert ? "rotate(90 30 30)" : ""}">
      <path class="vb ${open ? "open" : "closed"} ${c.vstate === "unknown" ? "unk" : ""}" d="M8 16L30 30L8 44ZM52 16L30 30L52 44Z"/>
      <g class="handle ${open ? "" : "shut"}" transform="${open ? "" : "rotate(90 30 30)"}"><path d="M30 30V9M20 9H40"/></g>
      <circle class="hub" cx="30" cy="30" r="3.5"/></g></svg>`;
  },
  valve3: (c) => {
    const b = c.vstate === "b";
    return `<svg viewBox="0 0 60 60"><g transform="rotate(${c.rot || 0} 30 30)">
      <path class="vb open" d="M6 18L30 30L6 42Z"/>
      <path class="vb ${b ? "closed" : "open"}" d="M54 18L30 30L54 42Z"/>
      <path class="vb ${b ? "open" : "closed"}" d="M18 54L30 30L42 54Z"/>
      <path class="arrow" d="${b ? "M30 30V46" : "M30 30H46"}"/>
      <circle class="hub" cx="30" cy="30" r="4"/></g></svg>`;
  },
  check_valve: (c) => `<svg viewBox="0 0 60 60"><g transform="rotate(${c.rot || 0} 30 30)"><circle class="b" cx="30" cy="30" r="20"/><path class="accfl" d="M20 19L41 30L20 41Z"/><path class="bar" d="M44 17V43"/></g></svg>`,
  injection: () => `<svg viewBox="0 0 20 20"><circle class="b" cx="10" cy="10" r="7.5"/><path class="accfl" d="M6 7h8l-4 7z"/></svg>`,
  junction: () => `<svg viewBox="0 0 12 12"><circle class="jn" cx="6" cy="6" r="4.5"/></svg>`,
  robot: () => `<svg viewBox="0 0 60 44">
    <path class="t" d="M50 10C56 2 60 4 60 0"/>
    <rect class="b" x="4" y="6" width="50" height="26" rx="10"/><rect class="scr" x="12" y="12" width="22" height="6" rx="3"/><circle class="led" cx="44" cy="15" r="3"/>
    <g class="spin"><circle class="b" cx="16" cy="35" r="7"/><path class="t" d="M16 29v12M10 35h12"/></g>
    <g class="spin"><circle class="b" cx="42" cy="35" r="7"/><path class="t" d="M42 29v12M36 35h12"/></g></svg>`,
  light: () => `<svg viewBox="0 0 30 30">
    <path class="rays" d="M15 .5v3M15 26.5v3M.5 15h3M26.5 15h3M4.7 4.7l2.1 2.1M23.2 23.2l2.1 2.1M4.7 25.3l2.1-2.1M23.2 6.8l2.1-2.1"/>
    <circle class="b" cx="15" cy="15" r="10"/><circle class="lens" cx="15" cy="15" r="7.2"/>
    <path class="bulb" d="M15 9.6a3.5 3.5 0 0 0-2 6.4v1.5h4V16a3.5 3.5 0 0 0-2-6.4zM13.3 19.2h3.4"/></svg>`,
  float: (c) => `<svg viewBox="0 0 30 60"><rect class="glass" x="8" y="3" width="14" height="54" rx="6"/><rect class="flfill" x="9" y="${c.on ? 20 : 40}" width="12" height="${c.on ? 36 : 16}" rx="5"/><rect class="acc" x="9" y="${c.on ? 10 : 30}" width="12" height="11" rx="5"/></svg>`,
};

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const CARD_CSS = `
:host{display:block;--phc-stroke:var(--primary-text-color,#212121);--phc-body:var(--card-background-color,var(--ha-card-background,#fff));}
ha-card{display:block;overflow:hidden;height:100%;box-sizing:border-box;container-type:inline-size}
@container (max-width: 560px){.tools button span{display:none}.tools button{padding:2px 5px}}
.hdr{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 16px 0;min-height:8px}
.title{font-size:var(--ha-card-header-font-size,24px);color:var(--ha-card-header-color,var(--primary-text-color));line-height:1.2;font-weight:var(--ha-font-weight-normal,400)}
.tools{display:flex;gap:4px;margin-left:auto}
.tools button{background:none;border:1px solid var(--divider-color,#ccc);border-radius:14px;color:var(--secondary-text-color);padding:2px 8px;cursor:pointer;display:flex;align-items:center;gap:3px;font:inherit;font-size:11px;line-height:18px}
.tools button.on{color:var(--primary-color);border-color:var(--primary-color)}
.tools ha-icon{--mdc-icon-size:14px}
.tools{flex-wrap:wrap;justify-content:flex-end}
.tools .bps{display:flex;gap:4px;flex-wrap:wrap;margin-right:6px}
.tools button.bp.act{color:var(--warning-color,#ffa600);border-color:var(--warning-color,#ffa600)}
.item.bpv{cursor:pointer}
.item.bpv:hover svg{filter:drop-shadow(0 0 4px var(--primary-color))}
.wrap{position:relative;overflow:hidden;margin:6px 12px 12px}
.stage{position:absolute;left:0;top:0;transform-origin:0 0;font-family:var(--phc-font,inherit);user-select:none;-webkit-user-select:none}
.stage.editing{touch-action:none}
.stage.grid{background-image:linear-gradient(to right,rgba(127,127,127,.13) 1px,transparent 1px),linear-gradient(to bottom,rgba(127,127,127,.13) 1px,transparent 1px);background-size:10px 10px;outline:1px dashed rgba(127,127,127,.4)}
svg.layer{position:absolute;left:0;top:0;overflow:visible}
.items,.metas{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none}
.errors{color:var(--error-color);font-size:12px;padding:0 16px 10px;white-space:pre-line}
/* tuyaux */
.pipe .wall{fill:none;stroke:var(--phc-pipe-wall,rgba(127,127,127,.42));stroke-linecap:round;stroke-linejoin:round}
.pipe .water{fill:none;stroke:var(--fc);stroke-linecap:round;stroke-linejoin:round;opacity:.32;transition:opacity .5s,stroke .5s}
.pipe.flow .water{opacity:.92}
.pipe .dots{fill:none;stroke:rgba(255,255,255,.9);stroke-linecap:round;stroke-dasharray:.01 20;display:none;animation:phcflow var(--dur,.5s) linear infinite}
.pipe .dots.dashes{stroke-dasharray:8 12;stroke-linecap:butt;stroke:rgba(255,255,255,.55)}
.pipe.flow .dots{display:inline}
.pipe.flow .dots.none{display:none}
.pipe.rev .dots{animation-direction:reverse}
.pipe.thin .water{stroke-dasharray:5 4;opacity:.55}
.pipe.thin.flow .water{opacity:.9}
.pipe.thin .dots{stroke:var(--fc)}
.pipe .hit{fill:none;stroke:transparent;stroke-width:14;pointer-events:stroke;cursor:pointer}
.pipe.sel .water{stroke-dasharray:none;opacity:1;filter:drop-shadow(0 0 3px var(--primary-color))}
@keyframes phcflow{to{stroke-dashoffset:-20}}
/* équipements */
.item{position:absolute;box-sizing:border-box;pointer-events:auto;cursor:pointer;--a:var(--primary-color);--fl:#29b6f6}
.item svg{width:100%;height:100%;display:block;overflow:visible}
.item .b{fill:var(--phc-body);stroke:var(--phc-stroke);stroke-width:2;stroke-opacity:.7}
.item .base{fill:var(--phc-stroke);opacity:.22}
.item .t{fill:none;stroke:var(--phc-stroke);stroke-width:1.5;opacity:.45}
.item .acc{fill:var(--a)} .item .accfl{fill:var(--fl)}
.item .acc-s{fill:none;stroke:var(--a);stroke-width:2.5}
.item .blade{fill:none;stroke:var(--a);stroke-width:4;stroke-linecap:round}
.item .hub{fill:var(--phc-stroke);opacity:.8}
.item .led{fill:var(--a)}
.item .ghost{fill:transparent;stroke:none}
.item .glass{fill:var(--fl);fill-opacity:.14;stroke:var(--phc-stroke);stroke-width:2;stroke-opacity:.7}
.item .flfill{fill:var(--fl);opacity:.15;transition:opacity .5s}
.item.on .flfill,.item.noent .flfill{opacity:.55}
.item .sol{opacity:0}.item.on .sol{opacity:.3}
.item .sand{fill:#d7b98e;opacity:.75}
.item .scr{fill:var(--a);opacity:.85}
.item .scr2{fill:var(--phc-stroke);opacity:.1}
.item .sig{fill:none;stroke:var(--a);stroke-width:2;stroke-linejoin:round}
.item .plate{stroke:var(--a);stroke-width:3;stroke-linecap:round}
.item .coil{fill:none;stroke:var(--a);stroke-width:3;stroke-linejoin:round;stroke-linecap:round}
.item .uvl{fill:var(--a);opacity:.85}
.item .lens{fill:var(--a);opacity:.22;transition:opacity .4s}
.item.on .lens{opacity:.95}
.item .bulb{fill:none;stroke:var(--phc-stroke);stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;opacity:.75}
.item.on .bulb{stroke:#6d4c00;opacity:1}
.item .rays{fill:none;stroke:var(--a);stroke-width:1.8;stroke-linecap:round;opacity:0;transition:opacity .4s}
.item.on .rays{opacity:1}
.item .lit{animation:phclit 4s ease-in-out infinite}
@keyframes phclit{50%{opacity:.6}}
.item .tankfl{fill:var(--fl);opacity:.8}
.item .gz{fill:none;stroke-width:4}
.item .needle{stroke:var(--error-color,#db4437);stroke-width:2.2;stroke-linecap:round}
.item .gtxt{font-size:9px;fill:var(--primary-text-color);font-weight:600}
.item .gunit{font-size:6px;fill:var(--secondary-text-color)}
.item .vb{stroke:var(--phc-stroke);stroke-width:2;stroke-opacity:.7;stroke-linejoin:round}
.item .vb.open{fill:var(--fl)}
.item .vb.closed{fill:var(--disabled-text-color,#9e9e9e);fill-opacity:.35}
.item .vb.unk{fill-opacity:.15;stroke-dasharray:3 2}
.item .handle path{fill:none;stroke:var(--phc-stroke);stroke-width:3.5;stroke-linecap:round}
.item .handle.shut path{stroke:var(--error-color,#db4437)}
.item .arrow{fill:none;stroke:var(--phc-stroke);stroke-width:3;stroke-linecap:round}
.item .bar{stroke:var(--phc-stroke);stroke-width:3;stroke-linecap:round}
.item .jn{fill:var(--fl);stroke:var(--phc-pipe-wall,rgba(127,127,127,.6));stroke-width:2}
.item .coping{fill:var(--phc-body);stroke:var(--phc-stroke);stroke-width:2;stroke-opacity:.5}
.item .wv{fill:none;stroke:rgba(255,255,255,.65);stroke-width:1.5}
.item .cover{fill:var(--phc-stroke);opacity:.35}
.item .bub{fill:#fff;opacity:0}
.spin{transform-box:fill-box;transform-origin:center}
.item.on .spin{animation:phcspin var(--dur,1s) linear infinite}
.item.on .bub{animation:phcbub 1.8s ease-in infinite}
.item.on .wave{animation:phcwave 6s linear infinite}
.item.on .pulse{animation:phcpulse 1.4s ease-in-out infinite}
.item.on .blink{animation:phcblink 1.2s steps(2) infinite}
.item.t-light.on svg,.item.t-uv.on svg{filter:drop-shadow(0 0 7px var(--a))}
.item.unav{opacity:.45}
.item.down svg{filter:grayscale(1)}
.item.down{outline:2px dashed var(--error-color,#db4437);outline-offset:3px;border-radius:6px}
.item.alarm{animation:phcalarm 1s ease-in-out infinite;border-radius:6px}
.item.t-zone{pointer-events:none;cursor:default;border:1.5px dashed var(--divider-color,rgba(127,127,127,.5));border-radius:12px;background:rgba(127,127,127,.04)}
.item.t-zone .zcap{position:absolute;left:10px;top:6px;font-size:12px;font-weight:500;color:var(--secondary-text-color);pointer-events:auto;cursor:pointer;text-transform:uppercase;letter-spacing:.05em}
.item.t-label{display:flex;align-items:center;color:var(--primary-text-color);white-space:nowrap}
.item.t-badge .bl{display:flex;gap:4px;flex-wrap:wrap}
.item.t-badge .bl.col{flex-direction:column;align-items:flex-start}
.item.t-device .dev{width:100%;height:100%;box-sizing:border-box;border:2px solid rgba(127,127,127,.5);border-radius:10px;background:var(--phc-body);display:flex;align-items:center;justify-content:center;overflow:hidden}
.item.t-device .dev ha-icon{--mdc-icon-size:min(60%,40px);color:var(--a)}
.item.t-device .dev img{max-width:100%;max-height:100%;object-fit:contain}
@keyframes phcspin{to{transform:rotate(360deg)}}
@keyframes phcbub{0%{opacity:0;transform:translateY(0)}20%{opacity:.9}100%{opacity:0;transform:translateY(-22px)}}
@keyframes phcwave{to{transform:translateX(-50px)}}
@keyframes phcpulse{50%{opacity:.35}}
@keyframes phcblink{50%{opacity:.2}}
@keyframes phcalarm{0%,100%{box-shadow:0 0 0 0 transparent}50%{box-shadow:0 0 0 3px var(--error-color,#db4437),0 0 14px var(--error-color,#db4437)}}
/* libellés & badges */
.meta{position:absolute;display:flex;flex-direction:column;gap:3px;pointer-events:none;font-size:12px;color:var(--primary-text-color)}
.meta.m-bottom{transform:translateX(-50%);align-items:center;text-align:center}
.meta.m-top{transform:translate(-50%,-100%);align-items:center;text-align:center;flex-direction:column}
.meta.m-left{transform:translate(-100%,-50%);align-items:flex-end;text-align:right}
.meta.m-right{transform:translateY(-50%);align-items:flex-start}
.meta.m-inside{justify-content:center;align-items:center;text-align:center}
.meta.m-free{align-items:flex-start}
.meta .cap{font-weight:500;line-height:14px;white-space:nowrap;text-shadow:0 0 3px var(--phc-body),0 0 3px var(--phc-body)}
.meta .pcap{position:absolute;left:16px;bottom:12px;font-weight:500;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.55)}
.meta .tmp{font-size:28px;font-weight:600;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.55);line-height:1.1}
.meta .bl{display:flex;flex-wrap:wrap;gap:3px;justify-content:inherit}
.meta.m-bottom .bl,.meta.m-top .bl,.meta.m-inside .bl{justify-content:center}
.meta.m-left .bl,.meta.m-right .bl{flex-direction:column;align-items:inherit}
.bdg{display:inline-flex;align-items:center;gap:3px;padding:1px 6px;border-radius:10px;background:var(--secondary-background-color,rgba(127,127,127,.15));border:1px solid var(--bc,transparent);font-size:11px;line-height:16px;color:var(--primary-text-color);white-space:nowrap;pointer-events:auto;cursor:pointer}
.bdg .bn{color:var(--secondary-text-color)}
.bdg .bv{font-weight:600;color:var(--bc,var(--primary-text-color))}
.bdg ha-icon{--mdc-icon-size:13px;color:var(--secondary-text-color)}
.bdg.unav .bv{color:var(--disabled-text-color,#9e9e9e);font-weight:400}
.hide-values .bdg{display:none}
.paused *,.noanim *{animation-play-state:paused!important}
@media (prefers-reduced-motion: reduce){.stage *{animation:none!important}}
/* mode édition */
.editing .item{cursor:move}
.editing .meta,.editing .bdg{pointer-events:none}
.editing .item.t-zone .zcap{cursor:move}
.editing .item.sel:not(.t-zone){filter:drop-shadow(0 0 4px var(--primary-color))}
svg.ovl{pointer-events:none}
svg.ovl .selr{fill:none;stroke:var(--primary-color);stroke-width:1.5;stroke-dasharray:4 3}
svg.ovl .hdl{fill:var(--primary-color);stroke:#fff;stroke-width:1.5;pointer-events:all;cursor:pointer}
svg.ovl .hdl.rz{cursor:nwse-resize}
svg.ovl .hdl.auto{fill:var(--phc-body);stroke:var(--primary-color)}
svg.ovl .hdl.end{fill:var(--accent-color,#ff9800)}
.coords{position:absolute;right:4px;bottom:2px;font-size:10px;color:var(--secondary-text-color);background:var(--phc-body);padding:0 4px;border-radius:4px;pointer-events:none;opacity:.85}
`;

/* ------------------------------------------------------------------ */
/* Carte                                                               */
/* ------------------------------------------------------------------ */

class PoolHydraulicCard extends HTMLElement {
  static getConfigElement() { return document.createElement(EDITOR_TAG); }
  static getStubConfig() {
    // noms de l'exemple dans la langue de l'interface
    const stub = clone(STUB_CONFIG);
    stub.title = T("type.pool");
    for (const it of stub.items) if (it.name) it.name = it.type === "zone" ? T("stub.zone") : T(`type.${it.type}`);
    return stub;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._nodes = new Map();
    this._editing = false;
    this._sel = null;
    this._drag = null;
    this._scale = 1;
  }

  setConfig(config) {
    if (!config || !Array.isArray(config.items)) throw new Error(T("err.items"));
    const seen = new Set();
    config.items.forEach((it, i) => {
      if (!it || typeof it !== "object") throw new Error(T("err.item", { i }));
      if (!it.type || !TYPES[it.type]) throw new Error(T("err.type", { i, t: it.type, list: Object.keys(TYPES).join(", ") }));
      if (!it.id) throw new Error(T("err.id", { i }));
      if (seen.has(String(it.id))) throw new Error(T("err.dup", { i, id: it.id }));
      seen.add(String(it.id));
    });
    if (config.pipes != null && !Array.isArray(config.pipes)) throw new Error(T("err.pipes"));
    if (config.bypasses != null && !Array.isArray(config.bypasses)) throw new Error(T("err.bypasses"));
    (config.bypasses || []).forEach((b, i) => { if (!b || !b.id) throw new Error(T("err.bp_id", { i })); });
    this._config = clone(config);
    this._bpByValve = new Map();
    (this._config.bypasses || []).forEach((bp) => {
      [].concat(bp.line || []).forEach((v) => this._bpByValve.set(String(v), { bp, role: "line" }));
      [].concat(bp.bypass || []).forEach((v) => this._bpByValve.set(String(v), { bp, role: "bypass" }));
    });
    this._entities = null;
    this._ui = this._loadUi();
    this._built = false;
    this._nodes = new Map();
    this._render();
  }

  set hass(h) {
    const old = this._hass;
    this._hass = h;
    const langChanged = setLang(h);
    if (!this._config) return;
    if (!this._entities) this._entities = this._collectEntities();
    this._initStore();
    if (!old || langChanged || this._entities.some((e) => old.states[e] !== h.states[e]) || old.themes !== h.themes) this._render();
  }
  get hass() { return this._hass; }

  getCardSize() { return Math.max(3, Math.round((Number(this._config?.height) || 500) / 60)); }
  getGridOptions() { return { columns: 12, min_columns: 6, rows: "auto" }; }
  getLayoutOptions() { return { grid_columns: 4, grid_min_columns: 2 }; }

  connectedCallback() {
    if (window.ResizeObserver && !this._ro) {
      this._ro = new ResizeObserver(() => this._applyScale());
    }
    if (window.IntersectionObserver && !this._io) {
      this._io = new IntersectionObserver((ent) => {
        const vis = ent.some((e) => e.isIntersecting);
        this._root?.classList.toggle("paused", !vis);
      });
    }
    if (this._built) this._observe();
    if (this._hass && this._config) this._initStore();
  }
  disconnectedCallback() { this._ro?.disconnect(); this._io?.disconnect(); this._unsubStore(); }
  _observe() {
    if (this._wrap) { this._ro?.observe(this._wrap); this._io?.observe(this); }
  }

  /* ---------- préférences d'affichage (boutons) ---------- */
  _uiKey() { return `${CARD_TAG}:${this._config?.title || "default"}`; }
  _loadUi() {
    const c = this._config || {};
    const d = { anim: c.animations !== false, values: c.show_values !== false, grid: !!c.debug };
    try { const s = JSON.parse(localStorage.getItem(this._uiKey()) || "null"); if (s && c.show_toggles !== false) Object.assign(d, s); } catch (e) { /* stockage indisponible */ }
    return d;
  }
  _saveUi() { try { localStorage.setItem(this._uiKey(), JSON.stringify(this._ui)); } catch (e) { /* ignoré */ } }

  _collectEntities() {
    const out = new Set();
    const walk = (v) => {
      if (typeof v === "string") { if (ENTITY_RE.test(v)) out.add(v); }
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    walk(this._config.items); walk(this._config.pipes); walk(this._config.bypasses);
    return [...out];
  }

  /* ---------- by-pass : position mémorisée ---------- */
  _storeKey() {
    const base = String(this._config.storage_key || this._config.title || "default").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_");
    return `pool_hydraulic_card_${base}`;
  }
  _storeMode() { return ["system", "user", "local"].includes(this._config.bypass_storage) ? this._config.bypass_storage : "system"; }
  _initStore() {
    const c = this._config;
    if (!c?.bypasses?.length || !this._hass) return;
    const key = this._storeKey(), mode = this._storeMode(), sig = `${key}|${mode}`;
    if (this._storeSig === sig) return;
    this._unsubStore();
    this._storeSig = sig;
    try { const s = JSON.parse(localStorage.getItem(key) || "null"); if (s && typeof s === "object") this._bpStore = s; } catch (e) { /* */ }
    if (mode === "local" || !this._hass.connection) return;
    const apply = (v) => {
      if (this._storeSig !== sig || !v || typeof v !== "object") return;
      this._bpStore = v;
      try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) { /* */ }
      this._render();
    };
    const sub = mode === "user" ? "frontend/subscribe_user_data" : "frontend/subscribe_system_data";
    const get = mode === "user" ? "frontend/get_user_data" : "frontend/get_system_data";
    this._storeSub = this._hass.connection.subscribeMessage((m) => apply(m?.value), { type: sub, key }).catch(() =>
      this._hass.callWS({ type: get, key }).then((r) => apply(r?.value)).catch(() => {}).then(() => null)
    );
  }
  _unsubStore() {
    const s = this._storeSub;
    this._storeSub = null;
    this._storeSig = null;
    if (s) Promise.resolve(s).then((f) => typeof f === "function" && f()).catch(() => {});
  }
  _bpActive(bp) {
    if (!bp) return false;
    if (bp.entity) return evalOn(this._st(bp.entity), {}) === true;
    const v = this._bpStore?.[bp.id];
    return v === undefined ? !!bp.default : !!v;
  }
  async _toggleBypass(id) {
    const bp = (this._config.bypasses || []).find((b) => String(b.id) === String(id));
    if (!bp) return;
    if (bp.entity) { this._hass.callService("homeassistant", "toggle", { entity_id: bp.entity }); return; }
    this._bpStore = { ...(this._bpStore || {}), [bp.id]: !this._bpActive(bp) };
    this._render();
    const key = this._storeKey(), mode = this._storeMode(), val = this._bpStore;
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* */ }
    if (mode === "local" || !this._hass?.callWS) return;
    if (mode === "system" && this._hass.user && !this._hass.user.is_admin) {
      console.warn("pool-hydraulic-card: bypass position stored in this browser only (shared storage needs an administrator account).");
      return;
    }
    try { await this._hass.callWS({ type: mode === "user" ? "frontend/set_user_data" : "frontend/set_system_data", key, value: val }); }
    catch (e) { console.warn("pool-hydraulic-card : enregistrement du by-pass impossible", e); }
  }

  _st(id) { return id && this._hass ? this._hass.states[id] : undefined; }
  _numOrEntity(v) {
    if (v == null || v === "") return null;
    if (typeof v === "string" && ENTITY_RE.test(v)) return num(this._st(v)?.state);
    return num(v);
  }
  _fluids() {
    const own = {};
    const cfg = this._config.fluids;
    if (cfg && typeof cfg === "object") for (const [k, v] of Object.entries(cfg)) { const c = cssColor(v); if (c) own[k] = c; }
    return { ...FLUIDS_DEFAULT, ...own };
  }
  _fluidColor(name) { const f = this._fluids(); return f[name] || col(name) || f.eau; }
  _grid() { return Number(this._config.grid_size) || 5; }

  _geo(it) {
    const d = TYPES[it.type]?.size || [40, 40];
    const at = Array.isArray(it.at) ? it.at : [0, 0];
    const sz = Array.isArray(it.size) ? it.size : d;
    return { x: Number(at[0]) || 0, y: Number(at[1]) || 0, w: Number(sz[0]) || d[0], h: Number(sz[1]) || d[1] };
  }

  _valveState(it) {
    const v3 = it.type === "valve3";
    if (it.entity) {
      const st = this._st(it.entity);
      const on = evalOn(st, it);
      if (on === null) return v3 ? it.default_state || "a" : "unknown";
      return v3 ? (on ? "b" : "a") : on ? "open" : "closed";
    }
    const g = this._bpByValve?.get(String(it.id));
    if (g) {
      const act = this._bpActive(g.bp);
      if (v3) return act ? "b" : "a";
      return (g.role === "bypass") === act ? "open" : "closed";
    }
    return it.default_state || (v3 ? "a" : "open");
  }

  /* ---------- état d'un équipement ---------- */
  _itemState(it) {
    const st = it.entity ? this._st(it.entity) : null;
    let on = it.entity ? evalOn(st, it) : undefined;
    const unav = !!it.entity && on === null;
    let alarm = false, down = false;
    if (it.alarm_entity) {
      const a = this._st(it.alarm_entity);
      const want = String(it.alarm_state ?? "on").toLowerCase();
      alarm = !!a && String(a.state).toLowerCase() === want;
    }
    if (it.status_entity) down = evalOn(this._st(it.status_entity), {}) !== true;
    const fluid = this._fluidColor(it.fluid || DEFAULT_FLUID[it.type] || "eau");
    let accent;
    if (col(it.accent_color)) accent = col(it.accent_color);
    else if (DEFAULT_FLUID[it.type]) accent = fluid;
    else {
      const da = DEFAULT_ACCENT[it.type];
      accent = da ? (da.startsWith("@") ? this._fluidColor(da.slice(1)) : da) : "var(--primary-color)";
    }
    if (it.type === "light" && on && rgbOf(st?.attributes?.rgb_color)) accent = rgbOf(st.attributes.rgb_color);
    if (["valve", "valve3", "check_valve", "junction", "injection", "pool", "spa", "tank", "zone", "label", "badge"].includes(it.type)) {
      // ces éléments n'ont pas d'état « marche » visuel propre
    } else if (on === false) accent = "var(--disabled-text-color, #9e9e9e)";
    let dur = BASE_DUR[it.type] || 1;
    if (it.speed_entity) {
      const v = num(this._st(it.speed_entity)?.state);
      const mn = num(it.speed_min) ?? 0, mx = num(it.speed_max) ?? 100;
      if (v != null && mx > mn) dur = dur / (0.3 + 1.7 * clamp((v - mn) / (mx - mn), 0, 1));
    }
    const cls = [on === true ? "on" : "", on === false ? "off" : "", on === undefined ? "noent" : "", unav ? "unav" : "", alarm ? "alarm" : "", down ? "down" : ""];
    return { on, unav, alarm, down, cls: cls.filter(Boolean).join(" "), accent, fluid, dur, st };
  }

  /* ---------- géométrie des tuyaux ---------- */
  _pipeGeom(p) {
    const si = p.start != null && p.start !== "" ? this._byId.get(String(p.start)) : null;
    const ei = p.end != null && p.end !== "" ? this._byId.get(String(p.end)) : null;
    const pts = Array.isArray(p.points) ? p.points.filter((a) => Array.isArray(a) && a.length >= 2).map((a) => [Number(a[0]), Number(a[1])]) : [];
    const se = p.start_edge || "right", ee = p.end_edge || "left";
    const sp = si ? anchor(this._geo(si), se, p.start_point) : pts[0];
    const ep = ei ? anchor(this._geo(ei), ee, p.end_point) : pts[pts.length - 1];
    if (!sp || !ep) return null;
    let mid = pts.slice(si ? 0 : 1, ei ? pts.length : pts.length - 1);
    let auto = false;
    if (!pts.length && si && ei) { mid = autoRoute(sp, se, ep, ee); auto = true; }
    return { sp, ep, mid, auto, all: [sp, ...mid, ep], si, ei };
  }

  _pipeFlow(p) {
    const fe = p.flow_entity;
    const list = fe ? (Array.isArray(fe) ? fe : [fe]) : [];
    let ok = list.length ? list.every((e) => evalOn(this._st(e), { on_above: p.flow_on_above, on_state: p.flow_state }) === true) : !!p.always_flow;
    if (ok && p.valves) {
      for (const v of [].concat(p.valves)) {
        const [vid, port] = String(v).split(":");
        const vi = this._byId.get(vid);
        if (!vi) continue;
        const s = this._valveState(vi);
        if (port ? s !== port : s === "closed") { ok = false; break; }
      }
    }
    return ok;
  }

  _pipeHtml(p, i) {
    const g = this._pipeGeom(p);
    if (!g) { this._errors.push(T("err.pipe_ends", { i, s: p.start ?? "", e: p.end ?? "" })); return ""; }
    if (p.start && !g.si) this._errors.push(T("err.pipe_unknown", { i, id: p.start }));
    if (p.end && !g.ei) this._errors.push(T("err.pipe_unknown", { i, id: p.end }));
    const d = roundedPath(g.all, Number(this._config.line_radius ?? 8));
    const fluidName = p.fluid || "eau";
    const thin = THIN_FLUIDS.has(fluidName);
    let color = this._fluidColor(fluidName);
    if (p.hot_entity && evalOn(this._st(p.hot_entity), {}) === true) color = this._fluidColor(p.hot_fluid || "chaude");
    if (col(p.color)) color = col(p.color);
    const flow = this._pipeFlow(p);
    const w = Number(p.width ?? (thin ? 2 : this._config.pipe_width ?? 8));
    let speed = Number(p.speed ?? this._config.flow_speed ?? 40);
    if (p.speed_entity) {
      const v = num(this._st(p.speed_entity)?.state);
      const mn = num(p.speed_min) ?? 0, mx = num(p.speed_max) ?? 100;
      if (v != null && mx > mn) speed = speed * (0.3 + 1.7 * clamp((v - mn) / (mx - mn), 0, 1));
    }
    const dur = r2(20 / Math.max(1, speed));
    const style = p.style || "dots";
    const sel = this._editing && this._sel?.kind === "pipe" && this._sel.idx === i;
    return `<g class="pipe${flow ? " flow" : ""}${p.reverse ? " rev" : ""}${thin ? " thin" : ""}${sel ? " sel" : ""}" data-pipe="${i}" style="--fc:${esc(color)};--dur:${dur}s">
      ${thin ? "" : `<path class="wall" d="${d}" stroke-width="${w + 4}"/>`}
      <path class="water" d="${d}" stroke-width="${w}"/>
      <path class="dots ${esc(style)}" d="${d}" stroke-width="${thin ? w + 2 : Math.max(2, w * 0.5)}"/>
      <path class="hit" d="${d}"/></g>`;
  }

  /* ---------- rendu des équipements ---------- */
  _itemHtml(it, i) {
    const g = this._geo(it);
    const s = this._itemState(it);
    const sel = this._editing && this._sel?.kind === "item" && this._sel.idx === i;
    const base = `left:${g.x}px;top:${g.y}px;width:${g.w}px;height:${g.h}px;--a:${esc(s.accent)};--fl:${esc(s.fluid)};--dur:${r2(s.dur)}s`;
    const cls = `item t-${it.type} ${s.cls}${sel ? " sel" : ""}`;
    const da = `data-item="${i}"`;
    if (it.type === "zone") {
      return `<div class="${cls}" ${da} style="${base}${it.color ? `;border-color:${esc(col(it.color))}` : ""}"><div class="zcap" ${da}>${esc(it.name ?? "")}</div></div>`;
    }
    if (it.type === "label") {
      return `<div class="${cls}" ${da} style="${base};font-size:${Number(it.font_size) || 14}px;justify-content:${{ center: "center", right: "flex-end" }[it.align] || "flex-start"};${it.color ? `color:${esc(col(it.color))};` : ""}font-weight:${it.bold ? 600 : 400}">${esc(it.name ?? "")}</div>`;
    }
    if (it.type === "badge") {
      const bl = (it.badges || []).map((b) => this._badgeHtml(b)).join("");
      return `<div class="${cls}" ${da} style="${base}"><div class="bl ${it.direction === "column" ? "col" : ""}">${bl}</div></div>`;
    }
    if (it.type === "device") {
      const inner = it.image ? `<img src="${esc(it.image)}" alt="">` : `<ha-icon icon="${esc(it.icon || "mdi:puzzle")}"></ha-icon>`;
      return `<div class="${cls}" ${da} style="${base}"><div class="dev">${inner}</div></div>`;
    }
    const ctx = { uid: uidOf(it.id), on: s.on === true, vert: it.orientation === "vertical", rot: Number(it.rotation) || 0 };
    if (it.type === "valve" || it.type === "valve3") ctx.vstate = this._valveState(it);
    if (it.type === "tank" && it.level_entity) {
      const lv = num(this._st(it.level_entity)?.state);
      ctx.level = lv == null ? null : clamp(lv / 100, 0, 1);
    } else if (it.type === "tank") ctx.level = 1;
    if ((it.type === "pool" || it.type === "spa") && it.cover_entity) {
      const c = this._st(it.cover_entity);
      if (c) {
        const pos = num(c.attributes?.current_position);
        ctx.cover = pos != null ? clamp(1 - pos / 100, 0, 1) : c.state === "closed" ? 1 : 0;
      }
    }
    if ((it.type === "pool" || it.type === "spa") && it.light_entity) {
      const l = this._st(it.light_entity);
      if (evalOn(l, {}) === true) ctx.lightColor = rgbOf(l.attributes?.rgb_color) || col(it.light_color) || "#00e5ff";
    }
    if (it.type === "gauge") {
      const mn = this._numOrEntity(it.min) ?? 0, mx = this._numOrEntity(it.max) ?? 3;
      const v = it.entity ? num(this._st(it.entity)?.state) : null;
      const n = (x) => (x == null || mx <= mn ? null : clamp((x - mn) / (mx - mn), 0, 1));
      ctx.gauge = { norm: n(v) ?? 0, warn: n(this._numOrEntity(it.warn_above)), alarm: n(this._numOrEntity(it.alarm_above)) };
      if (v != null) {
        const dec = it.decimals != null ? Number(it.decimals) : 2;
        const lang = this._hass?.locale?.language || this._hass?.language || "fr";
        ctx.valueText = v.toLocaleString(lang, { minimumFractionDigits: dec, maximumFractionDigits: dec });
        ctx.unitText = it.unit ?? this._st(it.entity)?.attributes?.unit_of_measurement ?? "";
        const al = this._numOrEntity(it.alarm_above);
        if (al != null && v > al && !s.cls.includes("alarm")) s.cls += " alarm";
      }
    }
    const fn = PICTO[it.type];
    const svg = fn ? fn(ctx) : "";
    const grp = (it.type === "valve" || it.type === "valve3") && !it.entity ? this._bpByValve?.get(String(it.id)) : null;
    const tip = grp ? ` title="${esc(grp.bp.name || grp.bp.id)} : ${this._bpActive(grp.bp) ? T("ui.on") : T("ui.off")} — ${T("ui.click_toggle")}"` : "";
    return `<div class="item t-${it.type} ${s.cls}${grp ? " bpv" : ""}${sel ? " sel" : ""}" ${da} style="${base}"${tip}>${svg}</div>`;
  }

  _fmt(entity, attribute, unit, decimals) {
    const h = this._hass, st = this._st(entity);
    if (!st) return { txt: "—", n: null, unav: true };
    if (!attribute && (st.state === "unavailable" || st.state === "unknown")) return { txt: st.state === "unknown" ? "?" : T("ui.unavailable"), n: null, unav: true };
    const raw = attribute ? st.attributes?.[attribute] : st.state;
    if (raw == null) return { txt: "—", n: null, unav: true };
    const n = isNumStr(String(raw)) ? parseFloat(raw) : null;
    const lang = h?.locale?.language || h?.language || "fr";
    const u = unit ?? (attribute ? "" : st.attributes?.unit_of_measurement || "");
    let txt;
    if (n != null && (decimals != null && decimals !== "")) {
      const d = Number(decimals);
      txt = n.toLocaleString(lang, { minimumFractionDigits: d, maximumFractionDigits: d }) + (u ? ` ${u}` : "");
    } else if (n != null && unit != null) {
      txt = n.toLocaleString(lang) + (u ? ` ${u}` : "");
    } else if (attribute) {
      txt = h?.formatEntityAttributeValue ? h.formatEntityAttributeValue(st, attribute) : String(raw);
    } else {
      txt = h?.formatEntityState ? h.formatEntityState(st) : `${raw}${u ? " " + u : ""}`;
    }
    return { txt, n, unav: false };
  }

  _badgeHtml(b) {
    if (!b || !b.entity) return "";
    const f = this._fmt(b.entity, b.attribute, b.unit, b.decimals);
    let c = thresholdColor(f.n, b.thresholds);
    if (!c && b.color) c = col(b.color);
    return `<div class="bdg${f.unav ? " unav" : ""}" data-entity="${esc(b.entity)}"${c ? ` style="--bc:${esc(c)}"` : ""}>${b.icon ? `<ha-icon icon="${esc(b.icon)}"></ha-icon>` : ""}${b.name ? `<span class="bn">${esc(b.name)}</span>` : ""}<span class="bv">${esc(f.txt)}</span></div>`;
  }

  _metaHtml(it, i) {
    if (NO_META.has(it.type)) return "";
    const g = this._geo(it);
    let pos = it.label_position || DEFAULT_LABEL_POS[it.type] || "bottom";
    const showName = pos !== "none" && it.show_name !== false && (it.name ?? "") !== "";
    if (pos === "none") pos = "bottom";
    const badges = this._ui.values ? (it.badges || []).filter((b) => b && b.entity) : [];
    const isBasin = it.type === "pool" || it.type === "spa";
    const temp = isBasin && it.temperature_entity ? this._fmt(it.temperature_entity, null, null, it.temperature_decimals ?? 1) : null;
    if (!showName && !badges.length && !temp) return "";
    const off = Array.isArray(it.badges_offset) ? it.badges_offset.map(Number) : [0, 0];
    const bl = badges.length ? `<div class="bl">${badges.map((b) => this._badgeHtml(b)).join("")}</div>` : "";
    if (pos === "inside") {
      const cap = showName ? (isBasin ? `<div class="pcap">${esc(it.name)}</div>` : `<div class="cap">${esc(it.name)}</div>`) : "";
      return `<div class="meta m-inside" data-meta="${i}" style="left:${g.x + off[0]}px;top:${g.y + off[1]}px;width:${g.w}px;height:${g.h}px">${cap}${temp ? `<div class="tmp">${esc(temp.txt)}</div>` : ""}${bl}</div>`;
    }
    let lx, ly;
    switch (pos) {
      case "top": lx = g.x + g.w / 2; ly = g.y - 4; break;
      case "left": lx = g.x - 6; ly = g.y + g.h / 2; break;
      case "right": lx = g.x + g.w + 6; ly = g.y + g.h / 2; break;
      default: lx = g.x + g.w / 2; ly = g.y + g.h + 3;
    }
    const maxw = pos === "top" || pos === "bottom" ? `max-width:${Math.max(g.w + 80, 170)}px;` : `max-width:220px;`;
    const cap = showName ? `<div class="cap">${esc(it.name)}</div>` : "";
    const body = pos === "top" ? `${cap}${bl}` : `${cap}${bl}`;
    return `<div class="meta m-${pos}" data-meta="${i}" style="left:${lx + off[0]}px;top:${ly + off[1]}px;${maxw}">${body}${temp ? `<div class="cap">${esc(temp.txt)}</div>` : ""}</div>`;
  }

  /* ---------- rendu principal ---------- */
  _build() {
    const c = this._config;
    this.shadowRoot.innerHTML = `<style>${CARD_CSS}</style>
      <ha-card>
        <div class="hdr">${c.title ? `<div class="title">${esc(c.title)}</div>` : ""}<div class="tools"></div></div>
        <div class="wrap"><div class="stage">
          <svg class="layer pipes" xmlns="http://www.w3.org/2000/svg"></svg>
          <div class="items"></div>
          <div class="metas"></div>
          <svg class="layer ovl" xmlns="http://www.w3.org/2000/svg"></svg>
        </div><div class="coords" hidden></div></div>
        <div class="errors" hidden></div>
      </ha-card>`;
    const R = this.shadowRoot;
    this._root = R.querySelector("ha-card");
    this._wrap = R.querySelector(".wrap");
    this._stage = R.querySelector(".stage");
    this._pipesEl = R.querySelector(".pipes");
    this._itemsEl = R.querySelector(".items");
    this._metasEl = R.querySelector(".metas");
    this._ovl = R.querySelector(".ovl");
    this._coords = R.querySelector(".coords");
    this._errEl = R.querySelector(".errors");
    this._toolsEl = R.querySelector(".tools");
    this._hdr = R.querySelector(".hdr");
    this._stage.addEventListener("pointerdown", (e) => this._onDown(e));
    this._stage.addEventListener("pointermove", (e) => this._onMove(e));
    this._stage.addEventListener("pointerup", (e) => this._onUp(e));
    this._stage.addEventListener("pointercancel", (e) => this._onUp(e));
    this._stage.addEventListener("dblclick", (e) => this._onDbl(e));
    this._stage.addEventListener("click", (e) => this._onClick(e));
    this._toolsEl.addEventListener("click", (e) => {
      const bpb = e.target.closest("button[data-bp]");
      if (bpb) { this._toggleBypass(bpb.dataset.bp); return; }
      const b = e.target.closest("button[data-t]");
      if (!b) return;
      const k = b.dataset.t;
      this._ui[k] = !this._ui[k];
      this._saveUi();
      this._render();
    });
    this._built = true;
    if (this.isConnected) this._observe();
  }

  _render() {
    if (!this._config) return;
    if (!this._built) this._build();
    const c = this._config;
    const W = Number(c.width) || 1000, H = Number(c.height) || 600;
    this._W = W; this._H = H;
    this._errors = [];
    this._byId = new Map(c.items.map((it) => [String(it.id), it]));

    if (c.font) this._stage.style.setProperty("--phc-font", c.font); else this._stage.style.removeProperty("--phc-font");
    this._stage.style.width = `${W}px`;
    this._stage.style.height = `${H}px`;
    this._pipesEl.setAttribute("width", W); this._pipesEl.setAttribute("height", H);
    this._ovl.setAttribute("width", W); this._ovl.setAttribute("height", H);
    this._stage.classList.toggle("grid", !!this._ui.grid || this._editing);
    this._stage.classList.toggle("editing", this._editing);
    this._stage.classList.toggle("noanim", !this._ui.anim);
    this._stage.classList.toggle("hide-values", !this._ui.values);

    // barre d'outils
    const showT = c.show_toggles !== false;
    const tools = showT ? [
      ["anim", this._ui.anim ? "mdi:pause-circle-outline" : "mdi:play-circle-outline", T("ui.animations")],
      ["values", "mdi:numeric", T("ui.values")],
      ["grid", "mdi:grid", T("ui.grid")],
    ].map(([k, ic, l]) => `<button data-t="${k}" class="${this._ui[k] ? "on" : ""}" title="${esc(l)}"><ha-icon icon="${ic}"></ha-icon><span>${esc(l)}</span></button>`).join("") : "";
    const bps = c.show_bypass_buttons !== false ? (c.bypasses || []).map((bp) => {
      const on = this._bpActive(bp);
      return `<button data-bp="${esc(bp.id)}" class="bp${on ? " on act" : ""}" title="${esc(bp.name || bp.id)} : ${on ? T("ui.on") : T("ui.off")}"><ha-icon icon="${on ? "mdi:source-branch-check" : "mdi:source-branch"}"></ha-icon><span>${esc(bp.name || bp.id)}</span></button>`;
    }).join("") : "";
    const allTools = (bps ? `<div class="bps">${bps}</div>` : "") + tools;
    if (this._toolsHtml !== allTools) { this._toolsEl.innerHTML = allTools; this._toolsHtml = allTools; }
    this._hdr.hidden = !c.title && !showT && !bps;

    this._patch(this._pipesEl, (c.pipes || []).map((p, i) => ({ key: `p${i}`, html: p ? this._pipeHtml(p, i) : "" })), true);
    this._patch(this._itemsEl, c.items.map((it, i) => ({ key: `i${it.id}`, html: this._itemHtml(it, i) })));
    this._patch(this._metasEl, c.items.map((it, i) => ({ key: `m${it.id}`, html: this._metaHtml(it, i) })));
    this._ovl.innerHTML = this._overlayHtml();
    this._coords.hidden = !(this._editing || this._ui.grid);

    const err = this._errors.join("\n");
    this._errEl.hidden = !err;
    this._errEl.textContent = err;
    this._applyScale();
  }

  _applyScale() {
    if (!this._wrap || !this._W) return;
    const cw = this._wrap.clientWidth;
    let s = this._config.scale && this._config.scale !== "auto" ? Number(this._config.scale) || 1 : cw ? cw / this._W : 1;
    if (this._config.max_scale) s = Math.min(s, Number(this._config.max_scale));
    if (this._maxH > 0) s = Math.min(s, this._maxH / this._H);
    this._scale = s;
    this._stage.style.transform = `scale(${s})`;
    this._wrap.style.height = `${Math.ceil(this._H * s)}px`;
  }

  _patch(container, entries, svg = false) {
    let map = this._nodes.get(container);
    if (!map) { map = new Map(); this._nodes.set(container, map); }
    const keep = new Set();
    let prev = null;
    const tpl = document.createElement("template");
    for (const { key, html } of entries) {
      keep.add(key);
      let rec = map.get(key);
      if (!rec || rec.html !== html) {
        let el;
        if (!html) el = svg ? document.createElementNS("http://www.w3.org/2000/svg", "g") : document.createElement("span");
        else if (svg) { tpl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${html}</svg>`; el = tpl.content.firstElementChild.firstElementChild; }
        else { tpl.innerHTML = html; el = tpl.content.firstElementChild; }
        if (rec) rec.el.replaceWith(el);
        rec = { el, html };
        map.set(key, rec);
      }
      const want = prev ? prev.nextSibling : container.firstChild;
      if (rec.el !== want) container.insertBefore(rec.el, want);
      prev = rec.el;
    }
    for (const [k, rec] of map) if (!keep.has(k)) { rec.el.remove(); map.delete(k); }
  }

  /* ---------- actions (tap) ---------- */
  _fire(type, detail) { this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true })); }

  _onClick(e) {
    if (this._editing) return;
    const bdg = e.target.closest(".bdg[data-entity]");
    if (bdg) { this._fire("hass-more-info", { entityId: bdg.dataset.entity }); return; }
    const itEl = e.target.closest("[data-item]");
    if (itEl) {
      const it = this._config.items[Number(itEl.dataset.item)];
      const grp = it && (it.type === "valve" || it.type === "valve3") && !it.entity && !it.tap_action ? this._bpByValve.get(String(it.id)) : null;
      if (grp) { this._toggleBypass(grp.bp.id); return; }
      if (it) this._doAction(it.tap_action, it.entity || it.level_entity || it.temperature_entity || it.badges?.[0]?.entity);
      return;
    }
    const pEl = e.target.closest("[data-pipe]");
    if (pEl) {
      const p = this._config.pipes[Number(pEl.dataset.pipe)];
      const fe = p && [].concat(p.flow_entity || [])[0];
      if (p) this._doAction(p.tap_action, fe);
    }
  }

  _doAction(action, defEntity) {
    const a = action || { action: "more-info" };
    const entity = a.entity || defEntity;
    switch (a.action) {
      case "none": return;
      case "toggle": if (entity) this._hass.callService("homeassistant", "toggle", { entity_id: entity }); return;
      case "navigate": if (a.navigation_path) { history.pushState(null, "", a.navigation_path); this._fire("location-changed", { replace: false }); window.dispatchEvent(new CustomEvent("location-changed")); } return;
      case "url": if (a.url_path) window.open(a.url_path, "_blank"); return;
      case "perform-action": case "call-service": {
        const svc = a.perform_action || a.service;
        if (!svc) return;
        const [d, s] = svc.split(".");
        this._hass.callService(d, s, { ...(a.data || a.service_data || {}) }, a.target);
        return;
      }
      case "fire-dom-event": this._fire("ll-custom", a); return;
      default: if (entity) this._fire("hass-more-info", { entityId: entity });
    }
  }

  /* ---------- mode édition (utilisé par l'éditeur visuel) ---------- */
  setEditing(on) { this._editing = !!on; this._render(); }
  setSelection(sel) { this._sel = sel; if (this._config) this._render(); }

  _overlayHtml() {
    if (!this._editing || !this._sel) return "";
    const s = this._sel;
    if (s.kind === "item") {
      const it = this._config.items[s.idx];
      if (!it) return "";
      const g = this._geo(it);
      return `<rect class="selr" x="${g.x - 3}" y="${g.y - 3}" width="${g.w + 6}" height="${g.h + 6}" rx="4"/>
        <rect class="hdl rz" data-handle="resize" x="${g.x + g.w - 4}" y="${g.y + g.h - 4}" width="10" height="10" rx="2"/>`;
    }
    if (s.kind === "pipe") {
      const p = this._config.pipes?.[s.idx];
      const g = p && this._pipeGeom(p);
      if (!g) return "";
      let h = "";
      const explicit = Array.isArray(p.points) ? p.points.filter((a) => Array.isArray(a)).map((a) => [Number(a[0]), Number(a[1])]) : [];
      if (g.auto) g.mid.forEach((pt, k) => { h += `<circle class="hdl auto" data-handle="pt" data-k="${k}" cx="${pt[0]}" cy="${pt[1]}" r="5"/>`; });
      else explicit.forEach((pt, k) => { h += `<circle class="hdl" data-handle="pt" data-k="${k}" cx="${pt[0]}" cy="${pt[1]}" r="5"/>`; });
      if (g.si) h += `<circle class="hdl end" data-handle="end" data-which="start" cx="${g.sp[0]}" cy="${g.sp[1]}" r="6"/>`;
      if (g.ei) h += `<circle class="hdl end" data-handle="end" data-which="end" cx="${g.ep[0]}" cy="${g.ep[1]}" r="6"/>`;
      return h;
    }
    return "";
  }

  _pt(e) {
    const r = this._stage.getBoundingClientRect();
    return [(e.clientX - r.left) / this._scale, (e.clientY - r.top) / this._scale];
  }
  _snap(v, free) { const g = free ? 1 : this._grid(); return Math.round(v / g) * g; }
  _emitChange() { this._fire("phc-change", { config: clone(this._config) }); }
  _select(sel) { this._sel = sel; this._fire("phc-select", sel ? { ...sel } : { kind: null }); this._render(); }

  _onDown(e) {
    if (!this._editing || e.button !== 0) return;
    const p = this._pt(e);
    const hd = e.target.closest("[data-handle]");
    const cfg = this._config;
    if (hd && this._sel) {
      const t = hd.dataset.handle;
      if (t === "resize") {
        const it = cfg.items[this._sel.idx]; const g = this._geo(it);
        this._drag = { mode: "resize", idx: this._sel.idx, start: p, orig: [g.w, g.h] };
      } else if (t === "pt") {
        const pipe = cfg.pipes[this._sel.idx];
        const g = this._pipeGeom(pipe);
        if (g.auto) pipe.points = g.mid.map((a) => [Math.round(a[0]), Math.round(a[1])]);
        const k = Number(hd.dataset.k);
        this._drag = { mode: "pt", idx: this._sel.idx, k, start: p, orig: [...pipe.points[k]] };
      } else if (t === "end") {
        this._drag = { mode: "end", idx: this._sel.idx, which: hd.dataset.which, start: p };
      }
    } else {
      const itEl = e.target.closest("[data-item]");
      const pEl = e.target.closest("[data-pipe]");
      if (itEl) {
        const idx = Number(itEl.dataset.item);
        if (e.shiftKey && this._sel?.kind === "item" && this._sel.idx !== idx) { this._connect(this._sel.idx, idx); return; }
        const g = this._geo(cfg.items[idx]);
        this._drag = { mode: "move", idx, start: p, orig: [g.x, g.y], w: g.w, h: g.h };
        if (!(this._sel?.kind === "item" && this._sel.idx === idx)) this._select({ kind: "item", idx });
      } else if (pEl) {
        this._select({ kind: "pipe", idx: Number(pEl.dataset.pipe) });
      } else {
        this._select(null);
      }
    }
    if (this._drag) { try { this._stage.setPointerCapture(e.pointerId); } catch (er) { /* */ } e.preventDefault(); }
  }

  _onMove(e) {
    if (!this._editing && !this._ui.grid) return;
    const p = this._pt(e);
    if (this._coords) this._coords.textContent = `x ${Math.round(p[0])}  y ${Math.round(p[1])}`;
    const d = this._drag;
    if (!d) return;
    const dx = p[0] - d.start[0], dy = p[1] - d.start[1];
    const free = e.altKey;
    const cfg = this._config;
    if (d.mode === "move") {
      const it = cfg.items[d.idx];
      const cx = this._snap(d.orig[0] + dx + d.w / 2, free), cy = this._snap(d.orig[1] + dy + d.h / 2, free);
      it.at = [r2(cx - d.w / 2), r2(cy - d.h / 2)];
    } else if (d.mode === "resize") {
      const it = cfg.items[d.idx];
      it.size = [Math.max(8, this._snap(d.orig[0] + dx, free)), Math.max(8, this._snap(d.orig[1] + dy, free))];
    } else if (d.mode === "pt") {
      cfg.pipes[d.idx].points[d.k] = [this._snap(d.orig[0] + dx, free), this._snap(d.orig[1] + dy, free)];
    } else if (d.mode === "end") {
      d.cur = p;
      this._render();
      this._ovl.insertAdjacentHTML("beforeend", `<circle class="hdl end" cx="${p[0]}" cy="${p[1]}" r="7"/>`);
      d.moved = true;
      return;
    }
    d.moved = true;
    this._render();
  }

  _onUp(e) {
    const d = this._drag;
    if (!d) return;
    this._drag = null;
    try { this._stage.releasePointerCapture(e.pointerId); } catch (er) { /* */ }
    if (d.mode === "end" && d.cur) {
      const hit = this._hitItem(d.cur);
      if (hit) {
        const pipe = this._config.pipes[d.idx];
        pipe[d.which] = hit.it.id;
        pipe[`${d.which}_edge`] = hit.edge;
        if (hit.pct === 50) delete pipe[`${d.which}_point`]; else pipe[`${d.which}_point`] = hit.pct;
      }
      this._render();
    }
    if (d.moved) this._emitChange();
  }

  _hitItem(p) {
    const items = this._config.items;
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      if (["zone", "label", "badge"].includes(it.type)) continue;
      const g = this._geo(it);
      const m = 6;
      if (p[0] < g.x - m || p[0] > g.x + g.w + m || p[1] < g.y - m || p[1] > g.y + g.h + m) continue;
      if (it.type === "junction") return { it, edge: "center", pct: 50 };
      const dl = Math.abs(p[0] - g.x), dr = Math.abs(g.x + g.w - p[0]), dt = Math.abs(p[1] - g.y), db = Math.abs(g.y + g.h - p[1]);
      const mn = Math.min(dl, dr, dt, db);
      const edge = mn === dl ? "left" : mn === dr ? "right" : mn === dt ? "top" : "bottom";
      const raw = edge === "left" || edge === "right" ? ((p[1] - g.y) / g.h) * 100 : ((p[0] - g.x) / g.w) * 100;
      return { it, edge, pct: clamp(Math.round(raw / 5) * 5, 0, 100) };
    }
    return null;
  }

  _connect(a, b) {
    const cfg = this._config;
    const A = cfg.items[a], B = cfg.items[b];
    const ga = this._geo(A), gb = this._geo(B);
    const dx = gb.x + gb.w / 2 - (ga.x + ga.w / 2), dy = gb.y + gb.h / 2 - (ga.y + ga.h / 2);
    let se, ee;
    if (Math.abs(dx) >= Math.abs(dy)) { se = dx > 0 ? "right" : "left"; ee = dx > 0 ? "left" : "right"; }
    else { se = dy > 0 ? "bottom" : "top"; ee = dy > 0 ? "top" : "bottom"; }
    if (A.type === "junction") se = "center";
    if (B.type === "junction") ee = "center";
    const thin = A.type === "controller" || B.type === "controller";
    const chem = ["dosing_pump", "tank", "injection"].includes(A.type) || ["dosing_pump", "tank", "injection"].includes(B.type);
    cfg.pipes = cfg.pipes || [];
    cfg.pipes.push({ start: A.id, start_edge: se, end: B.id, end_edge: ee, fluid: thin ? "signal" : chem ? A.fluid || B.fluid || "ph" : "eau" });
    this._emitChange();
    this._select({ kind: "pipe", idx: cfg.pipes.length - 1 });
  }

  _onDbl(e) {
    if (!this._editing || this._sel?.kind !== "pipe") return;
    const pipe = this._config.pipes[this._sel.idx];
    const hd = e.target.closest('[data-handle="pt"]');
    if (hd && Array.isArray(pipe.points) && !hd.classList.contains("auto")) {
      pipe.points.splice(Number(hd.dataset.k), 1);
      if (!pipe.points.length) delete pipe.points;
      this._render(); this._emitChange(); return;
    }
    const pEl = e.target.closest("[data-pipe]");
    if (!pEl) return;
    const g = this._pipeGeom(pipe);
    const p = this._pt(e); const sp = [this._snap(p[0]), this._snap(p[1])];
    const all = g.all;
    let best = 0, bd = Infinity;
    for (let k = 0; k < all.length - 1; k++) {
      const a = all[k], b = all[k + 1];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const t = clamp(((p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1])) / (L * L), 0, 1);
      const dd = Math.hypot(p[0] - (a[0] + t * (b[0] - a[0])), p[1] - (a[1] + t * (b[1] - a[1])));
      if (dd < bd) { bd = dd; best = k; }
    }
    const mid = g.mid.map((a) => [Math.round(a[0]), Math.round(a[1])]);
    mid.splice(best, 0, sp);
    const pts = (g.si ? [] : [all[0]]).concat(mid).concat(g.ei ? [] : [all[all.length - 1]]);
    pipe.points = pts;
    this._render(); this._emitChange();
  }
}

/* ------------------------------------------------------------------ */
/* Configuration d'exemple (carte ajoutée depuis l'interface)          */
/* ------------------------------------------------------------------ */

const STUB_CONFIG = {
  type: `custom:${CARD_TAG}`,
  title: "Piscine",
  width: 700,
  height: 400,
  items: [
    { type: "zone", id: "local", name: "Local technique", at: [10, 10], size: [680, 170] },
    { type: "pump", id: "pompe", name: "Pompe", at: [120, 60] },
    { type: "filter", id: "filtre", name: "Filtre", at: [270, 46] },
    { type: "heat_pump", id: "pac", name: "PAC", at: [400, 55] },
    { type: "pool", id: "bassin", name: "Bassin", at: [40, 230], size: [400, 150] },
    { type: "skimmer", id: "skimmer", at: [60, 214] },
    { type: "inlet", id: "buse", at: [400, 216] },
  ],
  pipes: [
    { start: "skimmer", start_edge: "top", end: "pompe", end_edge: "left", end_point: 62.5, always_flow: true },
    { start: "pompe", end: "filtre", always_flow: true },
    { start: "filtre", start_edge: "right", start_point: 25, end: "pac", end_edge: "left", always_flow: true },
    { start: "pac", start_edge: "right", end: "buse", end_edge: "top", points: [[600, 100], [600, 200], [415, 200]], always_flow: true },
  ],
};

/* ------------------------------------------------------------------ */
/* Éditeur visuel                                                      */
/* ------------------------------------------------------------------ */


const sel = (options, mode = "dropdown") => ({ select: { mode, options } });
// Listes d'options traduites : construites à chaque appel, dans la langue courante.
const opts = (prefix, values) => sel(values.map((v) => ({ value: v, label: T(`opt.${prefix}.${v}`) })));
const EDGES = () => opts("edge", ["top", "right", "bottom", "left", "center"]);
const POS = () => opts("pos", ["bottom", "top", "left", "right", "inside", "none"]);
const NUM = (step = 1, min, max) => ({ number: { mode: "box", step, ...(min != null ? { min } : {}), ...(max != null ? { max } : {}) } });
const ENT = (domain) => ({ entity: domain ? { domain } : {} });
const TXT = { text: {} };
const grid = (schema) => ({ type: "grid", name: "", column_min_width: "110px", schema });

function fluidSelect(cfg) {
  const f = { ...FLUIDS_DEFAULT, ...(cfg.fluids || {}) };
  return sel(Object.keys(f).map((k) => ({ value: k, label: tLabel("fluid")(k) })));
}

function itemSchema(type, cfg) {
  const s = [
    { name: "type", selector: sel(Object.keys(TYPES).map((v) => ({ value: v, label: T(`type.${v}`) }))) },
    grid([{ name: "id", required: true, selector: TXT }, { name: "name", selector: TXT }]),
    grid([{ name: "x", selector: NUM() }, { name: "y", selector: NUM() }, { name: "w", selector: NUM(1, 4) }, { name: "h", selector: NUM(1, 4) }]),
  ];
  if (type === "zone") { s.push({ name: "color", selector: TXT }); return s; }
  if (type === "label") {
    s.push(grid([{ name: "font_size", selector: NUM(1, 6, 80) }, { name: "align", selector: opts("align", ["left", "center", "right"]) }, { name: "bold", selector: { boolean: {} } }]), { name: "color", selector: TXT });
    return s;
  }
  if (type === "badge") { s.push({ name: "direction", selector: opts("dir", ["row", "column"]) }); return s; }
  const noState = ["junction", "check_valve", "injection"].includes(type);
  if (!noState) {
    s.push({ name: "entity", selector: ENT() });
    s.push(grid([{ name: "on_state", selector: TXT }, { name: "on_above", selector: NUM(0.1) }]));
  }
  if (["pool", "spa"].includes(type)) s.push({ name: "temperature_entity", selector: ENT() }, grid([{ name: "light_entity", selector: ENT("light") }, { name: "light_color", selector: TXT }, { name: "cover_entity", selector: ENT("cover") }]));
  if (type === "tank") s.push({ name: "level_entity", selector: ENT() });
  if (type === "gauge") s.push(grid([{ name: "min", selector: TXT }, { name: "max", selector: TXT }, { name: "warn_above", selector: TXT }, { name: "alarm_above", selector: TXT }, { name: "unit", selector: TXT }, { name: "decimals", selector: NUM(1, 0, 4) }]));
  if (type === "valve") s.push(grid([{ name: "orientation", selector: opts("orient", ["horizontal", "vertical"]) }, { name: "default_state", selector: opts("vstate", ["open", "closed"]) }]));
  if (type === "valve3") s.push(grid([{ name: "rotation", selector: sel(["0", "90", "180", "270"].map((v) => ({ value: v, label: `${v}°` }))) }, { name: "default_state", selector: opts("v3", ["a", "b"]) }]));
  if (type === "check_valve") s.push({ name: "rotation", selector: sel(["0", "90", "180", "270"].map((v) => ({ value: v, label: `${v}°` }))) });
  if (["pump", "heat_pump", "dosing_pump", "flowmeter", "robot"].includes(type)) s.push(grid([{ name: "speed_entity", selector: ENT() }, { name: "speed_min", selector: NUM() }, { name: "speed_max", selector: NUM() }]));
  if (type === "device") s.push(grid([{ name: "icon", selector: { icon: {} } }, { name: "image", selector: TXT }]));
  if (!["junction"].includes(type)) {
    s.push({ name: "status_entity", selector: ENT() });
    s.push(grid([{ name: "alarm_entity", selector: ENT() }, { name: "alarm_state", selector: TXT }]));
  }
  s.push(grid([{ name: "label_position", selector: POS() }, { name: "fluid", selector: fluidSelect(cfg) }, { name: "accent_color", selector: TXT }]));
  s.push(grid([{ name: "bdx", selector: NUM() }, { name: "bdy", selector: NUM() }]));
  s.push({ name: "tap_action", selector: { ui_action: {} } });
  return s;
}

const BADGE_SCHEMA = [
  grid([{ name: "entity", selector: ENT() }, { name: "name", selector: TXT }]),
  grid([{ name: "icon", selector: { icon: {} } }, { name: "attribute", selector: TXT }, { name: "unit", selector: TXT }, { name: "decimals", selector: NUM(1, 0, 4) }]),
  { name: "thresholds", selector: { object: {} } },
];

function pipeSchema(cfg) {
  const ids = cfg.items.map((it) => ({ value: String(it.id), label: `${it.name || it.id} (${it.id})` }));
  const valves = [];
  cfg.items.forEach((it) => {
    if (it.type === "valve") valves.push({ value: String(it.id), label: it.name || it.id });
    if (it.type === "valve3") { valves.push({ value: `${it.id}:a`, label: `${it.name || it.id} ${T("opt.v3route.a")}` }, { value: `${it.id}:b`, label: `${it.name || it.id} ${T("opt.v3route.b")}` }); }
  });
  const s = [
    grid([{ name: "start", selector: sel(ids) }, { name: "start_edge", selector: EDGES() }, { name: "start_point", selector: NUM(5, 0, 100) }]),
    grid([{ name: "end", selector: sel(ids) }, { name: "end_edge", selector: EDGES() }, { name: "end_point", selector: NUM(5, 0, 100) }]),
    { name: "points_txt", selector: TXT },
    grid([{ name: "fluid", selector: fluidSelect(cfg) }, { name: "style", selector: opts("style", ["dots", "dashes", "none"]) }]),
    { name: "flow_entity", selector: { entity: { multiple: true } } },
    grid([{ name: "flow_on_above", selector: NUM(0.1) }, { name: "always_flow", selector: { boolean: {} } }, { name: "reverse", selector: { boolean: {} } }]),
    { name: "hot_entity", selector: ENT() },
  ];
  if (valves.length) s.push({ name: "valves", selector: { select: { multiple: true, mode: "list", options: valves } } });
  s.push(grid([{ name: "width", selector: NUM(1, 1, 30) }, { name: "speed", selector: NUM(5, 5, 400) }, { name: "color", selector: TXT }]));
  s.push(grid([{ name: "speed_entity", selector: ENT() }, { name: "speed_min", selector: NUM() }, { name: "speed_max", selector: NUM() }]));
  s.push({ name: "tap_action", selector: { ui_action: {} } });
  return s;
}

const generalSchema = () => [
  { name: "title", selector: TXT },
  grid([{ name: "width", selector: NUM(10, 100) }, { name: "height", selector: NUM(10, 100) }, { name: "grid_size", selector: NUM(1, 1, 50) }]),
  grid([{ name: "pipe_width", selector: NUM(1, 1, 30) }, { name: "line_radius", selector: NUM(1, 0, 40) }, { name: "flow_speed", selector: NUM(5, 5, 400) }]),
  grid([{ name: "scale", selector: NUM(0.05, 0.1, 5) }, { name: "max_scale", selector: NUM(0.05, 0.1, 5) }, { name: "font", selector: TXT }]),
  grid([{ name: "show_toggles", selector: { boolean: {} } }, { name: "animations", selector: { boolean: {} } }, { name: "show_values", selector: { boolean: {} } }, { name: "debug", selector: { boolean: {} } }]),
  grid([
    { name: "bypass_storage", selector: opts("storage", ["system", "user", "local"]) },
    { name: "storage_key", selector: TXT },
    { name: "show_bypass_buttons", selector: { boolean: {} } },
  ]),
  { name: "fluids", selector: { object: {} } },
];

function bypassSchema(cfg) {
  const opts = cfg.items.filter((it) => it.type === "valve" || it.type === "valve3").map((it) => ({ value: String(it.id), label: `${it.name || it.id} (${it.id})` }));
  return [
    grid([{ name: "id", required: true, selector: TXT }, { name: "name", selector: TXT }]),
    { name: "line", selector: { select: { multiple: true, mode: "list", options: opts } } },
    { name: "bypass", selector: { select: { multiple: true, mode: "list", options: opts } } },
    grid([{ name: "default", selector: { boolean: {} } }, { name: "entity", selector: ENT() }]),
  ];
}

const schemaNames = (schema) => schema.flatMap((s) => (s.schema ? schemaNames(s.schema) : [s.name]));
const setOrDel = (o, k, v) => {
  if (v === undefined || v === null || v === "" || (Array.isArray(v) && !v.length) || (typeof v === "object" && !Array.isArray(v) && !Object.keys(v).length)) delete o[k];
  else o[k] = v;
};

const EDITOR_CSS = `
:host{display:block}
.ver{font-size:11px;color:var(--secondary-text-color)}
.bar{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px}
.root.fs{position:fixed;inset:0;z-index:9999;display:flex;background:var(--primary-background-color,#fafafa);color:var(--primary-text-color)}
.root.fs .left{flex:1;min-width:0;padding:12px 16px;overflow:auto;box-sizing:border-box;height:100%}
.root.fs .right{width:min(440px,38vw);flex:none;overflow:auto;padding:12px 16px;box-sizing:border-box;border-left:1px solid var(--divider-color);background:var(--card-background-color,#fff);height:100%}
.root.fs .list{max-height:34vh}
.pv{border:1px solid var(--divider-color);border-radius:var(--ha-card-border-radius,12px);overflow:hidden}
.hint{font-size:12px;color:var(--secondary-text-color);margin:6px 2px 12px;line-height:1.5}
.tabs{display:flex;gap:4px;border-bottom:1px solid var(--divider-color);margin-bottom:12px}
.tabs button{background:none;border:none;border-bottom:2px solid transparent;padding:8px 12px;color:var(--secondary-text-color);cursor:pointer;font:inherit;font-weight:500}
.tabs button.on{color:var(--primary-color);border-bottom-color:var(--primary-color)}
.list{display:flex;flex-direction:column;gap:2px;max-height:260px;overflow:auto;border:1px solid var(--divider-color);border-radius:8px;padding:4px;margin-bottom:8px}
.row{display:flex;align-items:center;gap:8px;padding:4px 6px;border-radius:6px;cursor:pointer;font-size:13px}
.row:hover{background:var(--secondary-background-color)}
.row.on{background:rgba(var(--rgb-primary-color,3,169,244),.14)}
.row .grow{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.row .muted{color:var(--secondary-text-color);font-size:11px}
.row ha-icon{--mdc-icon-size:18px;color:var(--secondary-text-color)}
.ib{background:none;border:none;color:var(--secondary-text-color);cursor:pointer;padding:2px;border-radius:50%;display:inline-flex}
.ib:hover{color:var(--primary-color);background:var(--secondary-background-color)}
.ib ha-icon{--mdc-icon-size:18px}
.add{display:flex;gap:6px;align-items:center;margin-bottom:14px}
.add select{flex:1;padding:8px;border-radius:6px;border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color);font:inherit}
.btn{border:1px solid var(--primary-color);background:none;color:var(--primary-color);border-radius:16px;padding:6px 14px;cursor:pointer;font:inherit;font-size:13px;display:inline-flex;align-items:center;gap:4px}
.btn ha-icon{--mdc-icon-size:16px}
h4{margin:16px 0 8px;font-size:14px;font-weight:500;display:flex;align-items:center;justify-content:space-between}
.sub{border:1px solid var(--divider-color);border-radius:8px;padding:8px;margin-bottom:8px}
.sub .bar{display:flex;justify-content:flex-end}
.empty{color:var(--secondary-text-color);font-size:13px;padding:8px}
`;

class PoolHydraulicCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._tab = "items";
    this._sel = null;
    this._forms = [];
    this._key = "";
  }

  set hass(h) {
    this._hass = h;
    if (setLang(h) && this._built) {
      // langue changée : on reconstruit l'interface de l'éditeur
      this._built = false;
      this._key = "";
      this._ensure();
      this._updatePreview();
      this._sync();
      return;
    }
    if (this._preview) this._preview.hass = h;
    this._forms.forEach((f) => (f.el.hass = h));
  }

  setConfig(config) {
    const s = JSON.stringify(config);
    if (s === this._last) return;
    this._config = clone(config);
    if (!Array.isArray(this._config.items)) this._config.items = [];
    this._last = s;
    this._ensure();
    this._updatePreview();
    this._sync();
  }

  connectedCallback() { this._loadHelpers(); this._listen(true); }

  async _loadHelpers() {
    if (customElements.get("ha-form") && customElements.get("ha-entity-picker")) return;
    try {
      const h = await window.loadCardHelpers?.();
      const c = await h?.createCardElement({ type: "entities", entities: [] });
      await c?.constructor?.getConfigElement?.();
    } catch (e) { /* ignoré */ }
    this._key = "";
    if (this._config) this._sync();
  }

  _ensure() {
    if (this._built) return;
    this.shadowRoot.innerHTML = `<style>${EDITOR_CSS}</style>
      <div class="root"><div class="left">
      <div class="bar"><button class="btn fsbtn" title="${esc(T("ui.fullscreen_title"))}"><ha-icon icon="mdi:fullscreen"></ha-icon><span>${esc(T("ui.fullscreen"))}</span></button><span class="ver">pool-hydraulic-card v${PHC_VERSION}</span></div>
      <div class="pv"></div>
      <div class="hint">${T("ui.hint")}</div>
      </div><div class="right">
      <div class="tabs">
        <button data-tab="general">${esc(T("ui.tab_general"))}</button><button data-tab="items">${esc(T("ui.tab_items"))}</button><button data-tab="pipes">${esc(T("ui.tab_pipes"))}</button>
      </div>
      <div class="panel"></div></div></div>`;
    const R = this.shadowRoot;
    this._root = R.querySelector(".root");
    this._left = R.querySelector(".left");
    this._fsBtn = R.querySelector(".fsbtn");
    this._fsBtn.addEventListener("click", () => this._toggleFs());
    this._onFsChange = () => { if (this._fsApi && !document.fullscreenElement && this._fs) this._toggleFs(false); };
    this._onKey = (e) => { if (e.key === "Escape" && this._fs) this._toggleFs(false); };
    this._onResize = () => this._fitPreview();
    this._listen(true);
    this._panel = R.querySelector(".panel");
    R.querySelector(".tabs").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-tab]");
      if (b) { this._tab = b.dataset.tab; this._sync(); }
    });
    this._preview = document.createElement(CARD_TAG);
    this._preview._editing = true;
    this._preview.addEventListener("phc-change", (e) => { e.stopPropagation(); this._config = e.detail.config; this._commit(false); this._sync(); });
    this._preview.addEventListener("phc-select", (e) => {
      e.stopPropagation();
      const d = e.detail;
      this._sel = d.kind ? { kind: d.kind, idx: d.idx } : null;
      if (d.kind === "item") this._tab = "items";
      if (d.kind === "pipe") this._tab = "pipes";
      this._sync();
    });
    // on bloque la remontée des actions vers HA pendant l'édition
    this._preview.addEventListener("hass-more-info", (e) => e.stopPropagation());
    R.querySelector(".pv").appendChild(this._preview);
    if (this._hass) this._preview.hass = this._hass;
    this._built = true;
  }

  disconnectedCallback() {
    if (this._fs) this._toggleFs(false);
    this._listen(false);
  }

  _listen(on) {
    if (!this._onKey || this._listening === on) return;
    this._listening = on;
    const f = on ? "addEventListener" : "removeEventListener";
    document[f]("fullscreenchange", this._onFsChange);
    window[f]("keydown", this._onKey);
    window[f]("resize", this._onResize);
  }

  async _toggleFs(force) {
    const on = force === undefined ? !this._fs : force;
    if (on === this._fs) return;
    this._fs = on;
    this._root.classList.toggle("fs", on);
    this._fsBtn.innerHTML = `<ha-icon icon="${on ? "mdi:fullscreen-exit" : "mdi:fullscreen"}"></ha-icon><span>${esc(on ? T("ui.fullscreen_exit") : T("ui.fullscreen"))}</span>`;
    if (on) {
      this._fsApi = false;
      try { if (this._root.requestFullscreen) { await this._root.requestFullscreen({ navigationUI: "hide" }); this._fsApi = true; } } catch (e) { /* repli : superposition CSS */ }
    } else if (this._fsApi) {
      this._fsApi = false;
      try { if (document.fullscreenElement) await document.exitFullscreen(); } catch (e) { /* */ }
    }
    requestAnimationFrame(() => this._fitPreview());
  }

  _fitPreview() {
    if (!this._preview) return;
    if (this._fs) {
      const used = [...this._left.children].filter((c) => !c.classList.contains("pv")).reduce((a, c) => a + c.offsetHeight, 0);
      const head = this._preview.shadowRoot?.querySelector(".hdr")?.offsetHeight || 0;
      this._preview._maxH = Math.max(150, this._left.clientHeight - used - head - 60);
    } else this._preview._maxH = 0;
    this._preview._applyScale?.();
  }

  _updatePreview() {
    try {
      this._preview._sel = this._sel;
      this._preview.setConfig(clone(this._config));
      if (this._hass) this._preview.hass = this._hass;
    } catch (e) { /* config temporairement invalide */ }
  }

  _commit(updatePreview = true) {
    this._last = JSON.stringify(this._config);
    if (updatePreview) this._updatePreview();
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: clone(this._config) }, bubbles: true, composed: true }));
  }

  _setSel(sel) {
    this._sel = sel;
    if (this._preview) this._preview.setSelection(sel);
    this._sync();
  }

  /* ---------- construction des panneaux ---------- */
  _sync() {
    if (!this._panel || !this._config) return;
    this.shadowRoot.querySelectorAll(".tabs button").forEach((b) => b.classList.toggle("on", b.dataset.tab === this._tab));
    const c = this._config;
    const selIt = this._sel?.kind === "item" ? c.items[this._sel.idx] : null;
    const key = JSON.stringify([
      this._tab, this._sel, c.items.map((i) => [i.id, i.type, i.name, (i.badges || []).length]), (c.pipes || []).map((p) => [p.start, p.end, p.fluid]),
      selIt?.type, Object.keys(c.fluids || {}), (c.bypasses || []).map((b) => b.id),
    ]);
    if (key !== this._key) { this._key = key; this._buildPanel(); }
    else this._forms.forEach((f) => { f.el.data = f.data(); });
    if (this._preview && JSON.stringify(this._preview._sel) !== JSON.stringify(this._sel)) this._preview.setSelection(this._sel);
  }

  _form(schema, dataFn, onChange, prefix = "f") {
    const el = document.createElement("ha-form");
    el.hass = this._hass;
    el.schema = schema;
    el.data = dataFn();
    el.computeLabel = (s) => tLabel(prefix)(s.name);
    el.addEventListener("value-changed", (e) => { e.stopPropagation(); onChange(e.detail.value || {}); });
    this._forms.push({ el, data: dataFn });
    return el;
  }

  _btn(icon, title, fn, cls = "ib") {
    const b = document.createElement("button");
    b.className = cls; b.title = title;
    b.innerHTML = `<ha-icon icon="${icon}"></ha-icon>${cls === "btn" ? `<span>${esc(title)}</span>` : ""}`;
    b.addEventListener("click", (e) => { e.stopPropagation(); fn(); });
    return b;
  }

  _buildPanel() {
    this._forms = [];
    this._panel.innerHTML = "";
    if (this._tab === "general") this._buildGeneral();
    else if (this._tab === "items") this._buildItems();
    else this._buildPipes();
  }

  _buildGeneral() {
    const schema0 = generalSchema();
    const names = schemaNames(schema0);
    this._panel.appendChild(this._form(schema0, () => {
      const d = {};
      names.forEach((n) => { if (this._config[n] !== undefined) d[n] = this._config[n]; });
      if (d.width === undefined) d.width = 1000;
      if (d.height === undefined) d.height = 600;
      return d;
    }, (v) => {
      names.forEach((n) => setOrDel(this._config, n, v[n]));
      this._commit();
    }));

    const h = document.createElement("h4");
    h.innerHTML = `<span>By-pass</span>`;
    h.appendChild(this._btn("mdi:plus", T("ui.add_bypass"), () => {
      const c = this._config;
      c.bypasses = c.bypasses || [];
      let n = c.bypasses.length + 1;
      while (c.bypasses.some((b) => b.id === `bypass_${n}`)) n++;
      c.bypasses.push({ id: `bypass_${n}`, name: T("ui.new_bypass", { n }), line: [], bypass: [] });
      this._commit(); this._sync();
    }, "btn"));
    this._panel.appendChild(h);
    const hint = document.createElement("div");
    hint.className = "hint";
    hint.textContent = T("ui.bypass_hint");
    this._panel.appendChild(hint);
    const schema = bypassSchema(this._config);
    const bn = schemaNames(schema);
    (this._config.bypasses || []).forEach((bp, k) => {
      const box = document.createElement("div");
      box.className = "sub";
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.appendChild(this._btn("mdi:delete-outline", T("ui.delete"), () => {
        this._config.bypasses.splice(k, 1);
        if (!this._config.bypasses.length) delete this._config.bypasses;
        this._commit(); this._sync();
      }));
      box.appendChild(bar);
      box.appendChild(this._form(schema, () => ({ ...(this._config.bypasses?.[k] || {}) }), (v) => {
        const b = this._config.bypasses[k];
        bn.forEach((n) => setOrDel(b, n, v[n]));
        if (!b.id) b.id = `bypass_${k + 1}`;
        this._commit();
      }, "bp"));
      this._panel.appendChild(box);
    });
  }

  _uniqueId(base) {
    const ids = new Set(this._config.items.map((i) => String(i.id)));
    let n = 1, id = base;
    while (ids.has(id)) id = `${base}_${++n}`;
    return id;
  }

  _buildItems() {
    const c = this._config;
    const list = document.createElement("div");
    list.className = "list";
    if (!c.items.length) list.innerHTML = `<div class="empty">${esc(T("ui.no_items"))}</div>`;
    c.items.forEach((it, i) => {
      const row = document.createElement("div");
      row.className = `row${this._sel?.kind === "item" && this._sel.idx === i ? " on" : ""}`;
      row.innerHTML = `<ha-icon icon="${TYPES[it.type]?.icon || "mdi:help"}"></ha-icon><span class="grow">${esc(it.name || it.id)} <span class="muted">${esc(it.id)} · ${esc(T(`type.${it.type}`))}</span></span>`;
      row.addEventListener("click", () => this._setSel({ kind: "item", idx: i }));
      row.append(
        this._btn("mdi:arrow-up", T("ui.move_up_below"), () => this._moveItem(i, -1)),
        this._btn("mdi:arrow-down", T("ui.move_down_above"), () => this._moveItem(i, 1)),
        this._btn("mdi:content-copy", T("ui.duplicate"), () => this._dupItem(i)),
        this._btn("mdi:delete-outline", T("ui.delete"), () => this._delItem(i)),
      );
      list.appendChild(row);
    });
    this._panel.appendChild(list);

    const add = document.createElement("div");
    add.className = "add";
    const s = document.createElement("select");
    s.innerHTML = Object.keys(TYPES).map((k) => `<option value="${k}">${esc(T(`type.${k}`))}</option>`).join("");
    s.value = "pump";
    add.append(s, this._btn("mdi:plus", T("ui.add"), () => this._addItem(s.value), "btn"));
    this._panel.appendChild(add);

    const it = this._sel?.kind === "item" ? c.items[this._sel.idx] : null;
    if (!it) return;
    const idx = this._sel.idx;
    const h = document.createElement("h4");
    h.textContent = `${T(`type.${it.type}`)} — ${it.name || it.id}`;
    this._panel.appendChild(h);
    const schema = itemSchema(it.type, c);
    const names = schemaNames(schema);
    this._panel.appendChild(this._form(schema, () => {
      const cur = this._config.items[idx];
      const d = {};
      names.forEach((n) => { if (cur[n] !== undefined) d[n] = cur[n]; });
      const g = PoolHydraulicCard.prototype._geo.call(null, cur);
      Object.assign(d, { x: g.x, y: g.y, w: g.w, h: g.h });
      if (Array.isArray(cur.badges_offset)) { d.bdx = cur.badges_offset[0]; d.bdy = cur.badges_offset[1]; }
      if (d.rotation != null) d.rotation = String(d.rotation);
      return d;
    }, (v) => this._itemChanged(idx, v, names)));

    if (["label", "zone", "junction"].includes(it.type)) return;
    const bh = document.createElement("h4");
    bh.innerHTML = `<span>${esc(T("ui.values_title"))}</span>`;
    bh.appendChild(this._btn("mdi:plus", T("ui.add_value"), () => {
      const cur = this._config.items[idx];
      cur.badges = cur.badges || [];
      cur.badges.push({ entity: "" });
      this._commit(); this._sync();
    }, "btn"));
    this._panel.appendChild(bh);
    (it.badges || []).forEach((b, k) => {
      const box = document.createElement("div");
      box.className = "sub";
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.append(
        this._btn("mdi:arrow-up", T("ui.move_up"), () => { const a = this._config.items[idx].badges; if (k > 0) { [a[k - 1], a[k]] = [a[k], a[k - 1]]; this._commit(); this._key = ""; this._sync(); } }),
        this._btn("mdi:delete-outline", T("ui.delete"), () => { const a = this._config.items[idx].badges; a.splice(k, 1); if (!a.length) delete this._config.items[idx].badges; this._commit(); this._sync(); }),
      );
      box.appendChild(bar);
      const bn = schemaNames(BADGE_SCHEMA);
      box.appendChild(this._form(BADGE_SCHEMA, () => ({ ...(this._config.items[idx].badges?.[k] || {}) }), (v) => {
        const b2 = this._config.items[idx].badges[k];
        bn.forEach((n) => setOrDel(b2, n, v[n]));
        if (b2.entity === undefined) b2.entity = "";
        this._commit();
      }));
      this._panel.appendChild(box);
    });
  }

  _itemChanged(idx, v, names) {
    const it = this._config.items[idx];
    const oldId = String(it.id), oldType = it.type;
    for (const n of names) {
      if (["x", "y", "w", "h", "bdx", "bdy"].includes(n)) continue;
      let val = v[n];
      if (n === "rotation" && val != null && val !== "") val = Number(val);
      if (n === "id") { val = String(val || "").trim().replace(/\s+/g, "_"); if (!val) val = oldId; if (val !== oldId && this._config.items.some((o, j) => j !== idx && String(o.id) === val)) val = oldId; }
      setOrDel(it, n, val);
    }
    if (v.x != null || v.y != null) it.at = [Number(v.x) || 0, Number(v.y) || 0];
    const def = TYPES[it.type]?.size || [40, 40];
    if (v.w != null || v.h != null) {
      const sz = [Number(v.w) || def[0], Number(v.h) || def[1]];
      if (oldType !== it.type) it.size = [...def];
      else if (Array.isArray(it.size) || sz[0] !== def[0] || sz[1] !== def[1]) it.size = sz;
    }
    if (v.bdx || v.bdy) it.badges_offset = [Number(v.bdx) || 0, Number(v.bdy) || 0]; else delete it.badges_offset;
    if (String(it.id) !== oldId) this._renameRefs(oldId, String(it.id));
    this._commit();
    if (oldType !== it.type || String(it.id) !== oldId) this._sync();
  }

  _renameRefs(a, b) {
    (this._config.bypasses || []).forEach((bp) => {
      ["line", "bypass"].forEach((k) => { if (bp[k]) bp[k] = [].concat(bp[k]).map((v) => (String(v) === a ? b : v)); });
    });
    (this._config.pipes || []).forEach((p) => {
      if (String(p.start) === a) p.start = b;
      if (String(p.end) === a) p.end = b;
      if (p.valves) p.valves = [].concat(p.valves).map((v) => { const [id, port] = String(v).split(":"); return id === a ? (port ? `${b}:${port}` : b) : v; });
    });
  }

  _addItem(type) {
    const c = this._config;
    const W = Number(c.width) || 1000, H = Number(c.height) || 600;
    const sz = TYPES[type].size;
    const id = this._uniqueId(type);
    const it = { type, id, name: type === "junction" || type === "injection" ? undefined : T(`type.${type}`), at: [Math.round((W - sz[0]) / 2), Math.round((H - sz[1]) / 2)] };
    if (type === "badge") it.badges = [{ entity: "" }];
    if (it.name === undefined) delete it.name;
    if (type === "zone") c.items.unshift(it); else c.items.push(it);
    this._commit();
    this._setSel({ kind: "item", idx: type === "zone" ? 0 : c.items.length - 1 });
  }

  _dupItem(i) {
    const c = this._config;
    const it = clone(c.items[i]);
    it.id = this._uniqueId(String(it.id));
    const g = PoolHydraulicCard.prototype._geo.call(null, it);
    it.at = [g.x + 20, g.y + 20];
    c.items.splice(i + 1, 0, it);
    this._commit();
    this._setSel({ kind: "item", idx: i + 1 });
  }

  _delItem(i) {
    const c = this._config;
    const id = String(c.items[i].id);
    c.items.splice(i, 1);
    c.pipes = (c.pipes || []).filter((p) => String(p.start) !== id && String(p.end) !== id);
    c.pipes.forEach((p) => { if (p.valves) { p.valves = [].concat(p.valves).filter((v) => String(v).split(":")[0] !== id); if (!p.valves.length) delete p.valves; } });
    if (!c.pipes.length) delete c.pipes;
    (c.bypasses || []).forEach((bp) => ["line", "bypass"].forEach((k) => { if (bp[k]) bp[k] = [].concat(bp[k]).filter((v) => String(v) !== id); }));
    this._commit();
    this._setSel(null);
  }

  _moveItem(i, d) {
    const a = this._config.items, j = i + d;
    if (j < 0 || j >= a.length) return;
    [a[i], a[j]] = [a[j], a[i]];
    this._commit();
    this._setSel({ kind: "item", idx: j });
  }

  _buildPipes() {
    const c = this._config;
    c.pipes = c.pipes || [];
    const list = document.createElement("div");
    list.className = "list";
    if (!c.pipes.length) list.innerHTML = `<div class="empty">${esc(T("ui.no_pipes"))}</div>`;
    const nm = (id) => { const it = c.items.find((x) => String(x.id) === String(id)); return it ? it.name || it.id : id ?? "—"; };
    c.pipes.forEach((p, i) => {
      const row = document.createElement("div");
      row.className = `row${this._sel?.kind === "pipe" && this._sel.idx === i ? " on" : ""}`;
      const color = { ...FLUIDS_DEFAULT, ...(c.fluids || {}) }[p.fluid || "eau"] || "#29b6f6";
      row.innerHTML = `<ha-icon icon="mdi:pipe" style="color:${esc(color)}"></ha-icon><span class="grow">${esc(nm(p.start))} → ${esc(nm(p.end))} <span class="muted">${esc(tLabel("fluid")(p.fluid || "eau"))}</span></span>`;
      row.addEventListener("click", () => this._setSel({ kind: "pipe", idx: i }));
      row.append(
        this._btn("mdi:swap-horizontal", T("ui.reverse_pipe"), () => this._flipPipe(i)),
        this._btn("mdi:content-copy", T("ui.duplicate"), () => { c.pipes.splice(i + 1, 0, clone(p)); this._commit(); this._setSel({ kind: "pipe", idx: i + 1 }); }),
        this._btn("mdi:delete-outline", T("ui.delete"), () => { c.pipes.splice(i, 1); if (!c.pipes.length) delete c.pipes; this._commit(); this._setSel(null); }),
      );
      list.appendChild(row);
    });
    if (!c.pipes.length) delete c.pipes;
    this._panel.appendChild(list);
    const add = document.createElement("div");
    add.className = "add";
    add.appendChild(this._btn("mdi:plus", T("ui.add_pipe"), () => {
      const cc = this._config;
      cc.pipes = cc.pipes || [];
      const a = cc.items.find((x) => !["zone", "label", "badge"].includes(x.type));
      const b = cc.items.filter((x) => !["zone", "label", "badge"].includes(x.type))[1];
      cc.pipes.push({ start: a?.id, end: b?.id, fluid: "eau" });
      this._commit();
      this._setSel({ kind: "pipe", idx: cc.pipes.length - 1 });
    }, "btn"));
    this._panel.appendChild(add);

    const idx = this._sel?.kind === "pipe" ? this._sel.idx : -1;
    const p = c.pipes?.[idx];
    if (!p) return;
    const h = document.createElement("h4");
    h.textContent = T("ui.pipe_title", { a: nm(p.start), b: nm(p.end) });
    this._panel.appendChild(h);
    const schema = pipeSchema(c);
    const names = schemaNames(schema);
    this._panel.appendChild(this._form(schema, () => {
      const cur = this._config.pipes[idx];
      const d = {};
      names.forEach((n) => { if (cur[n] !== undefined) d[n] = cur[n]; });
      if (cur.start != null) d.start = String(cur.start);
      if (cur.end != null) d.end = String(cur.end);
      if (d.flow_entity && !Array.isArray(d.flow_entity)) d.flow_entity = [d.flow_entity];
      if (d.valves && !Array.isArray(d.valves)) d.valves = [d.valves];
      d.points_txt = Array.isArray(cur.points) ? cur.points.map((a) => `${a[0]},${a[1]}`).join(" ") : "";
      return d;
    }, (v) => {
      const cur = this._config.pipes[idx];
      for (const n of names) {
        if (n === "points_txt") continue;
        let val = v[n];
        if (n === "flow_entity" && Array.isArray(val)) val = val.length === 1 ? val[0] : val;
        setOrDel(cur, n, val);
      }
      const pts = String(v.points_txt || "").split(/[\s;]+/).map((s) => s.split(",").map(Number)).filter((a) => a.length === 2 && a.every(Number.isFinite));
      if (pts.length) cur.points = pts; else delete cur.points;
      this._commit();
    }));
    const tools = document.createElement("div");
    tools.className = "add";
    tools.append(
      this._btn("mdi:vector-polyline-remove", T("ui.clear_points"), () => { delete this._config.pipes[idx].points; this._commit(); this._sync(); }, "btn"),
    );
    this._panel.appendChild(tools);
  }

  _flipPipe(i) {
    const p = this._config.pipes[i];
    const sw = (a, b) => { const t = p[a]; setOrDel(p, a, p[b]); setOrDel(p, b, t); };
    sw("start", "end"); sw("start_edge", "end_edge"); sw("start_point", "end_point");
    if (Array.isArray(p.points)) p.points.reverse();
    this._commit();
    this._key = ""; this._sync();
  }
}

/* ------------------------------------------------------------------ */
/* Enregistrement                                                      */
/* ------------------------------------------------------------------ */

if (!customElements.get(CARD_TAG)) customElements.define(CARD_TAG, PoolHydraulicCard);
if (!customElements.get(EDITOR_TAG)) customElements.define(EDITOR_TAG, PoolHydraulicCardEditor);

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === CARD_TAG)) {
  window.customCards.push({
    type: CARD_TAG,
    name: T("card.name"),
    description: T("card.desc"),
    preview: true,
    documentationURL: "https://github.com/freddye83/pool-hydraulic-card",
  });
}
