import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CalendarDays, Download, Images, MapPin } from 'lucide-react';
import { L, useLang } from '../../i18n/LangContext';
import {
  CAL_MONTHS, CAL_START_DAY, CAL_YEAR, DATES_OF_KIND, EVENTS_BY_DATE, EVENT_KINDS, KIND_ORDER, TOTAL_EVENTS, isoOf, mediaOf, parseIso,
} from '../../data/calendar';
import { DIRECTIONS, directionHref } from '../../data/directions';
import { downloadIcs } from '../../lib/ics';
import { cx, useDate } from '../ui';
import { Lightbox } from './MediaGallery';

const MONTH_NAMES = {
  uz: ['Январ', 'Феврал', 'Март', 'Апрел', 'Май', 'Июн', 'Июл', 'Август', 'Сентябр', 'Октябр', 'Ноябр', 'Декабр'],
  ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
};
const WEEK = { uz: ['Ду', 'Се', 'Чо', 'Па', 'Жу', 'Ша', 'Як'], ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] };

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function pickInitial() {
  const today = todayIso();
  const dates = Object.keys(EVENTS_BY_DATE).sort();
  return dates.find((d) => d >= today) || dates[dates.length - 1];
}

function Month({ m, hidden, selected, onSelect }) {
  const { t, lang } = useLang();
  const names = lang === 'ru' ? MONTH_NAMES.ru : MONTH_NAMES.uz;
  const week = lang === 'ru' ? WEEK.ru : WEEK.uz;
  const days = new Date(CAL_YEAR, m + 1, 0).getDate();
  const offset = (new Date(CAL_YEAR, m, 1).getDay() + 6) % 7; // dushanbadan boshlab
  const count = Object.entries(EVENTS_BY_DATE)
    .filter(([d]) => Number(d.slice(5, 7)) === m + 1)
    .reduce((a, [, ks]) => a + ks.filter((k) => !hidden.includes(k)).length, 0);
  const today = todayIso();

  return (
    <div className="rounded-3xl border border-white/[0.07] bg-ink-900/50 p-4 sm:p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-lg font-semibold">{lang === 'ru' ? names[m] : t({ uz: names[m] })}</h3>
        <span className="text-xs text-slate-500">
          {CAL_YEAR} · {count} {t(L('та тадбир', 'событий'))}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {week.map((w) => (
          <span key={w}>{lang === 'ru' ? w : t({ uz: w })}</span>
        ))}
      </div>
      <div className="mt-1.5 grid grid-cols-7 gap-1">
        {Array.from({ length: offset }).map((_, i) => (
          <span key={`e${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => i + 1).map((d) => {
          const iso = isoOf(m, d);
          const kinds = (EVENTS_BY_DATE[iso] || []).filter((k) => !hidden.includes(k));
          const out = m === CAL_MONTHS[0] && d < CAL_START_DAY;
          const isSel = selected === iso;
          const isToday = today === iso;
          return (
            <button
              key={d}
              type="button"
              disabled={!kinds.length}
              onClick={() => onSelect(iso)}
              className={cx(
                'relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl text-xs transition sm:text-sm',
                kinds.length ? 'cursor-pointer bg-white/[0.04] font-semibold text-white hover:bg-white/[0.09]' : 'cursor-default text-slate-600',
                out && 'opacity-40',
                isSel && 'bg-white/[0.12] ring-2 ring-cyanx-400',
                isToday && !isSel && 'ring-1 ring-white/40'
              )}
              aria-label={iso}
              aria-pressed={isSel}
            >
              <span className="relative z-10">{d}</span>
              {kinds.length > 0 && (
                <span className="absolute inset-x-1 bottom-1 flex h-1 gap-0.5 sm:inset-x-1.5 sm:bottom-1.5">
                  {kinds.map((k) => (
                    <span key={k} className="flex-1 rounded-full" style={{ background: EVENT_KINDS[k].color }} />
                  ))}
                </span>
              )}
              {kinds.length > 1 && (
                <span className="absolute right-0.5 top-0.5 text-[8px] font-bold text-slate-400 sm:right-1 sm:top-1 sm:text-[9px]">{kinds.length}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function EventCalendar() {
  const { t, lang } = useLang();
  const date = useDate();
  const [hidden, setHidden] = useState([]);
  const [selected, setSelected] = useState(pickInitial);
  const [media, setMedia] = useState({ items: [], index: null });

  const toggle = (k) => setHidden((h) => (h.includes(k) ? h.filter((x) => x !== k) : [...h, k]));
  const selKinds = useMemo(() => (EVENTS_BY_DATE[selected] || []).filter((k) => !hidden.includes(k)), [selected, hidden]);
  const visibleTotal = KIND_ORDER.filter((k) => !hidden.includes(k)).reduce((a, k) => a + DATES_OF_KIND[k].length, 0);
  const dow = selected ? parseIso(selected).getDay() : 0;
  const WD = {
    uz: ['якшанба', 'душанба', 'сешанба', 'чоршанба', 'пайшанба', 'жума', 'шанба'],
    ru: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
  };

  return (
    <div>
      {/* Legend / filtr */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {KIND_ORDER.map((k) => {
            const off = hidden.includes(k);
            return (
              <button
                key={k}
                type="button"
                onClick={() => toggle(k)}
                className={cx('chip', off && 'opacity-40')}
                data-active={!off}
                aria-pressed={!off}
                title={t(EVENT_KINDS[k].when)}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: EVENT_KINDS[k].color }} />
                {t(EVENT_KINDS[k].short)}
                <span className="rounded-full bg-white/10 px-1.5 text-[11px]">{DATES_OF_KIND[k].length}</span>
              </button>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-sm text-slate-400">
            <b className="font-display text-xl text-white">{hidden.length ? visibleTotal : TOTAL_EVENTS}</b> {t(L('та тадбир · 3 ой', 'событий · 3 месяца'))}
          </span>
          <button
            type="button"
            onClick={() => downloadIcs(lang, KIND_ORDER.filter((k) => !hidden.includes(k)))}
            className="chip"
            title={t(L('Google, Apple ёки Outlook тақвимига қўшиш', 'Добавить в Google, Apple или Outlook'))}
          >
            <Download className="h-4 w-4" />
            .ics
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_340px]">
        <div className="grid gap-4 md:grid-cols-3">
          {CAL_MONTHS.map((m) => (
            <Month key={m} m={m} hidden={hidden} selected={selected} onSelect={setSelected} />
          ))}
        </div>

        {/* Tanlangan kun */}
        <div className="card p-5 sm:p-6 xl:sticky xl:top-24 xl:self-start">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyanx-300">
            <CalendarDays className="h-4 w-4" />
            {t(L('Танланган кун', 'Выбранный день'))}
          </div>
          <div className="mt-2 font-display text-2xl font-semibold text-white">{selected ? date(selected) : '—'}</div>
          <div className="text-sm capitalize text-slate-400">{lang === 'ru' ? WD.ru[dow] : t({ uz: WD.uz[dow] })}</div>
          <AnimatePresence mode="wait">
            <motion.ul
              key={selected + hidden.join()}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-5 grid gap-3"
            >
              {selKinds.length === 0 && <li className="text-sm text-slate-500">{t(L('Бу кунда тадбир йўқ', 'В этот день событий нет'))}</li>}
              {selKinds.map((k) => {
                const ev = EVENT_KINDS[k];
                const dir = DIRECTIONS.find((d) => d.n === ev.dir);
                const items = mediaOf(k);
                return (
                  <li key={k} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4" style={{ boxShadow: `inset 3px 0 0 ${ev.color}` }}>
                    <div className="font-semibold leading-snug text-white">{t(ev.title)}</div>
                    <div className="mt-1 text-xs text-slate-400">{t(ev.when)}</div>
                    {ev.lead && <p className="mt-2 text-xs leading-relaxed text-slate-400">{t(ev.lead)}</p>}
                    <div className="mt-1.5 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {t(L('Гулистон ёшлар технопарки', 'Гулистанский молодёжный технопарк'))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {items.length > 0 && (
                        <button type="button" onClick={() => setMedia({ items, index: 0 })} className="chip py-1.5 text-xs">
                          <Images className="h-3.5 w-3.5" />
                          {items.filter((x) => x.type === 'photo').length} {t(L('фото', 'фото'))}
                          {items.some((x) => x.type === 'video') ? ` · ${items.filter((x) => x.type === 'video').length} ${t(L('видео', 'видео'))}` : ''}
                        </button>
                      )}
                      {dir && (
                        <Link to={directionHref(dir)} className="chip py-1.5 text-xs">
                          {t(L('Йўналиш', 'Направление'))} {dir.n}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
      <Lightbox items={media.items} index={media.index} onIndex={(i) => setMedia((m) => ({ ...m, index: i }))} onClose={() => setMedia({ items: [], index: null })} />
    </div>
  );
}
