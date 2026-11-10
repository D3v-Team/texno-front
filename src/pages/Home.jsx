import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check, MousePointerClick, Sparkles } from 'lucide-react';
import { L, useLang } from '../i18n/LangContext';
import { Badge, Button, Reveal, SectionHead, TiltCard, cx } from '../components/ui';
import { Icon } from '../lib/icons';
import Seo from '../components/Seo';
import {
  CanvasFallback, ChallengeCard, CtaBand, EventsList, FaqSection, FundingGrid, Roadmap, StatsStrip, sectorOf, districtOf,
} from '../components/sections/shared';
import { PILLARS, FAQ } from '../data/content';
import { BUSINESS_FLOW, CASES } from '../data/business';
import { CHALLENGES } from '../data/challenges';
import { ROOMS } from '../data/rooms';

const HeroScene = lazy(() => import('../components/three/HeroScene'));
const Building3D = lazy(() => import('../components/three/Building3D'));

const TONE = {
  leaf: { ring: 'group-hover:border-leaf-400/40', icon: 'bg-leaf-400/10 text-leaf-300', glow: 'bg-leaf-400/20' },
  cyan: { ring: 'group-hover:border-cyanx-400/40', icon: 'bg-cyanx-400/10 text-cyanx-300', glow: 'bg-cyanx-400/20' },
  amber: { ring: 'group-hover:border-amberx-400/40', icon: 'bg-amberx-400/10 text-amberx-300', glow: 'bg-amberx-400/20' },
  azure: { ring: 'group-hover:border-azure-400/40', icon: 'bg-azure-500/10 text-azure-300', glow: 'bg-azure-500/25' },
};

