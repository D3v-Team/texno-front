import { L } from '../i18n/LangContext';

/**
 * ⚙️ ASOSIY SOZLAMALAR — saytni ishga tushirishdan oldin shu yerdagi
 * kontakt ma'lumotlari va statistikani haqiqiy qiymatlarga almashtiring.
 */
export const SITE = {
  name: L('Сирдарё вилояти Ёшлар технопарки', 'Молодёжный технопарк Сырдарьинской области'),
  shortName: L('Ёшлар технопарки', 'Молодёжный технопарк'),
  region: L('Сирдарё вилояти', 'Сырдарьинская область'),
  url: 'https://startap-texnopark.netlify.app',

  // TODO: haqiqiy kontaktlarni kiriting
  phone: '+998 67 000 00 00',
  phoneHref: 'tel:+998670000000',
  email: 'info@sirdaryo-texnopark.uz',
  telegram: 'https://t.me/sirdaryo_texnopark',
  telegramHandle: '@sirdaryo_texnopark',
  address: L('Гулистон шаҳри, Сирдарё вилояти, Ўзбекистон', 'г. Гулистан, Сырдарьинская область, Узбекистан'),
  workHours: L('Душ–Жум: 09:00–18:00 · Шанба: 10:00–15:00', 'Пн–Пт: 09:00–18:00 · Сб: 10:00–15:00'),
  map: {
    lat: 40.4897,
    lon: 68.7842,
    embed:
      'https://www.openstreetmap.org/export/embed.html?bbox=68.7642%2C40.4807%2C68.8042%2C40.4987&layer=mapnik&marker=40.4897%2C68.7842',
    link: 'https://www.openstreetmap.org/?mlat=40.4897&mlon=68.7842#map=15/40.4897/68.7842',
  },
  socials: [
    { id: 'telegram', label: 'Telegram', href: 'https://t.me/sirdaryo_texnopark' },
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/sirdaryo_texnopark' },
    { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/sirdaryo.texnopark' },
    { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/@sirdaryo_texnopark' },
  ],
};

export const NAV = [
  { to: '/biznes', label: L('Бизнес учун', 'Для бизнеса'), highlight: true },
  { to: '/muammolar', label: L('Муаммолар биржаси', 'Биржа задач') },
  { to: '/startaplar', label: L('Стартаплар', 'Стартапам') },
  { to: '/infratuzilma', label: L('Лабораториялар', 'Лаборатории') },
  { to: '/investorlar', label: L('Инвесторлар', 'Инвесторам') },
  { to: '/haqida', label: L('Биз ҳақимизда', 'О нас') },
];

/** Asosiy ko'rsatkichlar (TODO: haqiqiy raqamlar bilan yangilang) */
export const STATS = [
  { value: 48, suffix: '', label: L('резидент стартап', 'стартапов-резидентов') },
  { value: 126, suffix: '', label: L('бизнес муаммоси қабул қилинди', 'бизнес-задач принято') },
  { value: 34, suffix: '', label: L('пилот лойиҳа', 'пилотных проекта') },
  { value: 4.2, suffix: L(' млрд', ' млрд'), decimals: 1, label: L('сўм инвестиция жалб қилинди', 'сум инвестиций привлечено') },
];

export const RESPONSE_DAYS = 3;
