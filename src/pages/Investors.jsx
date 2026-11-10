import { useState } from 'react';
import { motion } from 'motion/react';
import { L, useLang } from '../i18n/LangContext';
import { Button, PageHero, Reveal, SectionHead, TiltCard, cx } from '../components/ui';
import { Icon } from '../lib/icons';
import Seo from '../components/Seo';
import { InvestorForm } from '../components/forms/SimpleForms';
import { CtaBand, EventsList, FundingGrid } from '../components/sections/shared';
import { CLUB_STEPS, EVENT_FORMATS, INVESTOR_PERKS, INVESTOR_TYPES } from '../data/content';

const FLOWS = [
  { title: L('Ангел инвестиция', 'Ангельские инвестиции'), text: L('Илк босқич учун капитал ва тажриба', 'Капитал и опыт для ранней стадии'), color: '#FFC24D' },
  { title: L('Ҳаммолиялаш', 'Софинансирование'), text: L('Тадбиркорлар билан биргаликда', 'Совместно с предпринимателями'), color: '#4FE08A' },
  { title: L('Грант ва кредит', 'Гранты и кредиты'), text: L('Давлат ва халқаро дастурлар', 'Государственные и международные программы'), color: '#3FE0F5' },
];

/* Investorlar → startap kapital oqimi (SVG orbital diagramma) */
function CapitalFlow() {
  const { t } = useLang();
  const [hover, setHover] = useState(null);
  const n = INVESTOR_TYPES.length;
  const R = 150;
  const cx0 = 200;
  const cy0 = 200;
  const pts = INVESTOR_TYPES.map((_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [cx0 + Math.cos(a) * R, cy0 + Math.sin(a) * R];
  });
  return (
    <div className="card relative overflow-hidden p-4 sm:p-8">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <svg viewBox="0 0 400 400" className="relative mx-auto block w-full max-w-[460px]" role="img" aria-label={t(L('Капитал оқими', 'Поток капитала'))}>
        <defs>
          <radialGradient id="cf-core" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#3FE0F5" stopOpacity=".55" />
            <stop offset="1" stopColor="#3FE0F5" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={cx0} cy={cy0} r={R} fill="none" stroke="rgba(169,190,255,.15)" strokeDasharray="3 6" />
        <circle cx={cx0} cy={cy0} r={R * 0.55} fill="none" stroke="rgba(169,190,255,.1)" />
        {pts.map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={cx0} y2={cy0} stroke={hover === i ? '#4FE08A' : 'rgba(125,155,255,.25)'} strokeWidth={hover === i ? 1.6 : 1} />
            <circle r="3" fill={hover === i ? '#4FE08A' : '#7D9BFF'}>
              <animateMotion dur={`${2.4 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={`M${x},${y} L${cx0},${cy0}`} />
            </circle>
          </g>
        ))}
        <circle cx={cx0} cy={cy0} r="70" fill="url(#cf-core)" />
        <circle cx={cx0} cy={cy0} r="44" fill="#0E1834" stroke="#3FE0F5" strokeOpacity=".6" />
        <text x={cx0} y={cy0 - 3} textAnchor="middle" className="fill-white font-display" fontSize="13" fontWeight="600">
          {t(L('Стартап', 'Стартап'))}
        </text>
        <text x={cx0} y={cy0 + 13} textAnchor="middle" fill="#94a3b8" fontSize="8.5">
          {t(L('сизнинг лойиҳангиз', 'ваш проект'))}
        </text>
        {pts.map(([x, y], i) => (
          <g key={`n${i}`} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="cursor-pointer">
            <circle cx={x} cy={y} r={hover === i ? 9 : 7} fill={hover === i ? '#4FE08A' : '#22305E'} stroke="#7D9BFF" strokeOpacity=".7" />
          </g>
        ))}
      </svg>
      <div className="relative mt-4 flex flex-wrap justify-center gap-1.5">
        {INVESTOR_TYPES.map((x, i) => (
          <span
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className={cx('cursor-default rounded-full border px-3 py-1 text-xs transition', hover === i ? 'border-leaf-400/50 bg-leaf-400/10 text-white' : 'border-white/10 text-slate-400')}
          >
            {t(x)}
          </span>
        ))}
      </div>
      <div className="relative mt-6 grid gap-2 sm:grid-cols-3">
        {FLOWS.map((f, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.07] bg-ink-950/40 p-3.5">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="h-2 w-2 rounded-full" style={{ background: f.color, boxShadow: `0 0 8px ${f.color}` }} />
              {t(f.title)}
            </div>
            <div className="mt-1 text-xs text-slate-400">{t(f.text)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Investors() {
  const { t } = useLang();
  return (
    <>
      <Seo
        title={L('Инвесторлар бизнес клуби · Ёшлар технопарки', 'Бизнес-клуб инвесторов · Молодёжный технопарк')}
        description={L('Pitch Day, Demo Day ва ёпиқ учрашувлар. Саралаб олинган стартаплар, ҳаммолиялаш ва корпоратив пилотлар.', 'Pitch Day, Demo Day и закрытые встречи. Отобранные стартапы, софинансирование и корпоративные пилоты.')}
      />
      <PageHero
        eyebrow={L('Технопарк имконияти · Инвестиция', 'Возможности технопарка · Инвестиции')}
        title={
          <>
            {t(L('Инвесторлар', 'Бизнес-клуб'))} <span className="text-grad">{t(L('бизнес клуби', 'инвесторов'))}</span>
          </>
        }
        text={L(
          'Энг яхши ғоя ҳам молиясиз тўхтаб қолади. Бизнес клуб стартаплар ва инвесторларни бир столга йиғади — лойиҳа молиялаштирилгунча ёнингиздамиз.',
          'Даже лучшая идея останавливается без денег. Бизнес-клуб собирает стартапы и инвесторов за одним столом — мы рядом, пока проект не получит финансирование.'
        )}
        aside={
          <div className="flex flex-wrap gap-2">
            {EVENT_FORMATS.map((f, i) => (
              <span key={i} className="glass rounded-full px-4 py-2 text-sm text-white">
                {t(f)}
              </span>
            ))}
          </div>
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/investorlar#ariza" size="lg" icon>
            {t(L('Клубга қўшилиш', 'Вступить в клуб'))}
          </Button>
          <Button to="/investorlar#tadbirlar" size="lg" variant="ghost">
            {t(L('Яқин Pitch Day', 'Ближайший Pitch Day'))}
          </Button>
        </div>
      </PageHero>

      <section className="section pt-4">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow={L('Қандай ишлайди', 'Как это работает')} title={L('Питчдан келишувгача 3 қадам', '3 шага от питча до сделки')} />
            <ol className="mt-10 grid gap-3">
              {CLUB_STEPS.map((s, i) => (
                <Reveal as="li" key={i} delay={i * 0.08}>
                  <div className="flex gap-5 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amberx-400/10 font-display text-lg font-semibold text-amberx-300">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{t(s.title)}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{t(s.text)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal delay={0.1}>
            <CapitalFlow />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={L('Инвесторлар учун', 'Для инвесторов')} title={L('Нима учун клубга қўшилиш керак', 'Зачем вступать в клуб')} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INVESTOR_PERKS.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <TiltCard className="card h-full p-6" max={6}>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amberx-400/10 text-amberx-300">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold">{t(p.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{t(p.text)}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={L('Молиялаштириш', 'Финансирование')}
            title={L('Молиявий қўллаб-қувватлаш механизмлари', 'Механизмы финансовой поддержки')}
            text={L('Молиялаштириш тури лойиҳа босқичи, хавф даражаси ва даромад моделига мос танланади.', 'Тип финансирования подбирается под стадию проекта, уровень риска и модель дохода.')}
          />
          <div className="mt-12">
            <FundingGrid />
          </div>
        </div>
      </section>

      <section id="tadbirlar" className="section scroll-mt-24">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow={L('Тадбирлар тақвими', 'Календарь событий')} title={L('Pitch Day, Demo Day ва бошқалар', 'Pitch Day, Demo Day и другие')} />
          <EventsList />
        </div>
      </section>

      <section id="ariza" className="section scroll-mt-24">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead
            eyebrow={L('Ариза', 'Заявка')}
            title={L('Инвесторлар клубига қўшилинг', 'Вступите в клуб инвесторов')}
            text={L('Аъзолик бепул. Қизиқиш соҳаларингиз бўйича саралаб олинган лойиҳалар рўйхатини оласиз.', 'Членство бесплатное. Вы будете получать подборку проектов по вашим интересам.')}
          />
          <Reveal delay={0.1}>
            <motion.div className="card p-6 sm:p-8">
              <InvestorForm />
            </motion.div>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
