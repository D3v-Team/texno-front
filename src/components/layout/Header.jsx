import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CalendarDays, ChevronDown, Menu, Phone, X, Send } from 'lucide-react';
import logo from '../../assets/logo.jpg';
import { L, LANGS, useLang } from '../../i18n/LangContext';
import { NAV, NAV_FLAT, SITE } from '../../data/site';
import { DIRECTIONS, directionHref } from '../../data/directions';
import { Icon } from '../../lib/icons';
import { Button, cx } from '../ui';

export function Logo({ compact = false }) {
  const { t } = useLang();
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label={t(SITE.name)}>
      <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white shadow-[0_6px_24px_-6px_rgba(91,127,255,.6)] ring-1 ring-white/20 transition-transform duration-500 group-hover:rotate-[-6deg]">
        <img src={logo} alt="" className="h-[118%] w-[118%] max-w-none object-cover object-[50%_38%]" width="44" height="44" />
      </span>
      {!compact && (
        <span className="block leading-tight">
          <span className="block whitespace-nowrap font-display text-[12px] font-semibold uppercase tracking-wide text-white">{t(SITE.shortName)}</span>
          <span className="block whitespace-nowrap text-[11px] text-slate-400">{t(SITE.region)}</span>
          <span className="block whitespace-nowrap text-[11px] text-slate-400">{t(SITE.slogan)}</span>
          {/* this is spab tag */}
          <span>
            TAG:{t(SITE.tag)}
          </span>

        </span>
      )}
    </Link>
  );
}

export function LangSwitch({ className }) {
  const { lang, setLang } = useLang();
  return (
    <div className={cx('flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1', className)} role="group" aria-label="Til / Язык">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          title={l.label}
          onClick={() => setLang(l.code)}
          className={cx(
            'relative h-7 rounded-full px-2.5 text-[11px] font-bold tracking-wide transition-colors',
            lang === l.code ? 'text-ink-950' : 'text-slate-400 hover:text-white'
          )}
        >
          {lang === l.code && (
            <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
          )}
          <span className="relative">{l.short}</span>
        </button>
      ))}
    </div>
  );
}

