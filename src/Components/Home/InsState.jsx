import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated counter (no icon) ────────────────────────────── */
function AnimatedStat({ target, suffix = "+", label, index }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
            { threshold: 0.3 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        let frame = 0;
        const steps = 132;
        const id = setInterval(() => {
            frame++;
            const p = frame / steps;
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(target * eased));
            if (frame >= steps) { setCount(target); clearInterval(id); }
        }, 2200 / steps);
        return () => clearInterval(id);
    }, [started, target]);

    return (
        <div ref={ref}
            className="relative flex flex-col justify-between p-6 md:p-8 cursor-default group"
            style={{ background: '#ffffff', transition: 'background 0.25s, border-color 0.25s' }}
            onMouseEnter={e => {
                e.currentTarget.style.background = '#f0f5ff';
                e.currentTarget.style.borderColor = 'rgba(30,58,138,0.2)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(30,58,138,0.1)';
            }}
        >
            {/* index number watermark */}
            <span className="absolute top-4 right-5 text-[2.8rem] font-black tabular-nums select-none pointer-events-none"
                style={{ color: 'rgba(30,58,138,0.06)', lineHeight: 1 }}>
                {String(index + 1).padStart(2, '0')}
            </span>

            {/* label */}
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: '#94a3b8' }}>{label}</p>

            {/* number */}
            <div className="flex items-baseline gap-0.5">
                <span className="text-[3rem] font-extrabold leading-none tabular-nums"
                    style={{ color: '#1e3a8a' }}>
                    {count.toLocaleString()}
                </span>
                <span className="text-2xl font-bold" style={{ color: '#16a34a' }}>{suffix}</span>
            </div>

            {/* animated accent bar */}
            <div className="absolute bottom-0 left-0 h-[2px]"
                style={{
                    background: 'linear-gradient(90deg,#1e3a8a,transparent)',
                    width: started ? '100%' : '0%',
                    transition: 'width 1.8s cubic-bezier(0.22,1,0.36,1)',
                }} />
        </div>
    );
}

/* ─── Feature card (no emoji) ───────────────────────────────── */
function FeatureCard({ title, desc, accent, delay }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        gsap.fromTo(ref.current,
            { opacity: 0, y: 28 },
            {
                opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay,
                scrollTrigger: { trigger: ref.current, start: 'top 90%', toggleActions: 'play none none none' },
            }
        );
    }, [delay]);

    return (
        <div ref={ref} className="relative rounded-2xl p-6 overflow-hidden"
            style={{ background: '#ffffff', border: '1px solid #e2e8f0', opacity: 0, transition: 'border-color 0.25s, transform 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(30,58,138,0.25)`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            {/* accent top line */}
            <div className="h-[2px] w-10 rounded-full mb-5" style={{ background: accent }} />
            <h4 className="font-bold text-sm mb-2 leading-tight" style={{ color: '#1e3a8a' }}>{title}</h4>
            <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{desc}</p>
            {/* blob */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-8 pointer-events-none"
                style={{ background: `radial-gradient(circle,${accent} 0%,transparent 70%)` }} />
        </div>
    );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function InstituteStats() {
    const { t } = useTranslation();
    const headerRef = useRef(null);
    const statsRef  = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // header slide in
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 32 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                  scrollTrigger: { trigger: headerRef.current, start: 'top 88%', toggleActions: 'play none none none' } }
            );
            // stats grid
            gsap.fromTo(
                statsRef.current?.querySelectorAll('.stat-cell') || [],
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
                  scrollTrigger: { trigger: statsRef.current, start: 'top 88%', toggleActions: 'play none none none' } }
            );
        });
        return () => ctx.revert();
    }, []);

    const stats = [
        { target: 500, suffix: '+', label: 'Startup Loyihalar'         },
        { target: 35,   suffix: '',  label: 'Texnologiya Yo\'nalishlari' },
        { target: 8,   suffix: '',  label: 'Innovatsion Laboratoriyalar'       },
        { target: 120,   suffix: '+', label: 'Hamkor Kompaniyalar'     },
    ];

    const features = [
        { accent: '#1e3a8a', title: 'AI & Machine Learning', desc: 'Sun\'iy intellekt va mashina o\'rganish texnologiyalari bo\'yicha chuqur tadqiqotlar va amaliy loyihalar' },
        { accent: '#1e3a8a', title: 'IoT & Robotexnika', desc: 'Internet of Things va robotexnika sohasida zamonaviy yechimlar yaratish laboratoriyalari' },
        { accent: '#16a34a', title: 'Start-up Inkubator', desc: 'Innovatsion g\'oyalarni biznes loyihalarga aylantirish uchun to\'liq qo\'llab-quvvatlash ekotizimi' },
        { accent: '#16a34a', title: 'Blockchain & Web3', desc: 'Markazlashtirilmagan texnologiyalar va kriptovalyuta yechimlari bo\'yicha tadqiqotlar' },
        { accent: '#1e3a8a', title: 'Kiberhavfsizlik', desc: 'Axborot xavfsizligi va kiberhujumlardan himoyalanish bo\'yicha professional ta\'lim' },
        { accent: '#16a34a', title: 'Cloud Computing', desc: 'Bulutli texnologiyalar va zamonaviy arxitektura dizayni bo\'yicha amaliy mashg\'ulotlar' },
    ];

    return (
        <section id="stats-section" style={{ background: '#1e3a8a', color: '#ffffff', padding: '80px 0' }}>
            <div className="Container">

                {/* header */}
                <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
                    style={{ opacity: 0 }}>
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
                            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80' }} />
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#ffffff' }}>Raqamlarda</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold max-w-xl leading-tight" style={{ color: '#ffffff' }}>
                            Texno Park Faoliyati Raqamlarda
                        </h2>
                    </div>
                    <p className="text-sm leading-relaxed max-w-sm" style={{ color: '#dbeafe' }}>
                        Innovatsiya va texnologiya rivojlanishidagi yutuqlarimiz raqamlar orqali
                    </p>
                </div>

                {/* stats — borderless cells separated by 1px lines */}
                <div ref={statsRef}
                    className="grid grid-cols-2 lg:grid-cols-4 mb-16 rounded-2xl overflow-hidden"
                    style={{ border: '1px solid rgba(255,255,255,0.22)', gap: 1, background: 'rgba(255,255,255,0.2)' }}>
                    {stats.map((s, i) => (
                        <div key={i} className="stat-cell" style={{ opacity: 0 }}>
                            <AnimatedStat {...s} index={i} />
                        </div>
                    ))}
                </div>

                {/* divider */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.25)' }} />
                    <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: '#dbeafe' }}>Texnologiya Yo'nalishlari</span>
                    <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.25)' }} />
                </div>

                {/* feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((f, i) => (
                        <FeatureCard key={i} delay={i * 0.08} title={f.title} desc={f.desc} accent={f.accent} />
                    ))}
                </div>

            </div>
        </section>
    );
}
