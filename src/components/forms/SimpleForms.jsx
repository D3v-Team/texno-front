import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoaderCircle, Send } from 'lucide-react';
import { L, translate, useLang } from '../../i18n/LangContext';
import { FORM_NAMES, isEmailValid, isPhoneValid, makeRequestId, submitForm } from '../../lib/forms';
import { SECTORS } from '../../data/business';
import { ROOMS } from '../../data/rooms';
import { PROGRAMS } from '../../data/content';
import { Button, cx } from '../ui';
import {
  BAD_EMAIL, BAD_PHONE, CONSENT_ERR, REQUIRED, Checkbox, Chips, FormError, FormSuccess, PhoneInput, RadioCards, Select, TextArea,
  TextInput,
} from './fields';

/* ───────── umumiy hook ───────── */
function useSimpleForm({ name, initial, rules, humanize }) {
  const { lang } = useLang();
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [id, setId] = useState('');

  const set = (key) => (value) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const setInput = (key) => (e) => set(key)(e.target.value);

  async function onSubmit(e) {
    e.preventDefault();
    const errs = rules(data);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('sending');
    try {
      const rid = makeRequestId(name);
      await submitForm(name, { ...(humanize ? humanize(data) : data), request_id: rid, lang });
      setId(rid);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }
  function reset() {
    setData(initial);
    setErrors({});
    setStatus('idle');
  }
  return { data, setData, set, setInput, errors, status, id, onSubmit, reset };
}

const lab = (list, id) => translate(list.find((x) => x.id === id)?.label, 'lat') || id;

function contactRules(d, e = {}) {
  if (!d.name?.trim()) e.name = REQUIRED;
  if (!isPhoneValid(d.phone)) e.phone = BAD_PHONE;
  if (!isEmailValid(d.email)) e.email = BAD_EMAIL;
  if (!d.consent) e.consent = CONSENT_ERR;
  return e;
}

function Consent({ f }) {
  const { t } = useLang();
  return (
    <Checkbox checked={f.data.consent} onChange={f.set('consent')} error={f.errors.consent}>
      {t(L('Шахсий маълумотларимни ариза кўриб чиқиш мақсадида қайта ишлашга розиман.', 'Согласен на обработку персональных данных для рассмотрения заявки.'))}
      <span className="text-cyanx-400"> *</span>
    </Checkbox>
  );
}

function SubmitRow({ f, label }) {
  const { t } = useLang();
  return (
    <div className="flex flex-col gap-4">
      <FormError show={f.status === 'error'} />
      <Button type="submit" size="lg" variant="leaf" disabled={f.status === 'sending'} className="w-full sm:w-auto sm:self-start">
        {f.status === 'sending' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {t(f.status === 'sending' ? L('Юборилмоқда…', 'Отправка…') : label)}
      </Button>
    </div>
  );
}

function Shell({ children, className, ...props }) {
  return (
    <form noValidate className={cx('grid gap-6', className)} {...props}>
      {children}
    </form>
  );
}

/* ═════════ Muammoga yechim taklifi (startap → korxona) ═════════ */
const SOLVER_TYPES = [
  { id: 'startup', label: L('Стартап жамоа', 'Стартап-команда') },
  { id: 'scientist', label: L('Олим / тадқиқотчи', 'Учёный / исследователь') },
  { id: 'company', label: L('IT / муҳандислик компанияси', 'IT / инженерная компания') },
  { id: 'student', label: L('Талаба', 'Студент') },
];

export function SolutionForm({ challenge }) {
  const { t } = useLang();
  const f = useSimpleForm({
    name: FORM_NAMES.solution,
    initial: { challenge: `${challenge.id} — ${translate(challenge.title, 'lat')}`, solver_type: 'startup', team: '', idea: '', experience: '', name: '', phone: '', email: '', consent: false },
    rules: (d) => {
      const e = {};
      if (d.idea.trim().length < 20) e.idea = L('Ечимни камида 20 белгида тавсифланг', 'Опишите решение минимум в 20 символах');
      return contactRules(d, e);
    },
    humanize: (d) => ({ ...d, solver_type: lab(SOLVER_TYPES, d.solver_type) }),
  });

  if (f.status === 'done') {
    return (
      <FormSuccess
        id={f.id}
        title={L('Таклифингиз юборилди!', 'Предложение отправлено!')}
        text={L('Технопарк эксперти таклифни ўрганиб, корхона билан учрашув ташкил қилади.', 'Эксперт технопарка изучит предложение и организует встречу с предприятием.')}
      />
    );
  }
  return (
    <Shell onSubmit={f.onSubmit} name={FORM_NAMES.solution}>
      <Chips label={L('Сиз кимсиз?', 'Кто вы?')} options={SOLVER_TYPES} value={f.data.solver_type} onChange={f.set('solver_type')} />
      <TextInput label={L('Жамоа ёки ташкилот номи', 'Название команды или организации')} value={f.data.team} onChange={f.setInput('team')} />
      <TextArea
        label={L('Таклиф этилаётган ечим', 'Предлагаемое решение')}
        required
        maxLength={1200}
        value={f.data.idea}
        onChange={f.setInput('idea')}
        error={f.errors.idea}
        placeholder={L('Қандай технология, қанча муддат, тахминий харажат…', 'Какая технология, сроки, ориентировочная стоимость…')}
      />
      <TextInput
        label={L('Тажриба ёки портфолио ҳаволаси', 'Опыт или ссылка на портфолио')}
        value={f.data.experience}
        onChange={f.setInput('experience')}
        placeholder="https://…"
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextInput label={L('Исм-шариф', 'Имя')} required value={f.data.name} onChange={f.setInput('name')} error={f.errors.name} autoComplete="name" />
        <PhoneInput label={L('Телефон', 'Телефон')} required value={f.data.phone} onChange={f.set('phone')} error={f.errors.phone} />
      </div>
      <TextInput label="E-mail" type="email" value={f.data.email} onChange={f.setInput('email')} error={f.errors.email} />
      <Consent f={f} />
      <SubmitRow f={f} label={L('Ечим таклиф қилиш', 'Предложить решение')} />
      <p className="text-xs text-slate-500">{t(L('Корхона маълумотлари фақат эксперт саралашидан сўнг очилади.', 'Данные предприятия раскрываются после экспертного отбора.'))}</p>
    </Shell>
  );
}

/* ═════════ Startap arizasi ═════════ */
const STAGES = [
  { id: 'idea', label: L('Ғоя', 'Идея'), hint: L('Ғоя ва муаммо бор', 'Есть идея и проблема') },
  { id: 'proto', label: L('Прототип', 'Прототип'), hint: L('Дастлабки намуна бор', 'Есть первый образец') },
  { id: 'mvp', label: L('MVP', 'MVP'), hint: L('Ишлайдиган маҳсулот', 'Работающий продукт') },
  { id: 'sales', label: L('Сотувлар бор', 'Есть продажи'), hint: L('Биринчи мижозлар', 'Первые клиенты') },
];
const TEAM = [
  { id: '1', label: L('Ёлғиз', 'Один') },
  { id: '2-3', label: '2–3' },
  { id: '4-6', label: '4–6' },
  { id: '7+', label: '7+' },
];

export function StartupForm({ program: programProp, score }) {
  const { t } = useLang();
  const programs = PROGRAMS.map((p) => ({ id: p.id, label: p.title }));
  const f = useSimpleForm({
    name: FORM_NAMES.startup,
    initial: { project: '', stage: 'idea', program: programProp || 'pre', sector: '', team_size: '2-3', problem: '', solution: '', link: '', name: '', age: '', phone: '', email: '', telegram: '', consent: false },
    rules: (d) => {
      const e = {};
      if (!d.project.trim()) e.project = REQUIRED;
      if (!d.sector) e.sector = REQUIRED;
      if (d.problem.trim().length < 20) e.problem = L('Камида 20 белги', 'Минимум 20 символов');
      if (d.solution.trim().length < 20) e.solution = L('Камида 20 белги', 'Минимум 20 символов');
      return contactRules(d, e);
    },
    humanize: (d) => ({
      ...d,
      stage: lab(STAGES, d.stage),
      program: lab(programs, d.program),
      sector: lab(SECTORS, d.sector),
      self_score: score ? `${score}/30` : '',
    }),
  });

  useEffect(() => {
    if (programProp) f.set('program')(programProp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programProp]);

  if (f.status === 'done') {
    return (
      <FormSuccess
        id={f.id}
        title={L('Аризангиз қабул қилинди!', 'Заявка принята!')}
        text={L('Эксперт кенгаши лойиҳангизни 6 мезон бўйича баҳолайди ва 5 иш куни ичида суҳбатга таклиф қилади.', 'Экспертный совет оценит проект по 6 критериям и в течение 5 рабочих дней пригласит на собеседование.')}
        steps={[
          L('Ариза экспертлар томонидан кўриб чиқилади', 'Заявка рассматривается экспертами'),
          L('Жамоа билан 30 дақиқалик онлайн ёки офлайн суҳбат', '30-минутное собеседование с командой онлайн или офлайн'),
          L('Мос дастурга қабул ва ментор бириктириш', 'Зачисление в программу и закрепление ментора'),
        ]}
        onReset={f.reset}
      />
    );
  }

  return (
    <Shell onSubmit={f.onSubmit} name={FORM_NAMES.startup}>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextInput label={L('Лойиҳа номи', 'Название проекта')} required value={f.data.project} onChange={f.setInput('project')} error={f.errors.project} />
        <Select label={L('Соҳа', 'Сфера')} required options={SECTORS} value={f.data.sector} onChange={f.set('sector')} error={f.errors.sector} />
      </div>
      <RadioCards label={L('Лойиҳа босқичи', 'Стадия проекта')} options={STAGES} value={f.data.stage} onChange={f.set('stage')} cols="grid-cols-2 lg:grid-cols-4" />
      <div className="grid gap-6 sm:grid-cols-2">
        <Chips label={L('Дастур', 'Программа')} options={programs} value={f.data.program} onChange={f.set('program')} />
        <Chips label={L('Жамоа аъзолари', 'Размер команды')} options={TEAM} value={f.data.team_size} onChange={f.set('team_size')} />
      </div>
      <TextArea
        label={L('Қандай муаммони ҳал қиласиз?', 'Какую проблему решаете?')}
        required
        maxLength={800}
        value={f.data.problem}
        onChange={f.setInput('problem')}
        error={f.errors.problem}
        placeholder={L('Кимнинг муаммоси? Қанчалик долзарб?', 'Чья это проблема? Насколько острая?')}
      />
      <TextArea
        label={L('Ечимингиз ва унинг устунлиги', 'Ваше решение и его преимущество')}
        required
        maxLength={800}
        value={f.data.solution}
        onChange={f.setInput('solution')}
        error={f.errors.solution}
      />
      <TextInput label={L('Тақдимот ёки демо ҳаволаси (ихтиёрий)', 'Ссылка на презентацию или демо (необязательно)')} value={f.data.link} onChange={f.setInput('link')} placeholder="https://…" />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextInput label={L('Асосчи исм-шарифи', 'Имя основателя')} required value={f.data.name} onChange={f.setInput('name')} error={f.errors.name} autoComplete="name" />
        <TextInput label={L('Ёши', 'Возраст')} type="number" min="14" max="80" value={f.data.age} onChange={f.setInput('age')} />
        <PhoneInput label={L('Телефон', 'Телефон')} required value={f.data.phone} onChange={f.set('phone')} error={f.errors.phone} />
        <TextInput label="E-mail" type="email" value={f.data.email} onChange={f.setInput('email')} error={f.errors.email} autoComplete="email" />
      </div>
      <TextInput label="Telegram" value={f.data.telegram} onChange={f.setInput('telegram')} placeholder="@username" />
      <Consent f={f} />
      <SubmitRow f={f} label={L('Аризани юбориш', 'Отправить заявку')} />
      {score ? <p className="text-xs text-slate-500">{t(L('Ўз-ўзини баҳолаш натижаси аризага илова қилинади', 'Результат самооценки будет приложен к заявке'))}: {score}/30</p> : null}
    </Shell>
  );
}

/* ═════════ Xona bron qilish ═════════ */
const SLOTS = [
  { id: 'morning', label: '09:00–12:00' },
  { id: 'day', label: '12:00–15:00' },
  { id: 'evening', label: '15:00–18:00' },
  { id: 'full', label: L('Кун бўйи', 'Весь день') },
];
const STATUS_OPTS = [
  { id: 'resident', label: L('Резидентман', 'Я резидент') },
  { id: 'student', label: L('Талаба', 'Студент') },
  { id: 'company', label: L('Корхона / ташкилот', 'Компания / организация') },
  { id: 'person', label: L('Жисмоний шахс', 'Частное лицо') },
];

export function BookingForm({ roomId }) {
  const { t } = useLang();
  const rooms = ROOMS.map((r) => ({ id: r.id, label: r.name }));
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().slice(0, 10);
  const f = useSimpleForm({
    name: FORM_NAMES.booking,
    initial: { room: roomId || 'coworking', date: '', slot: 'morning', people: '', who: 'resident', purpose: '', name: '', phone: '', email: '', consent: false },
    rules: (d) => {
      const e = {};
      if (!d.date) e.date = REQUIRED;
      if (!d.purpose.trim()) e.purpose = REQUIRED;
      return contactRules(d, e);
    },
    humanize: (d) => ({ ...d, room: lab(rooms, d.room), slot: lab(SLOTS, d.slot), who: lab(STATUS_OPTS, d.who) }),
  });

  useEffect(() => {
    if (roomId) f.set('room')(roomId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  if (f.status === 'done') {
    return (
      <FormSuccess
        id={f.id}
        title={L('Бронлаш сўрови юборилди', 'Запрос на бронь отправлен')}
        text={L('Администратор 1 иш куни ичида бронни тасдиқлаш учун боғланади.', 'Администратор свяжется в течение рабочего дня для подтверждения брони.')}
        onReset={f.reset}
        resetLabel={L('Яна бронлаш', 'Забронировать ещё')}
      />
    );
  }

  return (
    <Shell onSubmit={f.onSubmit} name={FORM_NAMES.booking}>
      <Select label={L('Хона ёки лаборатория', 'Помещение или лаборатория')} required options={rooms} value={f.data.room} onChange={f.set('room')} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextInput label={L('Сана', 'Дата')} type="date" min={minDate} required value={f.data.date} onChange={f.setInput('date')} error={f.errors.date} />
        <TextInput label={L('Қатнашчилар сони', 'Число участников')} type="number" min="1" max="150" value={f.data.people} onChange={f.setInput('people')} />
      </div>
      <Chips label={L('Вақт', 'Время')} options={SLOTS} value={f.data.slot} onChange={f.set('slot')} />
      <Chips label={L('Мақомингиз', 'Ваш статус')} options={STATUS_OPTS} value={f.data.who} onChange={f.set('who')} />
      <TextArea
        label={L('Мақсад', 'Цель')}
        required
        maxLength={500}
        value={f.data.purpose}
        onChange={f.setInput('purpose')}
        error={f.errors.purpose}
        placeholder={L('Масалан: прототип корпусини 3D-принтерда чоп этиш', 'Например: печать корпуса прототипа на 3D-принтере')}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextInput label={L('Исм-шариф', 'Имя')} required value={f.data.name} onChange={f.setInput('name')} error={f.errors.name} autoComplete="name" />
        <PhoneInput label={L('Телефон', 'Телефон')} required value={f.data.phone} onChange={f.set('phone')} error={f.errors.phone} />
      </div>
      <Consent f={f} />
      <SubmitRow f={f} label={L('Бронлаш', 'Забронировать')} />
      <p className="text-xs text-slate-500">{t(L('Резидентлар учун — бепул. Бошқалар учун — келишув асосида.', 'Для резидентов — бесплатно. Для остальных — по договорённости.'))}</p>
    </Shell>
  );
}

/* ═════════ Investor arizasi ═════════ */
const INV_TYPES = [
  { id: 'angel', label: L('Ангел инвестор', 'Ангел-инвестор') },
  { id: 'fund', label: L('Венчур фонд', 'Венчурный фонд') },
  { id: 'corp', label: L('Корхона / холдинг', 'Компания / холдинг') },
  { id: 'bank', label: L('Банк', 'Банк') },
  { id: 'grant', label: L('Грант дастури', 'Грантовая программа') },
];
const TICKETS = [
  { id: 'lt100', label: L('100 млн сўмгача', 'До 100 млн сум') },
  { id: '100-500', label: L('100–500 млн сўм', '100–500 млн сум') },
  { id: '500-2000', label: L('0,5–2 млрд сўм', '0,5–2 млрд сум') },
  { id: 'gt2000', label: L('2 млрд сўмдан ортиқ', 'Более 2 млрд сум') },
];

export function InvestorForm() {
  const f = useSimpleForm({
    name: FORM_NAMES.investor,
    initial: { inv_type: 'angel', organization: '', ticket: 'lt100', sectors: [], comment: '', name: '', phone: '', email: '', consent: false },
    rules: (d) => contactRules(d, {}),
    humanize: (d) => ({ ...d, inv_type: lab(INV_TYPES, d.inv_type), ticket: lab(TICKETS, d.ticket), sectors: d.sectors.map((s) => lab(SECTORS, s)) }),
  });

  if (f.status === 'done') {
    return (
      <FormSuccess
        id={f.id}
        title={L('Клубга хуш келибсиз!', 'Добро пожаловать в клуб!')}
        text={L('Клуб координатори сиз билан боғланади ва яқин Pitch Day га таклифнома юборади.', 'Координатор клуба свяжется с вами и пришлёт приглашение на ближайший Pitch Day.')}
      />
    );
  }

  return (
    <Shell onSubmit={f.onSubmit} name={FORM_NAMES.investor}>
      <Chips label={L('Инвестор тури', 'Тип инвестора')} options={INV_TYPES} value={f.data.inv_type} onChange={f.set('inv_type')} />
      <TextInput label={L('Ташкилот (ихтиёрий)', 'Организация (необязательно)')} value={f.data.organization} onChange={f.setInput('organization')} />
      <Chips label={L('Битта лойиҳага тахминий сармоя', 'Ориентировочный чек на проект')} options={TICKETS} value={f.data.ticket} onChange={f.set('ticket')} />
      <Chips label={L('Қизиқтирган соҳалар', 'Интересующие отрасли')} multi options={SECTORS.slice(0, 10)} value={f.data.sectors} onChange={f.set('sectors')} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextInput label={L('Исм-шариф', 'Имя')} required value={f.data.name} onChange={f.setInput('name')} error={f.errors.name} autoComplete="name" />
        <PhoneInput label={L('Телефон', 'Телефон')} required value={f.data.phone} onChange={f.set('phone')} error={f.errors.phone} />
      </div>
      <TextInput label="E-mail" type="email" value={f.data.email} onChange={f.setInput('email')} error={f.errors.email} autoComplete="email" />
      <TextArea label={L('Изоҳ', 'Комментарий')} maxLength={500} value={f.data.comment} onChange={f.setInput('comment')} />
      <Consent f={f} />
      <SubmitRow f={f} label={L('Клубга қўшилиш', 'Вступить в клуб')} />
    </Shell>
  );
}

/* ═════════ Aloqa (umumiy savol) ═════════ */
const TOPICS = [
  { id: 'general', label: L('Умумий савол', 'Общий вопрос') },
  { id: 'event', label: L('Тадбирда қатнашиш', 'Участие в событии') },
  { id: 'partner', label: L('Ҳамкорлик', 'Партнёрство') },
  { id: 'press', label: L('ОАВ ва матбуот', 'СМИ и пресса') },
];

export function ContactForm() {
  const { t } = useLang();
  const location = useLocation();
  const presetTopic = location.state?.topic;
  const f = useSimpleForm({
    name: FORM_NAMES.contact,
    initial: { topic: presetTopic ? 'event' : 'general', subject: presetTopic || '', message: '', name: '', phone: '', email: '', consent: false },
    rules: (d) => {
      const e = {};
      if (d.message.trim().length < 5) e.message = REQUIRED;
      return contactRules(d, e);
    },
    humanize: (d) => ({ ...d, topic: lab(TOPICS, d.topic) }),
  });

  useEffect(() => {
    if (presetTopic) {
      f.setData((d) => ({ ...d, topic: 'event', subject: presetTopic }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetTopic]);

  if (f.status === 'done') {
    return (
      <FormSuccess
        id={f.id}
        title={L('Хабарингиз юборилди', 'Сообщение отправлено')}
        text={L('1 иш куни ичида жавоб берамиз.', 'Ответим в течение рабочего дня.')}
        onReset={f.reset}
        resetLabel={L('Яна ёзиш', 'Написать ещё')}
      />
    );
  }

  return (
    <Shell onSubmit={f.onSubmit} name={FORM_NAMES.contact}>
      <Chips label={L('Мавзу', 'Тема')} options={TOPICS} value={f.data.topic} onChange={f.set('topic')} />
      {f.data.topic === 'event' && (
        <TextInput label={L('Тадбир номи', 'Название события')} value={f.data.subject} onChange={f.setInput('subject')} />
      )}
      <TextArea label={L('Хабар', 'Сообщение')} required maxLength={1000} value={f.data.message} onChange={f.setInput('message')} error={f.errors.message} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextInput label={L('Исм-шариф', 'Имя')} required value={f.data.name} onChange={f.setInput('name')} error={f.errors.name} autoComplete="name" />
        <PhoneInput label={L('Телефон', 'Телефон')} required value={f.data.phone} onChange={f.set('phone')} error={f.errors.phone} />
      </div>
      <TextInput label="E-mail" type="email" value={f.data.email} onChange={f.setInput('email')} error={f.errors.email} autoComplete="email" />
      <Consent f={f} />
      <SubmitRow f={f} label={L('Юбориш', 'Отправить')} />
      <p className="text-xs text-slate-500">{t(L('Бизнес муаммоси бўлса — «Бизнес учун» саҳифасидаги махсус формадан фойдаланинг.', 'Для бизнес-задачи используйте специальную форму на странице «Для бизнеса».'))}</p>
    </Shell>
  );
}
