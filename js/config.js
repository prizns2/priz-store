// Настройки магазина PRIZ.
// Чтобы заказы попадали в Supabase, вставьте URL проекта и publishable (anon) ключ.
// Пока поля пустые, сайт работает в демо-режиме: заказы сохраняются только в браузере.
window.PRIZ_CONFIG = {
  SUPABASE_URL: "https://cnadszrurihjswamvbpp.supabase.co",
  SUPABASE_KEY: "sb_publishable_-Y4mxOiSnM4-BSyg_rWsMQ_d_FG6PWc",   // publishable / anon ключ (его безопасно держать на сайте)
  TG_USERNAME: "priznss",   // Telegram менеджера (без @)
  currency: "₴",
  freeShippingFrom: 3000
};
