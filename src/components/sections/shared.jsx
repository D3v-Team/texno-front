import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin, MessageCircle, Users } from 'lucide-react';
import { L, useLang } from '../../i18n/LangContext';
import { Accordion, Badge, Button, Counter, Reveal, SectionHead, TiltCard, cx, useDate } from '../ui';
import { Icon } from '../../lib/icons';
import { CHALLENGE_STATUS } from '../../data/challenges';
import { DISTRICTS, SECTORS, BUDGETS } from '../../data/business';
import { FUNDING, ROADMAP } from '../../data/content';
import { EVENT_KINDS, parseIso, upcomingDays } from '../../data/calendar';
import { directionHref, directionOfKind } from '../../data/directions';
import { STATS } from '../../data/site';

export const sectorOf = (id) => SECTORS.find((s) => s.id === id);
export const districtOf = (id) => DISTRICTS.find((d) => d.id === id);
export const budgetOf = (id) => BUDGETS.find((b) => b.id === id);

/* ───────────── Stats strip ───────────── */
export function StatsStrip({ className }) {
  const { t } = useLang();
  return (
    <div className={cx('glass grid grid-cols-2 overflow-hidden rounded-3xl lg:grid-cols-4', className)}>
      {STATS.map((s, i) => (
        <div
          key={i}
          className={cx(
            'relative px-5 py-6 sm:px-7 sm:py-7',
            i % 2 === 1 && 'border-l border-white/[0.07]',
            i >= 2 && 'border-t border-white/[0.07] lg:border-t-0',
            i === 2 && 'lg:border-l'
          )}
        >
          <div className="font-display text-3xl font-semibold text-white sm:text-4xl">
            <Counter value={s.value} decimals={s.decimals || 0} />
            <span className="text-grad">{t(s.suffix)}</span>
          </div>
          <div className="mt-1.5 text-[13px] leading-snug text-slate-400 sm:text-sm">{t(s.label)}</div>
        </div>
      ))}
    </div>
  );
}

/* ───────────── Roadmap ───────────── */
export function Roadmap() {
  const { t } = useLang();
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-transparent via-azure-400/40 to-transparent lg:block" />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7 lg:gap-3">
        {ROADMAP.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 0.06} className="relative">
            <div className="group h-full rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:-translate-y-1 hover:border-cyanx-400/40 hover:bg-white/[0.04] lg:border-0 lg:bg-transparent lg:p-0 lg:hover:bg-transparent">
              <div className="relative mb-5 flex items-center gap-3 lg:block">
                <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-ink-850 font-display text-sm font-semibold text-white shadow-card transition group-hover:border-cyanx-400/60 group-hover:shadow-[0_0_30px_-5px_rgba(63,224,245,.5)]">
                  {s.n}
                </span>
                <span className="font-display text-lg font-semibold text-white lg:hidden">{t(s.title)}</span>
              </div>
              <h3 className="hidden font-display text-base font-semibold text-white lg:block">{t(s.title)}</h3>
              <p className="text-sm leading-relaxed text-slate-400 lg:mt-2">{t(s.text)}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={0.3}>
        <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-white/10 px-5 py-4 text-sm text-slate-400">
          {[L('Натижани ўлчаш', 'Измерение результата'), L('Қарор қабул қилиш', 'Принятие решения'), L('Кейинги босқич', 'Следующий этап')].map(
            (x, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="rounded-full bg-white/[0.05] px-3 py-1 font-medium text-white">{t(x)}</span>
                {i < 2 && <ArrowRight className="h-4 w-4 text-cyanx-400" />}
              </span>
            )
          )}
          <span className="basis-full text-xs sm:basis-auto sm:pl-2">
            {t(L('— ҳар бир босқичда такрорланади', '— повторяется на каждом этапе'))}
          </span>
        </div>
      </Reveal>
    </div>
  );
}

