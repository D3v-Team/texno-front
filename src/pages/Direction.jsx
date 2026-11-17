import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock, Target, Users, Wallet } from 'lucide-react';
import { L, useLang } from '../i18n/LangContext';
import { Button, Reveal, SectionHead, cx, useDate } from '../components/ui';
import { Icon } from '../lib/icons';
import Seo from '../components/Seo';
import MediaGallery from '../components/sections/MediaGallery';
import { CtaBand } from '../components/sections/shared';
import { Funnel, KpiGrid, PathSteps, WeekStrip } from '../components/sections/directionParts';
import { DIRECTIONS, directionBySlug, directionHref } from '../data/directions';
import { DATES_OF_KIND, EVENT_KINDS, mediaOf, nextDatesOf } from '../data/calendar';

/** Yo'nalishga mos harakat tugmasi */
function ctaFor(d) {
  switch (d.slug) {
    case 'yoshlar-kuni':
      return { to: '/haqida#aloqa', label: L('Тадбирга ёзилиш', 'Записаться на мероприятие') };
    case 'tanlovlar':
      return { to: '/startaplar#ariza', label: L('Ғояни танловга юбориш', 'Отправить идею на конкурс') };
    case 'innoweek':
      return { to: '/haqida#aloqa', label: L('Кўргазмада қатнашиш', 'Участвовать в выставке') };
    case 'ilm-fan':
      return { to: '/haqida#aloqa', label: L('Ишланмани тақдим этиш', 'Представить разработку') };
    case 'tadbirkorlar':
      return { to: '/biznes#ariza', label: L('Технотурга ёзилиш', 'Записаться на технотур') };
    default:
      return { to: '/innox#royxat', label: L('Рўйхатдан ўтиш', 'Зарегистрироваться') };
  }
}