function Hero() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:min-h-[100svh] lg:pt-24">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-azure-600/30 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[480px] w-[480px] rounded-full bg-leaf-500/15 blur-[140px]" />

      <div className="container relative grid items-center gap-6 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1.08fr_1fr]">
        <div className="relative z-10 pt-6 lg:pt-0">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf-400" />
              </span>
              {t(L('Сирдарё вилояти · Ёшлар технопарки', 'Сырдарьинская область · Молодёжный технопарк'))}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(22px,6.6vw,34px)] font-semibold leading-[1.08] text-balance sm:text-5xl lg:text-[54px] xl:text-[64px]"
          >
            {t(L('Ғоядан — бозоргача.', 'От идеи — до рынка.'))}
            <br />
            <span className="text-grad animate-shimmer">{t(L('Муаммодан — инновациягача.', 'От проблемы — к инновации.'))}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="lead mt-6 max-w-xl text-pretty"
          >
            {t(
              L(
                'Стартапларга — лабораториялар, менторлар ва инвесторлар. Вилоят тадбиркорларига — корхона муаммоларига инновацион ечим. Ҳаммаси бир технопаркда.',
                'Стартапам — лаборатории, менторы и инвесторы. Предпринимателям области — инновационные решения для задач их предприятий. Всё в одном технопарке.'
              )
            )}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button to="/biznes#ariza" size="lg" icon>
              {t(L('Бизнес муаммосини юбориш', 'Отправить бизнес-задачу'))}
            </Button>
            <Button to="/startaplar" size="lg" variant="ghost">
              {t(L('Стартап сифатида қўшилиш', 'Присоединиться как стартап'))}
            </Button>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400"
          >
            {[L('Бепул диагностика', 'Бесплатная диагностика'), L('3 иш кунида жавоб', 'Ответ за 3 рабочих дня'), L('Махфийлик кафолати', 'Гарантия конфиденциальности')].map(
              (x, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-leaf-400" />
                  {t(x)}
                </li>
              )
            )}
          </motion.ul>
        </div>

        <div className="relative h-[380px] sm:h-[480px] lg:h-[640px]">
          <div className="pointer-events-none absolute inset-[15%] rounded-full bg-cyanx-400/10 blur-[80px]" />
          <Suspense fallback={<CanvasFallback />}>
            <HeroScene />
          </Suspense>
          {/* suzib yuruvchi kartochkalar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="glass pointer-events-none absolute right-0 top-[12%] hidden animate-floaty rounded-2xl px-4 py-3 sm:block"
          >
            <div className="text-[11px] uppercase tracking-wider text-slate-400">{t(L('Янги муаммо', 'Новая задача'))}</div>
            <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-leaf-400 shadow-[0_0_8px_#4FE08A]" />
              {t(L('Тупроқ шўрланиши · Мирзаобод', 'Засоление почвы · Мирзаабад'))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="glass pointer-events-none absolute bottom-[14%] left-0 hidden rounded-2xl px-4 py-3 sm:block"
            style={{ animation: 'floaty 7s ease-in-out infinite 1s' }}
          >
            <div className="text-[11px] uppercase tracking-wider text-slate-400">{t(L('Ечим таклиф қилинди', 'Решение предложено'))}</div>
            <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4 text-amberx-400" />
              {t(L('IoT суғориш · сув −30%', 'IoT-полив · вода −30%'))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container relative z-10 pb-10 lg:-mt-10">
        <Reveal>
          <StatsStrip />
        </Reveal>
      </div>
    </section>
  );
}

function BusinessBand() {
  const { t } = useLang();
  const c = CASES[0];
  return (
    <section className="section">
      <div className="container">
        <div className="noise relative overflow-hidden rounded-[2rem] border border-leaf-400/20 bg-gradient-to-br from-leaf-600/[0.12] via-ink-900 to-ink-900 p-6 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-leaf-400/15 blur-[100px]" />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div>
              <Reveal>
                <span className="eyebrow border-leaf-400/30 bg-leaf-400/10 text-leaf-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-leaf-400" />
                  {t(L('Тадбиркорлар учун', 'Для предпринимателей'))}
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="h-section mt-5 text-balance">
                  {t(L('Корхонангизда муаммо борми?', 'На предприятии есть проблема?'))}{' '}
                  <span className="text-leaf-300">{t(L('Биз унга инновацион ечим топамиз.', 'Мы найдём для неё инновационное решение.'))}</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lead mt-5">
                  {t(
                    L(
                      'Сув ва энергия исрофи, брак, қўл меҳнати, ҳисоб йўқлиги — муаммони ёзинг. Технопарк экспертлари, резидент стартаплар ва олимлар уни ўрганиб, аниқ ечим таклиф қилади.',
                      'Потери воды и энергии, брак, ручной труд, отсутствие учёта — опишите проблему. Эксперты технопарка, стартапы-резиденты и учёные изучат её и предложат конкретное решение.'
                    )
                  )}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <ol className="mt-8 grid gap-2.5">
                  {BUSINESS_FLOW.slice(0, 4).map((s, i) => (
                    <li key={i} className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-ink-950/40 px-4 py-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-leaf-400/10 text-leaf-300">
                        <Icon name={s.icon} className="h-4 w-4" />
                      </span>
                      <span className="flex-1 text-sm font-medium text-white">{t(s.title)}</span>
                      <span className="text-xs text-slate-400">{t(s.time)}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button to="/biznes#ariza" variant="leaf" size="lg" icon>
                    {t(L('Муаммони юбориш', 'Отправить задачу'))}
                  </Button>
                  <Button to="/biznes" variant="ghost" size="lg">
                    {t(L('Қандай ишлайди?', 'Как это работает?'))}
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Muammo → Yechim → Natija vizual */}
            <div className="perspective relative">
              <Reveal y={40}>
                <motion.div
                  whileHover={{ rotateX: 0, rotateY: 0 }}
                  initial={{ rotateX: 8, rotateY: -12 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative"
                >
                  <div className="card relative p-5 sm:p-6" style={{ transform: 'translateZ(0px)' }}>
                    <div className="flex items-center justify-between">
                      <Badge tone="coral" dot>
                        {t(L('Муаммо', 'Проблема'))}
                      </Badge>
                      <span className="text-xs text-slate-500">{t(districtOf(c.district)?.label)}</span>
                    </div>
                    <p className="mt-3 text-sm font-medium text-white">{t(c.company)}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{t(c.problem)}</p>
                  </div>
                  <div className="relative z-10 mx-auto -my-3 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-ink-850 text-cyanx-300 shadow-glow" style={{ transform: 'translateZ(40px)' }}>
                    <ArrowRight className="h-5 w-5 rotate-90" />
                  </div>
                  <div className="card relative border-cyanx-400/25 p-5 sm:ml-8 sm:p-6" style={{ transform: 'translateZ(30px)' }}>
                    <Badge tone="cyan" dot>
                      {t(L('Технопарк ечими', 'Решение технопарка'))}
                    </Badge>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{t(c.solution)}</p>
                  </div>
                  <div className="relative z-10 mx-auto -my-3 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-ink-850 text-leaf-300 shadow-glow-leaf sm:ml-[55%]" style={{ transform: 'translateZ(60px)' }}>
                    <ArrowRight className="h-5 w-5 rotate-90" />
                  </div>
                  <div className="card relative border-leaf-400/30 p-5 sm:ml-16 sm:p-6" style={{ transform: 'translateZ(60px)' }}>
                    <Badge tone="leaf" dot>
                      {t(L('Натижа', 'Результат'))}
                    </Badge>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {c.metrics.map((m, i) => (
                        <div key={i}>
                          <div className="font-display text-xl font-semibold text-white sm:text-2xl">{t(m.value)}</div>
                          <div className="mt-1 text-[11px] leading-tight text-slate-400">{t(m.label)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow={L('4 таянч имконият', '4 опорные возможности')}
            title={L('Технопарк стартапга ғоядан бозоргача ёрдам беради', 'Технопарк ведёт стартап от идеи до рынка')}
            text={L(
              'Ғояни аниқлашдан тортиб, уни синовдан ўтказиш, молиялаштириш ва бозорга чиқаришгача бўлган жараённи тизимли қўллаб-қувватлаймиз.',
              'Системно поддерживаем весь путь: от определения идеи до испытаний, финансирования и выхода на рынок.'
            )}
          />
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => {
            const tone = TONE[p.color];
            return (
              <Reveal key={p.id} delay={i * 0.07}>
                <Link to={p.to} className="group block h-full">
                  <TiltCard className={cx('card flex h-full flex-col overflow-hidden p-6 transition-colors', tone.ring)}>
                    <div className={cx('pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100', tone.glow)} />
                    <div className="flex items-start justify-between">
                      <span className={cx('grid h-14 w-14 place-items-center rounded-2xl', tone.icon)} style={{ transform: 'translateZ(40px)' }}>
                        <Icon name={p.icon} className="h-6 w-6" />
                      </span>
                      <span className="font-display text-4xl font-semibold text-white/[0.06]">0{i + 1}</span>
                    </div>
                    <h3 className="mt-8 font-display text-lg font-semibold leading-snug">{t(p.title)}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{t(p.text)}</p>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {p.points.map((x, j) => (
                        <span key={j} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-slate-300">
                          {t(x)}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto flex items-center gap-1.5 pt-8 text-sm font-semibold text-white">
                      {t(L('Батафсил', 'Подробнее'))}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </TiltCard>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BuildingTeaser() {
  const { t } = useLang();
  return (
    <section className="section overflow-hidden">
      <div className="container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHead
            eyebrow={L('Инфратузилма', 'Инфраструктура')}
            title={L('8 та макон — бир бинода', '8 пространств — в одном здании')}
            text={L(
              'Стартап учун керак бўлган барча шароит: коворкингдан FabLab гача, AI лабораториясидан медиа студиягача. 3D моделда қаватни айлантиринг ва хонани танланг.',
              'Всё, что нужно стартапу: от коворкинга до FabLab, от AI-лаборатории до медиастудии. Покрутите 3D-модель и выберите помещение.'
            )}
          />
          <Reveal delay={0.15}>
            <div className="mt-8 grid grid-cols-2 gap-2">
              {ROOMS.map((r) => (
                <Link
                  key={r.id}
                  to={`/infratuzilma?xona=${r.id}`}
                  className="group flex items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r.color, boxShadow: `0 0 10px ${r.color}` }} />
                  <span className="truncate">{t(r.name)}</span>
                </Link>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Button to="/infratuzilma" variant="ghost" className="mt-8" icon>
              {t(L('Интерактив режани очиш', 'Открыть интерактивный план'))}
            </Button>
          </Reveal>
        </div>
        <Reveal y={40}>
          <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-gradient-to-b from-ink-850 to-ink-950 sm:h-[540px]">
            <div className="pointer-events-none absolute inset-x-10 top-10 h-40 rounded-full bg-azure-500/20 blur-[80px]" />
            <Suspense fallback={<CanvasFallback />}>
              <Building3D interactive={false} />
            </Suspense>
            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-ink-950/70 px-3 py-1.5 text-xs text-slate-300 backdrop-blur [@media(pointer:coarse)]:hidden">
              <MousePointerClick className="h-3.5 w-3.5 text-cyanx-400" />
              {t(L('Айлантириш учун сичқонча билан суринг', 'Потяните мышью, чтобы повернуть'))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ChallengesPreview() {
  const { t } = useLang();
  const list = CHALLENGES.filter((c) => c.status === 'open' || c.status === 'selection').slice(0, 3);
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow={L('Муаммолар биржаси', 'Биржа задач')}
            title={L('Корхоналар ечим кутмоқда', 'Предприятия ждут решений')}
            text={L(
              'Вилоят корхоналари юборган реал муаммолар. Стартап, олим ёки муҳандис бўлсангиз — ечим таклиф қилинг ва биринчи мижозингизни топинг.',
              'Реальные задачи от предприятий области. Если вы стартап, учёный или инженер — предложите решение и найдите первого клиента.'
            )}
          />
          <Reveal>
            <Button to="/muammolar" variant="ghost" icon>
              {t(L('Барча муаммолар', 'Все задачи'))}
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.07}>
              <Link to={`/muammolar?id=${c.id}`} className="block h-full">
                <ChallengeCard c={c} />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cases() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow={L('Натижалар', 'Результаты')}
          title={L('Муаммо → инновация → натижа', 'Проблема → инновация → результат')}
          text={L('Технопарк орқали ҳал қилинган корхона муаммоларидан мисоллар.', 'Примеры задач предприятий, решённых через технопарк.')}
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {CASES.map((c, i) => {
            const s = sectorOf(c.sector);
            return (
              <Reveal key={c.id} delay={(i % 2) * 0.08}>
                <TiltCard className="card h-full p-6 sm:p-8" max={4}>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 rounded-full bg-white/[0.05] px-2.5 py-1">
                      <Icon name={s?.icon} className="h-3.5 w-3.5 text-cyanx-400" />
                      {t(s?.label)}
                    </span>
                    <span>{t(districtOf(c.district)?.label)}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold">{t(c.company)}</h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral-400">{t(L('Муаммо', 'Проблема'))}</div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(c.problem)}</p>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyanx-300">{t(L('Ечим', 'Решение'))}</div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{t(c.solution)}</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-white/[0.06] bg-ink-950/40 p-4">
                    {c.metrics.map((m, j) => (
                      <div key={j}>
                        <div className="font-display text-lg font-semibold text-leaf-300 sm:text-2xl">{t(m.value)}</div>
                        <div className="mt-1 text-[11px] leading-tight text-slate-400">{t(m.label)}</div>
                      </div>
                    ))}
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

export default function Home() {
  const { t } = useLang();
  return (
    <>
      <Seo
        title={L('Сирдарё вилояти Ёшлар технопарки — ғоядан бозоргача', 'Молодёжный технопарк Сырдарьинской области — от идеи до рынка')}
        description={L(
          'Стартаплар учун лаборатория, менторлик ва инвестиция. Тадбиркорлар учун — корхона муаммоларига инновацион ечим. Гулистон, Сирдарё вилояти.',
          'Лаборатории, менторство и инвестиции для стартапов. Инновационные решения задач предприятий для бизнеса. Гулистан, Сырдарьинская область.'
        )}
      />
      <Hero />
      <BusinessBand />
      <Pillars />
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={L('Йўл харитаси', 'Дорожная карта')}
            title={L('Стартапни ривожлантириш босқичлари', 'Этапы развития стартапа')}
            text={L('Ғоядан янги бозорларгача — 7 та ўзаро боғлиқ босқич. Ҳар бирида натижа ўлчанади.', 'От идеи до новых рынков — 7 связанных этапов. На каждом измеряется результат.')}
          />
          <div className="mt-14">
            <Roadmap />
          </div>
        </div>
      </section>
      <BuildingTeaser />
      <ChallengesPreview />
      <Cases />
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={L('Молиялаштириш', 'Финансирование')}
            title={L('Молиявий қўллаб-қувватлаш механизмлари', 'Механизмы финансовой поддержки')}
            text={L('Ҳар бир манбанинг ўз шарти ва ўз ўрни бор — лойиҳа босқичи, хавф даражаси ва даромад моделига қараб танлаймиз.', 'У каждого источника свои условия — подбираем по стадии проекта, уровню риска и модели дохода.')}
          />
          <div className="mt-12">
            <FundingGrid />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead
            eyebrow={L('Тадбирлар', 'События')}
            title={L('Яқин тадбирлар', 'Ближайшие события')}
            text={L('Pitch Day, хакатонлар, Demo Day ва воркшоплар — қатнашиш бепул.', 'Pitch Day, хакатоны, Demo Day и воркшопы — участие бесплатное.')}
          >
            <Reveal delay={0.15}>
              <Button to="/investorlar#tadbirlar" variant="ghost" className="mt-8" icon>
                {t(L('Барча тадбирлар', 'Все события'))}
              </Button>
            </Reveal>
          </SectionHead>
          <EventsList limit={4} />
        </div>
      </section>
      <FaqSection items={FAQ} />
      <CtaBand />
    </>
  );
}
