import { useState } from 'react';
import { LoaderCircle, Rocket, User, Users } from 'lucide-react';
import { L, translate, useLang } from '../../i18n/LangContext';
import { FORM_NAMES, draft, isEmailValid, isPhoneValid, makeRequestId, submitForm } from '../../lib/forms';
import { SECTORS } from '../../data/business';
import { UNIVERSITIES } from '../../data/directions';
import { INNOX_NEEDS, INNOX_SOURCES, INNOX_STATUSES } from '../../data/innox';
import { Button, cx, useDate } from '../ui';
import {
  BAD_EMAIL, BAD_PHONE, CONSENT_ERR, REQUIRED, Checkbox, Chips, FormError, FormSuccess, PhoneInput, RadioCards, Select, TextArea, TextInput,
} from './fields';

const DRAFT_KEY = 'syt-innox-draft-v1';

const STAGES = [
  { id: 'idea', label: L('Ғоя', 'Идея'), hint: L('Муаммо ва ечим фикри бор', 'Есть проблема и идея решения') },
  { id: 'proto', label: L('Прототип', 'Прототип'), hint: L('Дастлабки намуна', 'Первый образец') },
  { id: 'mvp', label: 'MVP', hint: L('Ишлайдиган маҳсулот', 'Работающий продукт') },
  { id: 'sales', label: L('Биринчи мижозлар', 'Первые клиенты'), hint: L('Сотув ёки пилот бор', 'Есть продажи или пилот') },
];

const UNI_OPTIONS = [...UNIVERSITIES, { id: 'other', label: L('Бошқа ОТМ / ташкилот', 'Другой вуз / организация') }, { id: 'none', label: L('Ўқимайман', 'Не учусь') }];

const EMPTY = {
  name: '', age: '', phone: '', telegram: '', email: '',
  status: 'student', university: '', course: '',
  format: 'solo', team_size: '', idea_title: '', idea: '', stage: 'idea', sector: '', needs: [], source: '', consent: false,
};

