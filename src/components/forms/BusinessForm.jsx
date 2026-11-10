import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, LoaderCircle, Save, Send } from 'lucide-react';
import { L, translate, useLang } from '../../i18n/LangContext';
import {
  BUDGETS, COMPANY_SIZES, CONTACT_METHODS, DISTRICTS, PROBLEM_AGE, PROBLEM_TYPES, SECTORS, SOLUTIONS, URGENCY,
} from '../../data/business';
import { RESPONSE_DAYS } from '../../data/site';
import { FORM_NAMES, draft, isEmailValid, isPhoneValid, makeRequestId, submitForm } from '../../lib/forms';
import { Icon } from '../../lib/icons';
import { Button, cx } from '../ui';
import {
  BAD_EMAIL, BAD_PHONE, CONSENT_ERR, REQUIRED, Checkbox, Chips, FileInput, FormError, FormSuccess, PhoneInput, RadioCards, Select,
  TextArea, TextInput,
} from './fields';

const DRAFT_KEY = 'syt-business-draft-v1';

const STEPS = [
  { title: L('Корхона', 'Компания'), sub: L('Ким мурожаат қиляпти', 'Кто обращается') },
  { title: L('Муаммо', 'Проблема'), sub: L('Нима халақит беряпти', 'Что мешает') },
  { title: L('Шартлар', 'Условия'), sub: L('Бюджет ва муддат', 'Бюджет и сроки') },
  { title: L('Алоқа', 'Контакты'), sub: L('Қандай боғланамиз', 'Как связаться') },
];

const PILOT = [
  { id: 'yes', label: L('Ҳа, корхонамизда синаш мумкин', 'Да, можно тестировать у нас') },
  { id: 'discuss', label: L('Муҳокама қиламиз', 'Обсудим') },
  { id: 'no', label: L('Йўқ', 'Нет') },
];

const EMPTY = {
  company: '', sector: '', district: '', size: '',
  title: '', description: '', problem_types: [], problem_age: '', attempts: '', expected: '',
  budget: 'unknown', urgency: '', pilot: '', publish: true, nda: false,
  name: '', position: '', phone: '', email: '', telegram: '', contact_method: 'phone', consent: false,
  solution_interest: '',
};

function validate(step, d) {
  const e = {};
  if (step === 0) {
    if (!d.company.trim()) e.company = REQUIRED;
    if (!d.sector) e.sector = REQUIRED;
    if (!d.district) e.district = REQUIRED;
  }
  if (step === 1) {
    if (!d.title.trim()) e.title = REQUIRED;
    if (d.description.trim().length < 30)
      e.description = L('Муаммони камида 30 белгида тавсифланг', 'Опишите проблему минимум в 30 символах');
  }
  if (step === 3) {
    if (!d.name.trim()) e.name = REQUIRED;
    if (!isPhoneValid(d.phone)) e.phone = BAD_PHONE;
    if (!isEmailValid(d.email)) e.email = BAD_EMAIL;
    if (!d.consent) e.consent = CONSENT_ERR;
  }
  return e;
}

/** Texnopark xodimlari uchun o'qiladigan qiymatlar (lotin yozuvida) */
function humanize(d) {
  const lab = (list, id) => translate(list.find((x) => x.id === id)?.label, 'lat') || id;
  return {
    ...d,
    sector: lab(SECTORS, d.sector),
    district: lab(DISTRICTS, d.district),
    size: lab(COMPANY_SIZES, d.size),
    problem_types: d.problem_types.map((id) => lab(PROBLEM_TYPES, id)),
    problem_age: lab(PROBLEM_AGE, d.problem_age),
    budget: lab(BUDGETS, d.budget),
    urgency: lab(URGENCY, d.urgency),
    pilot: lab(PILOT, d.pilot),
    contact_method: lab(CONTACT_METHODS, d.contact_method),
  };
}

