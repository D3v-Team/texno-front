import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CalendarDays, Check, Clock, Play, Rocket, Wallet } from 'lucide-react';
import { L, useLang } from '../i18n/LangContext';
import { Accordion, Badge, Button, Reveal, SectionHead, TiltCard, cx, useDate } from '../components/ui';
import { Icon } from '../lib/icons';
import Seo from '../components/Seo';
import InnoxForm from '../components/forms/InnoxForm';
import MediaGallery, { Lightbox } from '../components/sections/MediaGallery';
import { Funnel, WeekStrip } from '../components/sections/directionParts';
import { sectorOf } from '../components/sections/shared';
import { INNOX_BENEFITS, INNOX_FACTS, INNOX_FAQ, INNOX_STAGES, LABS, LAB_ACCESS, SUCCESS_STARTUPS } from '../data/innox';
import { directionBySlug } from '../data/directions';
import { mediaOf, nextDatesOf, parseIso } from '../data/calendar';

const VIOLET = '#a78bfa';

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90, duration: 1.1 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

function Hero() {
  const { t } = useLang();
  const [video, setVideo] = useState(null);
  const vids = mediaOf('innox').filter((m) => m.type === 'video');
  return (
    <section className="relative overflow-hidden pb-14 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute -left-32 top-10 h-[520px] w-[520px] rounded-full blur-[140px]" style={{ background: `${VIOLET}38` }} />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-cyanx-400/10 blur-[140px]" />
      <div className="container relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <span className="eyebrow border-[#a78bfa]/30 bg-[#a78bfa]/10 text-[#c4b5fd]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              {t(L('3-йўналиш · Стартап экотизими', 'Направление 3 · Стартап-экосистема'))}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-[64px] font-semibold leading-none tracking-tight sm:text-[96px] lg:text-[120px]">
              Inno<span style={{ color: VIOLET, textShadow: `0 0 60px ${VIOLET}` }}>X</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 font-display text-xl font-semibold text-white sm:text-2xl">{t(L('Бизнес-инкубатор ва акселератор', 'Бизнес-инкубатор и акселератор'))}</p>
            <p className="lead mt-4 max-w-xl text-pretty">
              {t(
                L(
                  'Ёшларнинг стартап ғояларини бизнес моделга, прототипга ва биринчи мижозгача олиб чиқадиган амалий дастур: тарғибот, саралаш, ментор ва трекерлар, FabLab ва лабораторияларда ишлаш.',
                  'Практическая программа, которая доводит стартап-идеи молодёжи до бизнес-модели, прототипа и первого клиента: продвижение, отбор, менторы и трекеры, работа в FabLab и лабораториях.'
                )
              )}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <WeekStrip days={[1, 3, 5]} color={VIOLET} />
              <span className="text-sm text-slate-400">{t(L('Душанба · чоршанба · жума', 'Пн · Ср · Пт'))}</span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                size="lg"
                onClick={() => scrollToId('royxat')}
                className="!bg-none !bg-[#a78bfa] !text-ink-950 shadow-[0_10px_40px_-10px_rgba(167,139,250,.8)] hover:!bg-[#c4b5fd]"
              >
                <Rocket className="h-4 w-4" />
                {t(L('Рўйхатдан ўтиш', 'Зарегистрироваться'))}
              </Button>
              <Button type="button" size="lg" variant="ghost" onClick={() => scrollToId('fablab')}>
                {t(L('FabLab ва лабораториялар', 'FabLab и лаборатории'))}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={40}>
          <div className="perspective relative">
            <motion.div
              initial={{ rotateY: -10, rotateX: 4 }}
              whileHover={{ rotateY: 0, rotateX: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 16 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative"
            >
              <button
                type="button"
                onClick={() => vids.length && setVideo(0)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)]"
              >
                <img src="/media/innox/p01.jpg" alt="InnoX Demo Day" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
                {vids.length > 0 && (
                  <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink-950">
                    <Play className="h-3.5 w-3.5 fill-current" />
                    {t(L('Видео', 'Видео'))}
                  </span>
                )}
                <span className="absolute bottom-5 left-5 right-5 text-left">
                  <span className="block text-xs uppercase tracking-[0.14em] text-[#c4b5fd]">Demo Day</span>
                  <span className="mt-1 block font-display text-lg font-semibold text-white">{t(L('InnoX иштирокчиларини тақдирлаш', 'Награждение участников InnoX'))}</span>
                </span>
              </button>
              <div className="glass absolute -bottom-6 -right-4 hidden rounded-2xl px-5 py-4 sm:block" style={{ transform: 'translateZ(50px)' }}>
                <div className="font-display text-3xl font-semibold text-white">100+</div>
                <div className="text-xs text-slate-400">{t(L('ёш дастурда', 'молодых людей'))}</div>
              </div>
              <div className="glass absolute -right-4 -top-5 hidden rounded-2xl px-5 py-4 sm:block" style={{ transform: 'translateZ(70px)' }}>
                <div className="font-display text-3xl font-semibold" style={{ color: VIOLET }}>
                  35
                </div>
                <div className="text-xs text-slate-400">{t(L('стартап инкубацияда', 'стартапов на инкубации'))}</div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>

      <div className="container relative mt-16">
        <Reveal>
          <div className="glass grid grid-cols-2 overflow-hidden rounded-3xl lg:grid-cols-4">
            {INNOX_FACTS.map((f, i) => (
              <div key={i} className={cx('px-5 py-6 sm:px-7', i % 2 === 1 && 'border-l border-white/[0.07]', i >= 2 && 'border-t border-white/[0.07] lg:border-t-0', i === 2 && 'lg:border-l')}>
                <div className="font-display text-3xl font-semibold text-white sm:text-4xl">{f.v}</div>
                <div className="mt-1 text-sm text-slate-400">{t(f.l)}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <Lightbox items={vids} index={video} onIndex={setVideo} onClose={() => setVideo(null)} />
    </section>
  );
}

function Program() {
  const { t } = useLang();
  const dir = directionBySlug('innox');
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow={L('Дастур', 'Программа')}
          title={L('Ғоядан молиялаштиришгача — 4 босқич', 'От идеи до финансирования — 4 этапа')}
          text={L('Молиялаштириш: ОТМларнинг бюджетдан ташқари маблағлари. Иштирокчилар учун бепул.', 'Финансирование: внебюджетные средства вузов. Для участников бесплатно.')}
        />
        <div className="relative mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {INNOX_STAGES.map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="card relative h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl font-display text-base font-semibold text-ink-950" style={{ background: VIOLET }}>
                    {i + 1}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#c4b5fd]">
                    <Clock className="h-3.5 w-3.5" />
                    {t(s.when)}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{t(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(s.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <Funnel title={dir.funnel.title} rows={dir.funnel.rows} color={VIOLET} />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-6 sm:p-7">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{t(L('Кутилаётган натижа', 'Ожидаемый результат'))}</div>
              <ul className="mt-5 grid gap-3">
                {dir.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-200">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf-400" />
                    {t(r)}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-2 border-t border-white/[0.07] pt-5">
                {dir.kpis.map((k, i) => (
                  <div key={i}>
                    <div className="font-display text-2xl font-semibold" style={{ color: VIOLET }}>
                      {k.v}
                    </div>
                    <div className="text-xs text-slate-400">{t(k.l)}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow={L('Иштирокчилар учун', 'Для участников')} title={L('InnoX да нималар оласиз', 'Что вы получите в InnoX')} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INNOX_BENEFITS.map((b, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <TiltCard className="card h-full p-6" max={6}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#a78bfa]/15 text-[#c4b5fd]">
                  <Icon name={b.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{t(b.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(b.text)}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Labs() {
  const { t } = useLang();
  const [active, setActive] = useState(LABS[0].id);
  const lab = LABS.find((l) => l.id === active);
  return (
    <section id="fablab" className="section scroll-mt-24">
      <div className="container">
        <SectionHead
          eyebrow={L('FabLab ва лабораториялар', 'FabLab и лаборатории')}
          title={L('Ғояни қўлда ушласа бўладиган маҳсулотга айлантирамиз', 'Превращаем идею в продукт, который можно потрогать')}
          text={L('InnoX иштирокчилари ва резидентлар учун — бепул. Ҳар бир дастгоҳда лаборант ёрдам беради.', 'Для участников InnoX и резидентов — бесплатно. На каждом станке помогает лаборант.')}
        />

        <div className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-1" role="tablist">
          {LABS.map((l) => (
            <button
              key={l.id}
              type="button"
              role="tab"
              aria-selected={active === l.id}
              onClick={() => setActive(l.id)}
              className={cx(
                'flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-semibold transition',
                active === l.id ? 'text-white' : 'border-white/10 text-slate-400 hover:text-white'
              )}
              style={active === l.id ? { borderColor: `${l.color}99`, background: `${l.color}14` } : undefined}
            >
              <Icon name={l.icon} className="h-4 w-4" style={{ color: l.color }} />
              {t(l.name)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={lab.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.25fr]"
          >
            <div className="card relative overflow-hidden p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl" style={{ background: `${lab.color}33` }} />
              <div className="relative">
                <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: `${lab.color}1f`, color: lab.color }}>
                  <Icon name={lab.icon} className="h-6 w-6" />
                </span>
                <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: lab.color }}>
                  {t(lab.tag)}
                </div>
                <h3 className="mt-1.5 font-display text-2xl font-semibold sm:text-3xl">{t(lab.name)}</h3>
                <p className="mt-3 leading-relaxed text-slate-300">{t(lab.text)}</p>
                <div className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{t(L('Нималар яратиш мумкин', 'Что можно создать'))}</div>
                <ul className="mt-3 grid gap-2">
                  {lab.can.map((c, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-slate-200">
                      <Check className="h-4 w-4 shrink-0" style={{ color: lab.color }} />
                      {t(c)}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {lab.projects.map((p, i) => (
                    <span key={i} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                      {t(p)}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  <Button to={`/infratuzilma?xona=${lab.room}#bron`} size="sm">
                    <CalendarDays className="h-4 w-4" />
                    {t(L('Вақт бронлаш', 'Забронировать время'))}
                  </Button>
                  <Button to={`/infratuzilma?xona=${lab.room}`} size="sm" variant="ghost">
                    {t(L('3D режада кўриш', 'Смотреть на 3D-плане'))}
                  </Button>
                </div>
              </div>
            </div>
            <div className="card p-6 sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{t(L('Жиҳозлар', 'Оборудование'))}</div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {lab.equipment.map((e, i) => (
                  <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: lab.color }} />
                      <div>
                        <div className="text-sm font-semibold text-white">{t(e.name)}</div>
                        <div className="mt-0.5 text-xs text-slate-400">{t(e.spec)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <Reveal delay={0.1}>
          <div className="mt-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{t(L('Лабораториядан қандай фойдаланилади', 'Как получить доступ к лаборатории'))}</div>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {LAB_ACCESS.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-xs font-bold text-white">{i + 1}</span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{t(s.title)}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-slate-400">{t(s.text)}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Startups() {
  const { t } = useLang();
  return (
    <section id="startaplar" className="section scroll-mt-24">
      <div className="container">
        <SectionHead
          eyebrow={L('Натижалар', 'Результаты')}
          title={L('InnoX дан чиққан муваффақиятли стартаплар', 'Успешные стартапы, выросшие в InnoX')}
          text={L('Ғоядан — прототипгача, прототипдан — биринчи мижоз ва грантгача.', 'От идеи — до прототипа, от прототипа — до первого клиента и гранта.')}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SUCCESS_STARTUPS.map((s, i) => {
            const sector = sectorOf(s.sector);
            const lab = LABS.find((l) => l.id === s.lab);
            return (
              <Reveal key={s.id} delay={(i % 3) * 0.06}>
                <TiltCard className="card flex h-full flex-col p-6" max={5}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#a78bfa]/30 to-cyanx-400/20 font-display text-lg font-semibold text-white ring-1 ring-white/10">
                        {s.name.slice(0, 1)}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                        <div className="text-xs text-slate-500">{t(s.team)}</div>
                      </div>
                    </div>
                    <Badge tone={s.stage.tone} dot>
                      {t(s.stage.label)}
                    </Badge>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">{t(s.text)}</p>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {s.metrics.map((m, j) => (
                      <div key={j} className="rounded-2xl bg-white/[0.04] p-3">
                        <div className="font-display text-xl font-semibold text-leaf-300">{t(m.v)}</div>
                        <div className="text-[11px] text-slate-400">{t(m.l)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-5 text-xs text-slate-400" style={{ marginTop: 'auto' }}>
                    <span className="flex items-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 py-1">
                      <Icon name={sector?.icon} className="h-3.5 w-3.5 text-cyanx-400" />
                      {t(sector?.label)}
                    </span>
                    {lab && (
                      <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: `${lab.color}14`, color: lab.color }}>
                        <Icon name={lab.icon} className="h-3.5 w-3.5" />
                        {t(lab.name)}
                      </span>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  const { t } = useLang();
  const date = useDate();
  const dates = nextDatesOf('innox', 9);
  if (!dates.length) return null;
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#c4b5fd]">
        <CalendarDays className="h-4 w-4" />
        {t(L('Яқин машғулотлар', 'Ближайшие занятия'))}
      </div>
      <ul className="mt-4 grid gap-2">
        {dates.map((d) => {
          const isMonday = parseIso(d).getDay() === 1;
          return (
            <li key={d} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3.5 py-2.5 text-sm">
              <span className="text-white">{date(d)}</span>
              {isMonday && <span className="text-xs font-semibold text-amberx-300">{t(L('саралаш', 'отбор'))}</span>}
            </li>
          );
        })}
      </ul>
      <Link to="/yonalishlar#taqvim" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
        {t(L('Тўлиқ тақвим', 'Весь календарь'))}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function InnoX() {
  const { t } = useLang();
  return (
    <>
      <Seo
        title={L('InnoX — бизнес-инкубатор ва акселератор · Гулистон ёшлар технопарки', 'InnoX — бизнес-инкубатор и акселератор · Гулистанский молодёжный технопарк')}
        description={L('InnoX: саралаш ҳар душанба, машғулотлар Ду · Чо · Жу. Ментор ва трекерлар, FabLab, лабораториялар, Demo Day ва грантга тайёргарлик. Рўйхатдан ўтинг.', 'InnoX: отбор каждый понедельник, занятия Пн · Ср · Пт. Менторы и трекеры, FabLab, лаборатории, Demo Day и подготовка к грантам.')}
      />
      <Hero />
      <Program />
      <Benefits />
      <Labs />
      <Startups />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={L('Фото ва видео', 'Фото и видео')} title={L('InnoX ҳаётидан лавҳалар', 'Кадры из жизни InnoX')} />
          <div className="mt-10">
            <MediaGallery kinds={['innox', 'tanlov']} featured limit={9} />
          </div>
        </div>
      </section>

      <section id="royxat" className="section scroll-mt-24">
        <div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[min(1000px,100%)] -translate-x-1/2 rounded-full bg-[#a78bfa]/[0.08] blur-[120px]" />
        <div className="container relative grid gap-8 lg:grid-cols-[1.3fr_0.8fr] lg:gap-10">
          <div>
            <Reveal>
              <span className="eyebrow border-[#a78bfa]/30 bg-[#a78bfa]/10 text-[#c4b5fd]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
                {t(L('InnoX рўйхати', 'Регистрация InnoX'))}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-section mt-5 text-balance">{t(L('Рўйхатдан ўтинг — душанба кунги саралашда кутамиз', 'Зарегистрируйтесь — ждём на отборе в понедельник'))}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card mt-8 p-6 sm:p-8">
                <InnoxForm />
              </div>
            </Reveal>
          </div>
          <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start lg:pt-24">
            <Reveal delay={0.1}>
              <Schedule />
            </Reveal>
            <Reveal delay={0.15}>
              <div className="card p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Wallet className="h-4 w-4 text-leaf-400" />
                  {t(L('Иштирок бепул', 'Участие бесплатное'))}
                </div>
                <p className="mt-2 text-sm text-slate-400">
                  {t(L('Дастур ОТМларнинг бюджетдан ташқари маблағлари ҳисобидан молиялаштирилади.', 'Программа финансируется из внебюджетных средств вузов.'))}
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow={L('Саволлар', 'Вопросы')} title={L('InnoX ҳақида кўп сўралади', 'Частые вопросы об InnoX')} />
          <Reveal delay={0.1}>
            <Accordion items={INNOX_FAQ} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