/** Keyingi dushanba (saralash kuni) */
function nextMonday(from = new Date()) {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const add = (8 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + add);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default function InnoxForm() {
  const { t, lang } = useLang();
  const date = useDate();
  const [data, setData] = useState(() => ({ ...EMPTY, ...(draft.load(DRAFT_KEY) || {}), consent: false }));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [id, setId] = useState('');

  const set = (k) => (v) => {
    setData((d) => {
      const nd = { ...d, [k]: v };
      draft.save(DRAFT_KEY, { ...nd, consent: false });
      return nd;
    });
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const setInput = (k) => (e) => set(k)(e.target.value);

  function validate(d) {
    const e = {};
    if (!d.name.trim()) e.name = REQUIRED;
    if (!isPhoneValid(d.phone)) e.phone = BAD_PHONE;
    if (!isEmailValid(d.email)) e.email = BAD_EMAIL;
    if (!d.idea_title.trim()) e.idea_title = REQUIRED;
    if (d.idea.trim().length < 30) e.idea = L('Ғояни камида 30 белгида тавсифланг', 'Опишите идею минимум в 30 символах');
    if (!d.sector) e.sector = REQUIRED;
    if (!d.consent) e.consent = CONSENT_ERR;
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.querySelector('[name="innox-royxat"] [aria-invalid="true"], [name="innox-royxat"] [role="alert"]');
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setStatus('sending');
    const lab = (list, v) => translate(list.find((x) => x.id === v)?.label, 'lat') || v;
    try {
      const rid = makeRequestId(FORM_NAMES.innox);
      await submitForm(FORM_NAMES.innox, {
        ...data,
        status: lab(INNOX_STATUSES, data.status),
        university: lab(UNI_OPTIONS, data.university),
        format: data.format === 'team' ? `Jamoa (${data.team_size || '?'} kishi)` : 'Yakka',
        stage: lab(STAGES, data.stage),
        sector: lab(SECTORS, data.sector),
        needs: data.needs.map((x) => lab(INNOX_NEEDS, x)),
        source: lab(INNOX_SOURCES, data.source),
        selection_day: nextMonday(),
        request_id: rid,
        lang,
      });
      setId(rid);
      setStatus('done');
      draft.clear(DRAFT_KEY);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    const monday = nextMonday();
    return (
      <FormSuccess
        id={id}
        title={L('InnoX га хуш келибсиз!', 'Добро пожаловать в InnoX!')}
        text={L(
          `Аризангиз қабул қилинди. Сизни ${monday.slice(8)}.${monday.slice(5, 7)} душанба кунги саралашга таклиф қиламиз — вақтини телефон орқали аниқлаштирамиз.`,
          `Заявка принята. Приглашаем вас на отбор в понедельник ${monday.slice(8)}.${monday.slice(5, 7)} — время уточним по телефону.`
        )}
        steps={[
          L(`Саралаш: ${date(monday)} — 3–5 дақиқалик питч`, `Отбор: ${date(monday)} — питч на 3–5 минут`),
          L('Ментор ва трекер бириктирилади', 'Закрепление ментора и трекера'),
          L('Ду · Чо · Жу — амалий машғулотлар ва лабораториялар', 'Пн · Ср · Пт — практические занятия и лаборатории'),
        ]}
        onReset={() => {
          setData(EMPTY);
          setStatus('idle');
          setErrors({});
        }}
        resetLabel={L('Яна бир кишини рўйхатдан ўтказиш', 'Зарегистрировать ещё одного участника')}
      />
    );
  }

  return (
    <form name={FORM_NAMES.innox} onSubmit={onSubmit} noValidate className="grid gap-8">
      {/* 1. Shaxsiy */}
      <fieldset className="grid gap-5">
        <legend className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#c4b5fd]">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#a78bfa] text-[11px] font-bold text-ink-950">1</span>
          {t(L('Шахсий маълумотлар', 'Личные данные'))}
        </legend>
        <div className="grid gap-5 sm:grid-cols-[1fr_120px]">
          <TextInput label={L('Исм-фамилия', 'Имя и фамилия')} required value={data.name} onChange={setInput('name')} error={errors.name} autoComplete="name" />
          <TextInput label={L('Ёшингиз', 'Возраст')} type="number" min="12" max="45" value={data.age} onChange={setInput('age')} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <PhoneInput label={L('Телефон', 'Телефон')} required value={data.phone} onChange={set('phone')} error={errors.phone} />
          <TextInput label="Telegram" value={data.telegram} onChange={setInput('telegram')} placeholder="@username" />
        </div>
        <TextInput label="E-mail" type="email" value={data.email} onChange={setInput('email')} error={errors.email} autoComplete="email" />
        <Chips label={L('Мақомингиз', 'Ваш статус')} options={INNOX_STATUSES} value={data.status} onChange={set('status')} />
        <div className="grid gap-5 sm:grid-cols-[1fr_160px]">
          <Select label={L('Олий таълим ташкилоти', 'Вуз')} options={UNI_OPTIONS} value={data.university} onChange={set('university')} />
          <TextInput label={L('Курс / мутахассислик', 'Курс / специальность')} value={data.course} onChange={setInput('course')} placeholder={L('2-курс, IT', '2 курс, IT')} />
        </div>
      </fieldset>

      {/* 2. G'oya */}
      <fieldset className="grid gap-5 border-t border-white/[0.07] pt-8">
        <legend className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#c4b5fd]">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#a78bfa] text-[11px] font-bold text-ink-950">2</span>
          {t(L('Стартап ғоя', 'Стартап-идея'))}
        </legend>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: 'solo', icon: User, label: L('Якка', 'Один'), hint: L('Жамоани дастурда топаман', 'Найду команду в программе') },
            { id: 'team', icon: Users, label: L('Жамоа', 'Команда'), hint: L('Жамоам бор', 'У меня есть команда') },
          ].map((o) => (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={data.format === o.id}
              onClick={() => set('format')(o.id)}
              className={cx(
                'flex items-start gap-3 rounded-2xl border p-4 text-left transition',
                data.format === o.id ? 'border-[#a78bfa]/70 bg-[#a78bfa]/10' : 'border-white/10 bg-white/[0.02] hover:border-white/25'
              )}
            >
              <o.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#c4b5fd]" />
              <span>
                <span className="block text-sm font-semibold text-white">{t(o.label)}</span>
                <span className="block text-xs text-slate-400">{t(o.hint)}</span>
              </span>
            </button>
          ))}
        </div>
        {data.format === 'team' && (
          <TextInput label={L('Жамоада неча киши?', 'Сколько человек в команде?')} type="number" min="2" max="10" value={data.team_size} onChange={setInput('team_size')} />
        )}
        <TextInput
          label={L('Ғоя номи', 'Название идеи')}
          required
          maxLength={100}
          value={data.idea_title}
          onChange={setInput('idea_title')}
          error={errors.idea_title}
          placeholder={L('Масалан: Ариқлар учун ақлли сув ҳисоблагич', 'Например: Умный счётчик воды для арыков')}
        />
        <TextArea
          label={L('Қандай муаммони ва қандай ҳал қиласиз?', 'Какую проблему и как решаете?')}
          required
          maxLength={1000}
          value={data.idea}
          onChange={setInput('idea')}
          error={errors.idea}
          hint={L('Кимнинг муаммоси? Нима учун долзарб? Ечимингиз нимаси билан яхши?', 'Чья проблема? Почему важна? Чем ваше решение лучше?')}
        />
        <RadioCards label={L('Лойиҳа босқичи', 'Стадия проекта')} options={STAGES} value={data.stage} onChange={set('stage')} cols="grid-cols-2 lg:grid-cols-4" />
        <Select label={L('Соҳа', 'Сфера')} required options={SECTORS} value={data.sector} onChange={set('sector')} error={errors.sector} />
        <Chips label={L('Сизга нима керак?', 'Что вам нужно?')} multi options={INNOX_NEEDS} value={data.needs} onChange={set('needs')} />
        <Chips label={L('InnoX ҳақида қаердан билдингиз?', 'Откуда узнали об InnoX?')} options={INNOX_SOURCES} value={data.source} onChange={set('source')} />
      </fieldset>

      <div className="grid gap-4 border-t border-white/[0.07] pt-6">
        <Checkbox checked={data.consent} onChange={set('consent')} error={errors.consent}>
          {t(L('Шахсий маълумотларимни InnoX дастурига саралаш мақсадида қайта ишлашга розиман.', 'Согласен на обработку персональных данных для отбора в программу InnoX.'))}
          <span className="text-cyanx-400"> *</span>
        </Checkbox>
        <FormError show={status === 'error'} />
        <Button
          type="submit"
          size="lg"
          disabled={status === 'sending'}
          className="w-full !bg-none !bg-[#a78bfa] !text-ink-950 shadow-[0_10px_40px_-10px_rgba(167,139,250,.7)] hover:!bg-[#c4b5fd] sm:w-auto sm:self-start"
        >
          {status === 'sending' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
          {t(status === 'sending' ? L('Юборилмоқда…', 'Отправка…') : L('InnoX га рўйхатдан ўтиш', 'Зарегистрироваться в InnoX'))}
        </Button>
        <p className="text-xs text-slate-500">
          {t(L('Саралаш — ҳар душанба. Яқин саралаш куни:', 'Отбор — каждый понедельник. Ближайший:'))} <b className="text-slate-300">{date(nextMonday())}</b>
        </p>
      </div>
    </form>
  );
}