export default function BusinessForm() {
  const { t, lang } = useLang();
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState(() => ({ ...EMPTY, ...(draft.load(DRAFT_KEY) || {}) }));
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [resultId, setResultId] = useState('');
  const [savedAt, setSavedAt] = useState(null);
  const topRef = useRef(null);

  // Katalogdan tanlangan yechim (?yechim=smart-irrigation)
  const solution = useMemo(() => SOLUTIONS.find((s) => s.id === params.get('yechim')), [params]);
  useEffect(() => {
    if (solution) {
      setData((d) => ({
        ...d,
        solution_interest: translate(solution.title, 'lat'),
        sector: d.sector || solution.sectors[0] || '',
      }));
    }
  }, [solution]);

  // Qoralamani avtomatik saqlash
  useEffect(() => {
    if (status === 'done') return;
    const id = setTimeout(() => {
      const isEmpty = JSON.stringify({ ...data, solution_interest: '' }) === JSON.stringify({ ...EMPTY });
      if (!isEmpty) {
        draft.save(DRAFT_KEY, data);
        setSavedAt(new Date());
      }
    }, 600);
    return () => clearTimeout(id);
  }, [data, status]);

  const set = (key) => (value) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const setInput = (key) => (e) => set(key)(e.target.value);

  function scrollTop() {
    const el = topRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.6) {
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -100, duration: 0.8 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function next() {
    const e = validate(step, data);
    setErrors(e);
    if (Object.keys(e).length) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollTop();
  }
  function back() {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  }

  async function submit(ev) {
    ev.preventDefault();
    if (step < STEPS.length - 1) return next();
    const e = validate(3, data);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus('sending');
    try {
      const id = makeRequestId(FORM_NAMES.business);
      await submitForm(FORM_NAMES.business, {
        ...humanize(data),
        attachment: file,
        request_id: id,
        lang,
      });
      setResultId(id);
      setStatus('done');
      draft.clear(DRAFT_KEY);
      scrollTop();
    } catch {
      setStatus('error');
    }
  }

  function reset() {
    setData({ ...EMPTY });
    setFile(null);
    setStep(0);
    setStatus('idle');
    setErrors({});
    setSavedAt(null);
  }

  if (status === 'done') {
    return (
      <div ref={topRef} className="card p-6 sm:p-10">
        <FormSuccess
          id={resultId}
          title={L('Аризангиз қабул қилинди!', 'Заявка принята!')}
          text={L(
            `Ариза рақамини сақлаб қўйинг. ${RESPONSE_DAYS} иш куни ичида соҳа эксперти сиз билан боғланади.`,
            `Сохраните номер заявки. В течение ${RESPONSE_DAYS} рабочих дней с вами свяжется эксперт отрасли.`
          )}
          steps={[
            L('Эксперт муаммони ўрганиб, сиз билан қўнғироқ ёки учрашув белгилайди', 'Эксперт изучит задачу и назначит звонок или встречу'),
            L('Резидентлар ва лабораториялар орасидан мос жамоалар танланади', 'Среди резидентов и лабораторий подбираются подходящие команды'),
            L('2–3 ҳафтада инновацион ечим таклифини оласиз', 'Через 2–3 недели вы получите инновационное предложение'),
          ]}
          onReset={reset}
        />
      </div>
    );
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <form
      ref={topRef}
      onSubmit={submit}
      noValidate
      name={FORM_NAMES.business}
      className="card relative overflow-hidden"
    >
      {/* Steps header */}
      <div className="border-b border-white/[0.07] px-5 pb-5 pt-6 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-cyanx-300">
              {t(L('Қадам', 'Шаг'))} {step + 1} / {STEPS.length}
            </div>
            <div className="mt-1 font-display text-xl font-semibold text-white">{t(STEPS[step].title)}</div>
          </div>
          {savedAt && (
            <div className="hidden items-center gap-1.5 text-xs text-slate-500 sm:flex">
              <Save className="h-3.5 w-3.5" />
              {t(L('Қоралама сақланди', 'Черновик сохранён'))}
            </div>
          )}
        </div>
        <div className="mt-5 grid grid-cols-4 gap-2">
          {STEPS.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (i < step) {
                  setDir(-1);
                  setStep(i);
                }
              }}
              className={cx('group text-left', i < step ? 'cursor-pointer' : 'cursor-default')}
              aria-current={i === step ? 'step' : undefined}
            >
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                <motion.div
                  className="h-full rounded-full bg-brand-grad"
                  initial={false}
                  animate={{ width: i < step ? '100%' : i === step ? '50%' : '0%' }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className={cx('mt-2 hidden items-center gap-1.5 text-xs sm:flex', i <= step ? 'text-slate-300' : 'text-slate-600')}>
                {i < step && <Check className="h-3 w-3 text-leaf-400" />}
                {t(s.title)}
              </div>
            </button>
          ))}
        </div>
        <span className="sr-only">{Math.round(progress)}%</span>
      </div>

      {solution && (
        <div className="mx-5 mt-6 flex items-center gap-3 rounded-2xl border border-cyanx-400/30 bg-cyanx-400/[0.07] px-4 py-3 text-sm sm:mx-8">
          <Icon name={solution.icon} className="h-5 w-5 shrink-0 text-cyanx-300" />
          <span className="text-slate-300">
            {t(L('Қизиқтирган ечим:', 'Интересующее решение:'))} <b className="text-white">{t(solution.title)}</b>
          </span>
        </div>
      )}

      <div className="relative px-5 py-7 sm:px-8">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6"
          >
            {step === 0 && (
              <>
                <TextInput
                  label={L('Корхона ёки хўжалик номи', 'Название компании или хозяйства')}
                  required
                  value={data.company}
                  onChange={setInput('company')}
                  error={errors.company}
                  placeholder={L('Масалан: «Боғи Сирдарё» МЧЖ', 'Например: ООО «Боги Сырдарья»')}
                  autoComplete="organization"
                />
                <Chips
                  label={L('Фаолият соҳаси', 'Сфера деятельности')}
                  required
                  options={SECTORS}
                  value={data.sector}
                  onChange={set('sector')}
                  error={errors.sector}
                  renderIcon={(o) => <Icon name={o.icon} className="h-4 w-4 text-slate-400" />}
                />
                <div className="grid gap-6 sm:grid-cols-2">
                  <Select
                    label={L('Ҳудуд', 'Район / город')}
                    required
                    options={DISTRICTS}
                    value={data.district}
                    onChange={set('district')}
                    error={errors.district}
                  />
                  <Chips label={L('Ходимлар сони', 'Число сотрудников')} options={COMPANY_SIZES} value={data.size} onChange={set('size')} />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <TextInput
                  label={L('Муаммони бир жумлада номланг', 'Назовите проблему одной фразой')}
                  required
                  maxLength={120}
                  value={data.title}
                  onChange={setInput('title')}
                  error={errors.title}
                  placeholder={L('Масалан: Омборда мева тез бузилмоқда', 'Например: На складе быстро портятся фрукты')}
                />
                <TextArea
                  label={L('Муаммони батафсил тавсифланг', 'Опишите проблему подробнее')}
                  required
                  value={data.description}
                  onChange={setInput('description')}
                  error={errors.description}
                  hint={L('Қаерда, қачон ва қандай юзага келади? Қанча зарар келтиради? Техник атамалар шарт эмас.', 'Где, когда и как возникает? Какой ущерб приносит? Технические термины не нужны.')}
                  placeholder={L(
                    'Масалан: Ёзда тунда совутгич ўчиб қолса, эрталабгача билмаймиз. Ойига 2–3 тонна маҳсулот бузилади…',
                    'Например: Летом, если ночью отключается холодильник, мы узнаём только утром. В месяц портится 2–3 тонны продукции…'
                  )}
                />
                <Chips label={L('Муаммо тури', 'Тип проблемы')} multi options={PROBLEM_TYPES} value={data.problem_types} onChange={set('problem_types')} />
                <div className="grid gap-6 sm:grid-cols-2">
                  <Chips label={L('Муаммо қачондан бери бор?', 'Как давно существует?')} options={PROBLEM_AGE} value={data.problem_age} onChange={set('problem_age')} />
                  <TextInput
                    label={L('Кутилаётган натижа', 'Ожидаемый результат')}
                    value={data.expected}
                    onChange={setInput('expected')}
                    placeholder={L('Масалан: йўқотишни 2 баравар камайтириш', 'Например: снизить потери в 2 раза')}
                  />
                </div>
                <TextInput
                  label={L('Аввал нима қилиб кўргансиз? (ихтиёрий)', 'Что уже пробовали? (необязательно)')}
                  value={data.attempts}
                  onChange={setInput('attempts')}
                  placeholder={L('Масалан: қўшимча қоровул қўйдик, лекин ёрдам бермади', 'Например: поставили дежурного, но это не помогло')}
                />
                <FileInput
                  label={L('Фото, ҳужжат ёки жадвал (ихтиёрий)', 'Фото, документ или таблица (необязательно)')}
                  hint={L('8 MB гача. Жараён фотоси экспертга муаммони тезроқ тушунишга ёрдам беради.', 'До 8 МБ. Фото процесса помогает эксперту быстрее понять задачу.')}
                  value={file}
                  onChange={setFile}
                />
              </>
            )}

            {step === 2 && (
              <>
                <RadioCards label={L('Тахминий бюджет', 'Ориентировочный бюджет')} options={BUDGETS} value={data.budget} onChange={set('budget')} />
                <Chips label={L('Ечим қачонгача керак?', 'Когда нужно решение?')} options={URGENCY} value={data.urgency} onChange={set('urgency')} />
                <Chips label={L('Пилот синовга тайёрмисиз?', 'Готовы к пилотному тестированию?')} options={PILOT} value={data.pilot} onChange={set('pilot')} />
                <div className="grid gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <Checkbox checked={data.publish} onChange={set('publish')}>
                    {t(
                      L(
                        'Муаммони «Муаммолар биржаси»да корхона номисиз эълон қилишга розиман — шунда кўпроқ стартаплар ечим таклиф қилади.',
                        'Согласен опубликовать задачу на «Бирже задач» без названия компании — так решения предложит больше стартапов.'
                      )
                    )}
                  </Checkbox>
                  <Checkbox checked={data.nda} onChange={set('nda')}>
                    {t(L('Махфийлик шартномаси (NDA) имзолаш керак', 'Необходимо подписать соглашение о конфиденциальности (NDA)'))}
                  </Checkbox>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextInput label={L('Исм-шарифингиз', 'Ваше имя')} required value={data.name} onChange={setInput('name')} error={errors.name} autoComplete="name" />
                  <TextInput
                    label={L('Лавозим', 'Должность')}
                    value={data.position}
                    onChange={setInput('position')}
                    placeholder={L('Раҳбар, бош муҳандис…', 'Директор, главный инженер…')}
                  />
                  <PhoneInput label={L('Телефон', 'Телефон')} required value={data.phone} onChange={set('phone')} error={errors.phone} />
                  <TextInput label="E-mail" type="email" value={data.email} onChange={setInput('email')} error={errors.email} placeholder="name@company.uz" autoComplete="email" />
                  <TextInput label="Telegram" value={data.telegram} onChange={setInput('telegram')} placeholder="@username" />
                  <Chips label={L('Қулай алоқа усули', 'Удобный способ связи')} options={CONTACT_METHODS} value={data.contact_method} onChange={set('contact_method')} />
                </div>
                <Checkbox checked={data.consent} onChange={set('consent')} error={errors.consent}>
                  {t(
                    L(
                      'Шахсий маълумотларимни ариза кўриб чиқиш мақсадида қайта ишлашга розиман.',
                      'Согласен на обработку персональных данных для рассмотрения заявки.'
                    )
                  )}
                  <span className="text-cyanx-400"> *</span>
                </Checkbox>
                <FormError show={status === 'error'} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-5 py-5 sm:px-8">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={back}>
            <ArrowLeft className="h-4 w-4" />
            {t(L('Орқага', 'Назад'))}
          </Button>
        ) : (
          <span className="text-xs text-slate-500">{t(L('≈ 5 дақиқа', '≈ 5 минут'))}</span>
        )}
        {step < STEPS.length - 1 ? (
          <Button type="submit">
            {t(L('Давом этиш', 'Далее'))}
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" variant="leaf" disabled={status === 'sending'}>
            {status === 'sending' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {t(status === 'sending' ? L('Юборилмоқда…', 'Отправка…') : L('Аризани юбориш', 'Отправить заявку'))}
          </Button>
        )}
      </div>
    </form>
  );
}
