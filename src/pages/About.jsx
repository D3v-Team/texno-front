import { ArrowDown, ArrowRight, Clock, Mail, MapPin, Phone, Plus, X as XIcon, Equal, Check } from 'lucide-react';
import { L, useLang } from '../i18n/LangContext';
import { PageHero, Reveal, SectionHead, TiltCard, cx } from '../components/ui';
import { Icon, SOCIAL_ICONS } from '../lib/icons';
import Seo from '../components/Seo';
import { ContactForm } from '../components/forms/SimpleForms';
import { StatsStrip } from '../components/sections/shared';
import { ANSWERS, ECOSYSTEM, KPIS, OBSTACLES } from '../data/content';
import { SITE } from '../data/site';

const INFRA = [
  {
    n: '01',
    title: L('Технопарк', 'Технопарк'),
    text: L('Инновацион компаниялар, илмий жамоалар ва ишлаб чиқариш субъектлари ҳамкорлигини ривожлантирувчи муҳит.', 'Среда, развивающая сотрудничество инновационных компаний, научных коллективов и производств.'),
    tags: [L('ҳамкорлик', 'партнёрство'), L('лабораториялар', 'лаборатории'), L('резидентлик', 'резидентство')],
  },
  {
    n: '02',
    title: L('Бизнес-инкубатор', 'Бизнес-инкубатор'),
    text: L('Янги ғоя ва жамоаларга дастлабки босқичда маслаҳат, иш жойи, ўқув ва ташкилий ёрдам кўрсатади.', 'Даёт новым идеям и командам консультации, рабочее место, обучение и организационную поддержку.'),
    tags: [L('маслаҳат', 'консультации'), L('иш жойи', 'рабочее место'), L('ўқув', 'обучение')],
  },
  {
    n: '03',
    title: L('Акселератор', 'Акселератор'),
    text: L('Ўсиш салоҳиятига эга стартапларни интенсив дастур орқали ривожлантириб, инвестор ва бозор билан боғлайди.', 'Развивает стартапы с потенциалом роста через интенсив и связывает их с инвесторами и рынком.'),
    tags: [L('интенсив дастур', 'интенсив'), L('инвесторлар', 'инвесторы'), L('бозор', 'рынок')],
  },
];

const INTEGRATION = [
  { title: L('Корхона', 'Предприятие'), text: L('муаммони шакллантиради', 'формулирует проблему'), icon: 'Factory' },
  { title: L('Олий таълим муассасаси', 'Вуз'), text: L('илмий ечим таклиф қилади', 'предлагает научное решение'), icon: 'GraduationCap' },
  { title: L('Стартап жамоаси', 'Стартап-команда'), text: L('прототип яратади', 'создаёт прототип'), icon: 'Rocket' },
  { title: L('Ишлаб чиқариш', 'Производство'), text: L('пилот синов ва жорий этиш майдонини беради', 'даёт площадку для пилота и внедрения'), icon: 'Building2' },
];

const FORMULA = [L('Билим', 'Знания'), L('Инфратузилма', 'Инфраструктура'), L('Молия', 'Финансы'), L('Бозор', 'Рынок'), L('Ҳамкорлик', 'Партнёрство')];

