import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Images, Play, X } from 'lucide-react';
import { L, useLang } from '../../i18n/LangContext';
import { EVENT_KINDS, KIND_ORDER, mediaOf } from '../../data/calendar';
import { cx } from '../ui';

/* ───────── Lightbox ───────── */
export function Lightbox({ items, index, onClose, onIndex }) {
  const { t } = useLang();
  const open = index != null && index >= 0;
  const it = open ? items[index] : null;
  const go = useCallback((d) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);

  useEffect(() => {
    if (!open) return;
    const lenis = window.__lenis;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, go]);

  return createPortal(
    <AnimatePresence>
      {open && it && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-ink-950/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-2 text-sm text-slate-300">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: EVENT_KINDS[it.kind]?.color }} />
              <span className="truncate">{t(EVENT_KINDS[it.kind]?.title)}</span>
              <span className="shrink-0 text-slate-500">
                · {index + 1}/{items.length}
              </span>
            </div>
            <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white hover:border-white/30" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={it.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex h-full w-full items-center justify-center"
              >
                {it.type === 'video' ? (
                  <video
                    src={it.src}
                    poster={it.poster}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    className={cx('max-h-full rounded-2xl bg-black shadow-2xl', it.orient === 't' ? 'max-w-[min(100%,420px)]' : 'max-w-full')}
                  />
                ) : (
                  <img src={it.src} alt={t(EVENT_KINDS[it.kind]?.title)} className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl" />
                )}
              </motion.div>
            </AnimatePresence>
            {items.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink-900/80 text-white hover:border-white/30 sm:left-4" aria-label="Prev">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => go(1)} className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink-900/80 text-white hover:border-white/30 sm:right-4" aria-label="Next">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ───────── Grid tile ───────── */
function Tile({ it, onClick, big }) {
  const { t } = useLang();
  const kind = EVENT_KINDS[it.kind];
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'group relative block w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-850',
        big ? 'aspect-[4/3] sm:aspect-auto sm:h-full' : 'aspect-[4/3]'
      )}
      aria-label={t(kind?.title)}
    >
      <img
        src={it.type === 'video' ? it.poster : it.src}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-80" />
      {it.type === 'video' && (
        <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink-950 shadow-xl transition group-hover:scale-110">
          <Play className="ml-0.5 h-6 w-6 fill-current" />
        </span>
      )}
      <span className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-1.5 text-left text-[11px] font-medium text-white">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: kind?.color }} />
        <span className="truncate">{t(kind?.short)}</span>
      </span>
    </button>
  );
}

/**
 * Media galereya
 * @param kinds — qaysi tadbir turlari (default: hammasi)
 * @param filter — tur bo'yicha filtr tugmalari
 * @param limit — ko'rsatiladigan elementlar soni (qolgani «Hammasini ko'rish» orqali)
 */
export default function MediaGallery({ kinds, filter = false, limit, featured = false }) {
  const { t } = useLang();
  const available = (kinds || KIND_ORDER).filter((k) => mediaOf(k).length);
  const [active, setActive] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [index, setIndex] = useState(null);

  const items = useMemo(() => {
    const ks = active === 'all' ? available : [active];
    return ks.flatMap(mediaOf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, available.join(',')]);

  let visible = limit && !showAll ? items.slice(0, limit) : items;
  // featured setkada bo'sh kataklar qolmasligi uchun: 1 katta + 4 + 4·k kichik
  if (featured && !showAll && visible.length > 5) {
    const smalls = visible.length - 1;
    visible = visible.slice(0, 1 + 4 + Math.floor((smalls - 4) / 4) * 4);
  }
  const videos = items.filter((x) => x.type === 'video').length;
  const photos = items.length - videos;

  return (
    <div>
      {filter && available.length > 1 && (
        <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1">
          <button type="button" className="chip shrink-0" data-active={active === 'all'} onClick={() => setActive('all')}>
            <Images className="h-4 w-4" />
            {t(L('Барчаси', 'Все'))}
          </button>
          {available.map((k) => (
            <button key={k} type="button" className="chip shrink-0" data-active={active === k} onClick={() => setActive(k)}>
              <span className="h-2 w-2 rounded-full" style={{ background: EVENT_KINDS[k].color }} />
              {t(EVENT_KINDS[k].short)}
              <span className="rounded-full bg-white/10 px-1.5 text-[11px]">{mediaOf(k).length}</span>
            </button>
          ))}
        </div>
      )}
      <div className={cx('grid gap-2 sm:gap-3', featured ? 'grid-cols-2 sm:grid-cols-4 sm:grid-rows-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4')}>
        {visible.map((it, i) => (
          <div key={it.src} className={cx(featured && i === 0 && 'col-span-2 sm:row-span-2')}>
            <Tile it={it} big={featured && i === 0} onClick={() => setIndex(items.indexOf(it))} />
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
        <span>
          {photos} {t(L('фото', 'фото'))}
          {videos ? ` · ${videos} ${t(L('видео', 'видео'))}` : ''}
        </span>
        {items.length > visible.length || showAll ? (
          <button type="button" onClick={() => setShowAll((v) => !v)} className="chip">
            {showAll ? t(L('Йиғиш', 'Свернуть')) : `${t(L('Ҳаммасини кўриш', 'Показать все'))} (${items.length})`}
          </button>
        ) : null}
      </div>
      <Lightbox items={items} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
    </div>
  );
}
