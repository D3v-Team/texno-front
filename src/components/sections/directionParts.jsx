import { motion } from 'motion/react';
import { L, useLang } from '../../i18n/LangContext';
import { cx } from '../ui';

const WEEK = { uz: ['Ду', 'Се', 'Чо', 'Па', 'Жу'], ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'] };

/** Haftalik jadval: Du–Ju, faol kunlar rangli */
export function WeekStrip({ days = [], color = '#3FE0F5', size = 'md' }) {
  const { t, lang } = useLang();
  const names = lang === 'ru' ? WEEK.ru : WEEK.uz;
  return (
    <div className="flex gap-1.5" aria-label={t(L('Ҳафталик жадвал', 'Недельный график'))}>
      {names.map((n, i) => {
        const on = days.includes(i + 1);
        return (
          <span
            key={n}
            className={cx(
              'grid place-items-center rounded-xl border font-semibold transition',
              size === 'sm' ? 'h-8 w-8 text-[11px]' : 'h-11 w-11 text-xs',
              on ? 'text-ink-950' : 'border-white/10 text-slate-500'
            )}
            style={on ? { background: color, borderColor: color, boxShadow: `0 0 18px -4px ${color}` } : undefined}
          >
            {lang === 'ru' ? n : t({ uz: n })}
          </span>
        );
      })}
    </div>
  );
}

/** Voronka (ketma-ket kichrayib boruvchi chiziqlar) */
export function Funnel({ title, rows, color = '#3FE0F5' }) {
  const { t } = useLang();
  return (
    <div className="card p-6 sm:p-7">
      {title && <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{t(title)}</div>}
      <div className="mt-5 grid gap-2.5">
        {rows.map((r, i) => {
          const w = 100 - (i * 60) / Math.max(rows.length - 1, 1);
          return (
            <div key={i} className="flex items-center gap-4">
              <div className="relative h-12 flex-1 overflow-hidden rounded-xl bg-white/[0.03]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${w}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-y-0 left-0 rounded-xl"
                  style={{ background: `linear-gradient(90deg, ${color}55, ${color}22)`, borderRight: `2px solid ${color}` }}
                />
                <span className="relative flex h-full items-center px-4 text-[13px] text-slate-200">{t(r.l)}</span>
              </div>
              <span className="w-16 shrink-0 text-right font-display text-xl font-semibold text-white">{t(r.v)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** KPI kartochkalari */
export function KpiGrid({ items, color = '#3FE0F5', cols = 'sm:grid-cols-2 lg:grid-cols-3' }) {
  const { t } = useLang();
  return (
    <div className={cx('grid gap-3', cols)}>
      {items.map((k, i) => (
        <div key={i} className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5">
          <div className="font-display text-3xl font-semibold" style={{ color }}>
            {t(k.v)}
            {k.u && <span className="ml-1 text-base text-slate-400">{t(k.u)}</span>}
          </div>
          <div className="mt-1.5 text-sm leading-snug text-slate-400">{t(k.l)}</div>
        </div>
      ))}
    </div>
  );
}

/** Bosqichli yo'l: 1 → 2 → 3 */
export function PathSteps({ items, color = '#3FE0F5' }) {
  const { t } = useLang();
  return (
    <ol className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
      {items.map((x, i) => (
        <li key={i} className="flex flex-1 items-center gap-2">
          <span className="flex flex-1 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold text-ink-950" style={{ background: color }}>
              {i + 1}
            </span>
            <span className="text-sm font-semibold text-white">{t(x)}</span>
          </span>
          {i < items.length - 1 && <span className="hidden text-slate-500 sm:block">→</span>}
        </li>
      ))}
    </ol>
  );
}
