import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarDays, Check, Coins, Lightbulb, MapPin, Search, Target, Users, X } from 'lucide-react';
import { L, useLang } from '../i18n/LangContext';
import { Badge, Button, PageHero, Reveal, cx, useDate } from '../components/ui';
import Modal from '../components/ui/Modal';
import { Icon } from '../lib/icons';
import Seo from '../components/Seo';
import { SolutionForm } from '../components/forms/SimpleForms';
import { ChallengeCard, CtaBand, budgetOf, districtOf, sectorOf } from '../components/sections/shared';
import { CHALLENGES, CHALLENGE_STATUS } from '../data/challenges';
import { DISTRICTS, SECTORS } from '../data/business';

function ChallengeDetail({ c }) {
  const { t } = useLang();
  const date = useDate();
  const st = CHALLENGE_STATUS[c.status];
  const sector = sectorOf(c.sector);
  const canPropose = c.status === 'open' || c.status === 'selection';
  return (
    <div className="px-6 pb-10 pt-6 sm:px-10">
      <div className="flex flex-wrap items-center gap-2 pr-14">
        <Badge tone={st.tone} dot>
          {t(st.label)}
        </Badge>
        <span className="font-mono text-xs text-slate-500">{c.id}</span>
      </div>
      <h2 className="mt-5 font-display text-2xl font-semibold leading-tight sm:text-3xl">{t(c.title)}</h2>
      <p className="mt-2 text-sm text-slate-400">{t(c.org)}</p>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { icon: <Icon name={sector?.icon} className="h-4 w-4" />, k: L('Соҳа', 'Сфера'), v: t(sector?.label) },
          { icon: <MapPin className="h-4 w-4" />, k: L('Ҳудуд', 'Район'), v: t(districtOf(c.district)?.label) },
          { icon: <Coins className="h-4 w-4" />, k: L('Бюджет', 'Бюджет'), v: t(budgetOf(c.budget)?.label) },
          { icon: <CalendarDays className="h-4 w-4" />, k: L('Таклиф муддати', 'Приём до'), v: date(c.deadline) },
        ].map((x, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-500">
              <span className="text-cyanx-400">{x.icon}</span>
              {t(x.k)}
            </div>
            <div className="mt-1.5 text-sm font-medium text-white">{x.v}</div>
          </div>
        ))}
      </div>

      <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-coral-400">{t(L('Муаммо', 'Проблема'))}</h3>
      <p className="mt-2 leading-relaxed text-slate-300">{t(c.summary)}</p>

      <h3 className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-cyanx-300">{t(L('Ечимга талаблар', 'Требования к решению'))}</h3>
      <ul className="mt-3 grid gap-2">
        {c.needs.map((n, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf-400" />
            {t(n)}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex items-start gap-3 rounded-2xl border border-leaf-400/25 bg-leaf-400/[0.06] p-4">
        <Target className="mt-0.5 h-5 w-5 shrink-0 text-leaf-300" />
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-leaf-300">{t(L('Кутилаётган натижа', 'Ожидаемый результат'))}</div>
          <p className="mt-1 text-sm text-white">{t(c.result)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <Users className="h-3.5 w-3.5" />
        {t(L('Ҳозиргача таклифлар', 'Предложений получено'))}: {c.proposals} · {t(L('Эълон қилинган', 'Опубликовано'))}: {date(c.published)}
      </div>

      <div className="my-8 h-px bg-white/[0.07]" />
      {canPropose ? (
        <>
          <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
            <Lightbulb className="h-5 w-5 text-amberx-400" />
            {t(L('Ечим таклиф қилиш', 'Предложить решение'))}
          </h3>
          <p className="mb-6 mt-2 text-sm text-slate-400">{t(L('Таклифингиз технопарк эксперти орқали корхонага етказилади.', 'Ваше предложение будет передано предприятию через эксперта технопарка.'))}</p>
          <SolutionForm challenge={c} />
        </>
      ) : (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-sm text-slate-400">
          {t(
            c.status === 'pilot'
              ? L('Бу муаммо бўйича пилот лойиҳа амалга оширилмоқда. Таклифлар қабул қилиш ёпилган.', 'По этой задаче идёт пилотный проект. Приём предложений закрыт.')
              : L('Бу муаммо муваффақиятли ҳал қилинди.', 'Эта задача успешно решена.')
          )}
        </div>
      )}
    </div>
  );
}

const STATUS_TABS = [{ id: 'all', label: L('Барчаси', 'Все') }, ...Object.entries(CHALLENGE_STATUS).map(([id, v]) => ({ id, label: v.label }))];

export default function Challenges() {
  const { t } = useLang();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [sector, setSector] = useState('all');
  const [district, setDistrict] = useState('all');

  const openId = params.get('id');
  const open = CHALLENGES.find((c) => c.id === openId) || null;
  const lastOpen = useRef(open);
  if (open) lastOpen.current = open;
  const openChallenge = useCallback((c) => setParams({ id: c.id }, { replace: false }), [setParams]);
  const close = useCallback(() => setParams({}, { replace: true }), [setParams]);

  const counts = useMemo(() => {
    const m = { all: CHALLENGES.length };
    CHALLENGES.forEach((c) => (m[c.status] = (m[c.status] || 0) + 1));
    return m;
  }, []);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return CHALLENGES.filter((c) => {
      if (status !== 'all' && c.status !== status) return false;
      if (sector !== 'all' && c.sector !== sector) return false;
      if (district !== 'all' && c.district !== district) return false;
      if (!needle) return true;
      const hay = [t(c.title), t(c.summary), t(c.org), c.id].join(' ').toLowerCase();
      return hay.includes(needle);
    });
  }, [q, status, sector, district, t]);

  const usedSectors = SECTORS.filter((s) => CHALLENGES.some((c) => c.sector === s.id));
  const usedDistricts = DISTRICTS.filter((d) => CHALLENGES.some((c) => c.district === d.id));
  const hasFilters = q || status !== 'all' || sector !== 'all' || district !== 'all';

  useEffect(() => {
    if (openId && !open) close();
  }, [openId, open, close]);

  return (
    <>
      <Seo
        title={L('Муаммолар биржаси — корхоналар ечим кутмоқда · Ёшлар технопарки', 'Биржа задач — предприятия ждут решений · Молодёжный технопарк')}
        description={L('Сирдарё вилояти корхоналарининг реал муаммолари. Стартаплар, олимлар ва муҳандислар учун ечим таклиф қилиш имконияти.', 'Реальные задачи предприятий Сырдарьинской области. Стартапы, учёные и инженеры могут предложить решение.')}
      />
      <PageHero
        eyebrow={L('Очиқ инновациялар', 'Открытые инновации')}
        title={
          <>
            {t(L('Муаммолар', 'Биржа'))} <span className="text-grad">{t(L('биржаси', 'задач'))}</span>
          </>
        }
        text={L(
          'Корхоналар муаммо юборади — стартаплар, олимлар ва муҳандислар ечим таклиф қилади. Энг яхши ечим пилот синовга чиқади ва шартнома тузилади.',
          'Предприятия присылают задачи — стартапы, учёные и инженеры предлагают решения. Лучшее решение выходит на пилот и заключается договор.'
        )}
        aside={
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(CHALLENGE_STATUS).map(([id, s]) => (
              <button
                key={id}
                type="button"
                onClick={() => setStatus(id)}
                className="card p-5 text-left transition hover:border-white/25"
              >
                <Badge tone={s.tone} dot>
                  {t(s.label)}
                </Badge>
                <div className="mt-3 font-display text-3xl font-semibold text-white">{counts[id] || 0}</div>
              </button>
            ))}
          </div>
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button to="/biznes#ariza" size="lg" variant="leaf" icon>
            {t(L('Муаммо қўшиш', 'Добавить задачу'))}
          </Button>
        </div>
      </PageHero>

      <section className="pb-20">
        <div className="container">
          <Reveal>
            <div className="glass-strong relative z-20 grid gap-3 rounded-3xl p-3 sm:p-4 lg:grid-cols-[1fr_auto_auto]">
              <label className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t(L('Муаммо, соҳа ёки рақам бўйича излаш…', 'Поиск по задаче, отрасли или номеру…'))}
                  className="input h-12 pl-11"
                />
              </label>
              <select value={sector} onChange={(e) => setSector(e.target.value)} className="input h-12 lg:w-56" aria-label={t(L('Соҳа', 'Сфера'))}>
                <option value="all">{t(L('Барча соҳалар', 'Все отрасли'))}</option>
                {usedSectors.map((s) => (
                  <option key={s.id} value={s.id} className="bg-ink-900">
                    {t(s.label)}
                  </option>
                ))}
              </select>
              <select value={district} onChange={(e) => setDistrict(e.target.value)} className="input h-12 lg:w-52" aria-label={t(L('Ҳудуд', 'Район'))}>
                <option value="all">{t(L('Барча ҳудудлар', 'Все районы'))}</option>
                {usedDistricts.map((d) => (
                  <option key={d.id} value={d.id} className="bg-ink-900">
                    {t(d.label)}
                  </option>
                ))}
              </select>
              <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 lg:col-span-3">
                {STATUS_TABS.map((s) => (
                  <button key={s.id} type="button" className="chip shrink-0" data-active={status === s.id} onClick={() => setStatus(s.id)}>
                    {t(s.label)}
                    <span className="rounded-full bg-white/10 px-1.5 text-[11px]">{counts[s.id] || 0}</span>
                  </button>
                ))}
                {hasFilters && (
                  <button
                    type="button"
                    className="chip shrink-0 border-transparent text-slate-400"
                    onClick={() => {
                      setQ('');
                      setStatus('all');
                      setSector('all');
                      setDistrict('all');
                    }}
                  >
                    <X className="h-3.5 w-3.5" />
                    {t(L('Тозалаш', 'Сбросить'))}
                  </button>
                )}
              </div>
            </div>
          </Reveal>

          <div className="mt-8 text-sm text-slate-400">
            {t(L('Топилди', 'Найдено'))}: <b className="text-white">{list.length}</b>
          </div>
          <motion.div layout className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((c) => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className={cx('h-full')}
                >
                  <ChallengeCard c={c} onOpen={openChallenge} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && (
            <div className="mt-6 rounded-3xl border border-dashed border-white/10 p-12 text-center text-slate-400">
              {t(L('Ҳеч нарса топилмади. Филтрларни ўзгартириб кўринг.', 'Ничего не найдено. Попробуйте изменить фильтры.'))}
            </div>
          )}
        </div>
      </section>

      <CtaBand />

      <Modal open={!!open} onClose={close} label={open ? t(open.title) : ''}>
        {lastOpen.current && <ChallengeDetail key={lastOpen.current.id} c={lastOpen.current} />}
      </Modal>
    </>
  );
}
