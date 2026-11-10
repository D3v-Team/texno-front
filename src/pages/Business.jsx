import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { L, useLang } from '../i18n/LangContext';
import { Badge, Button, Reveal, SectionHead, TiltCard, PageHero, cx } from '../components/ui';
import { Icon, TelegramIcon } from '../lib/icons';
import Seo from '../components/Seo';
import BusinessForm from '../components/forms/BusinessForm';
import { CtaBand, FaqSection, districtOf, sectorOf } from '../components/sections/shared';
import { BUSINESS_BENEFITS, BUSINESS_FAQ, BUSINESS_FLOW, CASES, SECTORS, SOLUTIONS } from '../data/business';
import { SITE } from '../data/site';

function Flow() {
  const { t } = useLang();
  return (
    <section className="section pt-4">
      <div className="container">
        <SectionHead
          eyebrow={L('Қандай ишлайди', 'Как это работает')}
          title={L('Аризадан — ишлайдиган ечимгача 5 қадам', '5 шагов от заявки до работающего решения')}
        />
        <div className="relative mt-12 grid gap-4 md:grid-cols-5">
          <div className="absolute left-[10%] right-[10%] top-9 hidden h-px bg-gradient-to-r from-leaf-400/0 via-leaf-400/50 to-cyanx-400/0 md:block" />
          {BUSINESS_FLOW.map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="relative flex h-full flex-col rounded-3xl border border-white/[0.07] bg-ink-900/50 p-5 md:border-0 md:bg-transparent md:p-0 md:text-center">
                <span className="relative z-10 grid h-[72px] w-[72px] place-items-center rounded-3xl border border-leaf-400/25 bg-ink-850 text-leaf-300 shadow-glow-leaf md:mx-auto">
                  <Icon name={s.icon} className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-leaf-400 text-xs font-bold text-ink-950">{i + 1}</span>
                </span>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-cyanx-300 md:justify-center">
                  <Clock className="h-3.5 w-3.5" />
                  {t(s.time)}
                </div>
                <h3 className="mt-2 font-display text-base font-semibold">{t(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(s.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormSection() {
  const { t } = useLang();
  return (
    <section id="ariza" className="section scroll-mt-24">
      <div className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[min(1000px,100%)] -translate-x-1/2 rounded-full bg-leaf-500/[0.07] blur-[120px]" />
      <div className="container relative grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-10">
        <div>
          <Reveal>
            <span className="eyebrow border-leaf-400/30 bg-leaf-400/10 text-leaf-300">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf-400" />
              {t(L('Бизнес муаммоси аризаси', 'Заявка с бизнес-задачей'))}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h-section mt-5 text-balance">{t(L('Муаммоингизни ёзинг — ечимни биз топамиз', 'Опишите проблему — решение найдём мы'))}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <BusinessForm />
            </div>
          </Reveal>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start lg:pt-24">
          <Reveal delay={0.1}>
            <div className="card p-6">
              <h3 className="font-display text-base font-semibold">{t(L('Нима учун технопарк?', 'Почему технопарк?'))}</h3>
              <ul className="mt-5 grid gap-4">
                {BUSINESS_BENEFITS.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyanx-400/10 text-cyanx-300">
                      <Icon name={b.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{t(b.title)}</span>
                      <span className="mt-0.5 block text-[13px] leading-relaxed text-slate-400">{t(b.text)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="card p-6">
              <h3 className="font-display text-base font-semibold">{t(L('Формани тўлдириш қийинми?', 'Сложно заполнить форму?'))}</h3>
              <p className="mt-2 text-sm text-slate-400">{t(L('Қўнғироқ қилинг ёки Telegram га ёзинг — муаммоингизни эксперт ўзи ёзиб олади.', 'Позвоните или напишите в Telegram — эксперт сам запишет вашу задачу.'))}</p>
              <div className="mt-5 grid gap-2">
                <a href={SITE.phoneHref} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/25">
                  <Phone className="h-4 w-4 text-leaf-400" />
                  {SITE.phone}
                </a>
                <a href={SITE.telegram} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/25">
                  <TelegramIcon className="h-4 w-4 text-cyanx-400" />
                  {SITE.telegramHandle}
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex items-start gap-3 rounded-2xl border border-white/[0.07] px-5 py-4 text-xs leading-relaxed text-slate-500">
              <ShieldCheck className="h-4 w-4 shrink-0 text-leaf-400" />
              {t(L('Маълумотлар фақат ариза кўриб чиқиш учун ишлатилади ва учинчи шахсларга берилмайди.', 'Данные используются только для рассмотрения заявки и не передаются третьим лицам.'))}
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}

function Catalog() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [sector, setSector] = useState('all');
  const usedSectors = useMemo(() => SECTORS.filter((s) => SOLUTIONS.some((x) => x.sectors.includes(s.id))), []);
  const list = sector === 'all' ? SOLUTIONS : SOLUTIONS.filter((s) => s.sectors.includes(sector));
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow={L('Тайёр инновациялар', 'Готовые инновации')}
          title={L('Резидентларимиз таклиф қиладиган ечимлар', 'Решения, которые предлагают наши резиденты')}
          text={L('Муаммоингизга ўхшаш ечимни топдингизми? «Сўров юбориш» тугмасини босинг — форма автоматик тўлдирилади.', 'Нашли похожее решение? Нажмите «Запросить» — форма заполнится автоматически.')}
        />
        <Reveal delay={0.1}>
          <div className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2">
            <button type="button" className="chip shrink-0" data-active={sector === 'all'} onClick={() => setSector('all')}>
              {t(L('Барчаси', 'Все'))}
            </button>
            {usedSectors.map((s) => (
              <button key={s.id} type="button" className="chip shrink-0" data-active={sector === s.id} onClick={() => setSector(s.id)}>
                <Icon name={s.icon} className="h-4 w-4" />
                {t(s.label)}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 0.05}>
              <TiltCard className="card group flex h-full flex-col p-6" max={6}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-azure-500/20 to-leaf-400/20 text-cyanx-300 ring-1 ring-white/10">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold leading-snug">{t(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(s.text)}</p>
                <div className="mt-5 rounded-2xl border border-leaf-400/20 bg-leaf-400/[0.06] px-3.5 py-2.5 text-sm font-semibold text-leaf-300">
                  <Sparkles className="mr-1.5 inline h-3.5 w-3.5" />
                  {t(s.effect)}
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>{t(L('Пилот', 'Пилот'))}: {t(s.pilot)}</span>
                  <span className="truncate pl-2">{t(s.team)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/biznes?yechim=${s.id}#ariza`)}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 py-2.5 text-sm font-semibold text-white transition group-hover:border-cyanx-400/50 group-hover:bg-cyanx-400/10"
                >
                  {t(L('Сўров юбориш', 'Запросить'))}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CasesStrip() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead eyebrow={L('Натижалар', 'Результаты')} title={L('Вилоят корхоналари учун ҳал қилинган муаммолар', 'Решённые задачи предприятий области')} />
          <Reveal>
            <Button to="/muammolar" variant="ghost" icon>
              {t(L('Муаммолар биржаси', 'Биржа задач'))}
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {CASES.map((c, i) => {
            const s = sectorOf(c.sector);
            return (
              <Reveal key={c.id} delay={i * 0.06}>
                <div className="card flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <Badge tone="cyan">
                      <Icon name={s?.icon} className="h-3.5 w-3.5" />
                      {t(s?.label)}
                    </Badge>
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold">{t(c.company)}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">{t(districtOf(c.district)?.label)}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{t(c.solution)}</p>
                  <div className="mt-auto grid grid-cols-3 gap-2 pt-6">
                    {c.metrics.map((m, j) => (
                      <div key={j} className={cx('rounded-xl bg-white/[0.03] p-2.5', j === 0 && 'bg-leaf-400/[0.08]')}>
                        <div className={cx('font-display text-sm font-semibold', j === 0 ? 'text-leaf-300' : 'text-white')}>{t(m.value)}</div>
                        <div className="mt-0.5 text-[10px] leading-tight text-slate-400">{t(m.label)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Business() {
  const { t } = useLang();
  return (
    <>
      <Seo
        title={L('Бизнес учун — муаммоингизга инновацион ечим · Ёшлар технопарки', 'Для бизнеса — инновационное решение вашей задачи · Молодёжный технопарк')}
        description={L(
          'Корхона муаммосини юборинг: 3 иш кунида эксперт боғланади, 2–3 ҳафтада инновацион ечим таклифи. Бепул диагностика, махфийлик кафолати.',
          'Отправьте задачу предприятия: эксперт свяжется за 3 рабочих дня, предложение — через 2–3 недели. Бесплатная диагностика и конфиденциальность.'
        )}
      />
      <PageHero
        eyebrow={L('Тадбиркорлар ва корхоналар учун', 'Для предпринимателей и предприятий')}
        title={
          <>
            {t(L('Муаммоингизни айтинг —', 'Расскажите о проблеме —'))} <span className="text-grad">{t(L('биз инновация таклиф қиламиз', 'мы предложим инновацию'))}</span>
          </>
        }
        text={L(
          'Харажатлар, брак, сув ва энергия исрофи, қўл меҳнати, ҳисоб йўқлиги… Технопарк экспертлари, резидент стартаплар ва олимлар корхонангиз учун аниқ ва ўлчанадиган ечим топади.',
          'Затраты, брак, потери воды и энергии, ручной труд, отсутствие учёта… Эксперты технопарка, стартапы-резиденты и учёные найдут для вашего предприятия конкретное и измеримое решение.'
        )}
        aside={
          <div className="card grid grid-cols-2 gap-px overflow-hidden p-0">
            {[
              { v: '3', l: L('иш кунида биринчи жавоб', 'рабочих дня до ответа') },
              { v: '2–3', l: L('ҳафтада ечим таклифи', 'недели до предложения') },
              { v: '0', l: L('сўм — диагностика нархи', 'сум — цена диагностики') },
              { v: '126', l: L('муаммо қабул қилинди', 'задач принято') },
            ].map((x, i) => (
              <div key={i} className="bg-ink-900/60 p-5 sm:p-6">
                <div className="font-display text-3xl font-semibold text-white sm:text-4xl">{x.v}</div>
                <div className="mt-1.5 text-xs text-slate-400 sm:text-sm">{t(x.l)}</div>
              </div>
            ))}
          </div>
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/biznes#ariza" size="lg" variant="leaf" icon>
            {t(L('Ариза тўлдириш', 'Заполнить заявку'))}
          </Button>
          <Link to="/muammolar" className="inline-flex h-14 items-center gap-2 px-2 text-sm font-semibold text-slate-300 hover:text-white">
            {t(L('Бошқа корхоналар муаммоларини кўриш', 'Посмотреть задачи других компаний'))}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>
      <Flow />
      <FormSection />
      <Catalog />
      <CasesStrip />
      <FaqSection items={BUSINESS_FAQ} />
      <CtaBand />
    </>
  );
}
