import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { L, useLang } from '../../i18n/LangContext';
import { NAV, SITE } from '../../data/site';
import { SOCIAL_ICONS } from '../../lib/icons';
import { Logo } from './Header';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const groups = [
    {
      title: L('Йўналишлар', 'Направления'),
      links: NAV.slice(0, 5).map((n) => ({ to: n.to, label: n.label })),
    },
    {
      title: L('Ариза қолдириш', 'Оставить заявку'),
      links: [
        { to: '/biznes#ariza', label: L('Бизнес муаммоси', 'Бизнес-задача') },
        { to: '/startaplar#ariza', label: L('Стартап ариза', 'Заявка стартапа') },
        { to: '/infratuzilma#bron', label: L('Хона бронлаш', 'Бронирование') },
        { to: '/investorlar#ariza', label: L('Инвестор бўлиш', 'Стать инвестором') },
        { to: '/haqida#aloqa', label: L('Алоқа', 'Контакты') },
      ],
    },
  ];

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-white/[0.06] bg-ink-950">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[380px] w-[900px] -translate-x-1/2 rounded-full bg-azure-600/15 blur-[120px]" />
      <div className="container relative grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
            {t(
              L(
                'Ғояни бозоргача олиб чиқиш ва вилоят корхоналари муаммоларига инновацион ечим топиш маркази.',
                'Центр, который доводит идеи до рынка и находит инновационные решения для задач предприятий области.'
              )
            )}
          </p>
          <div className="mt-6 flex gap-2">
            {SITE.socials.map((s) => {
              const Ico = SOCIAL_ICONS[s.id];
              return (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition hover:-translate-y-0.5 hover:border-cyanx-400/50 hover:text-white"
                >
                  <Ico className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>
        </div>

        {groups.map((g, i) => (
          <div key={i}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{t(g.title)}</h3>
            <ul className="mt-5 space-y-3">
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline text-sm text-slate-300 hover:text-white">
                    {t(l.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{t(L('Алоқа', 'Контакты'))}</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3 text-slate-300">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyanx-400" />
              <a href={SITE.map.link} target="_blank" rel="noreferrer" className="hover:text-white">
                {t(SITE.address)}
              </a>
            </li>
            <li className="flex gap-3 text-slate-300">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyanx-400" />
              <a href={SITE.phoneHref} className="hover:text-white">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-3 text-slate-300">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyanx-400" />
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-3 text-slate-400">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-cyanx-400" />
              {t(SITE.workHours)}
            </li>
          </ul>
        </div>
      </div>
      <div className="container relative flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] py-6 text-xs text-slate-500 sm:flex-row sm:items-center">
        <span>
          © {year} {t(SITE.name)}
        </span>
        <span>{t(L('Билим · Инфратузилма · Молия · Бозор · Ҳамкорлик', 'Знания · Инфраструктура · Финансы · Рынок · Партнёрство'))}</span>
      </div>
    </footer>
  );
}
