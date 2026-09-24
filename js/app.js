(function () {
  "use strict";

  const CFG = window.PRIZ_CONFIG || {};
  const CUR = CFG.currency || "₴";
  const FREE_FROM = CFG.freeShippingFrom || 3000;
  const app = document.getElementById("app");

  /* ---------- утилиты ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const fmt = n => new Intl.NumberFormat("ru-RU").format(n) + " " + CUR;
  const esc = s => String(s).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  const byId = id => PRODUCTS.find(p => p.id === id);
  const store = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* хранилище недоступно */ } }
  };

  let cart = store.get("priz_cart", []);   // { id, size, color, qty }
  let wish = store.get("priz_wish", []);   // [id]
  let pstate = { id: null, color: 0, gimg: 0, size: null, qty: 1, sizeGuide: false };

  /* ---------- компоненты ---------- */
  function heart(id) {
    const on = wish.includes(id);
    return `<button class="heart ${on ? "on" : ""}" data-action="wish" data-id="${id}" aria-label="${on ? "Убрать из избранного" : "В избранное"}" aria-pressed="${on}">
      <svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/></svg></button>`;
  }

  function badgeHtml(p) {
    if (!p.badge) return "";
    const cls = p.badge === "LIMITED" ? "tag tag-solid" : p.badge === "SALE" ? "tag tag-sale" : "tag";
    const text = { NEW: "Новинка", BESTSELLER: "Хит", LIMITED: "Лимит", SALE: "Sale" }[p.badge] || p.badge;
    return `<span class="${cls}">${text}</span>`;
  }

  function priceHtml(p) {
    return `<span class="price">${fmt(p.price)}</span>` + (p.oldPrice ? `<s class="price-old">${fmt(p.oldPrice)}</s>` : "");
  }

  function swatches(p, small) {
    return `<span class="swatches ${small ? "sm" : ""}">` +
      p.colors.map(c => `<i style="background:${c.hex}" title="${c.name}"></i>`).join("") + `</span>`;
  }

  function productImage(p, colorIndex, cls, imgIndex) {
    if (p.images && p.images.length) {
      return `<img class="photo ${cls || ""}" src="${esc(p.images[imgIndex || 0] || p.images[0])}" alt="${esc(p.name)}" loading="lazy">`;
    }
    return productArt(p, colorIndex, cls);
  }

  function card(p) {
    return `<article class="card" data-id="${p.id}">
      <a class="card-media" href="#/product/${p.id}" aria-label="${esc(p.name)}">
        ${productImage(p, 0)}
      </a>
      ${badgeHtml(p)}
      ${heart(p.id)}
      <div class="card-body">
        <a class="card-title" href="#/product/${p.id}">${p.name}</a>
        <div class="card-row">${priceHtml(p)}${swatches(p, true)}</div>
        <div class="card-buy">
          <div class="sizes sm" role="group" aria-label="Размер">
            ${p.sizes.map(s => `<button type="button" class="size" data-action="quick-size" data-size="${s}">${s}</button>`).join("")}
          </div>
          <button class="plus" data-action="quick-add" data-id="${p.id}" aria-label="Добавить в корзину">
            <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </article>`;
  }

  /* ---------- страницы ---------- */
  function viewHome() {
    const featured = PRODUCTS.filter(p => ["apex-run-jacket", "essentials-hoodie", "utility-jogger", "vortex-runner"].includes(p.id));
    return `
    <section class="hero">
      <div class="hero-media" aria-hidden="true"><img class="hero-photo" src="img/hero-model.jpg" alt="" loading="lazy"></div>
      <div class="hero-fade" aria-hidden="true"></div>
      <div class="hero-beam" aria-hidden="true"></div>
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Сильнее с каждым днём</p>
          <h1>Новая<br>коллекция<br><em>FW 26</em></h1>
          <a class="btn btn-ghost" href="#/catalog/new">Смотреть новинки <span aria-hidden="true">→</span></a>
        </div>
        <div class="hero-side">
          <p class="script">Не просто форма.<br>Новый уровень.</p>
          <div class="hero-mark">PRIZ<span>Люди</span><span>Места</span><span>Подход</span><span>Всегда вперёд</span></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head"><h2 class="label">Популярное сейчас</h2><a class="link-arrow" href="#/catalog/all">Весь каталог <span aria-hidden="true">→</span></a></div>
        <div class="grid grid-4">${featured.map(card).join("")}</div>
      </div>
    </section>

    <section class="lookbook">
      <div class="wrap look-grid">
        <div class="look-copy">
          <p class="eyebrow">Лукбук</p>
          <h2 class="display">Спорт<br>идёт дальше</h2>
          <p class="muted">Три сценария на один сезон: пробежка до рассвета, тренировка после работы и дорога домой в тёплом слое.</p>
          <a class="btn btn-outline" href="#/catalog/run">Собрать образ для бега <span aria-hidden="true">→</span></a>
        </div>
        <a class="look look-a" href="#/catalog/run"><span class="look-index">01 / 03</span><span class="look-tag">Рассвет</span><span class="look-name">Бег в 6:00</span></a>
        <a class="look look-b" href="#/catalog/gym"><span class="look-index">02 / 03</span><span class="look-tag">Вечер</span><span class="look-name">Зал после работы</span></a>
        <a class="look look-c" href="#/catalog/men"><span class="look-index">03 / 03</span><span class="look-tag">Город</span><span class="look-name">Дорога домой</span></a>
      </div>
    </section>

    <section class="perks">
      <div class="wrap perks-grid">
        <div><b>Бесплатная доставка</b><span class="muted">от ${fmt(FREE_FROM)}</span></div>
        <div><b>Обмен 14 дней</b><span class="muted">если не подошёл размер</span></div>
        <div><b>Оплата при получении</b><span class="muted">или переводом на карту</span></div>
        <div><b>Отправка за 24 часа</b><span class="muted">товары в наличии</span></div>
      </div>
    </section>`;
  }

  function viewCatalog(key, params) {
    const cat = CATEGORIES[key] || CATEGORIES.all;
    const q = (params.get("q") || "").trim().toLowerCase();
    const sort = params.get("sort") || "default";
    const size = params.get("size") || "";
    let list = PRODUCTS.filter(cat.test);
    if (q) list = list.filter(p => (p.name + " " + p.label + " " + p.desc).toLowerCase().includes(q));
    if (size) list = list.filter(p => p.sizes.includes(size));
    if (sort === "asc") list = list.slice().sort((a, b) => a.price - b.price);
    if (sort === "desc") list = list.slice().sort((a, b) => b.price - a.price);
    const allSizes = Array.from(new Set(PRODUCTS.flatMap(p => p.sizes))).filter(s => s !== "ONE SIZE");
    const base = `#/catalog/${key}`;
    const link = (over) => {
      const n = new URLSearchParams(params);
      Object.entries(over).forEach(([k, v]) => v ? n.set(k, v) : n.delete(k));
      const s = n.toString();
      return base + (s ? "?" + s : "");
    };
    return `
    <section class="page-head">
      <div class="wrap">
        <p class="crumbs"><a href="#/">Главная</a> / <span>${cat.title}</span></p>
        <h1 class="display sm">${q ? `Поиск: «${esc(q)}»` : cat.title}</h1>
        <p class="muted">${list.length} ${plural(list.length, "товар", "товара", "товаров")}</p>
      </div>
    </section>
    <section class="section tight">
      <div class="wrap">
        <div class="filters">
          <div class="chips" role="group" aria-label="Категории">
            ${Object.entries(CATEGORIES).map(([k, v]) => `<a class="chip ${k === key ? "on" : ""}" href="#/catalog/${k}">${v.title}</a>`).join("")}
          </div>
          <div class="filter-row">
            <div class="chips" role="group" aria-label="Размер">
              <span class="muted small">Размер</span>
              <a class="chip ${!size ? "on" : ""}" href="${link({ size: "" })}">Любой</a>
              ${allSizes.map(s => `<a class="chip ${size === s ? "on" : ""}" href="${link({ size: s })}">${s}</a>`).join("")}
            </div>
            <label class="select-wrap"><span class="muted small">Сортировка</span>
              <select id="sort-select" data-base="${base}" data-q="${esc(q)}" data-size="${esc(size)}">
                <option value="default" ${sort === "default" ? "selected" : ""}>По умолчанию</option>
                <option value="asc" ${sort === "asc" ? "selected" : ""}>Сначала дешёвые</option>
                <option value="desc" ${sort === "desc" ? "selected" : ""}>Сначала дорогие</option>
              </select>
            </label>
          </div>
        </div>
        ${list.length ? `<div class="grid grid-4">${list.map(card).join("")}</div>` :
          `<div class="empty"><p>Ничего не нашли по этим условиям.</p><a class="btn btn-outline" href="#/catalog/all">Сбросить фильтры</a></div>`}
      </div>
    </section>`;
  }

  function viewProduct(id) {
    const p = byId(id);
    if (!p) return viewNotFound();
    if (pstate.id !== id) pstate = { id, color: 0, gimg: 0, size: null, qty: 1, sizeGuide: false };
    const col = p.colors[pstate.color];
    const related = PRODUCTS.filter(x => x.id !== id && (x.cat === p.cat || x.gender === p.gender)).slice(0, 4);
    const gender = { men: "Мужское", women: "Женское", unisex: "Унисекс" }[p.gender];
    const gallery = p.images && p.images.length > 1;
    const thumbs = gallery
      ? p.images.map((src, i) => `<button class="thumb photo-thumb ${i === pstate.gimg ? "on" : ""}" data-action="gimg" data-i="${i}" aria-label="Фото ${i + 1}"><img src="${esc(src)}" alt="" loading="lazy"></button>`).join("")
      : p.colors.map((c, i) => `<button class="thumb ${i === pstate.color ? "on" : ""}" data-action="color" data-i="${i}" aria-label="${c.name}">${productArt(p, i)}</button>`).join("");
    const stageIdx = gallery ? pstate.gimg : pstate.color;
    const stageTotal = gallery ? p.images.length : p.colors.length;
    return `
    <section class="wrap product">
      <p class="crumbs"><a href="#/">Главная</a> / <a href="#/catalog/${p.cat}">${CATEGORIES[p.cat].title}</a> / <span>${p.name}</span></p>
      <div class="product-grid">
        <div class="gallery">
          <div class="thumbs">${thumbs}</div>
          <div class="stage">
            <span class="stage-count">${String(stageIdx + 1).padStart(2, "0")} / ${String(stageTotal).padStart(2, "0")}</span>
            <span class="stage-note" aria-hidden="true">Создано<br>для<br>движения</span>
            ${gallery ? `<button class="stage-nav prev" data-action="gnav" data-d="-1" aria-label="Предыдущее фото">‹</button><button class="stage-nav next" data-action="gnav" data-d="1" aria-label="Следующее фото">›</button>` : ""}
            ${productImage(p, pstate.color, "stage-art", stageIdx)}
          </div>
        </div>
        <div class="info">
          <div class="info-top"><p class="eyebrow">${gender} · ${p.label}</p>${badgeHtml(p)}</div>
          <h1 class="display sm">${p.name}</h1>
          <div class="price-line">${priceHtml(p)}</div>
          <p class="lead">${p.desc}</p>

          <div class="opt">
            <div class="opt-head"><span class="label">Цвет</span><span class="muted">${col.name}</span></div>
            <div class="swatch-pick">${p.colors.map((c, i) => `<button class="sw ${i === pstate.color ? "on" : ""}" data-action="color" data-i="${i}" style="--c:${c.hex}" aria-label="${c.name}" aria-pressed="${i === pstate.color}"></button>`).join("")}</div>
          </div>

          <div class="opt-row">
            <div class="opt grow">
              <div class="opt-head"><span class="label">Размер</span><button class="text-btn" data-action="size-guide">Таблица размеров</button></div>
              <div class="sizes" id="size-pick" role="group" aria-label="Размер">
                ${p.sizes.map(s => `<button class="size ${pstate.size === s ? "on" : ""}" data-action="pick-size" data-size="${s}">${s}</button>`).join("")}
              </div>
              <p class="field-error" id="size-error" hidden>Выберите размер, чтобы добавить товар в корзину.</p>
            </div>
            <div class="opt">
              <div class="opt-head"><span class="label">Количество</span></div>
              <div class="qty"><button data-action="qty" data-d="-1" aria-label="Меньше">−</button><output>${pstate.qty}</output><button data-action="qty" data-d="1" aria-label="Больше">+</button></div>
            </div>
          </div>
          ${pstate.sizeGuide ? sizeGuide(p) : ""}

          <p class="stock"><i></i> В наличии <span class="muted">· отправим в течение 24 часов</span></p>
          <div class="buy-row">
            <button class="btn btn-primary" data-action="add-full">Добавить в корзину</button>
            <button class="btn btn-outline wish-btn ${wish.includes(p.id) ? "on" : ""}" data-action="wish" data-id="${p.id}">${wish.includes(p.id) ? "В избранном" : "В избранное"}</button>
          </div>
          <div class="ship-note">Бесплатная доставка от ${fmt(FREE_FROM)}. Обмен и возврат в течение 14 дней.</div>

          <div class="acc">
            <details><summary>Материалы и состав</summary><p>${p.materials}</p></details>
            <details><summary>Уход</summary><p>${p.care}</p></details>
            <details><summary>Доставка</summary><p>Курьер, отделение почты или самовывоз. Доставка от 1 до 3 дней, оплата при получении или переводом.</p></details>
            <details><summary>Возврат и обмен</summary><p>Можно обменять или вернуть товар в течение 14 дней, если он не был в использовании и сохранены бирки.</p></details>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="section-head"><h2 class="label">Вам может понравиться</h2><a class="link-arrow" href="#/catalog/all">Весь каталог <span aria-hidden="true">→</span></a></div>
        <div class="grid grid-4">${related.map(card).join("")}</div>
      </div>
    </section>
    <section class="banner">
      <div class="wrap banner-inner">
        <div class="banner-copy">
          <p class="eyebrow">PRIZ</p>
          <h2 class="display sm">Другие<br>ракурсы</h2>
          <p class="muted">Высокий стандарт.</p>
          <a class="btn btn-outline" href="#/catalog/all">Смотреть коллекцию <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>`;
  }

  function sizeGuide(p) {
    if (p.kind === "sneaker") {
      return `<div class="guide"><table><thead><tr><th>EU</th><th>40</th><th>41</th><th>42</th><th>43</th><th>44</th><th>45</th></tr></thead>
        <tbody><tr><td>Стопа, см</td><td>25,5</td><td>26,2</td><td>27</td><td>27,8</td><td>28,5</td><td>29,3</td></tr></tbody></table></div>`;
    }
    if (p.kind === "cap") return `<div class="guide"><p class="muted">Кепка регулируется сзади, обхват головы 54–62 см.</p></div>`;
    return `<div class="guide"><table><thead><tr><th>Размер</th><th>S</th><th>M</th><th>L</th><th>XL</th></tr></thead>
      <tbody><tr><td>Грудь, см</td><td>90–96</td><td>96–102</td><td>102–108</td><td>108–114</td></tr>
      <tr><td>Талия, см</td><td>74–80</td><td>80–86</td><td>86–92</td><td>92–98</td></tr>
      <tr><td>Бёдра, см</td><td>94–100</td><td>100–106</td><td>106–112</td><td>112–118</td></tr></tbody></table></div>`;
  }

  function viewWishlist() {
    const list = wish.map(byId).filter(Boolean);
    return `
    <section class="page-head"><div class="wrap">
      <p class="crumbs"><a href="#/">Главная</a> / <span>Избранное</span></p>
      <h1 class="display sm">Избранное</h1></div></section>
    <section class="section tight"><div class="wrap">
      ${list.length ? `<div class="grid grid-4">${list.map(card).join("")}</div>` :
        `<div class="empty"><p>Здесь появятся товары, которые вы отметили сердечком.</p><a class="btn btn-outline" href="#/catalog/all">Перейти в каталог</a></div>`}
    </div></section>`;
  }

  const DELIVERY = {
    courier: { name: "Курьер по адресу", price: 150 },
    post:    { name: "Отделение почты", price: 90 },
    pickup:  { name: "Самовывоз", price: 0 }
  };
  let checkoutState = { delivery: "post" };

  function totals() {
    const sub = cart.reduce((s, l) => s + byId(l.id).price * l.qty, 0);
    return { sub, count: cart.reduce((s, l) => s + l.qty, 0) };
  }
  function shippingFor(sub, method) {
    if (sub >= FREE_FROM) return 0;
    return DELIVERY[method].price;
  }

  function viewCheckout() {
    if (!cart.length) {
      return `<section class="page-head"><div class="wrap"><h1 class="display sm">Оформление заказа</h1></div></section>
        <section class="section tight"><div class="wrap"><div class="empty"><p>Корзина пуста. Добавьте товары, чтобы оформить заказ.</p><a class="btn btn-outline" href="#/catalog/all">В каталог</a></div></div></section>`;
    }
    const t = totals();
    const ship = shippingFor(t.sub, checkoutState.delivery);
    return `
    <section class="page-head"><div class="wrap">
      <p class="crumbs"><a href="#/">Главная</a> / <span>Оформление заказа</span></p>
      <h1 class="display sm">Оформление заказа</h1></div></section>
    <section class="section tight"><div class="wrap checkout">
      <form id="order-form" novalidate>
        <fieldset><legend class="label">Контакты</legend>
          <div class="field"><label for="f-name">Имя и фамилия</label><input id="f-name" name="name" autocomplete="name" required maxlength="100"><p class="field-error" data-for="name" hidden></p></div>
          <div class="field"><label for="f-phone">Телефон</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" placeholder="+380 __ ___ __ __" required maxlength="30"><p class="field-error" data-for="phone" hidden></p></div>
        </fieldset>
        <fieldset><legend class="label">Доставка</legend>
          <div class="radio-list">
            ${Object.entries(DELIVERY).map(([k, v]) => `
              <label class="radio ${checkoutState.delivery === k ? "on" : ""}">
                <input type="radio" name="delivery" value="${k}" ${checkoutState.delivery === k ? "checked" : ""}>
                <span>${v.name}</span><em>${v.price ? fmt(v.price) : "бесплатно"}</em>
              </label>`).join("")}
          </div>
          <div id="address-block" ${checkoutState.delivery === "pickup" ? "hidden" : ""}>
            <div class="field"><label for="f-city">Город</label><input id="f-city" name="city" autocomplete="address-level2" maxlength="100"><p class="field-error" data-for="city" hidden></p></div>
            <div class="field"><label for="f-address">Адрес или номер отделения</label><input id="f-address" name="address" autocomplete="street-address" maxlength="300"><p class="field-error" data-for="address" hidden></p></div>
          </div>
        </fieldset>
        <fieldset><legend class="label">Комментарий</legend>
          <div class="field"><label for="f-comment">Пожелания к заказу (необязательно)</label><textarea id="f-comment" name="comment" rows="3" maxlength="500"></textarea></div>
        </fieldset>
        <p class="muted small">Оплата при получении или переводом. Менеджер свяжется с вами для подтверждения заказа.</p>
        <p class="field-error" id="form-error" hidden></p>
        <button class="btn btn-primary wide" type="submit" id="submit-btn">Подтвердить заказ</button>
      </form>
      <aside class="summary" id="summary">${summaryHtml()}</aside>
    </div></section>`;
  }

  function summaryHtml() {
    const t = totals();
    const ship = shippingFor(t.sub, checkoutState.delivery);
    return `<h2 class="label">Ваш заказ</h2>
      <ul class="sum-list">${cart.map(l => {
        const p = byId(l.id);
        return `<li><span class="sum-art">${productArt(p, l.color)}</span>
          <span class="sum-info"><b>${p.name}</b><span class="muted small">${p.colors[l.color].name}, ${l.size} × ${l.qty}</span></span>
          <span>${fmt(p.price * l.qty)}</span></li>`;
      }).join("")}</ul>
      <dl class="sum-total">
        <div><dt>Товары</dt><dd>${fmt(t.sub)}</dd></div>
        <div><dt>Доставка</dt><dd>${ship ? fmt(ship) : "бесплатно"}</dd></div>
        <div class="grand"><dt>Итого</dt><dd>${fmt(t.sub + ship)}</dd></div>
      </dl>`;
  }

  function viewDone(order) {
    return `<section class="page-head"><div class="wrap done">
      <p class="eyebrow">Заказ принят</p>
      <h1 class="display sm">Спасибо, ${esc(order.name.split(" ")[0])}!</h1>
      <p class="lead">Номер заказа <b>${esc(order.no)}</b>. Мы свяжемся с вами по номеру ${esc(order.phone)} и подтвердим доставку.</p>
      ${order.demo ? `<p class="notice">Демо-режим: заказ сохранён только в этом браузере. Чтобы заказы приходили в базу, подключите Supabase в файле js/config.js.</p>` : ""}
      ${CFG.TG_USERNAME ? `<p class="muted">Чтобы быстрее согласовать оплату и доставку, напишите нам в Telegram — сообщение с заказом уже подготовлено.</p>
      <a class="btn btn-primary" href="https://t.me/${esc(CFG.TG_USERNAME)}?text=${encodeURIComponent(order.tgText)}" target="_blank" rel="noopener">Написать в Telegram <span aria-hidden="true">→</span></a> ` : ""}
      <a class="btn btn-outline" href="#/catalog/all">Продолжить покупки</a>
    </div></section>`;
  }

  function viewNotFound() {
    return `<section class="page-head"><div class="wrap"><h1 class="display sm">Страница не найдена</h1>
      <p class="muted">Такой страницы нет, но в каталоге много интересного.</p>
      <a class="btn btn-outline" href="#/">На главную</a></div></section>`;
  }

  function plural(n, a, b, c) {
    const m = n % 100, d = n % 10;
    if (m > 10 && m < 20) return c;
    if (d === 1) return a;
    if (d > 1 && d < 5) return b;
    return c;
  }

  /* ---------- маршрутизация ---------- */
  function route() {
    const raw = location.hash.replace(/^#/, "") || "/";
    const [path, query] = raw.split("?");
    const params = new URLSearchParams(query || "");
    const seg = path.split("/").filter(Boolean);
    let html;
    if (!seg.length) html = viewHome();
    else if (seg[0] === "catalog") html = viewCatalog(seg[1] && CATEGORIES[seg[1]] ? seg[1] : "all", params);
    else if (seg[0] === "product") html = viewProduct(seg[1]);
    else if (seg[0] === "wishlist") html = viewWishlist();
    else if (seg[0] === "checkout") html = viewCheckout();
    else html = viewNotFound();
    app.innerHTML = html;
    document.title = seg[0] === "product" && byId(seg[1]) ? `${byId(seg[1]).name} — PRIZ` : "PRIZ — спортивная одежда";
    $$("#nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + path));
    closeMenu();
    closeCart();
    window.scrollTo(0, 0);
  }

  function rerender() {
    const y = window.scrollY;
    const raw = location.hash.replace(/^#/, "") || "/";
    const [path, query] = raw.split("?");
    const seg = path.split("/").filter(Boolean);
    if (seg[0] === "product") app.innerHTML = viewProduct(seg[1]);
    else if (seg[0] === "catalog") app.innerHTML = viewCatalog(seg[1] && CATEGORIES[seg[1]] ? seg[1] : "all", new URLSearchParams(query || ""));
    else if (seg[0] === "wishlist") app.innerHTML = viewWishlist();
    else if (!seg.length) app.innerHTML = viewHome();
    window.scrollTo(0, y);
  }

  /* ---------- корзина ---------- */
  function saveCart() { store.set("priz_cart", cart); updateCounts(); renderDrawer(); }
  function saveWish() { store.set("priz_wish", wish); updateCounts(); }

  function updateCounts() {
    const n = totals().count;
    const cc = $("#cart-count"), wc = $("#wish-count");
    cc.textContent = n; cc.hidden = !n;
    wc.textContent = wish.length; wc.hidden = !wish.length;
  }

  function addToCart(id, size, colorIdx, qty) {
    const found = cart.find(l => l.id === id && l.size === size && l.color === colorIdx);
    if (found) found.qty = Math.min(20, found.qty + qty);
    else cart.push({ id, size, color: colorIdx, qty });
    saveCart();
    toast(`${byId(id).name} добавлен в корзину`);
  }

  function renderDrawer() {
    const d = $("#cart-drawer");
    const t = totals();
    const left = Math.max(0, FREE_FROM - t.sub);
    const pct = Math.min(100, Math.round(t.sub / FREE_FROM * 100));
    d.innerHTML = `
      <div class="drawer-head"><h2 class="label">Корзина${t.count ? ` (${t.count})` : ""}</h2><button class="icon-btn" data-action="close-cart" aria-label="Закрыть"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
      ${cart.length ? `
        <div class="ship-bar"><p class="small">${left ? `До бесплатной доставки осталось ${fmt(left)}` : "Доставка для вас бесплатная"}</p><div class="bar"><i style="width:${pct}%"></i></div></div>
        <ul class="lines">${cart.map((l, i) => {
          const p = byId(l.id);
          return `<li class="line">
            <a class="line-art" href="#/product/${p.id}" data-action="close-cart">${productArt(p, l.color)}</a>
            <div class="line-info">
              <a href="#/product/${p.id}" data-action="close-cart"><b>${p.name}</b></a>
              <span class="muted small">${p.colors[l.color].name}, размер ${l.size}</span>
              <div class="qty sm"><button data-action="line-qty" data-i="${i}" data-d="-1" aria-label="Меньше">−</button><output>${l.qty}</output><button data-action="line-qty" data-i="${i}" data-d="1" aria-label="Больше">+</button></div>
            </div>
            <div class="line-side"><span>${fmt(p.price * l.qty)}</span><button class="text-btn" data-action="line-del" data-i="${i}">Удалить</button></div>
          </li>`;
        }).join("")}</ul>
        <div class="drawer-foot"><div class="sub"><span>Сумма</span><b>${fmt(t.sub)}</b></div>
          <a class="btn btn-primary wide" href="#/checkout" data-action="close-cart">Оформить заказ</a></div>`
      : `<div class="drawer-empty"><p>В корзине пока пусто.</p><a class="btn btn-outline" href="#/catalog/all" data-action="close-cart">Перейти в каталог</a></div>`}`;
  }

  function openCart() { renderDrawer(); $("#cart-drawer").classList.add("open"); $("#cart-drawer").setAttribute("aria-hidden", "false"); $("#overlay").hidden = false; document.body.classList.add("lock"); }
  function closeCart() { $("#cart-drawer").classList.remove("open"); $("#cart-drawer").setAttribute("aria-hidden", "true"); $("#overlay").hidden = true; document.body.classList.remove("lock"); }
  function closeMenu() { document.body.classList.remove("menu-open"); const b = $(".menu-btn"); if (b) b.setAttribute("aria-expanded", "false"); }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------- заказ ---------- */
  async function placeOrder(data) {
    const t = totals();
    const ship = shippingFor(t.sub, data.delivery);
    const id = (crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16); }));
    const no = "PZ-" + id.replace(/-/g, "").slice(0, 6).toUpperCase();
    const order = {
      id, order_no: no, customer_name: data.name, phone: data.phone,
      city: data.city || null, delivery: data.delivery, address: data.address || null,
      comment: data.comment || null, total: t.sub + ship
    };
    const items = cart.map(l => ({
      order_id: id, product_id: l.id, product_name: byId(l.id).name,
      size: l.size, color: byId(l.id).colors[l.color].name, qty: l.qty, price: byId(l.id).price
    }));

    if (CFG.SUPABASE_URL && CFG.SUPABASE_KEY) {
      const headers = {
        apikey: CFG.SUPABASE_KEY, Authorization: "Bearer " + CFG.SUPABASE_KEY,
        "Content-Type": "application/json", Prefer: "return=minimal"
      };
      const base = CFG.SUPABASE_URL.replace(/\/$/, "") + "/rest/v1/";
      const r1 = await fetch(base + "shop_orders", { method: "POST", headers, body: JSON.stringify(order) });
      if (!r1.ok) throw new Error("orders " + r1.status);
      const r2 = await fetch(base + "shop_order_items", { method: "POST", headers, body: JSON.stringify(items) });
      if (!r2.ok) throw new Error("items " + r2.status);
    } else {
      const all = store.get("priz_orders", []);
      all.push({ ...order, items, created_at: new Date().toISOString() });
      store.set("priz_orders", all);
    }
    const deliveryName = { courier: "Курьер", post: "Отделение почты", pickup: "Самовывоз" }[data.delivery] || data.delivery;
    const lines = items.map(i => `• ${i.product_name}, ${i.color}, ${i.size} × ${i.qty} — ${fmt(i.price * i.qty)}`);
    const tgText = [
      `Здравствуйте! Мой заказ ${no}:`, ...lines,
      `Доставка: ${deliveryName}${data.city ? ", " + data.city : ""}${data.address ? ", " + data.address : ""}`,
      `Итого: ${fmt(order.total)}`,
      `${data.name}, ${data.phone}`
    ].join("\n");
    return { no, name: data.name, phone: data.phone, tgText, demo: !(CFG.SUPABASE_URL && CFG.SUPABASE_KEY) };
  }

  function validate(form) {
    const f = Object.fromEntries(new FormData(form).entries());
    const errs = {};
    if ((f.name || "").trim().length < 2) errs.name = "Введите имя и фамилию.";
    if ((f.phone || "").replace(/\D/g, "").length < 9) errs.phone = "Введите номер телефона, минимум 9 цифр.";
    if (f.delivery !== "pickup") {
      if (!(f.city || "").trim()) errs.city = "Укажите город.";
      if (!(f.address || "").trim()) errs.address = "Укажите адрес или номер отделения.";
    }
    return { f, errs };
  }

  /* ---------- события ---------- */
  document.addEventListener("click", e => {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const a = el.dataset.action;

    if (a === "open-cart") return openCart();
    if (a === "close-cart") return closeCart();
    if (a === "toggle-menu") {
      const on = document.body.classList.toggle("menu-open");
      el.setAttribute("aria-expanded", String(on));
      return;
    }
    if (a === "toggle-search") {
      const bar = $("#search-bar"); bar.hidden = !bar.hidden;
      if (!bar.hidden) $("#search-input").focus();
      return;
    }
    if (a === "wish") {
      const id = el.dataset.id;
      wish = wish.includes(id) ? wish.filter(x => x !== id) : wish.concat(id);
      saveWish(); rerender();
      return;
    }
    if (a === "quick-size") {
      $$(".size", el.parentElement).forEach(b => b.classList.toggle("on", b === el));
      return;
    }
    if (a === "quick-add") {
      const cardEl = el.closest(".card");
      const sel = $(".size.on", cardEl);
      if (!sel) {
        cardEl.classList.add("need-size");
        toast("Выберите размер");
        setTimeout(() => cardEl.classList.remove("need-size"), 1400);
        return;
      }
      addToCart(el.dataset.id, sel.dataset.size, 0, 1);
      return;
    }
    if (a === "color") { pstate.color = +el.dataset.i; rerender(); return; }
    if (a === "gimg") { pstate.gimg = +el.dataset.i; rerender(); return; }
    if (a === "gnav") { const n = byId(pstate.id).images.length; pstate.gimg = (pstate.gimg + +el.dataset.d + n) % n; rerender(); return; }
    if (a === "pick-size") { pstate.size = el.dataset.size; rerender(); return; }
    if (a === "size-guide") { pstate.sizeGuide = !pstate.sizeGuide; rerender(); return; }
    if (a === "qty") { pstate.qty = Math.max(1, Math.min(20, pstate.qty + +el.dataset.d)); rerender(); return; }
    if (a === "add-full") {
      if (!pstate.size) { const er = $("#size-error"); er.hidden = false; $("#size-pick").classList.add("shake"); setTimeout(() => $("#size-pick") && $("#size-pick").classList.remove("shake"), 500); return; }
      addToCart(pstate.id, pstate.size, pstate.color, pstate.qty);
      openCart();
      return;
    }
    if (a === "line-qty") {
      const l = cart[+el.dataset.i]; l.qty = Math.max(1, Math.min(20, l.qty + +el.dataset.d)); saveCart(); return;
    }
    if (a === "line-del") { cart.splice(+el.dataset.i, 1); saveCart(); return; }
  });

  document.addEventListener("change", e => {
    if (e.target.id === "sort-select") {
      const s = e.target, n = new URLSearchParams();
      if (s.value !== "default") n.set("sort", s.value);
      if (s.dataset.q) n.set("q", s.dataset.q);
      if (s.dataset.size) n.set("size", s.dataset.size);
      location.hash = s.dataset.base.replace(/^#/, "") + (n.toString() ? "?" + n : "");
    }
    if (e.target.name === "delivery") {
      checkoutState.delivery = e.target.value;
      $$(".radio").forEach(r => r.classList.toggle("on", $("input", r).checked));
      $("#address-block").hidden = e.target.value === "pickup";
      $("#summary").innerHTML = summaryHtml();
    }
  });

  document.addEventListener("submit", async e => {
    if (e.target.id === "search-bar") {
      e.preventDefault();
      const q = $("#search-input").value.trim();
      if (q) { location.hash = "/catalog/all?q=" + encodeURIComponent(q); $("#search-bar").hidden = true; }
      return;
    }
    if (e.target.id === "order-form") {
      e.preventDefault();
      const form = e.target;
      const { f, errs } = validate(form);
      $$(".field-error[data-for]", form).forEach(p => { p.hidden = true; });
      Object.entries(errs).forEach(([k, msg]) => { const p = $(`.field-error[data-for="${k}"]`, form); if (p) { p.textContent = msg; p.hidden = false; } });
      const formErr = $("#form-error"); formErr.hidden = true;
      if (Object.keys(errs).length) { const first = $(`[name="${Object.keys(errs)[0]}"]`, form); if (first) first.focus(); return; }
      const btn = $("#submit-btn"); btn.disabled = true; btn.textContent = "Отправляем...";
      try {
        const order = await placeOrder(f);
        cart = []; saveCart();
        app.innerHTML = viewDone(order);
        window.scrollTo(0, 0);
      } catch (err) {
        formErr.textContent = "Не удалось отправить заказ. Проверьте интернет и попробуйте ещё раз.";
        formErr.hidden = false;
        btn.disabled = false; btn.textContent = "Подтвердить заказ";
      }
    }
  });

  $("#overlay").addEventListener("click", closeCart);
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeCart(); closeMenu(); } });
  window.addEventListener("hashchange", route);
  window.addEventListener("scroll", () => $("#header").classList.toggle("scrolled", window.scrollY > 8), { passive: true });

  updateCounts();
  renderDrawer();
  route();
})();
