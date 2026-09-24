// Каталог PRIZ. Чтобы заменить иллюстрацию фото, добавьте в товар поле
// images: ["img/apex-1.jpg", "img/apex-2.jpg"]; тогда фото будут показаны вместо рисунка.

const CLOTHING_SIZES = ["S", "M", "L", "XL"];
const SHOE_SIZES = ["40", "41", "42", "43", "44", "45"];

const C = {
  black:  { name: "Чёрный",    hex: "#2b2934" },
  graph:  { name: "Графит",    hex: "#4a4855" },
  bone:   { name: "Молочный",  hex: "#e9e5dc" },
  violet: { name: "Фиолетовый", hex: "#7c4dff" },
  navy:   { name: "Ночной синий", hex: "#22284a" }
};

const PRODUCTS = [
  {
    id: "apex-run-jacket", name: "Куртка Apex Run", kind: "jacket",
    cat: "run", gender: "men", price: 4800, badge: "NEW", isNew: true,
    label: "Верхняя одежда для бега",
    images: ["img/apex-run-jacket-1.jpg"],
    colors: [C.black, C.graph, C.bone], sizes: CLOTHING_SIZES,
    desc: "Лёгкая стёганая куртка для утренних пробежек и прохладных вечеров. Держит тепло, не мешает плечам и складывается в рюкзак.",
    materials: "Верх: 100% нейлон, водоотталкивающая пропитка. Утеплитель: 100% полиэстер, 80 г/м². Подкладка: 100% полиэстер.",
    care: "Стирка при 30°C в деликатном режиме, без отбеливателя и сушки в барабане."
  },
  {
    id: "essentials-hoodie", name: "Худи Essentials", kind: "hoodie",
    cat: "gym", gender: "men", price: 2900, badge: "BESTSELLER",
    label: "Тренировочная классика",
    images: ["img/essentials-hoodie-1.jpg"],
    colors: [C.black, C.graph, C.bone], sizes: CLOTHING_SIZES,
    desc: "Плотное худи свободного кроя для разминки, зала и дороги домой. Мягкий начёс внутри, капюшон держит форму.",
    materials: "80% хлопок, 20% полиэстер, плотность 380 г/м². Внутри мягкий начёс.",
    care: "Стирка при 30°C, вывернув наизнанку. Не гладить принт."
  },
  {
    id: "utility-jogger", name: "Джоггеры Utility", kind: "pants",
    cat: "gym", gender: "men", price: 2600, badge: "NEW", isNew: true,
    label: "Штаны для тренировок",
    images: ["img/utility-jogger-1.jpg"],
    colors: [C.black, C.graph, C.navy], sizes: CLOTHING_SIZES,
    desc: "Джоггеры с эластичной талией и накладными карманами. Не сковывают движения в приседе и выпаде.",
    materials: "92% полиэстер, 8% эластан. Карманы на молнии.",
    care: "Стирка при 30°C. Не отжимать в центрифуге на высоких оборотах."
  },
  {
    id: "vortex-runner", name: "Кроссовки Vortex Runner", kind: "sneaker",
    cat: "run", gender: "men", price: 4200, badge: "LIMITED", isNew: true,
    label: "Беговая обувь",
    colors: [C.bone, C.black, C.violet], sizes: SHOE_SIZES,
    desc: "Амортизация под длинные километры и устойчивая подошва для асфальта. Дышащий верх и фиксация пятки.",
    materials: "Верх: текстильная сетка. Подошва: EVA и износостойкая резина. Масса 285 г (размер 42).",
    care: "Чистить мягкой щёткой, стирать вручную при 30°C. Сушить вдали от батарей."
  },
  {
    id: "pulse-tights", name: "Лосины Pulse", kind: "tights",
    cat: "run", gender: "women", price: 2200,
    label: "Компрессионные лосины",
    images: ["img/pulse-tights-1.jpg"],
    colors: [C.black, C.navy, C.violet], sizes: CLOTHING_SIZES,
    desc: "Высокая посадка, плотная компрессия и карман для телефона на поясе. Не просвечивают в приседе.",
    materials: "78% полиамид, 22% эластан. Плоские швы.",
    care: "Стирка при 30°C, без смягчителя. Сушить в расправленном виде."
  },
  {
    id: "aero-top", name: "Топ Aero", kind: "top",
    cat: "gym", gender: "women", price: 1400, badge: "NEW", isNew: true,
    label: "Топ с поддержкой",
    images: ["img/aero-top-1.jpg"],
    colors: [C.black, C.bone, C.violet], sizes: CLOTHING_SIZES,
    desc: "Топ средней поддержки для зала и йоги. Съёмные вкладыши, широкие лямки, лёгкая ткань.",
    materials: "82% полиамид, 18% эластан.",
    care: "Стирка при 30°C в мешке для белья."
  },
  {
    id: "stride-shorts", name: "Шорты Stride", kind: "shorts",
    cat: "run", gender: "men", price: 1500,
    label: "Беговые шорты",
    images: ["img/stride-shorts-1.jpg"],
    colors: [C.black, C.graph, C.violet], sizes: CLOTHING_SIZES,
    desc: "Лёгкие шорты со встроенным слипом и карманом на пояснице. Отводят влагу и не натирают.",
    materials: "Верх: 100% полиэстер. Слип: 88% полиэстер, 12% эластан.",
    care: "Стирка при 30°C. Не использовать смягчитель."
  },
  {
    id: "flow-tee", name: "Футболка Flow Dry", kind: "tee",
    cat: "gym", gender: "men", price: 1300, oldPrice: 1700, badge: "SALE", sale: true,
    label: "Быстросохнущая футболка",
    images: ["img/flow-tee-1.jpg"],
    colors: [C.bone, C.black, C.graph], sizes: CLOTHING_SIZES,
    desc: "Тонкая футболка, которая сохнет за минуты. Швы вынесены с плеч, чтобы не натирать под лямками рюкзака.",
    materials: "100% полиэстер, плотность 140 г/м².",
    care: "Стирка при 30°C. Не гладить."
  },
  {
    id: "core-cap", name: "Кепка Core Logo", kind: "cap",
    cat: "acc", gender: "unisex", price: 1100,
    label: "Кепка для бега",
    images: ["img/core-cap-1.jpg"],
    colors: [C.black, C.bone, C.violet], sizes: ["ONE SIZE"],
    desc: "Лёгкая кепка с регулируемой застёжкой сзади и отводом пота на лбу.",
    materials: "100% полиэстер, вентиляционные отверстия сбоку.",
    care: "Стирка вручную при 30°C."
  }
];

