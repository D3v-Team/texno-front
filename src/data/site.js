import { L } from '../i18n/LangContext';

/**
 * ⚙️ ASOSIY SOZLAMALAR — saytni ishga tushirishdan oldin shu yerdagi
 * kontakt ma'lumotlari va statistikani haqiqiy qiymatlarga almashtiring.
 */
export const SITE = {
  name: L('Гулистон ёшлар технопарки', 'Гулистанский молодёжный технопарк'),
  shortName: L('Гулистон ёшлар технопарки', 'Молодёжный технопарк Гулистан'),
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

/** Asosiy menyu. `mega: 'directions'` — 6 yo'nalishli ochiluvchi panel; `children` — oddiy ochiluvchi ro'yxat */
export const NAV = [
  { id: 'dirs', to: '/yonalishlar', label: L('Йўналишлар', 'Направления'), mega: 'directions' },
  { id: 'innox', to: '/innox', label: 'InnoX', badge: true },
  { id: 'biz', to: '/biznes', label: L('Бизнес учун', 'Для бизнеса'), highlight: true },
  { id: 'birja', to: '/muammolar', label: L('Муаммолар банки', 'Банк задач') },
  {
    id: 'park',
    label: L('Технопарк', 'Технопарк'),
    children: [
      { to: '/startaplar', icon: 'Lightbulb', label: L('Стартаплар', 'Стартапам'), desc: L('Дастурлар ва ариза', 'Программы и заявка') },
      { to: '/infratuzilma', icon: 'FlaskConical', label: L('Лабораториялар', 'Лаборатории'), desc: L('3D режа ва бронлаш', '3D-план и бронирование') },
      { to: '/investorlar', icon: 'Handshake', label: L('Инвесторлар', 'Инвесторам'), desc: L('Бизнес клуб', 'Бизнес-клуб') },
      { to: '/haqida', icon: 'Building2', label: L('Биз ҳақимизда', 'О нас'), desc: L('Экотизим ва алоқа', 'Экосистема и контакты') },
    ],
  },
];

/** Footer va mobil menyu uchun tekis ro'yxat */
export const NAV_FLAT = [
  { to: '/yonalishlar', label: L('Йўналишлар', 'Направления') },
  { to: '/innox', label: 'InnoX' },
  { to: '/biznes', label: L('Бизнес учун', 'Для бизнеса') },
  { to: '/muammolar', label: L('Муаммолар банки', 'Банк задач') },
  { to: '/startaplar', label: L('Стартаплар', 'Стартапам') },
  { to: '/infratuzilma', label: L('Лабораториялар', 'Лаборатории') },
  { to: '/investorlar', label: L('Инвесторлар', 'Инвесторам') },
  { to: '/haqida', label: L('Биз ҳақимизда', 'О нас') },
];

/** Asosiy ko'rsatkichlar — «Yo'l xaritasi 2026» maqsadlari (2026 yil yakuniga qadar) */
export const STATS = [
  { value: 800, suffix: '', label: L('ёш технопарк фаолиятига жалб этилади', 'молодых людей вовлекается в работу технопарка') },
  { value: 300, suffix: '', label: L('инновацион ва креатив ғоя аниқланади', 'инновационных и креативных идей') },
  { value: 35, suffix: '', label: L('стартап лойиҳа шакллантирилади', 'стартап-проектов формируется') },
  { value: 91, suffix: '', label: L('тадбир — 3 ойлик тақвимда', 'событие в 3-месячном календаре') },
];

export const RESPONSE_DAYS = 3;
