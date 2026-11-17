import { translate } from '../i18n/LangContext';
import { EVENTS_BY_DATE, EVENT_KINDS, parseIso } from '../data/calendar';

/** Tadbirlar taqvimini .ics (iCalendar) faylga eksport qilish — Google/Apple/Outlook kalendariga qo'shish uchun */
export function buildIcs(lang = 'lat', kinds = null) {
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = new Date();
  const dtstamp = `${stamp.getUTCFullYear()}${pad(stamp.getUTCMonth() + 1)}${pad(stamp.getUTCDate())}T000000Z`;
  const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Guliston yoshlar texnoparki//Tadbirlar taqvimi//UZ',
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${esc(translate({ uz: 'Гулистон ёшлар технопарки — тадбирлар', ru: 'Гулистанский молодёжный технопарк — события' }, lang))}`,
    'X-WR-TIMEZONE:Asia/Tashkent',
  ];
  Object.keys(EVENTS_BY_DATE)
    .sort()
    .forEach((date) => {
      EVENTS_BY_DATE[date].forEach((k) => {
        if (kinds && !kinds.includes(k)) return;
        const d = date.replace(/-/g, '');
        const next = parseIso(date);
        next.setDate(next.getDate() + 1);
        const d2 = `${next.getFullYear()}${pad(next.getMonth() + 1)}${pad(next.getDate())}`;
        lines.push(
          'BEGIN:VEVENT',
          `UID:${d}-${k}@guliston-texnopark`,
          `DTSTAMP:${dtstamp}`,
          `DTSTART;VALUE=DATE:${d}`,
          `DTEND;VALUE=DATE:${d2}`,
          `SUMMARY:${esc(translate(EVENT_KINDS[k].title, lang))}`,
          `LOCATION:${esc(translate({ uz: 'Гулистон ёшлар технопарки', ru: 'Гулистанский молодёжный технопарк' }, lang))}`,
          'END:VEVENT'
        );
      });
    });
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export function downloadIcs(lang, kinds) {
  const blob = new Blob([buildIcs(lang, kinds)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'guliston-texnopark-tadbirlar.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
