import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Database, FileText, GraduationCap, Images, Landmark, Target } from 'lucide-react';
import { L, useLang } from '../i18n/LangContext';
import { Button, PageHero, Reveal, SectionHead } from '../components/ui';
import { Icon } from '../lib/icons';
import Seo from '../components/Seo';
import { CtaBand } from '../components/sections/shared';
import { WeekStrip } from '../components/sections/directionParts';
import { DirectionCards, TotalFunnel } from '../components/sections/DirectionBlocks';
import EventCalendar from '../components/sections/EventCalendar';
import MediaGallery from '../components/sections/MediaGallery';
import { DIRECTIONS, UNIVERSITIES, directionHref } from '../data/directions';
import { DATES_OF_KIND, TOTAL_EVENTS } from '../data/calendar';

const PARTNERS_EXTRA = [
  { icon: Landmark, label: L('Вилоят Савдо-саноат палатаси', 'Торгово-промышленная палата области') },
  { icon: Target, label: L('«Inno» технопарки', 'Технопарк «Inno»') },
  { icon: Database, label: L('Ёшларнинг инновацион ташаббусларини қўллаб-қувватлаш офиси', 'Офис поддержки инновационных инициатив молодёжи') },
];

function Matrix() {
  const { t } = useLang();
  return (
    <div className="overflow-hidden rounded-3xl border border-white/[0.08]">
      <div className="hidden grid-cols-[1.2fr_1.3fr_1.3fr_0.8fr] gap-px bg-white/[0.06] text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 lg:grid">
        {[
          [L('Йўналиш', 'Направление'), 'bg-ink-900'],
          [L('Чора-тадбир', 'Мероприятие'), 'bg-ink-900 text-azure-300'],
          [L('Кутилаётган натижа', 'Ожидаемый результат'), 'bg-ink-900 text-amberx-300'],
          [L('Мақсадли кўрсаткич', 'Целевой показатель'), 'bg-ink-900 text-leaf-300'],
        ].map(([h, c], i) => (
          <div key={i} className={`${c} px-5 py-4`}>
            {t(h)}
          </div>
        ))}
      </div>
      <div className="divide-y divide-white/[0.06]">
        {DIRECTIONS.map((d) => (
          <Link
            key={d.slug}
            to={directionHref(d)}
            className="group grid gap-4 bg-ink-900/40 p-5 transition hover:bg-white/[0.04] lg:grid-cols-[1.2fr_1.3fr_1.3fr_0.8fr] lg:gap-6"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: `${d.color}1f`, color: d.color }}>
                <Icon name={d.icon} className="h-[18px] w-[18px]" />
              </span>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: d.color }}>
                  {d.roman}
                </div>
                <div className="font-semibold leading-snug text-white">{t(d.title)}</div>
                <div className="mt-1 text-xs text-slate-500">{t(d.schedule)}</div>
              </div>
            </div>
            <div className="text-sm leading-relaxed text-slate-300">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-azure-300 lg:hidden">{t(L('Чора-тадбир', 'Мероприятие'))}</span>
              {t(d.steps[0].text)}
            </div>
            <div className="text-sm leading-relaxed text-slate-300">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-amberx-300 lg:hidden">{t(L('Кутилаётган натижа', 'Ожидаемый результат'))}</span>
              {t(d.results[0])}
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-display text-2xl font-semibold text-white">{t(d.main.value)}</div>
                <div className="text-xs text-slate-400">{t(d.main.label)}</div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-white" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


export default function Directions() {
  const { t } = useLang();
  return (
    <>
      <Seo
        title={L('6 йўналиш — Гулистон ёшлар технопарки', '6 направлений — Гулистанский молодёжный технопарк')}
        description={L('«Йўл харитаси 2026»: Ёшлар куни, танловлар, InnoX, Innoweek, илм-фан интеграцияси ва тадбиркорлар билан ишлаш.', '«Дорожная карта 2026»: День молодёжи, конкурсы, InnoX, Innoweek, интеграция науки и работа с бизнесом.')}
      />
      <PageHero
        eyebrow={L('Сирдарё вилояти · «Йўл харитаси» · 2026', 'Сырдарьинская область · «Дорожная карта» · 2026')}
        title={
          <>
            {t(L('Олти йўналиш —', 'Шесть направлений —'))} <span className="text-grad">{t(L('ўлчанадиган натижалар', 'измеримые результаты'))}</span>
          </>
        }
        text={L(
          'Ҳар бир йўналиш уч қисмдан иборат: чора-тадбир ва уни амалга ошириш механизми, кутилаётган натижа ҳамда рақамлардаги мақсадли кўрсаткичлар.',
          'Каждое направление состоит из трёх частей: мероприятие и механизм его реализации, ожидаемый результат и целевые показатели в цифрах.'
        )}
        aside={
          <div className="card p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{t(L('Ҳафталик тизим', 'Недельная система'))}</div>
            <div className="mt-4 grid gap-2.5">
              {DIRECTIONS.filter((d) => d.days.length).map((d) => (
                <div key={d.slug} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <span className="min-w-0 text-sm text-slate-300 sm:truncate">{t(d.title)}</span>
                  <WeekStrip days={d.days} color={d.color} size="sm" />
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
              <span className="text-sm text-slate-400">{t(L('19 октябр — 31 декабр', '19 октября — 31 декабря'))}</span>
              <span className="font-display text-2xl font-semibold text-white">
                {TOTAL_EVENTS} <span className="text-sm text-slate-400">{t(L('тадбир', 'событие'))}</span>
              </span>
            </div>
          </div>
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/yonalishlar#taqvim" size="lg" icon>
            {t(L('Тадбирлар тақвими', 'Календарь событий'))}
          </Button>
          <Button to="/innox#royxat" size="lg" variant="ghost">
            {t(L('InnoX га рўйхатдан ўтиш', 'Регистрация в InnoX'))}
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { href: '#korsatkichlar', icon: Target, label: L('Кўрсаткичлар', 'Показатели') },
            { href: '#taqvim', icon: CalendarDays, label: L('Тадбирлар тақвими', 'Календарь') },
            { href: '#jadval', icon: FileText, label: L('Жадвал', 'Таблица') },
            { href: '#media', icon: Images, label: L('Фото ва видео', 'Фото и видео') },
            { href: '#hamkorlar', icon: GraduationCap, label: L('Ҳамкорлар', 'Партнёры') },
          ].map((n) => (
            <Link key={n.href} to={`/yonalishlar${n.href}`} className="chip">
              <n.icon className="h-4 w-4" />
              {t(n.label)}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="pb-16">
        <div className="container">
          <DirectionCards />
        </div>
      </section>

      <section id="korsatkichlar" className="section scroll-mt-24">
        <div className="container">
          <SectionHead
            eyebrow={L('Умумий якуний кўрсаткичлар', 'Общие итоговые показатели')}
            title={L('Ғоядан тижоратлаштиришгача', 'От идеи до коммерциализации')}
            text={L(
              '2026 йил якунига қадар технопарк ёшлар, ОТМлар, олимлар ва тадбиркорларни бирлаштирувчи ҳудудий инновацион платформага айланади.',
              'К концу 2026 года технопарк станет региональной инновационной платформой, объединяющей молодёжь, вузы, учёных и предпринимателей.'
            )}
          />
          <div className="mt-12">
            <TotalFunnel />
          </div>
        </div>
      </section>
      <section id="taqvim" className="section scroll-mt-24">
        <div className="container">
          <SectionHead
            eyebrow={L('Тадбирлар тақвими · 19 октябр — 31 декабр 2026', 'Календарь событий · 19 октября — 31 декабря 2026')}
            title={L('Уч ойлик календар режа-график', 'Трёхмесячный календарный план')}
            text={L(
              'Ҳар бир тадбир тури ўз рангида. Сана устига босинг — тадбир маълумоти, фото ва видео материаллари очилади. Турлар бўйича филтрланг ва тақвимни ўз календарингизга юклаб олинг.',
              'У каждого типа события свой цвет. Нажмите на дату — откроются сведения, фото и видео. Фильтруйте по типам и скачайте календарь в свой.'
            )}
          />
          <div className="mt-10">
            <EventCalendar />
          </div>
        </div>
      </section>

      <section id="jadval" className="section scroll-mt-24">
        <div className="container">
          <SectionHead
            eyebrow={L('Мундарижа', 'Содержание')}
            title={L('Олти йўналиш: чора-тадбир → натижа → кўрсаткич', 'Шесть направлений: мероприятие → результат → показатель')}
          />
          <Reveal delay={0.1}>
            <div className="mt-10">
              <Matrix />
            </div>
          </Reveal>
          <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {DIRECTIONS.map((d) => (
              <div key={d.slug} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <div className="text-[11px] text-slate-500">{d.roman}</div>
                <div className="font-display text-lg font-semibold text-white">{DATES_OF_KIND[d.kind]?.length || 0}</div>
                <div className="text-[11px] text-slate-400">{t(L('та сана', 'дат'))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="media" className="section scroll-mt-24">
        <div className="container">
          <SectionHead
            eyebrow={L('Медиатека', 'Медиатека')}
            title={L('Тадбирлардан фото ва видео', 'Фото и видео с мероприятий')}
            text={L('InnoX, танловлар, олимлар ва тадбиркорлар учрашувлари, «Ёшлар куни» ва Иннотехнопарк куни.', 'InnoX, конкурсы, встречи учёных и бизнеса, «День молодёжи» и День Иннотехнопарка.')}
          />
          <div className="mt-10">
            <MediaGallery filter limit={16} />
          </div>
        </div>
      </section>

      <section id="hamkorlar" className="section scroll-mt-24">
        <div className="container">
          <SectionHead eyebrow={L('Ҳамкорлар', 'Партнёры')} title={L('5 та олий таълим ташкилоти ва ҳамкорлар', '5 вузов и партнёры')} />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {UNIVERSITIES.map((u, i) => (
              <Reveal key={u.id} delay={i * 0.04}>
                <div className="flex h-full items-center gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-azure-500/15 text-azure-300">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-white">{t(u.label)}</span>
                </div>
              </Reveal>
            ))}
            {PARTNERS_EXTRA.map((p, i) => (
              <Reveal key={i} delay={0.2 + i * 0.04}>
                <div className="flex h-full items-center gap-4 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-leaf-400/10 text-leaf-300">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-white">{t(p.label)}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-xs text-slate-500">
            {t(
              L(
                'Манба: «Гулистон ёшлар технопарки фаолиятини ривожлантириш бўйича белгиланган чора-тадбирларнинг кутилаётган натижалари ва мақсадли кўрсаткичлари» (Йўл харитаси, 2026).',
                'Источник: «Ожидаемые результаты и целевые показатели мероприятий по развитию Гулистанского молодёжного технопарка» (Дорожная карта, 2026).'
              )
            )}
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