function Ecosystem() {
  const { t } = useLang();
  const n = ECOSYSTEM.length;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-[6%] animate-spin-slow rounded-full border border-dashed border-azure-400/25" />
      <div className="absolute inset-[22%] rounded-full border border-white/[0.06]" />
      <div className="absolute inset-[34%] grid place-items-center rounded-full bg-gradient-to-br from-azure-600/40 to-leaf-500/30 shadow-[0_0_80px_-10px_rgba(63,224,245,.5)] ring-1 ring-white/15">
        <div className="text-center">
          <div className="font-display text-lg font-semibold text-white sm:text-2xl">{t(L('Экотизим', 'Экосистема'))}</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-300 sm:text-xs">{t(SITE.region)}</div>
        </div>
      </div>
      {ECOSYSTEM.map((e, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(a) * 41;
        const y = 50 + Math.sin(a) * 43;
        return (
          <Reveal key={i} delay={i * 0.06} className="pointer-events-none absolute inset-0" y={0}>
            <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
              <span className="glass block whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-medium text-white sm:px-4 sm:py-2 sm:text-sm">{t(e)}</span>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export default function About() {
  const { t } = useLang();
  return (
    <>
      <Seo
        title={L('Биз ҳақимизда ва алоқа · Сирдарё вилояти Ёшлар технопарки', 'О нас и контакты · Молодёжный технопарк Сырдарьинской области')}
        description={L('Ёшлар технопарки миссияси, ҳудудий стартап экотизими, натижадорлик кўрсаткичлари ва алоқа маълумотлари.', 'Миссия молодёжного технопарка, региональная стартап-экосистема, показатели эффективности и контакты.')}
      />
      <PageHero
        eyebrow={L('Биз ҳақимизда', 'О нас')}
        title={
          <>
            {t(L('Инновацион ғояларни', 'Системно поддерживаем'))} <span className="text-grad">{t(L('тизимли қўллаб-қувватлаймиз', 'инновационные идеи'))}</span>
          </>
        }
        text={L(
          'Инновацион ва стартап лойиҳалар — иқтисодиётни модернизация қилиш, янги иш ўринлари яратиш, рақобатбардош маҳсулот ва хизматларни бозорга олиб чиқишнинг муҳим воситаси. Бизнинг мақсад — фақат грант ажратиш эмас, балки ғояни ишлайдиган маҳсулот ва даромад келтирадиган фаолиятга айлантириш.',
          'Инновационные и стартап-проекты — важный инструмент модернизации экономики, создания рабочих мест и вывода конкурентоспособных продуктов на рынок. Наша цель — не просто выдать грант, а превратить идею в работающий продукт и приносящую доход деятельность.'
        )}
        aside={
          <div className="card p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{t(L('Асосий натижа', 'Главный результат'))}</div>
            <div className="mt-5 flex flex-col gap-2">
              {[L('Ғоя', 'Идея'), L('Ишлайдиган маҳсулот', 'Работающий продукт'), L('Даромад келтирадиган фаолият', 'Приносящий доход бизнес')].map((x, i) => (
                <div key={i}>
                  <div className={cx('rounded-2xl px-4 py-3 font-display text-sm font-semibold sm:text-base', i === 2 ? 'bg-leaf-400/15 text-leaf-300' : 'bg-white/[0.04] text-white')}>{t(x)}</div>
                  {i < 2 && <ArrowDown className="mx-auto my-1 h-4 w-4 text-cyanx-400" />}
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="pb-10">
        <div className="container">
          <Reveal>
            <StatsStrip />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={L('Инфратузилма', 'Инфраструктура')}
            title={L('Технопарк, инкубатор ва акселератор', 'Технопарк, инкубатор и акселератор')}
            text={L('Инновацион инфратузилма ғоя муаллифларига иш жойи, лаборатория, маслаҳат, ҳамкор ва молиялаштириш манбаларини топишда кўмаклашади.', 'Инновационная инфраструктура помогает авторам идей найти рабочее место, лабораторию, консультации, партнёров и финансирование.')}
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {INFRA.map((x, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <TiltCard className="card h-full p-7" max={5}>
                  <span className="font-display text-5xl font-semibold text-white/[0.07]">{x.n}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{t(x.title)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{t(x.text)}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {x.tags.map((g, j) => (
                      <span key={j} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-slate-300">
                        {t(g)}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow={L('Экотизим', 'Экосистема')}
              title={L('Ҳудудда стартап экотизими', 'Стартап-экосистема региона')}
              text={L(
                'Сирдарё вилояти: ГулДУ, ҳудудий технопарклар, илмий муассасалар ва тадбиркорлар ўртасидаги ҳамкорлик маҳаллий муаммоларга инновацион ечим топиш учун амалий имконият яратади.',
                'Сырдарьинская область: сотрудничество ГулГУ, региональных технопарков, научных учреждений и предпринимателей создаёт практическую возможность находить инновационные решения местных проблем.'
              )}
            />
            <Reveal delay={0.15}>
              <div className="mt-8 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-cyanx-300">{t(L('Ривожлантириш учун', 'Для развития'))}</div>
                <ul className="mt-4 grid gap-2.5">
                  {[
                    L('Стартап клублар ташкил этиш', 'Создание стартап-клубов'),
                    L('Мунтазам хакатон ва танловлар ўтказиш', 'Регулярные хакатоны и конкурсы'),
                    L('Маҳаллий корхоналар муаммолари асосида лойиҳалар', 'Проекты на основе задач местных предприятий'),
                    L('Менторлар базасини яратиш', 'Создание базы менторов'),
                    L('Пилот синов майдонларини ташкил этиш', 'Организация пилотных площадок'),
                  ].map((x, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf-400" />
                      {t(x)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal y={30}>
            <Ecosystem />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={L('Интеграция', 'Интеграция')}
            title={L('Олий таълим, илм-фан ва ишлаб чиқариш', 'Вузы, наука и производство')}
            text={L('Натижада илм-фан натижаси мақола ёки патент билан чекланмай, реал иқтисодий самара беради.', 'В итоге результат науки не ограничивается статьёй или патентом, а даёт реальный экономический эффект.')}
          />
          <div className="mt-12 grid gap-3 md:grid-cols-4">
            {INTEGRATION.map((x, i) => (
              <Reveal key={i} delay={i * 0.07} className="relative">
                <div className="card h-full p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-azure-500/15 text-azure-300">
                      <Icon name={x.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-display text-3xl font-semibold text-white/[0.08]">{i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold">{t(x.title)}</h3>
                  <p className="mt-1.5 text-sm text-slate-400">{t(x.text)}</p>
                </div>
                {i < 3 && (
                  <span className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink-850 text-cyanx-300 md:grid">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={L('Натижадорлик', 'Эффективность')}
            title={L('Самарани қандай ўлчаймиз', 'Как мы измеряем эффект')}
            text={L('Натижадорлик ажратилган маблағ ёки тадбирлар сони билан эмас, аниқ иқтисодий ва ижтимоий натижалар билан ўлчанади.', 'Эффективность измеряется не объёмом выделенных средств или числом мероприятий, а конкретными экономическими и социальными результатами.')}
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {KPIS.map((k, i) => (
              <Reveal key={i} delay={(i % 3) * 0.06}>
                <div className="flex h-full items-start gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-leaf-400/10 text-leaf-300">
                    <Icon name={k.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-white">{t(k.title)}</span>
                    <span className="mt-1 block text-sm text-slate-400">{t(k.text)}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={L('Устувор вазифалар', 'Приоритеты')} title={L('Муаммолар ва ечимлар', 'Проблемы и решения')} />
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <div className="card h-full border-coral-400/20 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-coral-400">
                  <XIcon className="h-4 w-4" />
                  {t(L('Тўсиқлар', 'Барьеры'))}
                </div>
                <ul className="mt-5 grid gap-3">
                  {OBSTACLES.map((x, i) => (
                    <li key={i} className="flex gap-3 rounded-2xl bg-coral-400/[0.05] px-4 py-3 text-sm text-slate-300">
                      <span className="font-mono text-xs text-coral-400">0{i + 1}</span>
                      {t(x)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="card h-full border-leaf-400/20 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-leaf-300">
                  <Check className="h-4 w-4" />
                  {t(L('Ечимлар', 'Решения'))}
                </div>
                <ul className="mt-5 grid gap-3">
                  {ANSWERS.map((x, i) => (
                    <li key={i} className="flex gap-3 rounded-2xl bg-leaf-400/[0.05] px-4 py-3 text-sm text-slate-300">
                      <span className="font-mono text-xs text-leaf-400">0{i + 1}</span>
                      {t(x)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="mt-4 rounded-[2rem] border border-white/10 bg-gradient-to-r from-azure-700/30 via-ink-850 to-leaf-600/20 p-6 sm:p-10">
              <div className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                {t(L('Хулоса — энг самарали модель', 'Вывод — самая эффективная модель'))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {FORMULA.map((x, i) => (
                  <span key={i} className="flex items-center gap-2 sm:gap-3">
                    <span className="rounded-full bg-white/[0.07] px-4 py-2 font-display text-sm font-semibold text-white sm:text-base">{t(x)}</span>
                    {i < FORMULA.length - 1 ? <Plus className="h-4 w-4 text-cyanx-400" /> : <Equal className="h-4 w-4 text-leaf-400" />}
                  </span>
                ))}
                <span className="rounded-full bg-brand-grad px-5 py-2 font-display text-sm font-semibold text-ink-950 sm:text-base">{t(L('ягона тизим', 'единая система'))}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="aloqa" className="section scroll-mt-24">
        <div className="container">
          <SectionHead eyebrow={L('Алоқа', 'Контакты')} title={L('Бизга ташриф буюринг ёки ёзинг', 'Приходите или напишите нам')} />
          <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
            <div className="grid gap-4">
              <Reveal>
                <div className="card grid gap-5 p-6 sm:p-8">
                  {[
                    { icon: MapPin, k: L('Манзил', 'Адрес'), v: t(SITE.address), href: SITE.map.link },
                    { icon: Phone, k: L('Телефон', 'Телефон'), v: SITE.phone, href: SITE.phoneHref },
                    { icon: Mail, k: 'E-mail', v: SITE.email, href: `mailto:${SITE.email}` },
                    { icon: Clock, k: L('Иш вақти', 'Режим работы'), v: t(SITE.workHours) },
                  ].map((x, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyanx-400/10 text-cyanx-300">
                        <x.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs uppercase tracking-wider text-slate-500">{t(x.k)}</div>
                        {x.href ? (
                          <a href={x.href} target={x.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="mt-0.5 block break-words font-medium text-white hover:text-cyanx-300">
                            {x.v}
                          </a>
                        ) : (
                          <div className="mt-0.5 font-medium text-white">{x.v}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2 border-t border-white/[0.07] pt-5">
                    {SITE.socials.map((s) => {
                      const Ico = SOCIAL_ICONS[s.id];
                      return (
                        <a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-cyanx-400/50 hover:text-white">
                          <Ico className="h-[18px] w-[18px]" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="overflow-hidden rounded-3xl border border-white/[0.07]">
                  <iframe
                    title={t(L('Харита', 'Карта'))}
                    src={SITE.map.embed}
                    className="h-72 w-full"
                    style={{ filter: 'invert(.92) hue-rotate(185deg) saturate(.7) brightness(.95)' }}
                    loading="lazy"
                  />
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="card p-6 sm:p-8">
                <h3 className="font-display text-xl font-semibold">{t(L('Хабар юбориш', 'Написать сообщение'))}</h3>
                <p className="mb-6 mt-2 text-sm text-slate-400">{t(L('Тадбирда қатнашиш, ҳамкорлик ёки умумий саволлар учун.', 'Для участия в событиях, партнёрства или общих вопросов.'))}</p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
