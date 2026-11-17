import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react';
import { L, useLang } from '../../i18n/LangContext';
import { Reveal, TiltCard } from '../ui';
import { Icon } from '../../lib/icons';
import { DIRECTIONS, TOTAL_EXTRA, TOTAL_FUNNEL, directionHref } from '../../data/directions';
import { DATES_OF_KIND } from '../../data/calendar';

export function TotalFunnel() {
  const { t } = useLang();
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {TOTAL_FUNNEL.map((s, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyanx-300">{t(s.k)}</div>
              <div className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">{s.v}</div>
              <div className="mt-2 text-xs leading-snug text-slate-400">{t(s.l)}</div>
              {i < TOTAL_FUNNEL.length - 1 && <span className="absolute right-3 top-4 hidden text-slate-600 lg:block">→</span>}
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {TOTAL_EXTRA.map((s, i) => (
          <Reveal key={i} delay={0.2 + i * 0.04}>
            <div className="flex h-full items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
              <span className="shrink-0 font-display text-xl font-semibold text-leaf-300">{t(s.v)}</span>
              <span className="text-xs leading-snug text-slate-400">{t(s.l)}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function DirectionCards({ compact = false }) {
  const { t } = useLang();
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {DIRECTIONS.map((d, i) => (
        <Reveal key={d.slug} delay={(i % 3) * 0.06}>
          <Link to={directionHref(d)} className="group block h-full">
            <TiltCard className="card flex h-full flex-col overflow-hidden p-6" max={5}>
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-50" style={{ background: d.color }} />
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: `${d.color}1f`, color: d.color }}>
                  <Icon name={d.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-4xl font-semibold text-white/[0.07]">0{d.n}</span>
              </div>
              <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: d.color }}>
                {d.n}-{t(L('йўналиш', 'направление'))} · {t(d.kicker)}
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold leading-snug">{t(d.title)}</h3>
              {!compact && <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(d.short)}</p>}
              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <div className="font-display text-3xl font-semibold text-white">
                    {t(d.main.value)}
                    {d.main.unit && <span className="ml-1 text-base text-slate-400">{t(d.main.unit)}</span>}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">{t(d.main.label)}</div>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4 text-xs text-slate-400" style={{ marginTop: 'auto' }}>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {t(d.schedule)}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {DATES_OF_KIND[d.kind]?.length || 0} {t(L('сана', 'дат'))}
                </span>
              </div>
              <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-white">
                {t(L('Батафсил', 'Подробнее'))}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </TiltCard>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
