import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { useTranslation } from 'react-i18next';
import logo from '../../img/logo.jpg';

const SLIDES = [
    {
        id: 1,
        bg: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80',
        title_uz: 'Yoshlarni kelajakka tayyorlaymiz',
        title_ru: 'Готовим молодёжь к будущему',
        title_en: 'Preparing youth for the future',
        sub_uz: 'Sirdaryo yoshlari uchun innovatsion texnologiyalar va zamonaviy talim muhiti',
        sub_ru: 'Инновационные технологии и современная образовательная среда для молодёжи Сырдарьи',
        sub_en: 'Innovative technologies and modern educational environment for Syrdarya youth',
    },
    {
        id: 2,
        bg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
        title_uz: 'Raqamli kelajakni birgalikda quramiz',
        title_ru: 'Строим цифровое будущее вместе',
        title_en: 'Building the digital future together',
        sub_uz: 'Startaplar, laboratoriyalar va xalqaro hamkorlik orqali yangi imkoniyatlar yaratamiz',
        sub_ru: 'Создаём новые возможности через стартапы, лаборатории и международное сотрудничество',
        sub_en: 'Creating new opportunities through startups, laboratories and international cooperation',
    },
    {
        id: 3,
        bg: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80',
        title_uz: 'Innovatsion ekotizim — bu biz',
        title_ru: 'Инновационная экосистема — это мы',
        title_en: 'Innovative ecosystem — that is us',
        sub_uz: 'Texnologiya, talim va tadbirkorlikni birlashtirgan yagona platforma',
        sub_ru: 'Единая платформа, объединяющая технологии, образование и предпринимательство',
        sub_en: 'A single platform combining technology, education and entrepreneurship',
    },
];

const STATS = [
    { value: '500+', label: 'Talabalar' },
    { value: '35+',  label: 'Yunalishlar' },
    { value: '8+',   label: 'Laboratoriya' },
    { value: '120+', label: 'Hamkorlar' },
];

