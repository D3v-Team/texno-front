import { L } from '../i18n/LangContext';

/**
 * Uch oylik tadbirlar taqvimi (19-oktabr — 31-dekabr 2026).
 * Manba: «Guliston yoshlar texnoparki — Yo'l xaritasi 2026» taqdimoti.
 *
 * oct  — oktabrdagi aniq sanalar
 * wk   — noyabr–dekabrda takrorlanadigan hafta kunlari (1 = dushanba … 5 = juma)
 * extra — qo'shimcha aniq sanalar
 * media.v — videolar (w — gorizontal, t — vertikal), media.p — fotolar soni
 *   fotolar: /public/media/<kalit>/pNN.jpg, video muqovalari: /public/media/<kalit>/vN.jpg
 *   videolar taqdimot serveridan olinadi (VIDEO_BASE)
 */
export const VIDEO_BASE = 'https://taqdimot.yito.uz/sirdaryo-taqdimot/assets/media';
export const CAL_YEAR = 2026;
export const CAL_MONTHS = [9, 10, 11]; // oktabr, noyabr, dekabr (0-indeks)
export const CAL_START_DAY = 19;

export const EVENT_KINDS = {
  innox: {
    color: '#a78bfa',
    dir: 3,
    title: L('«InnoX» бизнес-инкубатор ва акселератор', 'Бизнес-инкубатор и акселератор «InnoX»'),
    short: 'InnoX',
    when: L('Душанба · чоршанба · жума', 'Пн · Ср · Пт'),
    oct: [19, 21, 23, 26, 28, 30],
    wk: [1, 3, 5],
    media: { v: ['w'], p: 7 },
  },
  tanlov: {
    color: '#f472b6',
    dir: 2,
    title: L('Стартап ва инновацион танловлар', 'Стартап- и инновационные конкурсы'),
    short: L('Инновацион танловлар', 'Инновационные конкурсы'),
    when: L('Сешанба · жума', 'Вт · Пт'),
    oct: [20, 23, 27, 30],
    wk: [2, 5],
    media: { v: ['w', 't', 'w'], p: 9 },
  },
  olimlar: {
    color: '#34d399',
    dir: 5,
    title: L('Олимлар ва тадбиркорлар учрашуви', 'Встречи учёных и предпринимателей'),
    short: L('Олимлар ва тадбиркорлар', 'Учёные и бизнес'),
    when: L('Ҳар чоршанба', 'Каждую среду'),
    oct: [21, 28],
    wk: [3],
    media: { v: [], p: 9 },
  },
  tadbirkor: {
    color: '#ff9f43',
    dir: 6,
    title: L('Тадбиркор имкониятлари тақдимотлари', 'Презентации возможностей для предпринимателей'),
    short: L('Тадбиркор имкониятлари', 'Возможности для бизнеса'),
    when: L('Октябрда пайшанба · кейин ҳар чоршанба', 'В октябре — четверг, далее каждую среду'),
    oct: [22, 29],
    wk: [3],
    media: { v: ['w', 't', 't'], p: 5 },
  },
  yoshlar: {
    color: '#ffc53d',
    dir: 1,
    title: L('Пайшанба — «Ёшлар куни»', 'Четверг — «День молодёжи»'),
    short: L('Ёшлар куни', 'День молодёжи'),
    when: L('Ҳар пайшанба', 'Каждый четверг'),
    oct: [22, 29],
    wk: [4],
    media: { v: ['w'], p: 3 },
  },
  innoweek: {
    color: '#22d3ee',
    dir: 4,
    title: L('«Innoweek.uz-2026» кўргазмаси', 'Выставка «Innoweek.uz-2026»'),
    short: 'Innoweek.uz-2026',
    when: L('22–25 октябр', '22–25 октября'),
    oct: [22, 23, 24, 25],
    wk: [],
    media: { v: [], p: 0 },
  },
  tkuni: {
    color: '#4cc3ff',
    dir: null,
    title: L('Иннотехнопарк куни', 'День Иннотехнопарка'),
    short: L('Иннотехнопарк куни', 'День Иннотехнопарка'),
    when: L('6 ноябр, жума', '6 ноября, пятница'),
    oct: [],
    extra: ['2026-11-06'],
    wk: [],
    media: { v: ['t'], p: 2 },
    lead: L(
      'Гулистон ёшлар технопаркининг байрам куни: ёшлар, олий таълим ташкилотлари ва тадбиркорлар учун технопарк имкониятлари намойиши, муҳандислик кўргазмалари ва дрон-футбол мусобақаси.',
      'Праздник Гулистанского молодёжного технопарка: демонстрация возможностей технопарка для молодёжи, вузов и предпринимателей, инженерные выставки и соревнования по дрон-футболу.'
    ),
  },
};

export const KIND_ORDER = Object.keys(EVENT_KINDS);

const pad = (n) => String(n).padStart(2, '0');
export const isoOf = (m, d) => `${CAL_YEAR}-${pad(m + 1)}-${pad(d)}`;
export const parseIso = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

/** sana → [tadbir turlari] va har bir tur uchun sanalar ro'yxati */
function build() {
  const byDate = {};
  const datesOf = {};
  KIND_ORDER.forEach((k) => {
    const e = EVENT_KINDS[k];
    const list = e.oct.map((d) => isoOf(9, d)).concat(e.extra || []);
    [10, 11].forEach((m) => {
      const n = new Date(CAL_YEAR, m + 1, 0).getDate();
      for (let d = 1; d <= n; d++) if (e.wk.includes(new Date(CAL_YEAR, m, d).getDay())) list.push(isoOf(m, d));
    });
    list.sort();
    datesOf[k] = list;
    list.forEach((s) => (byDate[s] = byDate[s] || []).push(k));
  });
  Object.values(byDate).forEach((a) => a.sort((x, y) => KIND_ORDER.indexOf(x) - KIND_ORDER.indexOf(y)));
  return { byDate, datesOf };
}

export const { byDate: EVENTS_BY_DATE, datesOf: DATES_OF_KIND } = build();
export const TOTAL_EVENTS = KIND_ORDER.reduce((a, k) => a + DATES_OF_KIND[k].length, 0);

/** Media fayllari ro'yxati */
export function mediaOf(kind) {
  const m = EVENT_KINDS[kind]?.media;
  if (!m) return [];
  const videos = m.v.map((o, i) => ({
    type: 'video',
    orient: o,
    kind,
    src: `${VIDEO_BASE}/${kind}/v${i + 1}.mp4`,
    poster: `/media/${kind}/v${i + 1}.jpg`,
  }));
  const photos = Array.from({ length: m.p }, (_, i) => ({ type: 'photo', kind, src: `/media/${kind}/p${pad(i + 1)}.jpg` }));
  return videos.concat(photos);
}

export const ALL_MEDIA = KIND_ORDER.flatMap(mediaOf);

/** Bugundan boshlab keyingi tadbir kunlari */
export function upcomingDays(limit = 6, from = new Date()) {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return Object.keys(EVENTS_BY_DATE)
    .sort()
    .filter((s) => parseIso(s) >= today)
    .slice(0, limit)
    .map((date) => ({ date, kinds: EVENTS_BY_DATE[date] }));
}

/** Tur bo'yicha keyingi sanalar */
export function nextDatesOf(kind, limit = 4, from = new Date()) {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return (DATES_OF_KIND[kind] || []).filter((s) => parseIso(s) >= today).slice(0, limit);
}