export default function Direction() {
  const { slug } = useParams();
  const { t } = useLang();
  const date = useDate();
  const d = directionBySlug(slug);
  if (!d) return <Navigate to="/yonalishlar" replace />;
  if (d.page) return <Navigate to={d.page} replace />;

  const idx = DIRECTIONS.indexOf(d);
  const prev = DIRECTIONS[(idx - 1 + DIRECTIONS.length) % DIRECTIONS.length];
  const next = DIRECTIONS[(idx + 1) % DIRECTIONS.length];
  const upcoming = nextDatesOf(d.kind, 6);
  const allDates = d.dates || DATES_OF_KIND[d.kind] || [];
  const hasMedia = mediaOf(d.kind).length > 0;
  const cta = ctaFor(d);
  const c = d.color;

  return (
    <>
      <Seo title={L(`${d.title.uz} — Гулистон ёшлар технопарки`, `${d.title.ru} — Гулистанский молодёжный технопарк`)} description={d.lead} />

      {/* HERO */}
      <section className="relative overflow-hidden pb-14 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
        <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full blur-[130px]" style={{ background: `${c}33` }} />
        <div className="container relative">
          <Reveal>
            <Link to="/yonalishlar" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              {t(L('Барча йўналишлар', 'Все направления'))}
            </Link>
          </Reveal>
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="font-display text-5xl font-semibold sm:text-6xl" style={{ color: c }}>
                    0{d.n}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {d.roman} · {t(d.kicker)}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-4 font-display text-[clamp(26px,7vw,34px)] font-semibold leading-[1.1] text-balance sm:text-5xl lg:text-[54px]">{t(d.title)}</h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead mt-6 max-w-2xl text-pretty">{t(d.lead)}</p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-7 flex flex-wrap gap-2">
                  <span className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white">
                    <Clock className="h-4 w-4" style={{ color: c }} />
                    {t(d.schedule)}
                  </span>
                  <span className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white">
                    <Wallet className="h-4 w-4" style={{ color: c }} />
                    {t(d.funding)}
                  </span>
                  <span className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white">
                    <CalendarDays className="h-4 w-4" style={{ color: c }} />
                    {allDates.length} {t(L('та сана тақвимда', 'дат в календаре'))}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button to={cta.to} size="lg" icon>
                    {t(cta.label)}
                  </Button>
                  <Button to="/yonalishlar#taqvim" size="lg" variant="ghost">
                    {t(L('Тақвимда кўриш', 'Смотреть в календаре'))}
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <div className="card relative overflow-hidden p-7">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl" style={{ background: `${c}40` }} />
                <div className="relative">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{t(L('Асосий кўрсаткич · 2026', 'Ключевой показатель · 2026'))}</div>
                  <div className="mt-3 font-display text-6xl font-semibold" style={{ color: c }}>
                    {t(d.main.value)}
                    {d.main.unit && <span className="ml-2 text-2xl text-slate-300">{t(d.main.unit)}</span>}
                  </div>
                  <div className="mt-2 text-slate-300">{t(d.main.label)}</div>
                  {d.days.length > 0 && (
                    <div className="mt-6 border-t border-white/[0.07] pt-5">
                      <div className="mb-3 text-xs text-slate-500">{t(L('Ҳафталик жадвал', 'Недельный график'))}</div>
                      <WeekStrip days={d.days} color={c} />
                    </div>
                  )}
                  {d.dates && (
                    <div className="mt-6 grid grid-cols-4 gap-2 border-t border-white/[0.07] pt-5">
                      {d.dates.map((x) => (
                        <div key={x} className="rounded-xl border border-white/10 py-2 text-center">
                          <div className="font-display text-xl font-semibold text-white">{Number(x.slice(8))}</div>
                          <div className="text-[10px] uppercase tracking-wider text-slate-400">{t(L('октябр', 'октября'))}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CHORA-TADBIR → NATIJA */}
      <section className="section pt-6">
        <div className="container grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-azure-300">
                <span className="h-2 w-2 rounded-full bg-azure-400" />
                {t(L('Чора-тадбир · амалга ошириш механизми', 'Мероприятие · механизм реализации'))}
              </div>
              <ol className="mt-6 grid gap-3">
                {d.steps.map((s, i) => (
                  <li key={i} className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-display text-sm font-semibold text-ink-950" style={{ background: c }}>
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[15px] leading-relaxed text-slate-200">{t(s.text)}</p>
                      {s.when && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold" style={{ color: c }}>
                          <Clock className="h-3.5 w-3.5" />
                          {t(s.when)}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
              {d.responsible && (
                <p className="mt-5 flex items-start gap-2.5 rounded-2xl bg-white/[0.03] p-4 text-xs leading-relaxed text-slate-400">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                  {t(d.responsible)}
                </p>
              )}
              {d.tags && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {d.tags.map((x, i) => (
                    <span key={i} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                      {t(x)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-amberx-300">
                <span className="h-2 w-2 rounded-full bg-amberx-400" />
                {t(L('Кутилаётган натижа', 'Ожидаемый результат'))}
              </div>
              <ul className="mt-6 grid gap-3">
                {d.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-200">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf-400/15 text-leaf-300">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {t(r)}
                  </li>
                ))}
              </ul>
              {d.path && (
                <div className="mt-7 border-t border-white/[0.07] pt-6">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {t(d.slug === 'tanlovlar' ? L('Ғоянинг йўли', 'Путь идеи') : L('Дастур босқичлари', 'Этапы программы'))}
                  </div>
                  <PathSteps items={d.path} color={c} />
                </div>
              )}
              {d.formula && (
                <div className="mt-7 border-t border-white/[0.07] pt-6">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{t(L('Қамров ҳисоби', 'Расчёт охвата'))}</div>
                  <div className="flex flex-wrap items-center gap-2">
                    {d.formula.map((f, i) =>
                      f.op ? (
                        <span key={i} className="px-1 font-display text-xl text-slate-500">
                          {f.op}
                        </span>
                      ) : (
                        <span key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-center">
                          <span className="block font-display text-xl font-semibold text-white">{f.v}</span>
                          <span className="block text-[11px] text-slate-400">{t(f.l)}</span>
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* MAQSADLI KO'RSATKICHLAR */}
      <section className="section pt-0">
        <div className="container">
          <SectionHead eyebrow={L('Мақсадли кўрсаткичлар · 2026 йил якуни', 'Целевые показатели · итог 2026')} title={L('Рақамлардаги натижа', 'Результат в цифрах')} />
          <div className={cx('mt-10 grid gap-4', d.funnel && 'lg:grid-cols-[1fr_1.1fr]')}>
            <Reveal>
              <KpiGrid items={d.kpis} color={c} cols={d.funnel ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} />
            </Reveal>
            {d.funnel && (
              <Reveal delay={0.08}>
                <Funnel title={d.funnel.title} rows={d.funnel.rows} color={c} />
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* YAQIN SANALAR */}
      {upcoming.length > 0 && (
        <section className="section pt-0">
          <div className="container">
            <SectionHead eyebrow={L('Тақвим', 'Календарь')} title={L('Яқин саналар', 'Ближайшие даты')} />
            <div className="mt-8 flex flex-wrap gap-2">
              {upcoming.map((x) => (
                <span key={x} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white" style={{ boxShadow: `inset 3px 0 0 ${c}` }}>
                  {date(x)}
                </span>
              ))}
              <Link to="/yonalishlar#taqvim" className="chip self-center">
                {t(L('Тўлиқ тақвим', 'Весь календарь'))}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* MEDIA */}
      {hasMedia && (
        <section className="section pt-0">
          <div className="container">
            <SectionHead eyebrow={L('Фото ва видео', 'Фото и видео')} title={t(EVENT_KINDS[d.kind].title)} />
            <div className="mt-8">
              <MediaGallery kinds={[d.kind]} featured />
            </div>
          </div>
        </section>
      )}

      {/* NAVIGATSIYA */}
      <section className="pb-6">
        <div className="container grid gap-3 sm:grid-cols-2">
          {[prev, next].map((x, i) => (
            <Link
              key={x.slug}
              to={directionHref(x)}
              className={cx('group flex items-center gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:border-white/20', i === 1 && 'sm:flex-row-reverse sm:text-right')}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{ background: `${x.color}1f`, color: x.color }}>
                <Icon name={x.icon} className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-slate-500">
                  {i === 0 ? '← ' : ''}
                  {x.n}-{t(L('йўналиш', 'направление'))}
                  {i === 1 ? ' →' : ''}
                </span>
                <span className="block truncate font-semibold text-white">{t(x.title)}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-4 pt-10">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6" style={{ color: c }} />
              <span className="text-slate-300">{t(L('Ушбу йўналишда иштирок этмоқчимисиз?', 'Хотите участвовать в этом направлении?'))}</span>
            </div>
            <Button to={cta.to} icon>
              {t(cta.label)}
            </Button>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
