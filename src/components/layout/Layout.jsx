import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './Header';
import Footer from './Footer';
import FloatingCta from './FloatingCta';

function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.5 });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}

/** Sahifa almashganda tepaga, #hash bo'lsa — elementga aylantirish */
function useScrollManager() {
  const { pathname, hash, key } = useLocation();
  const prevPath = useRef(null);
  useEffect(() => {
    const lenis = window.__lenis;
    if (hash) {
      let tries = 0;
      const tryScroll = () => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el) {
          if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.2 });
          else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (tries++ < 20) {
          setTimeout(tryScroll, 100);
        }
      };
      setTimeout(tryScroll, 60);
    } else if (prevPath.current !== pathname) {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }
    prevPath.current = pathname;
  }, [pathname, hash, key]);
}

export default function Layout() {
  useSmoothScroll();
  useScrollManager();
  return (
    <div className="relative min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Suspense
          fallback={
            <div className="grid min-h-[80vh] place-items-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-cyanx-400" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingCta />
    </div>
  );
}