export default function Hero() {
    const { i18n } = useTranslation();
    const [active, setActive] = useState(0);

    const lang = (() => {
        const l = i18n.language || 'uz';
        return l.startsWith('ru') ? 'ru' : l.startsWith('en') ? 'en' : 'uz';
    })();

    return (
        <section style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', background: '#ffffff' }}>
            <style>{`
                .h-sw { position: absolute; inset: 0; }
                .h-sw .swiper-slide { overflow: hidden; }
                .h-img {
                    width: 100%; height: 100%; object-fit: cover;
                    animation: hzoom 20s ease-in-out infinite alternate;
                    filter: brightness(.82) saturate(.82);
                }
                @keyframes hzoom {
                    from { transform: scale(1); }
                    to   { transform: scale(1.06); }
                }
                .h-body {
                    position: relative; z-index: 2;
                    display: flex; align-items: center;
                    min-height: 100vh; padding: 120px 0 100px;
                }
                .h-content {
                    display: grid; grid-template-columns: minmax(0, 1fr);
                    align-items: center; gap: 3rem;
                }
                @media(min-width:900px){
                    .h-content { grid-template-columns: minmax(0, 1.15fr) minmax(340px, .85fr); }
                }
                .h-visual {
                    position: relative; height: clamp(360px, 42vw, 540px); overflow: hidden;
                    border-radius: 30px; isolation: isolate;
                    background: #eaf0fb;
                    box-shadow: 0 24px 64px rgba(30,58,138,.16);
                }
                .h-visual::after {
                    content: ''; position: absolute; inset: 0; pointer-events: none;
                    background: linear-gradient(180deg, rgba(30,58,138,.02) 40%, rgba(15,35,83,.32));
                }

                /* label */
                .h-label {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 5px 14px;
                    background: rgba(22,163,74,.14);
                    border: 1px solid rgba(22,163,74,.35);
                    border-radius: 9999px;
                    margin-bottom: 28px;
                    animation: fadeUp .6s ease both;
                }
                .h-label-dot {
                    width: 7px; height: 7px; border-radius: 50%;
                    background: #4ade80;
                    animation: dotping 1.8s ease-in-out infinite;
                }
                @keyframes dotping {
                    0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,.7); }
                    60%     { box-shadow: 0 0 0 8px rgba(74,222,128,0); }
                }
                .h-label span { font-size: 12px; font-weight: 600; letter-spacing: .06em; color: #1e3a8a; text-transform: uppercase; }
                .h-label em   { font-size: 12px; font-weight: 700; color: #15803d; font-style: normal; }

                /* title */
                .h-title {
                    font-size: clamp(2rem, 5.5vw, 4.2rem);
                    font-weight: 700;
                    line-height: 1.1;
                    letter-spacing: -0.04em;
                    color: #1e3a8a;
                    margin-bottom: 20px;
                    text-shadow: 0 2px 16px rgba(15,23,42,.08);
                    animation: fadeUp .7s ease .1s both;
                }

                /* subtitle */
                .h-sub {
                    font-size: clamp(.95rem, 1.6vw, 1.1rem);
                    line-height: 1.7;
                    color: #475569;
                    max-width: 520px;
                    margin-bottom: 36px;
                    animation: fadeUp .7s ease .2s both;
                }

                /* buttons */
                .h-btns {
                    display: flex; flex-wrap: wrap; gap: 12px;
                    margin-bottom: 48px;
                    animation: fadeUp .7s ease .3s both;
                }
                .h-btn-p {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 12px 24px; border-radius: 9999px; border: none;
                    background: #1e3a8a; color: #fff;
                    font-size: 15px; font-weight: 600;
                    cursor: pointer; position: relative; overflow: hidden;
                    box-shadow: 0 8px 20px rgba(30,58,138,.2);
                    transition: transform .25s, box-shadow .25s;
                }
                .h-btn-p::before {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent);
                    transform: translateX(-100%); transition: transform .5s;
                }
                .h-btn-p:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(30,58,138,.3); }
                .h-btn-p:hover::before { transform: translateX(100%); }
                .h-btn-p svg { width: 16px; height: 16px; }

                .h-btn-s {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 12px 24px; border-radius: 9999px;
                    background: rgba(255,255,255,.85);
                    border: 1px solid rgba(30,58,138,.2);
                    color: #1e3a8a; font-size: 15px; font-weight: 500;
                    backdrop-filter: blur(6px); cursor: pointer;
                    transition: background .25s, transform .25s;
                }
                .h-btn-s:hover { background: #fff; transform: translateY(-2px); }

                /* stats */
                .h-stats {
                    display: grid; grid-template-columns: repeat(4,1fr);
                    background: rgba(255,255,255,.88);
                    border: 1px solid rgba(30,58,138,.14);
                    border-radius: 16px; overflow: hidden;
                    backdrop-filter: blur(12px);
                    animation: fadeUp .7s ease .45s both;
                }
                .h-stat {
                    padding: 18px 16px; text-align: center;
                    border-right: 1px solid rgba(30,58,138,.1);
                    transition: background .2s;
                }
                .h-stat:last-child { border-right: none; }
                .h-stat:hover { background: rgba(30,58,138,.04); }
                .h-stat-val {
                    display: block; font-size: 1.75rem; font-weight: 800;
                    line-height: 1; color: #1e3a8a; margin-bottom: 4px;
                }
                .h-stat-lbl {
                    display: block; font-size: 11px; font-weight: 500;
                    color: #64748b; text-transform: uppercase; letter-spacing: .05em;
                }

                /* right panel */
                .h-panel {
                    position: absolute; inset: 0;
                    animation: fadeUp .7s ease .5s both;
                }

                /* logo card */
                .h-logo-card {
                    position: absolute; left: 20px; right: 20px; bottom: 20px;
                    background: rgba(255,255,255,.94);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255,255,255,.7);
                    border-radius: 20px;
                    padding: 16px;
                    display: flex; align-items: center; gap: 14px;
                    box-shadow: 0 12px 32px rgba(15,35,83,.18);
                }
                .h-logo-card img {
                    width: 64px; height: 64px; flex-shrink: 0;
                    border-radius: 16px; object-fit: cover;
                    background: #fff; padding: 6px;
                    border: 1px solid #dbe3ef;
                    box-shadow: 0 4px 12px rgba(30,58,138,.1);
                }
                .h-logo-card-name {
                    font-size: 15px; font-weight: 700;
                    color: #1e3a8a; letter-spacing: -.02em;
                }
                .h-logo-card-name span { color: #16a34a; }
                .h-logo-card-sub {
                    font-size: 12px; font-weight: 500;
                    color: #64748b;
                    text-transform: uppercase; letter-spacing: .1em;
                }
                .h-status {
                    display: flex; align-items: center; gap: 7px; margin-left: auto;
                    background: rgba(22,163,74,.1);
                    border: 1px solid rgba(22,163,74,.25);
                    border-radius: 9999px; padding: 6px 14px;
                    white-space: nowrap;
                }
                .h-status-dot {
                    width: 7px; height: 7px; border-radius: 50%;
                    background: #4ade80; animation: dotping 2s ease-in-out infinite;
                }
                .h-status span { font-size: 12px; font-weight: 600; color: #15803d; }

                /* dots */
                .h-dots {
                    position: absolute; bottom: 28px; right: max(calc((100vw - 1230px) / 2 + 20px), 36px);
                    z-index: 4;
                    display: flex; gap: 8px;
                }
                .h-dot {
                    width: 8px; height: 8px; border-radius: 50%;
                    background: rgba(30,58,138,.2);
                    border: 1px solid rgba(30,58,138,.12);
                    cursor: pointer; transition: all .35s;
                }
                .h-dot.on {
                    width: 28px; border-radius: 4px;
                    background: #16a34a;
                    border-color: rgba(22,163,74,.5);
                    box-shadow: 0 0 12px rgba(34,197,94,.6);
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @media(max-width:768px){
                    .h-body { padding: 110px 0 80px; }
                    .h-btns { flex-direction: column; }
                    .h-btn-p,.h-btn-s { justify-content: center; }
                    .h-stats { grid-template-columns: repeat(2,1fr); }
                    .h-visual { min-height: 360px; }
                    .h-logo-card { left: 12px; right: 12px; bottom: 12px; padding: 12px; gap: 10px; }
                    .h-logo-card img { width: 52px; height: 52px; }
                    .h-logo-card-name { font-size: 12px; }
                    .h-logo-card-sub, .h-status span { font-size: 10px; }
                    .h-status { padding: 5px 8px; }
                    .h-status-dot { width: 6px; height: 6px; }
                    .h-dots { bottom: 22px; right: 24px; }
                    .h-stat:nth-child(2),.h-stat:nth-child(4) { border-right: none; }
                    .h-stat:nth-child(1),.h-stat:nth-child(2) {
                        border-bottom: 1px solid rgba(30,58,138,.1);
                    }
                }
            `}</style>

            {/* Content */}
            <div className="h-body">
                <div className="Container h-content">

                        {/* Left */}
                        <div>
                            <div className="h-label">
                                <span className="h-label-dot" />
                                <span>Sirdaryo</span>
                                <em>Yoshlar Texnoparki</em>
                            </div>

                            <h1 className="h-title" key={active}>
                                {SLIDES[active][`title_${lang}`]}
                            </h1>

                            <p className="h-sub" key={`s${active}`}>
                                {SLIDES[active][`sub_${lang}`]}
                            </p>

                            <div className="h-btns">
                                <button className="h-btn-p">
                                    <span>Batafsil</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </button>
                                <button className="h-btn-s">
                                    <span>Aloqa</span>
                                </button>
                            </div>

                            <div className="h-stats">
                                {STATS.map(st => (
                                    <div key={st.label} className="h-stat">
                                        <em className="h-stat-val">{st.value}</em>
                                        <span className="h-stat-lbl">{st.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right */}
                        <div className="h-visual">
                            <Swiper modules={[Autoplay, EffectFade]} effect="fade"
                                fadeEffect={{ crossFade: true }}
                                autoplay={{ delay: 5500, disableOnInteraction: false }}
                                speed={2200} loop className="h-sw"
                                onSlideChange={s => setActive(s.realIndex)}>
                                {SLIDES.map(s => (
                                    <SwiperSlide key={s.id}>
                                        <img src={s.bg} alt="" className="h-img" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="h-panel">
                              <div className="h-logo-card">
                                <img src={logo} alt="Logo" />
                                <div>
                                    <div className="h-logo-card-name">SIRDARYO <span>YOSHLAR</span></div>
                                    <div className="h-logo-card-sub">Texnoparki</div>
                                </div>
                                <div className="h-status">
                                    <span className="h-status-dot" />
                                    <span>Faoliyatda</span>
                                </div>
                              </div>
                            </div>
                        </div>

                </div>
            </div>

            <div className="h-dots">
                {SLIDES.map((_, i) => (
                    <div key={i} className={`h-dot ${i === active ? 'on' : ''}`} />
                ))}
            </div>
        </section>
    );
}