/* ───────────── Funding grid ───────────── */
export function FundingGrid() {
  const { t } = useLang();
  const tones = ['leaf', 'azure', 'cyan', 'amber', 'coral', 'leaf'];
  const toneCls = {
    leaf: 'text-leaf-300 bg-leaf-400/10',
    azure: 'text-azure-300 bg-azure-500/10',
    cyan: 'text-cyanx-300 bg-cyanx-400/10',
    amber: 'text-amberx-300 bg-amberx-400/10',
    coral: 'text-coral-400 bg-coral-400/10',
  };
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {FUNDING.map((f, i) => (
        <Reveal key={i} delay={i * 0.05}>
          <TiltCard className="card p-6" max={6}>
            <div className="flex items-center justify-between">
              <span className={cx('grid h-12 w-12 place-items-center rounded-2xl', toneCls[tones[i]])}>
                <Icon name={f.icon} className="h-5 w-5" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{t(f.tag)}</span>
            </div>
            <h3 className="mt-6 font-display text-lg font-semibold">{t(f.title)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(f.text)}</p>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}

/* ───────────── Challenge card ───────────── */
export function ChallengeCard({ c, onOpen }) {
  const { t } = useLang();
  const date = useDate();
  const st = CHALLENGE_STATUS[c.status];
  const sector = sectorOf(c.sector);
  return (
    <TiltCard className="card flex h-full flex-col p-6" max={5}>
      <div className="flex items-center justify-between gap-3">
        <Badge tone={st.tone} dot>
          {t(st.label)}
        </Badge>
        <span className="font-mono text-xs text-slate-500">{c.id}</span>
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
        <Icon name={sector?.icon} className="h-4 w-4 text-cyanx-400" />
        <span>{t(sector?.label)}</span>
        <span className="text-slate-600">·</span>
        <MapPin className="h-3.5 w-3.5" />
        <span>{t(districtOf(c.district)?.label)}</span>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{t(c.title)}</h3>
      <p className="mt-1 text-xs text-slate-500">{t(c.org)}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">{t(c.summary)}</p>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-5 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          {c.proposals} {t(L('та таклиф', 'предлож.'))}
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {t(L('Муддат', 'До'))}: {date(c.deadline, false)}
        </span>
      </div>
      {onOpen && (
        <button
          type="button"
          onClick={() => onOpen(c)}
          className="absolute inset-0 rounded-3xl"
          aria-label={t(c.title)}
        />
      )}
    </TiltCard>
  );
}

/* ───────────── Events (taqvimdan) ───────────── */
const WD = {
  uz: ['якшанба', 'душанба', 'сешанба', 'чоршанба', 'пайшанба', 'жума', 'шанба'],
  ru: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
};
const MON = {
  uz: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
};

export function EventsList({ limit = 5 }) {
  const { t, lang } = useLang();
  const days = upcomingDays(limit);
  if (!days.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center text-slate-400">
        {t(L('Янги тадбирлар тақвими тез орада эълон қилинади.', 'Новый календарь событий скоро будет опубликован.'))}
      </div>
    );
  }
  return (
    <div className="grid gap-3">
      {days.map(({ date, kinds }, i) => {
        const dt = parseIso(date);
        const d = dt.getDate();
        const m = dt.getMonth();
        const wd = lang === 'ru' ? WD.ru[dt.getDay()] : t({ uz: WD.uz[dt.getDay()] });
        const mon = lang === 'ru' ? MON.ru[m] : t({ uz: MON.uz[m] });
        return (
          <Reveal key={date} delay={i * 0.05}>
            <div className="flex flex-col gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:border-white/20 sm:flex-row sm:items-start sm:p-6">
              <div className="flex shrink-0 items-center gap-4 sm:w-36">
                <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-ink-850 text-center">
                  <div>
                    <div className="font-display text-2xl font-semibold leading-none text-white">{d}</div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-cyanx-300">{mon}</div>
                  </div>
                </div>
                <div className="text-xs capitalize text-slate-400">{wd}</div>
              </div>
              <ul className="grid min-w-0 flex-1 gap-2">
                {kinds.map((k) => {
                  const ev = EVENT_KINDS[k];
                  const dir = directionOfKind(k);
                  const href = k === 'innox' ? '/innox#royxat' : dir ? directionHref(dir) : '/yonalishlar';
                  return (
                    <li key={k}>
                      <Link
                        to={href}
                        className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-ink-950/40 px-4 py-3 transition hover:border-white/20"
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: ev.color, boxShadow: `0 0 10px ${ev.color}` }} />
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-white">{t(ev.title)}</span>
                            <span className="flex items-center gap-1 text-xs text-slate-500">
                              <MapPin className="h-3 w-3" />
                              {t(L('Гулистон ёшлар технопарки', 'Гулистанский молодёжный технопарк'))}
                            </span>
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-white" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ───────────── FAQ section ───────────── */
export function FaqSection({ items, title = L('Кўп бериладиган саволлар', 'Частые вопросы'), eyebrow = L('Саволлар', 'Вопросы') }) {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHead eyebrow={eyebrow} title={title}>
          <Reveal delay={0.15}>
            <div className="mt-8 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
              <MessageCircle className="h-6 w-6 text-cyanx-400" />
              <p className="mt-3 text-sm text-slate-400">
                {t(L('Жавоб топа олмадингизми? Бизга ёзинг — 1 иш куни ичида жавоб берамиз.', 'Не нашли ответ? Напишите нам — ответим в течение рабочего дня.'))}
              </p>
              <Button to="/haqida#aloqa" variant="ghost" size="sm" className="mt-5" icon>
                {t(L('Савол бериш', 'Задать вопрос'))}
              </Button>
            </div>
          </Reveal>
        </SectionHead>
        <Reveal delay={0.1}>
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── Final CTA ───────────── */
export function CtaBand() {
  const { t } = useLang();
  return (
    <section className="section pt-6">
      <div className="container">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-azure-700/40 via-ink-850 to-leaf-600/20 px-6 py-14 sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyanx-400/20 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-10 h-80 w-80 rounded-full bg-leaf-400/20 blur-[90px]" />
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="eyebrow">{t(L('Ёшлар технопарки', 'Молодёжный технопарк'))}</span>
                <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-balance sm:text-5xl">
                  {t(L('Ғоянгиз ёки муаммоингиз борми?', 'Есть идея или задача?'))}{' '}
                  <span className="text-grad">{t(L('Келинг — биргаликда ечим топамиз.', 'Давайте найдём решение вместе.'))}</span>
                </h2>
                <p className="lead mt-5 max-w-xl">
                  {t(
                    L(
                      'Тадбиркорлар муаммо юборади, стартаплар ечим таклиф қилади, инвесторлар молиялаштиради — технопарк ҳаммасини бирлаштиради.',
                      'Предприниматели присылают задачи, стартапы предлагают решения, инвесторы финансируют — технопарк объединяет всех.'
                    )
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button to="/biznes#ariza" size="lg" icon>
                  {t(L('Бизнес муаммосини юбориш', 'Отправить бизнес-задачу'))}
                </Button>
                <Button to="/startaplar#ariza" size="lg" variant="ghost" icon>
                  {t(L('Стартап ариза топшириш', 'Подать заявку стартапа'))}
                </Button>
                <Button to="/investorlar#ariza" size="lg" variant="dark" icon>
                  {t(L('Инвестор сифатида қўшилиш', 'Присоединиться как инвестор'))}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── 3D fallback ───────────── */
export function CanvasFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-azure-500/30 to-leaf-400/20 blur-2xl" />
    </div>
  );
}