function DesktopItem({ item, openId, setOpenId }) {
  const { t } = useLang();
  const { pathname } = useLocation();
  const isOpen = openId === item.id;
  const hasMenu = item.mega || item.children;
  const active = item.to
    ? pathname === item.to || pathname.startsWith(`${item.to}/`) || (item.mega && pathname.startsWith('/yonalishlar'))
    : item.children?.some((c) => pathname.startsWith(c.to));

  const label = (
    <span className="relative flex items-center gap-1.5">
      {item.highlight && <span className="h-1.5 w-1.5 rounded-full bg-leaf-400 shadow-[0_0_8px_#4FE08A]" />}
      {item.badge ? (
        <span className="font-display font-semibold tracking-tight">
          Inno<span className="text-[#c4b5fd]">X</span>
        </span>
      ) : (
        t(item.label)
      )}
      {hasMenu && <ChevronDown className={cx('h-3.5 w-3.5 transition-transform', isOpen && 'rotate-180')} />}
    </span>
  );
  const cls = cx(
    'relative whitespace-nowrap rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors',
    active || isOpen ? 'text-white' : 'text-slate-400 hover:text-white'
  );
  const pill = active && (
    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
  );

  if (!hasMenu) {
    return (
      <Link to={item.to} className={cls}>
        {pill}
        {label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => setOpenId(item.id)} onMouseLeave={() => setOpenId(null)}>
      <button type="button" className={cls} aria-expanded={isOpen} aria-haspopup="true" onClick={() => setOpenId(isOpen ? null : item.id)}>
        {pill}
        {label}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
          >
            {item.mega ? <DirectionsMenu /> : <ChildrenMenu items={item.children} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DirectionsMenu() {
  const { t } = useLang();
  return (
    <div className="glass-strong w-[760px] rounded-3xl p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)]">
      <div className="grid grid-cols-2 gap-1">
        {DIRECTIONS.map((d) => (
          <Link key={d.slug} to={directionHref(d)} className="group flex gap-3 rounded-2xl p-3 transition hover:bg-white/[0.05]">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-sm font-semibold" style={{ background: `${d.color}1f`, color: d.color }}>
              0{d.n}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-snug text-white">{t(d.title)}</span>
              <span className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                <span className="truncate">{t(d.schedule)}</span>
                <span className="text-slate-600">·</span>
                <span className="shrink-0 font-semibold" style={{ color: d.color }}>
                  {t(d.main.value)}
                </span>
              </span>
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 rounded-2xl bg-white/[0.03] px-4 py-3 text-sm">
        <Link to="/yonalishlar" className="flex items-center gap-1.5 font-semibold text-white hover:text-cyanx-300">
          {t(L('Барча йўналишлар ва кўрсаткичлар', 'Все направления и показатели'))}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/yonalishlar#taqvim" className="flex items-center gap-1.5 text-slate-400 hover:text-white">
          <CalendarDays className="h-4 w-4" />
          {t(L('Тадбирлар тақвими', 'Календарь событий'))}
        </Link>
      </div>
    </div>
  );
}

function ChildrenMenu({ items }) {
  const { t } = useLang();
  return (
    <div className="glass-strong w-[300px] rounded-3xl p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)]">
      {items.map((c) => (
        <Link key={c.to} to={c.to} className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-white/[0.05]">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-cyanx-300">
            <Icon name={c.icon} className="h-[18px] w-[18px]" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-white">{t(c.label)}</span>
            <span className="block text-xs text-slate-400">{t(c.desc)}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [mobileDirs, setMobileDirs] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenId(null);
  }, [pathname, hash]);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e) => e.key === 'Escape' && setOpenId(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openId]);

  useEffect(() => {
    const lenis = window.__lenis;
    if (open) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
  }, [open]);

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled || open || openId ? 'border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-xl' : 'border-b border-transparent'
        )}
      >
        <div className="container flex h-[72px] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
            {NAV.map((item) => (
              <DesktopItem key={item.id} item={item} openId={openId} setOpenId={setOpenId} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitch className="hidden sm:flex" />
            <Button to="/biznes#ariza" size="sm" className="hidden md:inline-flex xl:hidden 2xl:inline-flex">
              {t(L('Муаммо юбориш', 'Отправить задачу'))}
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white xl:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink-950/95 pt-[72px] backdrop-blur-xl xl:hidden"
            data-lenis-prevent
          >
            <div className="container flex h-full flex-col overflow-y-auto pb-10 pt-4">
              <nav className="flex flex-col" aria-label="Mobile">
                <div className="border-b border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setMobileDirs((v) => !v)}
                    className="flex w-full items-center justify-between py-4 font-display text-xl font-medium text-white"
                    aria-expanded={mobileDirs}
                  >
                    {t(L('Йўналишлар', 'Направления'))}
                    <ChevronDown className={cx('h-5 w-5 transition-transform', mobileDirs && 'rotate-180')} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileDirs && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="grid gap-1 pb-4">
                          {DIRECTIONS.map((d) => (
                            <Link key={d.slug} to={directionHref(d)} className="flex items-center gap-3 rounded-2xl px-2 py-2.5 hover:bg-white/[0.04]">
                              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-display text-xs font-semibold" style={{ background: `${d.color}1f`, color: d.color }}>
                                0{d.n}
                              </span>
                              <span className="text-[15px] text-slate-200">{t(d.title)}</span>
                            </Link>
                          ))}
                          <Link to="/yonalishlar" className="px-2 pt-2 text-sm font-semibold text-cyanx-300">
                            {t(L('Барча йўналишлар →', 'Все направления →'))}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {NAV_FLAT.slice(1).map((item, i) => (
                  <motion.div key={item.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i, duration: 0.3 }}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cx('flex items-center justify-between border-b border-white/[0.06] py-4 font-display text-xl font-medium', isActive ? 'text-white' : 'text-slate-300')
                      }
                    >
                      {item.to === '/innox' ? (
                        <span>
                          Inno<span className="text-[#c4b5fd]">X</span>
                        </span>
                      ) : (
                        t(item.label)
                      )}
                      {item.to === '/biznes' && <span className="h-2 w-2 rounded-full bg-leaf-400 shadow-[0_0_8px_#4FE08A]" />}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-3">
                <Button to="/innox#royxat" size="lg" className="!bg-none !bg-[#a78bfa] !text-ink-950">
                  {t(L('InnoX га рўйхатдан ўтиш', 'Регистрация в InnoX'))}
                </Button>
                <Button to="/biznes#ariza" size="lg" variant="ghost">
                  {t(L('Бизнес муаммосини юбориш', 'Отправить бизнес-задачу'))}
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <LangSwitch />
                <div className="flex gap-2">
                  <a href={SITE.phoneHref} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white" aria-label="Phone">
                    <Phone className="h-4 w-4" />
                  </a>
                  <a href={SITE.telegram} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white" aria-label="Telegram">
                    <Send className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
