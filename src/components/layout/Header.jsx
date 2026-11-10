import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Phone, X, Send } from 'lucide-react';
import logo from '../../assets/logo.jpg';
import { L, LANGS, useLang } from '../../i18n/LangContext';
import { NAV, SITE } from '../../data/site';
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

export default function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

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
          scrolled || open ? 'border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl' : 'border-b border-transparent'
        )}
      >
        <div className="container flex h-[72px] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cx(
                    'relative whitespace-nowrap rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors',
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative flex items-center gap-1.5">
                      {item.highlight && <span className="h-1.5 w-1.5 rounded-full bg-leaf-400 shadow-[0_0_8px_#4FE08A]" />}
                      {t(item.label)}
                    </span>
                  </>
                )}
              </NavLink>
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
            <div className="container flex h-full flex-col overflow-y-auto pb-10 pt-6">
              <nav className="flex flex-col" aria-label="Mobile">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.35 }}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cx(
                          'flex items-center justify-between border-b border-white/[0.06] py-4 font-display text-xl font-medium',
                          isActive ? 'text-white' : 'text-slate-300'
                        )
                      }
                    >
                      {t(item.label)}
                      {item.highlight && <span className="h-2 w-2 rounded-full bg-leaf-400 shadow-[0_0_8px_#4FE08A]" />}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-3">
                <Button to="/biznes#ariza" size="lg">
                  {t(L('Бизнес муаммосини юбориш', 'Отправить бизнес-задачу'))}
                </Button>
                <Button to="/startaplar#ariza" size="lg" variant="ghost">
                  {t(L('Стартап ариза', 'Заявка стартапа'))}
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