const CATEGORIES = {
  all:   { title: "Весь каталог",  test: () => true },
  new:   { title: "Новинки",       test: p => p.isNew },
  men:   { title: "Мужское",       test: p => p.gender === "men" || p.gender === "unisex" },
  women: { title: "Женское",       test: p => p.gender === "women" || p.gender === "unisex" },
  run:   { title: "Бег",           test: p => p.cat === "run" },
  gym:   { title: "Зал",           test: p => p.cat === "gym" },
  acc:   { title: "Аксессуары",    test: p => p.cat === "acc" },
  sale:  { title: "Sale",          test: p => p.sale }
};

/* ---------- Иллюстрации товаров (SVG) ---------- */

function mix(a, b, t) {
  const A = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16));
  const B = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16));
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
}

const ACCENT = "#8b5cf6";

function shape(d, fill, extra = "") {
  return `<path d="${d}" fill="${fill}" stroke="rgba(255,255,255,.16)" stroke-width="1" stroke-linejoin="round" ${extra}/>` +
         `<path d="${d}" fill="url(#sh)"/>`;
}
function line(d, stroke, w = 1.2, op = 1) {
  return `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>`;
}

const ART = {
  jacket(c, d) {
    return shape("M64 64 L82 50 Q100 58 118 50 L136 64 L148 152 Q100 164 52 152 Z", c) +
      shape("M64 64 L42 72 L32 138 L52 143 L58 102 Z", c) +
      shape("M136 64 L158 72 L168 138 L148 143 L142 102 Z", c) +
      shape("M78 44 Q100 36 122 44 L120 58 Q100 64 80 58 Z", mix(c, "#fff", .06)) +
      [82, 102, 122, 142].map(y => line(`M${56 - (y - 82) * .06} ${y} Q100 ${y + 8} ${144 + (y - 82) * .06} ${y}`, d, 1.4, .8)).join("") +
      line("M100 60 V158", ACCENT, 1.6) +
      `<text x="118" y="92" font-size="6" letter-spacing="1.5" fill="rgba(255,255,255,.55)" font-family="Manrope,sans-serif">PRIZ</text>`;
  },
  hoodie(c, d) {
    return shape("M62 70 L86 58 Q100 66 114 58 L138 70 L146 156 Q100 164 54 156 Z", c) +
      shape("M62 70 L38 84 L28 150 L48 154 L56 108 Z", c) +
      shape("M138 70 L162 84 L172 150 L152 154 L144 108 Z", c) +
      shape("M80 60 Q78 34 100 32 Q122 34 120 60 Q100 74 80 60 Z", mix(c, "#fff", .05)) +
      shape("M84 118 H116 L120 142 H80 Z", d, 'opacity=".55"') +
      line("M94 66 V96", "rgba(255,255,255,.7)", 1.4) + line("M106 66 V92", "rgba(255,255,255,.7)", 1.4) +
      `<text x="100" y="108" font-size="6" text-anchor="middle" letter-spacing="2" fill="rgba(255,255,255,.6)" font-family="Manrope,sans-serif">PRIZ</text>` +
      line("M50 152 H150", d, 2, .7);
  },
  pants(c, d) {
    return shape("M68 26 H132 L142 122 L132 176 H106 L100 84 L94 176 H68 L58 122 Z", c) +
      shape("M68 26 H132 V40 H68 Z", mix(c, "#fff", .08)) +
      shape("M68 168 H94 V178 H68 Z", d) + shape("M106 168 H132 V178 H106 Z", d) +
      shape("M64 96 H82 V116 H64 Z", d, 'opacity=".6"') + shape("M118 96 H136 V116 H118 Z", d, 'opacity=".6"') +
      line("M100 40 V84", d, 1.2) + line("M76 40 L70 168", ACCENT, 1.6, .9);
  },
  tights(c, d) {
    return shape("M72 26 H128 L134 90 L124 176 H106 L100 96 L94 176 H76 L66 90 Z", c) +
      shape("M72 26 H128 V38 H72 Z", mix(c, "#fff", .1)) +
      line("M76 40 Q70 100 80 174", ACCENT, 1.8) + line("M124 40 Q130 100 120 174", ACCENT, 1.8) +
      line("M100 40 V96", d, 1.2, .7);
  },
  shorts(c, d) {
    return shape("M62 58 H138 L148 128 H106 L100 98 L94 128 H52 Z", c) +
      shape("M62 58 H138 V72 H62 Z", mix(c, "#fff", .1)) +
      line("M100 72 V98", d, 1.2) + line("M56 116 H98", ACCENT, 1.6) + line("M102 116 H144", ACCENT, 1.6) +
      line("M78 64 Q100 70 122 64", "rgba(255,255,255,.6)", 1.2);
  },
  tee(c, d) {
    return shape("M70 52 L90 44 Q100 54 110 44 L130 52 L162 80 L148 100 L132 88 V152 H68 V88 L52 100 L38 80 Z", c) +
      line("M90 44 Q100 54 110 44", d, 2.2) +
      `<text x="100" y="86" font-size="7" text-anchor="middle" letter-spacing="2.5" fill="rgba(255,255,255,.6)" font-family="Manrope,sans-serif">PRIZ</text>` +
      line("M68 146 H132", ACCENT, 1.6);
  },
  top(c, d) {
    return shape("M78 52 L88 46 Q100 70 112 46 L122 52 L124 88 Q130 112 122 128 Q100 138 78 128 Q70 112 76 88 Z", c) +
      shape("M80 118 Q100 130 120 118 V128 Q100 138 80 128 Z", d, 'opacity=".7"') +
      line("M88 46 L84 30", c, 5) + line("M112 46 L116 30", c, 5) +
      line("M100 82 V116", ACCENT, 1.4, .8);
  },
  sneaker(c, d) {
    const sole = "#f3f0fa";
    return shape("M26 140 H178 Q186 140 184 150 Q180 160 166 160 H44 Q26 160 26 148 Z", sole) +
      shape("M32 140 L34 98 Q40 90 56 92 Q70 96 80 100 L92 82 Q100 78 108 84 L124 100 Q152 106 172 126 Q182 132 180 142 Z", c) +
      shape("M34 118 Q36 100 52 98 Q64 100 72 106 L64 140 H36 Z", mix(c, "#000", .3), 'opacity=".6"') +
      `<path d="M38 132 Q92 108 156 124" fill="none" stroke="${ACCENT}" stroke-width="7" stroke-linecap="round"/>` +
      line("M94 90 L106 100 M102 86 L114 98 M110 90 L122 102", "rgba(255,255,255,.85)", 1.8) +
      line("M30 152 H176", "rgba(0,0,0,.22)", 1.4);
  },
  cap(c, d) {
    return shape("M48 116 Q48 58 100 56 Q152 58 152 116 Z", c) +
      shape("M44 114 Q104 104 180 122 Q172 138 150 132 Q100 118 44 128 Z", d) +
      line("M100 58 V114", "rgba(255,255,255,.14)", 1) +
      `<text x="100" y="98" font-size="9" text-anchor="middle" letter-spacing="3" fill="rgba(255,255,255,.75)" font-family="Manrope,sans-serif">PRIZ</text>` +
      `<circle cx="100" cy="58" r="3" fill="${ACCENT}"/>`;
  }
};

function productArt(p, colorIndex = 0, cls = "") {
  const col = p.colors[colorIndex] || p.colors[0];
  const c = col.hex, d = mix(c, "#000", .35);
  return `<svg class="art ${cls}" viewBox="0 0 200 200" role="img" aria-label="${p.name}, ${col.name.toLowerCase()}">${ART[p.kind](c, d)}</svg>`;
}
