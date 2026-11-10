import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useLang } from '../../i18n/LangContext';

export const cx = (...a) => a.filter(Boolean).join(' ');

/* ───────────── Button ───────────── */
const BTN_BASE =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap';
const BTN_SIZES = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-7 text-base',
};
const BTN_VARIANTS = {
  primary:
    'text-ink-950 bg-brand-grad bg-[length:200%_100%] bg-left hover:bg-right shadow-[0_10px_40px_-10px_rgba(63,224,245,.6)] hover:shadow-[0_14px_50px_-10px_rgba(63,224,245,.8)]',
  ghost: 'text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/30',
  leaf: 'text-ink-950 bg-leaf-400 hover:bg-leaf-300 shadow-glow-leaf',
  dark: 'text-white bg-ink-950/80 border border-white/10 hover:border-white/30',
};

export function Button({ to, href, variant = 'primary', size = 'md', className, children, icon = false, ...rest }) {
  const cls = cx(BTN_BASE, BTN_SIZES[size], BTN_VARIANTS[variant], className);
  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {icon && (
        <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}

/* ───────────── Reveal ───────────── */
export function Reveal({ children, delay = 0, y = 24, className, as = 'div', once = true }) {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

/* ───────────── Section heading ───────────── */
export function SectionHead({ eyebrow, title, text, align = 'left', className, children }) {
  const { t } = useLang();
  return (
    <div className={cx('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-cyanx-400 shadow-[0_0_10px_#3FE0F5]" />
            {t(eyebrow)}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="h-section mt-5 text-balance">{typeof title === 'object' && !title?.$$typeof ? t(title) : title}</h2>
      </Reveal>
      {text && (
        <Reveal delay={0.1}>
          <p className="lead mt-5 text-pretty">{t(text)}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}

/* ───────────── Tilt card (3D hover) ───────────── */
export function TiltCard({ children, className, max = 8, glare = true, ...rest }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });
  const glareBg = useTransform(
    [mx, my],
    ([x, y]) => `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,.09), transparent 45%)`
  );
  const [hover, setHover] = useState(false);

  function onMove(e) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
    setHover(false);
  }

  return (
    <div className="perspective h-full">
      <motion.div
        ref={ref}
        onPointerMove={(e) => e.pointerType === 'mouse' && onMove(e)}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className={cx('relative h-full', className)}
        {...rest}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
            style={{ opacity: hover ? 1 : 0, background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ───────────── Animated counter ───────────── */
export function Counter({ value, decimals = 0, duration = 1.8, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);
  const { lang } = useLang();

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  const locale = lang === 'ru' ? 'ru-RU' : 'uz-UZ';
  const text = display.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref} className={className}>
      {decimals > 0 ? text.replace('.', ',') : text}
    </span>
  );
}

/* ───────────── Badge ───────────── */
const TONES = {
  leaf: 'text-leaf-300 bg-leaf-400/10 border-leaf-400/30',
  amber: 'text-amberx-300 bg-amberx-400/10 border-amberx-400/30',
  azure: 'text-azure-300 bg-azure-500/10 border-azure-400/30',
  cyan: 'text-cyanx-300 bg-cyanx-400/10 border-cyanx-400/30',
  coral: 'text-coral-400 bg-coral-400/10 border-coral-400/30',
  slate: 'text-slate-300 bg-white/5 border-white/10',
};
export function Badge({ tone = 'slate', children, className, dot }) {
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium', TONES[tone], className)}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export const TONE_TEXT = {
  leaf: 'text-leaf-400',
  amber: 'text-amberx-400',
  azure: 'text-azure-400',
  cyan: 'text-cyanx-400',
  coral: 'text-coral-400',
};
export const TONE_BG = {
  leaf: 'bg-leaf-400/10 text-leaf-300 ring-leaf-400/25',
  amber: 'bg-amberx-400/10 text-amberx-300 ring-amberx-400/25',
  azure: 'bg-azure-500/10 text-azure-300 ring-azure-400/25',
  cyan: 'bg-cyanx-400/10 text-cyanx-300 ring-cyanx-400/25',
  coral: 'bg-coral-400/10 text-coral-400 ring-coral-400/25',
};

/* ───────────── Accordion (FAQ) ───────────── */
export function Accordion({ items }) {
  const { t } = useLang();
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-white/[0.07] overflow-hidden rounded-3xl border border-white/10 bg-ink-900/40">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7"
            >
              <span className="text-[15px] font-semibold text-white sm:text-base">{t(it.q)}</span>
              <span
                className={cx(
                  'grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 transition-all duration-300',
                  isOpen && 'rotate-180 border-cyanx-400/50 bg-cyanx-400/10 text-cyanx-300'
                )}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            <motion.div
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="px-5 pb-6 text-[15px] leading-relaxed text-slate-400 sm:px-7">{t(it.a)}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

/* ───────────── Page hero (inner pages) ───────────── */
export function PageHero({ eyebrow, title, text, children, aside }) {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-azure-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-40 h-[360px] w-[360px] rounded-full bg-leaf-500/15 blur-[120px]" />
      <div className="container relative grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf-400 shadow-[0_0_10px_#4FE08A]" />
              {t(eyebrow)}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-[clamp(24px,7.4vw,34px)] font-semibold leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
              {title}
            </h1>
          </Reveal>
          {text && (
            <Reveal delay={0.1}>
              <p className="lead mt-6 max-w-2xl text-pretty">{t(text)}</p>
            </Reveal>
          )}
          {children && <Reveal delay={0.15}>{children}</Reveal>}
        </div>
        {aside && <Reveal delay={0.2}>{aside}</Reveal>}
      </div>
    </section>
  );
}

/* ───────────── Formatted date ───────────── */
const MONTHS = {
  uz: ['январ', 'феврал', 'март', 'апрел', 'май', 'июн', 'июл', 'август', 'сентябр', 'октябр', 'ноябр', 'декабр'],
  ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
};
// eslint-disable-next-line react-refresh/only-export-components
export function useDate() {
  const { lang, t } = useLang();
  return (iso, withYear = true) => {
    const [y, m, d] = iso.split('-').map(Number);
    const month = lang === 'ru' ? MONTHS.ru[m - 1] : t({ uz: MONTHS.uz[m - 1] });
    return `${d} ${month}${withYear ? ` ${y}` : ''}`;
  };
}
