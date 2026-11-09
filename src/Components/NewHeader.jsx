import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelect from './others/LanguageSelect';
import logo from '../img/logo.jpg';

const NAV_LINKS = [
    { id: 'news-section',     label: 'Yangiliklar' },
    { id: 'events-section',   label: 'Tadbirlar'   },
    { id: 'stats-section',    label: 'Statistika'  },
    { id: 'services-section', label: 'Xizmatlar'   },
    { id: 'gallery-section',  label: 'Galereya'    },
];

function scrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__univerLenis) {
        window.__univerLenis.scrollTo(el, { offset: -80 });
    } else {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
}

export default function NewHeader() {
    const [open, setOpen]         = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { t }                   = useTranslation();
    const location                = useLocation();
    const isHome                  = location.pathname === '/';

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    useEffect(() => { setOpen(false); }, [location.pathname]);

    function handleNav(e, id) {
        if (isHome) { e.preventDefault(); scrollTo(id); }
        setOpen(false);
    }

    return (
        <>
            <style>{`
                .nh {
                    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
                    background: rgba(255,255,255,0.94);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(30,58,138,0.12);
                    transition: box-shadow .3s, background .3s;
                }
                .nh.scrolled {
                    background: rgba(255,255,255,0.98);
                    box-shadow: 0 4px 24px rgba(30,58,138,0.08);
                }
                .nh-inner {
                    display: flex; align-items: center;
                    justify-content: space-between;
                    height: 72px;
                }
                /* logo */
                .nh-logo {
                    display: flex; align-items: center;
                    gap: 10px; text-decoration: none; flex-shrink: 0;
                }
                .nh-logo-img {
                    width: 40px; height: 40px;
                    border-radius: 10px; object-fit: cover;
                    border: 1.5px solid rgba(30,58,138,0.12);
                }
                .nh-logo-name {
                    font-size: 17px; font-weight: 700;
                    letter-spacing: -0.03em; color: #1e3a8a;
                    line-height: 1.1;
                }
                .nh-logo-name span { color: #16a34a; }
                .nh-logo-sub {
                    font-size: 10px; font-weight: 600;
                    letter-spacing: 0.08em; color: #64748b;
                    text-transform: uppercase; display: block;
                }
                /* nav */
                .nh-nav {
                    display: none; align-items: center; gap: 4px;
                }
                @media(min-width:1024px){ .nh-nav { display: flex; } }
                .nh-nav-a {
                    padding: 7px 14px; border-radius: 9999px;
                    font-size: 14px; font-weight: 500;
                    color: #475569; text-decoration: none;
                    transition: color .2s, background .2s;
                    white-space: nowrap;
                }
                .nh-nav-a:hover { color: #1e3a8a; background: rgba(30,58,138,0.06); }
                /* right */
                .nh-right {
                    display: flex; align-items: center; gap: 10px; flex-shrink: 0;
                }
                .nh-lang-wrap { display: none; }
                @media(min-width:640px){ .nh-lang-wrap { display: block; } }
                .nh-cta {
                    display: none; align-items: center; gap: 6px;
                    padding: 8px 18px; border-radius: 9999px;
                    background: #1e3a8a; color: #fff;
                    font-size: 14px; font-weight: 600;
                    text-decoration: none;
                    transition: opacity .2s, transform .2s;
                    white-space: nowrap;
                }
                @media(min-width:768px){ .nh-cta { display: flex; } }
                .nh-cta:hover { opacity: .88; transform: translateY(-1px); }
                .nh-cta svg { width: 14px; height: 14px; }
                /* burger */
                .nh-burger {
                    display: flex; flex-direction: column;
                    justify-content: center; gap: 5px;
                    width: 40px; height: 40px; padding: 0 10px;
                    background: #fff;
                    border: 1px solid rgba(30,58,138,0.16);
                    border-radius: 10px; cursor: pointer;
                    transition: background .2s;
                }
                .nh-burger:hover { background: rgba(30,58,138,0.06); }
                .nh-burger span {
                    display: block; height: 1.5px; border-radius: 2px;
                    background: #1e3a8a;
                    transition: transform .3s, opacity .3s;
                    transform-origin: center;
                }
                .nh-burger.open span:nth-child(1) { transform: rotate(45deg) translate(4.5px,4.5px); }
                .nh-burger.open span:nth-child(2) { opacity: 0; }
                .nh-burger.open span:nth-child(3) { transform: rotate(-45deg) translate(4.5px,-4.5px); }
                @media(min-width:1024px){ .nh-burger { display: none; } }
                /* drawer */
                .nh-drawer {
                    position: fixed; inset: 0; z-index: 199;
                    background: rgba(255,255,255,0.98);
                    backdrop-filter: blur(16px);
                    display: flex; align-items: center; justify-content: center;
                    animation: nhFadeIn .22s ease-out;
                }
                @keyframes nhFadeIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .nh-drawer-nav {
                    display: flex; flex-direction: column;
                    align-items: stretch; gap: 8px;
                    padding: 2rem; width: 100%; max-width: 380px;
                }
                .nh-drawer-a {
                    padding: 14px 18px; border-radius: 12px;
                    font-size: 17px; font-weight: 500; color: #1e3a8a;
                    text-decoration: none;
                    background: #fff; border: 1px solid rgba(30,58,138,0.12);
                    text-align: center;
                    transition: background .2s, color .2s, border-color .2s;
                    animation: nhSlideUp .3s ease backwards;
                }
                .nh-drawer-a:hover { background: rgba(30,58,138,0.06); color: #1e3a8a; border-color: rgba(30,58,138,0.24); }
                .nh-drawer-cta {
                    padding: 14px 18px; border-radius: 12px;
                    font-size: 16px; font-weight: 700; color: #fff;
                    text-decoration: none; text-align: center;
                    background: #1e3a8a;
                    animation: nhSlideUp .3s ease .18s backwards;
                    transition: opacity .2s;
                }
                .nh-drawer-cta:hover { opacity: .88; }
                @keyframes nhSlideUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <header className={`nh ${scrolled ? 'scrolled' : ''}`}>
                <div className="Container">
                    <div className="nh-inner">
                        <Link to="/" className="nh-logo" onClick={() => setOpen(false)}>
                            <img src={logo} alt="logo" className="nh-logo-img" />
                            <div>
                                <span className="nh-logo-name">SIRDARYO <span>YOSHLAR</span></span>
                                <span className="nh-logo-sub">Texnoparki</span>
                            </div>
                        </Link>

                        <nav className="nh-nav">
                            {NAV_LINKS.map(l => (
                                <Link key={l.id} to={`/#${l.id}`} className="nh-nav-a"
                                    onClick={e => handleNav(e, l.id)}>{l.label}</Link>
                            ))}
                        </nav>

                        <div className="nh-right">
                            <div className="nh-lang-wrap"><LanguageSelect /></div>
                            <Link to="/#contact-section" className="nh-cta"
                                onClick={e => handleNav(e, 'contact-section')}>
                                <span>{t('boglanish') || "Bog'lanish"}</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </Link>
                            <button className={`nh-burger ${open ? 'open' : ''}`}
                                onClick={() => setOpen(v => !v)} aria-label="Menu">
                                <span/><span/><span/>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {open && (
                <div className="nh-drawer" onClick={() => setOpen(false)}>
                    <nav className="nh-drawer-nav" onClick={e => e.stopPropagation()}>
                        {NAV_LINKS.map((l, i) => (
                            <Link key={l.id} to={`/#${l.id}`} className="nh-drawer-a"
                                style={{ animationDelay: `${i * 0.04}s` }}
                                onClick={e => handleNav(e, l.id)}>{l.label}</Link>
                        ))}
                        <Link to="/#contact-section" className="nh-drawer-cta"
                            onClick={e => handleNav(e, 'contact-section')}>
                            {t('boglanish') || "Bog'lanish"}
                        </Link>
                    </nav>
                </div>
            )}
        </>
    );
}
