import { lazy, Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarDays, Check, Maximize2, MousePointerClick, Users } from 'lucide-react';
import { L, useLang } from '../i18n/LangContext';
import { Button, PageHero, Reveal, SectionHead, TiltCard, cx } from '../components/ui';
import { Icon } from '../lib/icons';
import Seo from '../components/Seo';
import { BookingForm } from '../components/forms/SimpleForms';
import { CanvasFallback, CtaBand } from '../components/sections/shared';
import { FLOORS, ROOMS } from '../data/rooms';

const Building3D = lazy(() => import('../components/three/Building3D'));

function RoomPanel({ room, onBook }) {
  const { t } = useLang();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={room.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="flex h-full flex-col"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: `${room.color}1f`, color: room.color }}>
            <Icon name={room.icon} className="h-5 w-5" />
          </span>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: room.color }}>
              {t(room.tag)}
            </div>
            <div className="text-xs text-slate-500">{t(FLOORS.find((f) => f.level === room.floor)?.label)}</div>
          </div>
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold">{t(room.name)}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{t(room.text)}</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
              <Maximize2 className="h-3.5 w-3.5" />
              {t(L('Майдон', 'Площадь'))}
            </div>
            <div className="mt-1 font-semibold text-white">{room.area} м²</div>
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
              <Users className="h-3.5 w-3.5" />
              {t(L('Сиғим', 'Вместимость'))}
            </div>
            <div className="mt-1 font-semibold text-white">{t(room.capacity)}</div>
          </div>
        </div>
        <ul className="mt-5 grid gap-2">
          {room.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
              <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: room.color }} />
              {t(f)}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-1.5">
          <span className="text-xs text-slate-500">{t(L('Кимлар учун:', 'Для кого:'))}</span>
          {room.audience.map((a, i) => (
            <span key={i} className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-xs text-slate-300">
              {t(a)}
            </span>
          ))}
        </div>
        <Button type="button" onClick={() => onBook(room.id)} className="mt-auto w-full" style={{ marginTop: 'auto' }}>
          <CalendarDays className="h-4 w-4" />
          {t(L('Бронлаш', 'Забронировать'))}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Infrastructure() {
  const { t } = useLang();
  const [params, setParams] = useSearchParams();
  const initial = ROOMS.find((r) => r.id === params.get('xona'))?.id || 'coworking';
  const [selected, setSelected] = useState(initial);
  const [bookRoom, setBookRoom] = useState(initial);
  const room = ROOMS.find((r) => r.id === selected) || ROOMS[0];

  useEffect(() => {
    const q = params.get('xona');
    if (q && ROOMS.some((r) => r.id === q)) setSelected(q);
  }, [params]);

  function select(id) {
    if (!id) return;
    setSelected(id);
    setParams({ xona: id }, { replace: true });
  }

  function book(id) {
    setBookRoom(id);
    const el = document.getElementById('bron');
    if (el) {
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90, duration: 1.1 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <Seo
        title={L('Хоналар ва лабораториялар — 3D режа · Ёшлар технопарки', 'Пространства и лаборатории — 3D-план · Молодёжный технопарк')}
        description={L('Коворкинг, конференц зал, FabLab, робототехника, IT ва AI лабораторияси, медиа студия ва инкубация офислари. Онлайн бронлаш.', 'Коворкинг, конференц-зал, FabLab, робототехника, лаборатория IT и AI, медиастудия и офисы инкубации. Онлайн-бронирование.')}
      />
      <PageHero
        eyebrow={L('Технопарк имконияти · Инфратузилма', 'Возможности технопарка · Инфраструктура')}
        title={
          <>
            {t(L('Стартап учун барча шароит —', 'Всё для стартапа —'))} <span className="text-grad">{t(L('бир бинода', 'в одном здании'))}</span>
          </>
        }
        text={L('4 қават, 8 та макон, 1 100 м² майдон. Бинонинг 3D моделида хонани танланг ва унинг имкониятлари билан танишинг.', '4 этажа, 8 пространств, 1 100 м². Выберите помещение на 3D-модели здания и узнайте о его возможностях.')}
      />

      <section className="pb-20">
        <div className="container">
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <div className="relative h-[440px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-gradient-to-b from-ink-850 to-ink-950 sm:h-[560px] lg:h-[640px]">
                <div className="pointer-events-none absolute inset-x-10 top-6 h-40 rounded-full bg-azure-500/20 blur-[80px]" />
                <div className="absolute left-4 top-4 z-10 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {t(L('Технопарк биноси · интерактив режа', 'Здание технопарка · интерактивный план'))}
                </div>
                <Suspense fallback={<CanvasFallback />}>
                  <Building3D selectedId={selected} onSelect={select} />
                </Suspense>
                <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-ink-950/70 px-3 py-1.5 text-xs text-slate-300 backdrop-blur">
                  <MousePointerClick className="h-3.5 w-3.5 text-cyanx-400" />
                  {t(L('Хонани босинг', 'Нажмите на помещение'))}
                  <span className="[@media(pointer:coarse)]:hidden">· {t(L('айлантириш учун суринг', 'потяните для поворота'))}</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="card h-full p-6 sm:p-7">
                <RoomPanel room={room} onBook={book} />
              </div>
            </Reveal>
          </div>

          {/* qavatlar bo'yicha tez tanlash */}
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {FLOORS.map((f) => (
              <Reveal key={f.level}>
                <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <div className="text-xs font-semibold text-slate-400">{t(f.label)}</div>
                  <div className="mt-3 grid gap-1.5">
                    {ROOMS.filter((r) => r.floor === f.level).map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => select(r.id)}
                        className={cx(
                          'flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition',
                          selected === r.id ? 'bg-white/[0.08] text-white' : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                        )}
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r.color, boxShadow: selected === r.id ? `0 0 10px ${r.color}` : 'none' }} />
                        {t(r.name)}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <SectionHead eyebrow={L('Барча маконлар', 'Все пространства')} title={L('Ҳар бир ғоя учун ўз макони', 'Своё пространство для каждой идеи')} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROOMS.map((r, i) => (
              <Reveal key={r.id} delay={(i % 4) * 0.05}>
                <TiltCard className="card group flex h-full flex-col p-6" max={6}>
                  <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60" style={{ background: r.color }} />
                  <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: `${r.color}1f`, color: r.color }}>
                    <Icon name={r.icon} className="h-5 w-5" />
                  </span>
                  <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: r.color }}>
                    {t(r.tag)}
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-semibold">{t(r.name)}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">{t(r.text)}</p>
                  <div className="mt-auto flex items-center justify-between pt-5 text-xs text-slate-400">
                    <span>{r.area} м²</span>
                    <span>{t(r.capacity)}</span>
                  </div>
                  <button type="button" onClick={() => book(r.id)} className="absolute inset-0 rounded-3xl" aria-label={t(r.name)} />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="bron" className="section scroll-mt-24">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead
            eyebrow={L('Онлайн бронлаш', 'Онлайн-бронирование')}
            title={L('Хона ёки лабораторияни бронланг', 'Забронируйте помещение или лабораторию')}
            text={L('Администратор 1 иш куни ичида бронни тасдиқлайди. Резидентлар учун — бепул.', 'Администратор подтвердит бронь в течение рабочего дня. Для резидентов — бесплатно.')}
          />
          <Reveal delay={0.1}>
            <div className="card p-6 sm:p-8">
              <BookingForm roomId={bookRoom} />
            </div>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
