import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, CircleCheckBig, Heart, MessageCircle, Send } from 'lucide-react';
import { L, useLang } from '../i18n/LangContext';
import { Badge, Button, PageHero, Reveal, SectionHead, TiltCard, cx } from '../components/ui';
import { Icon, InstagramIcon, TelegramIcon, YoutubeIcon, FacebookIcon } from '../lib/icons';
import Seo from '../components/Seo';
import { StartupForm } from '../components/forms/SimpleForms';
import { CtaBand, Roadmap } from '../components/sections/shared';
import { BUSINESS_PLAN, CRITERIA, IDEA_QUESTIONS, IP_TYPES, PITCH_DECK, PROGRAMS, SMM_SERVICES, TECHS } from '../data/content';

function Programs({ onPick }) {
  const { t } = useLang();
  return (
    <section className="section pt-4">
      <div className="container">
        <SectionHead
          eyebrow={L('Дастурлар', 'Программы')}
          title={L('Лойиҳангиз қайси босқичда бўлса ҳам — мос дастур бор', 'Для любой стадии проекта — своя программа')}
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <TiltCard
                className={cx(
                  'card flex h-full flex-col p-7',
                  p.featured && 'border-cyanx-400/40 bg-gradient-to-b from-cyanx-400/[0.08] to-transparent shadow-glow'
                )}
                max={5}
              >
                <div className="flex items-center justify-between">
                  <Badge tone={p.featured ? 'cyan' : 'slate'}>{t(p.duration)}</Badge>
                  {p.featured && <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyanx-300">{t(L('Асосий дастур', 'Основная программа'))}</span>}
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold">{t(p.title)}</h3>
                <p className="mt-1 text-sm text-cyanx-300">{t(p.for)}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{t(p.text)}</p>
                <ul className="mt-6 grid gap-2.5">
                  {p.items.map((x, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <Check className="h-4 w-4 text-leaf-400" />
                      {t(x)}
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  onClick={() => onPick(p.id)}
                  variant={p.featured ? 'primary' : 'ghost'}
                  className="mt-auto w-full"
                  style={{ marginTop: 'auto' }}
                >
                  {t(L('Ариза топшириш', 'Подать заявку'))}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function IdeaCheck() {
  const { t } = useLang();
  const [checked, setChecked] = useState([]);
  const toggle = (i) => setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));
  const done = checked.length === IDEA_QUESTIONS.length;
  return (
    <div className="card h-full p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-amberx-300">{t(L('1-қадам · Ғояни баҳолаш', 'Шаг 1 · Оценка идеи'))}</div>
          <h3 className="mt-2 font-display text-xl font-semibold">{t(L('4 та асосий савол', '4 главных вопроса'))}</h3>
        </div>
        <div className="relative grid h-16 w-16 place-items-center">
          <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="3" />
            <motion.circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              stroke="url(#ig)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="97.4"
              animate={{ strokeDashoffset: 97.4 - (97.4 * checked.length) / 4 }}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="ig" x1="0" x2="1">
                <stop offset="0" stopColor="#FFC24D" />
                <stop offset="1" stopColor="#4FE08A" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-display text-sm font-semibold text-white">{checked.length}/4</span>
        </div>
      </div>
      <ul className="mt-6 grid gap-2">
        {IDEA_QUESTIONS.map((q, i) => {
          const on = checked.includes(i);
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className={cx(
                  'flex w-full items-start gap-4 rounded-2xl border px-4 py-3.5 text-left transition',
                  on ? 'border-leaf-400/40 bg-leaf-400/[0.07]' : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20'
                )}
              >
                <span className={cx('mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border text-xs font-bold transition', on ? 'border-leaf-400 bg-leaf-400 text-ink-950' : 'border-white/20 text-slate-400')}>
                  {on ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{t(q.q)}</span>
                  <span className="mt-0.5 block text-xs text-slate-400">{t(q.hint)}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 rounded-2xl bg-leaf-400/10 px-4 py-3 text-sm font-medium text-leaf-300"
          >
            <CircleCheckBig className="h-4 w-4" />
            {t(L('Ғоя кейинги босқич — саралаш ва баҳолашга тайёр!', 'Идея готова к следующему этапу — отбору и оценке!'))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function verdict(score, filled) {
  if (!filled) return { tone: 'slate', text: L('Ҳар бир мезон бўйича 1–5 балл қўйинг', 'Поставьте 1–5 баллов по каждому критерию') };
  if (score >= 24) return { tone: 'leaf', text: L('Инкубацияга тайёр — ариза топширинг!', 'Готов к инкубации — подавайте заявку!'), program: 'inc' };
  if (score >= 16) return { tone: 'cyan', text: L('Пре-инкубация орқали лойиҳани мустаҳкамлаш тавсия этилади', 'Рекомендуем укрепить проект через преинкубацию'), program: 'pre' };
  return { tone: 'amber', text: L('Ғояни мижозлар билан суҳбатда текшириб кўринг', 'Проверьте идею в интервью с клиентами'), program: 'pre' };
}

function Scorer({ scores, setScores, onApply }) {
  const { t } = useLang();
  const total = scores.reduce((a, b) => a + b, 0);
  const filled = scores.every((s) => s > 0);
  const v = verdict(total, filled);
  return (
    <div className="card h-full p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-cyanx-300">{t(L('2-қадам · Эксперт варақаси', 'Шаг 2 · Экспертный лист'))}</div>
          <h3 className="mt-2 font-display text-xl font-semibold">{t(L('Лойиҳангизни ўзингиз баҳоланг', 'Оцените свой проект'))}</h3>
        </div>
        <div className="text-right">
          <div className="font-display text-3xl font-semibold text-white">
            <motion.span key={total} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block">
              {total}
            </motion.span>
            <span className="text-base text-slate-500">/30</span>
          </div>
          <div className="text-[11px] uppercase tracking-wider text-slate-500">{t(L('балл', 'баллов'))}</div>
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div className="h-full rounded-full bg-brand-grad" animate={{ width: `${(total / 30) * 100}%` }} transition={{ duration: 0.4 }} />
      </div>
      <ul className="mt-6 grid gap-3">
        {CRITERIA.map((c, i) => (
          <li key={i} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-start gap-2 text-sm text-slate-300">
              <span className="font-mono text-xs text-slate-500">0{i + 1}</span>
              {t(c)}
            </span>
            <span className="flex shrink-0 gap-1.5" role="radiogroup" aria-label={t(c)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={scores[i] === n}
                  onClick={() => setScores((s) => s.map((x, j) => (j === i ? n : x)))}
                  className={cx(
                    'grid h-8 w-8 place-items-center rounded-lg border text-xs font-semibold transition',
                    scores[i] >= n ? 'border-cyanx-400/60 bg-cyanx-400/20 text-white' : 'border-white/10 text-slate-500 hover:border-white/30'
                  )}
                >
                  {n}
                </button>
              ))}
            </span>
          </li>
        ))}
      </ul>
      <div className={cx('mt-6 flex flex-col gap-3 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between', filled ? 'border-white/10 bg-white/[0.03]' : 'border-dashed border-white/10')}>
        <Badge tone={v.tone} dot className="whitespace-normal">
          {t(v.text)}
        </Badge>
        {filled && (
          <Button size="sm" onClick={() => onApply(v.program, total)}>
            {t(L('Натижа билан ариза', 'Заявка с результатом'))}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function PitchDeck() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const go = (d) => setI((x) => (x + d + PITCH_DECK.length) % PITCH_DECK.length);
  return (
    <div className="card h-full p-6 sm:p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-azure-300">{t(L('Ҳужжат 2', 'Документ 2'))}</div>
      <h3 className="mt-2 font-display text-xl font-semibold">Pitch deck</h3>
      <p className="mt-2 text-sm text-slate-400">{t(L('Инвестор ёки экспертларга лойиҳани қисқа ва тушунарли тақдим этиш учун 8 та слайд.', '8 слайдов, чтобы кратко и понятно представить проект инвесторам и экспертам.'))}</p>
      <div className="perspective relative mt-6 h-48">
        {PITCH_DECK.map((s, k) => {
          const off = (k - i + PITCH_DECK.length) % PITCH_DECK.length;
          if (off > 3) return null;
          return (
            <motion.div
              key={k}
              onClick={() => off === 0 && go(1)}
              animate={{ y: off * 12, scale: 1 - off * 0.05, rotateX: off * -6, opacity: off === 3 ? 0 : 1 - off * 0.25, zIndex: 10 - off }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="absolute inset-x-0 top-0 h-40 cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700 to-ink-850 p-5 shadow-card"
              style={{ transformOrigin: 'top center' }}
            >
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <span>{t(L('Слайд', 'Слайд'))} 0{k + 1} / 08</span>
                <span className="h-2 w-2 rounded-full bg-cyanx-400" />
              </div>
              <div className="mt-6 font-display text-2xl font-semibold text-white">{t(s.title)}</div>
              <div className="mt-2 text-sm text-slate-400">{t(s.text)}</div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex gap-1">
          {PITCH_DECK.map((_, k) => (
            <button key={k} type="button" onClick={() => setI(k)} className={cx('h-1.5 rounded-full transition-all', k === i ? 'w-6 bg-cyanx-400' : 'w-1.5 bg-white/20')} aria-label={`${k + 1}`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white hover:border-white/30" aria-label="Prev">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => go(1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white hover:border-white/30" aria-label="Next">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Smm() {
  const { t } = useLang();
  return (
    <section id="smm" className="section scroll-mt-24">
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHead
            eyebrow={L('Медиа ва маркетинг', 'Медиа и маркетинг')}
            title={L('Алоҳида SMM жамоаси', 'Собственная SMM-команда')}
            text={L(
              'Маҳсулот яратиш — ишнинг ярми. Уни мижозга етказишни технопаркнинг профессионал SMM жамоаси ўз зиммасига олади — стартап эса асосий ишига эътибор қаратади.',
              'Создать продукт — полдела. Доставку до клиента берёт на себя профессиональная SMM-команда технопарка, а стартап сосредоточится на главном.'
            )}
          />
          <Reveal delay={0.15}>
            <div className="mt-8 grid grid-cols-2 gap-2">
              {SMM_SERVICES.map((s, i) => (
                <div key={i} className="flex items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-3 text-sm text-slate-300">
                  <Check className="h-4 w-4 shrink-0 text-leaf-400" />
                  {t(s)}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal y={40}>
          <div className="perspective">
            <motion.div
              initial={{ rotateY: -14, rotateX: 6 }}
              whileHover={{ rotateY: 0, rotateX: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 16 }}
              className="mx-auto max-w-sm rounded-[2.2rem] border border-white/10 bg-ink-850 p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="rounded-[1.7rem] bg-ink-950 p-5">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-tr from-amberx-400 via-coral-500 to-azure-500 p-[2px]">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-ink-950 font-display text-lg font-semibold text-white">S</div>
                  </div>
                  <div className="grid flex-1 grid-cols-3 text-center">
                    {[
                      ['128', L('пост', 'постов')],
                      ['11,8K', L('обуначи', 'подписч.')],
                      ['86K', L('қамров', 'охват')],
                    ].map(([v, l], i) => (
                      <div key={i}>
                        <div className="font-semibold text-white">{v}</div>
                        <div className="text-[11px] text-slate-400">{t(l)}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 text-sm font-semibold text-white">{t(L('Сизнинг стартапингиз', 'Ваш стартап'))}</div>
                <div className="text-xs text-slate-400">@sizning.startap · {t(L('Технопарк резиденти', 'Резидент технопарка'))}</div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
                  <span className="rounded-lg bg-azure-500 py-2 text-center text-white">{t(L('Обуна бўлиш', 'Подписаться'))}</span>
                  <span className="rounded-lg bg-white/10 py-2 text-center text-white">{t(L('Хабар', 'Сообщение'))}</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-1">
                  {['from-azure-500/60 to-cyanx-400/40', 'from-leaf-400/50 to-cyanx-400/30', 'from-amberx-400/50 to-coral-500/40', 'from-coral-500/40 to-azure-500/50', 'from-cyanx-400/50 to-leaf-400/40', 'from-azure-600/60 to-amberx-400/30'].map((g, i) => (
                    <div key={i} className={cx('relative aspect-square rounded-md bg-gradient-to-br', g)}>
                      {i === 1 && <Heart className="absolute left-1.5 top-1.5 h-3 w-3 text-white/80" />}
                      {i === 4 && <MessageCircle className="absolute left-1.5 top-1.5 h-3 w-3 text-white/80" />}
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-white/[0.07] p-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{t(L('Қамров ўсиши', 'Рост охвата'))}</span>
                    <span className="font-semibold text-leaf-300">+340%</span>
                  </div>
                  <svg viewBox="0 0 200 50" className="mt-2 h-12 w-full">
                    <defs>
                      <linearGradient id="smmg" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#4FE08A" stopOpacity=".5" />
                        <stop offset="1" stopColor="#4FE08A" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 45 C30 42 50 40 70 34 S110 28 130 20 170 8 200 4 L200 50 L0 50Z" fill="url(#smmg)" />
                    <path d="M0 45 C30 42 50 40 70 34 S110 28 130 20 170 8 200 4" fill="none" stroke="#4FE08A" strokeWidth="2" />
                  </svg>
                  <div className="mt-1 flex justify-between text-[10px] text-slate-500">
                    <span>{t(L('1-ой', '1 мес'))}</span>
                    <span>{t(L('3-ой', '3 мес'))}</span>
                    <span>{t(L('6-ой', '6 мес'))}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-center gap-3 text-slate-400">
                  <InstagramIcon className="h-4 w-4" />
                  <TelegramIcon className="h-4 w-4" />
                  <YoutubeIcon className="h-4 w-4" />
                  <FacebookIcon className="h-4 w-4" />
                  <Send className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Startups() {
  const { t } = useLang();
  const [program, setProgram] = useState('');
  const [scores, setScores] = useState([0, 0, 0, 0, 0, 0]);
  const [appliedScore, setAppliedScore] = useState(0);

  function apply(p, score) {
    if (p) setProgram(p);
    if (score) setAppliedScore(score);
    const el = document.getElementById('ariza');
    if (el) {
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90, duration: 1.1 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <Seo
        title={L('Стартаплар учун — инкубация ва акселерация · Ёшлар технопарки', 'Стартапам — инкубация и акселерация · Молодёжный технопарк')}
        description={L('Пре-инкубация, инкубация ва акселерация дастурлари. Лабораториялар, менторлар, SMM жамоаси ва инвесторлар билан учрашувлар.', 'Программы преинкубации, инкубации и акселерации. Лаборатории, менторы, SMM-команда и встречи с инвесторами.')}
      />
      <PageHero
        eyebrow={L('Ғоя муаллифлари ва стартаплар учун', 'Для авторов идей и стартапов')}
        title={
          <>
            {t(L('Ғоянгизни', 'Превратим вашу идею'))} <span className="text-grad">{t(L('ишлайдиган бизнесга', 'в работающий бизнес'))}</span> {t(L('айлантирамиз', ''))}
          </>
        }
        text={L(
          'Стартап ноаниқлик юқори бўлган шароитда иш бошлайди. Шу сабабли бизда у доимий циклда ишлайди: бозор эҳтиёжини тез текшириш, фойдаланувчилар фикрини ўрганиш ва бизнес моделини такомиллаштириш.',
          'Стартап начинает в условиях высокой неопределённости. Поэтому у нас он работает в постоянном цикле: быстро проверяет потребность рынка, изучает обратную связь и улучшает бизнес-модель.'
        )}
        aside={
          <div className="card p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{t(L('Асосий фарқ', 'Главное отличие'))}</div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-white/[0.03] p-4">
                <div className="font-display text-base font-semibold text-white">{t(L('Инновация', 'Инновация'))}</div>
                <div className="mt-1 text-sm text-slate-400">
                  {t(L('янгилик', 'новизна'))} <span className="text-cyanx-300">+</span> {t(L('амалиётга жорий этиш', 'внедрение в практику'))}
                </div>
              </div>
              <div className="rounded-2xl bg-white/[0.03] p-4">
                <div className="font-display text-base font-semibold text-white">{t(L('Стартап', 'Стартап'))}</div>
                <div className="mt-1 text-sm text-slate-400">
                  {t(L('ечим', 'решение'))} <span className="text-leaf-300">→</span> {t(L('барқарор ва кенгаювчан бизнес', 'устойчивый масштабируемый бизнес'))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={() => apply()} size="lg" icon>
            {t(L('Ариза топшириш', 'Подать заявку'))}
          </Button>
          <Button to="/infratuzilma" size="lg" variant="ghost">
            {t(L('Лабораториялар', 'Лаборатории'))}
          </Button>
        </div>
      </PageHero>

      <Programs onPick={(p) => apply(p)} />

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={L('Саралаш', 'Отбор')}
            title={L('Лойиҳани саралаш ва баҳолаш мезонлари', 'Критерии отбора и оценки проектов')}
            text={L('Саралаш шаффоф балл тизими ва эксперт хулосалари асосида амалга оширилади. Ариза топширишдан олдин ўзингизни синаб кўринг.', 'Отбор проходит по прозрачной балльной системе и заключениям экспертов. Проверьте себя до подачи заявки.')}
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <IdeaCheck />
            </Reveal>
            <Reveal delay={0.08}>
              <Scorer scores={scores} setScores={setScores} onApply={apply} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={L('Йўл харитаси', 'Дорожная карта')} title={L('Ғоядан кенгайишгача 7 босқич', '7 этапов от идеи до масштаба')} />
          <div className="mt-14">
            <Roadmap />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={L('Тайёргарлик', 'Подготовка')}
            title={L('Грант ва инвестиция олишга тайёргарлик', 'Подготовка к гранту и инвестициям')}
            text={L('Молиялаштиришга мурожаат қилишдан олдин лойиҳа ҳужжатлари пухта тайёрланиши керак — менторлар бунга ёрдам беради.', 'Перед обращением за финансированием документы проекта должны быть тщательно подготовлены — менторы помогут.')}
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <div className="card h-full p-6 sm:p-8">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-leaf-300">{t(L('Ҳужжат 1', 'Документ 1'))}</div>
                <h3 className="mt-2 font-display text-xl font-semibold">{t(L('Бизнес-режа', 'Бизнес-план'))}</h3>
                <ol className="mt-6 grid gap-2 sm:grid-cols-2">
                  {BUSINESS_PLAN.map((x, i) => (
                    <li key={i} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5 text-sm text-slate-300">
                      <span className="font-mono text-xs text-slate-500">0{i + 1}</span>
                      {t(x)}
                    </li>
                  ))}
                </ol>
                <div className="mt-6 rounded-2xl border border-leaf-400/20 bg-leaf-400/[0.05] p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-leaf-300">{t(L('Аризада ишончни оширади', 'Повышают доверие к заявке'))}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[L('Реал кўрсаткичлар', 'Реальные показатели'), L('Аниқ муддатлар', 'Чёткие сроки'), L('Ўлчанадиган натижалар', 'Измеримые результаты')].map((x, i) => (
                      <span key={i} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white">
                        {t(x)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <PitchDeck />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow={L('Ҳуқуқий ҳимоя', 'Правовая защита')}
              title={L('Интеллектуал мулк ва тижоратлаштириш', 'Интеллектуальная собственность и коммерциализация')}
              text={L('Инновацион ғоянинг ҳуқуқий ҳимояси унинг бозор қийматини сақлайди. Муаллифлик, ҳуқуқ эгалиги ва ҳамкорлар улушини лойиҳа бошидаёқ келишиб олинг.', 'Правовая защита идеи сохраняет её рыночную стоимость. Договоритесь об авторстве, правообладании и долях партнёров с самого начала.')}
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {IP_TYPES.map((x, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="card h-full p-5">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-azure-500/15 font-display text-xl font-semibold text-azure-300">{x.sym}</span>
                    <div className="mt-4 font-semibold text-white">{t(x.title)}</div>
                    <div className="mt-1 text-xs leading-relaxed text-slate-400">{t(x.text)}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <SectionHead
              eyebrow={L('Технологиялар', 'Технологии')}
              title={L('Рақамли технологиялар билан тезроқ', 'Быстрее с цифровыми технологиями')}
              text={L('Технология танлашда нархи, хавфсизлиги, ишончлилиги ва маҳаллий шароитга мослиги ҳисобга олинади.', 'При выборе технологии учитываются цена, безопасность, надёжность и соответствие местным условиям.')}
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {TECHS.map((x, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="flex h-full items-start gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyanx-400/10 text-cyanx-300">
                      <Icon name={x.icon} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-white">{t(x.title)}</span>
                      <span className="mt-1 block text-sm text-slate-400">{t(x.text)}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Smm />

      <section id="ariza" className="section scroll-mt-24">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead
            eyebrow={L('Ариза', 'Заявка')}
            title={L('Стартап сифатида ариза топширинг', 'Подайте заявку как стартап')}
            text={L('Ариза 7 дақиқа вақт олади. Эксперт кенгаши 5 иш куни ичида жавоб беради.', 'Заявка займёт 7 минут. Экспертный совет ответит в течение 5 рабочих дней.')}
          >
            <Reveal delay={0.15}>
              <ul className="mt-8 grid gap-3 text-sm text-slate-300">
                {[
                  L('Ёш чекланмаган — асосий эътибор ёшларга', 'Без ограничения по возрасту — фокус на молодёжи'),
                  L('Ғоя босқичида ҳам ариза топшириш мумкин', 'Можно подавать даже на стадии идеи'),
                  L('Иштирок ва менторлик бепул', 'Участие и менторство бесплатны'),
                ].map((x, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-leaf-400" />
                    {t(x)}
                  </li>
                ))}
              </ul>
            </Reveal>
          </SectionHead>
          <Reveal delay={0.1}>
            <div className="card p-6 sm:p-8">
              <StartupForm program={program} score={appliedScore} />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
