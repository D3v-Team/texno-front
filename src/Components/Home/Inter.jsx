import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        id: 1, category: "Start-up Inkubator", title: "Biznesingizni Boshlang",
        items: ["G'oya tasdiqlash va biznes-model yaratish", "Mentorlık va yo'nalish ko'rsatish", "Investitsiya jalb qilish imkoniyati", "Ofis va texnik infratuzilma"],
        to: "/virtual-kabinet", accent: "#16a34a",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    },
    {
        id: 2, category: "Texnologiya Ta'limi", title: "Kasbiy Rivojlanish",
        items: ["AI va Machine Learning kurslari", "Full-stack dasturlash bootcamp", "DevOps va Cloud texnologiyalar", "Kiberhavfsizlik ta'limi"],
        to: "/", accent: "#1e3a8a",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    },
    {
        id: 3, category: "Innovatsiya Laboratoriyasi", title: "Tadqiqot Markazlari",
        items: ["IoT va Robotexnika laboratoriyasi", "Blockchain va Web3 tadqiqotlar", "AR/VR texnologiyalari markazi", "Biotexnologiya va nanotech"],
        to: "/biz-haqimizda", accent: "#16a34a",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    },
    {
        id: 4, category: "Hamkorlik", title: "Biznes Aloqalari",
        items: ["120+ xalqaro kompaniyalar bilan hamkorlik", "Praktika va stajırovka imkoniyatlari", "Networking va konferentsiyalar", "Export va xalqaro bozorga chıqish"],
        to: "/hujjatlar", accent: "#16a34a",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    },
    {
        id: 5, category: "Tadbirlar", title: "Voqealar va Konferentsiyalar",
        items: ["Oylik hackathon va competition", "Tech meetup va networking", "International conferences", "Workshop va masterclass"],
        to: "/barcha-yangiliklar", accent: "#1e3a8a",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    },
];

export default function Inter() {
    const { t } = useTranslation();
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.filter(Boolean).forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.55,
                        ease: "power2.out",
                        delay: i * 0.07,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <section id="services-section" style={{ color: '#1e293b' }} className="py-20">
            <div className="Container">
                {/* Header */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
                        style={{ background: 'rgba(30,58,138,0.08)', border: '1px solid rgba(30,58,138,0.2)' }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#1e3a8a' }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#1e3a8a' }}>
                            {t('Onlinexizmatlar')}
                        </span>
                    </div>
                    <h2 className="text-4xl font-black mb-2" style={{ color: '#1e3a8a' }}>{t('Interaktivxizmatlar')}</h2>
                    <p className="text-sm" style={{ color: '#64748b' }}>Texno Park imkoniyatlari va xizmatlari</p>
                </div>

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {SERVICES.map((s, idx) => (
                        <div key={s.id} ref={el => cardsRef.current[idx] = el} style={{ opacity: 0 }}>
                            <NavLink to={s.to} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block">
                                <div className="w-full rounded-2xl overflow-hidden"
                                    style={{
                                        background: '#ffffff',
                                        border: `1px solid rgba(30,58,138,0.1)`,
                                        boxShadow: '0 2px 12px rgba(30,58,138,0.06)',
                                        transition: 'box-shadow .3s, border-color .3s, transform .3s, background .3s',
                                    }}
                                    onMouseEnter={e => { 
                                        e.currentTarget.style.transform = 'translateY(-4px)'; 
                                        e.currentTarget.style.boxShadow = `0 20px 48px rgba(30,58,138,0.12)`; 
                                        e.currentTarget.style.borderColor = `rgba(30,58,138,0.3)`; 
                                        e.currentTarget.style.background = '#ffffff';
                                    }}
                                    onMouseLeave={e => { 
                                        e.currentTarget.style.transform = 'translateY(0)'; 
                                        e.currentTarget.style.boxShadow = '0 2px 12px rgba(30,58,138,0.06)'; 
                                        e.currentTarget.style.borderColor = `rgba(30,58,138,0.1)`;
                                        e.currentTarget.style.background = '#ffffff';
                                    }}
                                >
                                    {/* top accent bar — keep each service's accent color */}
                                    <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${s.accent}, transparent 70%)` }} />
                                    <div className="flex flex-col md:flex-row">
                                        {/* Left */}
                                        <div className="flex-shrink-0 p-7 md:p-9 flex flex-col justify-between gap-6"
                                            style={{ minWidth: 260, borderRight: `1px solid rgba(30,58,138,0.08)` }}>
                                            <div>
                                                <div className="flex items-center justify-between mb-5">
                                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                                                        style={{ 
                                                            background: `${s.accent}18`, 
                                                            border: `1px solid ${s.accent}40`, 
                                                            color: s.accent,
                                                            boxShadow: `0 4px 12px ${s.accent}15`
                                                        }}>
                                                        {s.icon}
                                                    </div>
                                                    <span className="text-3xl font-black tabular-nums select-none"
                                                        style={{ color: `rgba(30,58,138,0.08)` }}>
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </span>
                                                </div>
                                                {/* service category — keep accent color */}
                                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
                                                    style={{ color: s.accent }}>{s.category}</p>
                                                {/* service title */}
                                                <h3 className="text-lg font-black leading-snug" style={{ color: '#1e3a8a' }}>{s.title}</h3>
                                            </div>
                                            {/* arrow button */}
                                            <span className="inline-flex items-center gap-2 self-start text-xs font-bold px-4 py-2 rounded-full transition-all"
                                                style={{ 
                                                    background: `rgba(30,58,138,0.08)`,
                                                    color: '#1e3a8a',
                                                    border: `1px solid rgba(30,58,138,0.2)`,
                                                    transition: 'background 0.2s, color 0.2s'
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.background = '#1e3a8a';
                                                    e.currentTarget.style.color = '#ffffff';
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.background = 'rgba(30,58,138,0.08)';
                                                    e.currentTarget.style.color = '#1e3a8a';
                                                }}>
                                                {t('Korish')}
                                                <svg width="11" height="11" viewBox="0 0 14 15" fill="none">
                                                    <path d="M1.16666 7.50002H12.8333M12.8333 7.50002L6.99999 1.66669M12.8333 7.50002L6.99999 13.3334" 
                                                        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </div>
                                        {/* Right */}
                                        <div className="flex-1 p-7 md:p-9">
                                            <p className="text-[11px] uppercase tracking-[0.16em] font-bold mb-5" style={{ color: '#94a3b8' }}>Nimalar Mavjud</p>
                                            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                                {s.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#64748b' }}>
                                                        {/* service item dot — keep accent color */}
                                                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                                                            style={{ 
                                                                background: `${s.accent}18`, 
                                                                border: `1px solid ${s.accent}40` 
                                                            }}>
                                                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                                                                <path d="M13.3333 4L6 11.3333L2.66667 8" stroke={s.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
