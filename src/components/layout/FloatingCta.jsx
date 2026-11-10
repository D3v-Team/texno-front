import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Lightbulb } from 'lucide-react';
import { L, useLang } from '../../i18n/LangContext';

/** Pastki o'ng burchakdagi "Muammo yuborish" tugmasi (biznes sahifasidan tashqari) */
export default function FloatingCta() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visible = show && pathname !== '/biznes';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-5 right-5 z-40"
        >
          <Link
            to="/biznes#ariza"
            className="group flex items-center gap-3 rounded-full border border-white/15 bg-ink-900/85 py-2 pl-2 pr-5 text-sm font-semibold text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,.8)] backdrop-blur-xl transition hover:border-leaf-400/50"
          >
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-leaf-400 text-ink-950">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-leaf-400/50" />
              <Lightbulb className="relative h-5 w-5" />
            </span>
            <span className="hidden sm:inline">{t(L('Бизнес муаммосини юбориш', 'Отправить бизнес-задачу'))}</span>
            <span className="sm:hidden">{t(L('Муаммо юбориш', 'Задача'))}</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
