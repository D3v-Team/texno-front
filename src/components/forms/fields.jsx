import { useId, useRef } from 'react';
import { motion } from 'motion/react';
import { Check, ChevronDown, CircleCheckBig, Copy, Paperclip, X } from 'lucide-react';
import { useState } from 'react';
import { L, useLang } from '../../i18n/LangContext';
import { formatPhone } from '../../lib/forms';
import { cx, Button } from '../ui';

export function Field({ label, required, error, hint, children, className, htmlFor }) {
  const { t } = useLang();
  return (
    <div className={cx('flex flex-col gap-2', className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-slate-300">
          {t(label)}
          {required && <span className="ml-0.5 text-cyanx-400">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-coral-400" role="alert">
          {t(error)}
        </p>
      ) : hint ? (
        <p className="text-xs text-slate-500">{t(hint)}</p>
      ) : null}
    </div>
  );
}

export function TextInput({ label, required, error, hint, className, placeholder, ...props }) {
  const id = useId();
  const { t } = useLang();
  return (
    <Field label={label} required={required} error={error} hint={hint} className={className} htmlFor={id}>
      <input id={id} className="input" aria-invalid={!!error} placeholder={t(placeholder)} {...props} />
    </Field>
  );
}

export function TextArea({ label, required, error, hint, className, placeholder, maxLength = 1500, value, ...props }) {
  const id = useId();
  const { t } = useLang();
  return (
    <Field label={label} required={required} error={error} hint={hint} className={className} htmlFor={id}>
      <div className="relative">
        <textarea
          id={id}
          className="input min-h-[130px] resize-y pb-7 leading-relaxed"
          aria-invalid={!!error}
          placeholder={t(placeholder)}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        <span className="pointer-events-none absolute bottom-2.5 right-4 text-[11px] text-slate-500">
          {(value || '').length}/{maxLength}
        </span>
      </div>
    </Field>
  );
}

export function PhoneInput({ value, onChange, ...props }) {
  return (
    <TextInput
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder="+998 90 123 45 67"
      value={value}
      onFocus={(e) => {
        if (!e.target.value) onChange('+998 ');
      }}
      onChange={(e) => onChange(formatPhone(e.target.value))}
      {...props}
    />
  );
}

export function Select({ label, required, error, hint, options, value, onChange, placeholder, className }) {
  const id = useId();
  const { t } = useLang();
  return (
    <Field label={label} required={required} error={error} hint={hint} className={className} htmlFor={id}>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={cx('input appearance-none pr-11', !value && 'text-slate-500')}
        >
          <option value="" disabled>
            {t(placeholder || L('Танланг…', 'Выберите…'))}
          </option>
          {options.map((o) => (
            <option key={o.id} value={o.id} className="bg-ink-900 text-white">
              {t(o.label)}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </Field>
  );
}

/** Chips — single (value: string) yoki multi (value: string[]) */
export function Chips({ label, required, error, hint, options, value, onChange, multi = false, className, renderIcon }) {
  const { t } = useLang();
  const isActive = (id) => (multi ? (value || []).includes(id) : value === id);
  function toggle(id) {
    if (multi) {
      const cur = value || [];
      onChange(cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
    } else {
      onChange(id);
    }
  }
  return (
    <Field label={label} required={required} error={error} hint={hint} className={className}>
      <div className="flex flex-wrap gap-2" role={multi ? 'group' : 'radiogroup'}>
        {options.map((o) => {
          const active = isActive(o.id);
          return (
            <button
              key={o.id}
              type="button"
              role={multi ? 'checkbox' : 'radio'}
              aria-checked={active}
              data-active={active}
              onClick={() => toggle(o.id)}
              className="chip"
            >
              {renderIcon ? renderIcon(o) : null}
              {t(o.label)}
              {multi && active && <Check className="h-3.5 w-3.5 text-cyanx-300" />}
            </button>
          );
        })}
      </div>
    </Field>
  );
}

export function RadioCards({ label, required, error, options, value, onChange, cols = 'sm:grid-cols-2 lg:grid-cols-3' }) {
  const { t } = useLang();
  return (
    <Field label={label} required={required} error={error}>
      <div className={cx('grid gap-2.5', cols)} role="radiogroup">
        {options.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.id)}
              className={cx(
                'relative rounded-2xl border px-4 py-3.5 text-left transition',
                active
                  ? 'border-cyanx-400/60 bg-cyanx-400/[0.08] shadow-[0_0_0_4px_rgba(63,224,245,.08)]'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/25'
              )}
            >
              <span className="block text-sm font-semibold text-white">{t(o.label)}</span>
              {o.hint && <span className="mt-0.5 block text-xs text-slate-400">{t(o.hint)}</span>}
              <span
                className={cx(
                  'absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full border transition',
                  active ? 'border-cyanx-400 bg-cyanx-400 text-ink-950' : 'border-white/20'
                )}
              >
                {active && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
            </button>
          );
        })}
      </div>
    </Field>
  );
}

export function Checkbox({ checked, onChange, children, error }) {
  const { t } = useLang();
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-300">
        <span
          className={cx(
            'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition',
            checked ? 'border-leaf-400 bg-leaf-400 text-ink-950' : error ? 'border-coral-400' : 'border-white/25 bg-white/5'
          )}
        >
          {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </span>
        <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="leading-relaxed">{children}</span>
      </label>
      {error && <p className="mt-1.5 pl-8 text-xs text-coral-400">{t(error)}</p>}
    </div>
  );
}

export function FileInput({ label, hint, value, onChange, accept = '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png', maxMb = 8 }) {
  const { t } = useLang();
  const ref = useRef(null);
  const [err, setErr] = useState('');
  return (
    <Field label={label} hint={!err ? hint : null} error={err || null}>
      {value ? (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-leaf-400/30 bg-leaf-400/[0.06] px-4 py-3">
          <span className="flex min-w-0 items-center gap-2 text-sm text-white">
            <Paperclip className="h-4 w-4 shrink-0 text-leaf-300" />
            <span className="truncate">{value.name}</span>
            <span className="shrink-0 text-xs text-slate-400">{(value.size / 1024 / 1024).toFixed(1)} MB</span>
          </span>
          <button type="button" onClick={() => onChange(null)} className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-5 text-sm text-slate-400 transition hover:border-cyanx-400/50 hover:text-white"
        >
          <Paperclip className="h-4 w-4" />
          {t(L('Файл бириктириш (PDF, Word, Excel, расм)', 'Прикрепить файл (PDF, Word, Excel, фото)'))}
        </button>
      )}
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = '';
          if (!f) return;
          if (f.size > maxMb * 1024 * 1024) {
            setErr(L(`Файл ҳажми ${maxMb} MB дан ошмаслиги керак`, `Размер файла не должен превышать ${maxMb} МБ`));
            return;
          }
          setErr('');
          onChange(f);
        }}
      />
    </Field>
  );
}

/** Muvaffaqiyatli yuborilgandan keyingi ekran */
export function FormSuccess({ id, title, text, steps, onReset, resetLabel }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center py-6 text-center"
    >
      <div className="relative">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-leaf-400/40" />
        <span className="relative grid h-20 w-20 place-items-center rounded-full bg-leaf-400 text-ink-950 shadow-glow-leaf">
          <CircleCheckBig className="h-9 w-9" />
        </span>
      </div>
      <h3 className="mt-7 font-display text-2xl font-semibold sm:text-3xl">{t(title)}</h3>
      {text && <p className="mt-3 max-w-md text-slate-400">{t(text)}</p>}
      {id && (
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(id).then(() => setCopied(true)).catch(() => {});
          }}
          className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 font-mono text-lg tracking-wider text-white transition hover:border-white/25"
        >
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-slate-400">{t(L('Ариза №', 'Заявка №'))}</span>
          {id}
          {copied ? <Check className="h-4 w-4 text-leaf-400" /> : <Copy className="h-4 w-4 text-slate-400" />}
        </button>
      )}
      {steps && (
        <ol className="mt-8 grid w-full max-w-xl gap-2 text-left">
          {steps.map((s, i) => (
            <li key={i} className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyanx-400/15 text-xs font-bold text-cyanx-300">{i + 1}</span>
              <span className="text-sm text-slate-300">{t(s)}</span>
            </li>
          ))}
        </ol>
      )}
      {onReset && (
        <Button variant="ghost" size="sm" className="mt-8" onClick={onReset}>
          {t(resetLabel || L('Яна ариза юбориш', 'Отправить ещё одну заявку'))}
        </Button>
      )}
    </motion.div>
  );
}

export function FormError({ show }) {
  const { t } = useLang();
  if (!show) return null;
  return (
    <div className="rounded-2xl border border-coral-400/40 bg-coral-400/10 px-4 py-3 text-sm text-coral-400" role="alert">
      {t(
        L(
          'Юборишда хатолик юз берди. Интернет алоқасини текшириб, қайта уриниб кўринг ёки бизга телефон орқали мурожаат қилинг.',
          'Не удалось отправить. Проверьте подключение к интернету и попробуйте снова или свяжитесь с нами по телефону.'
        )
      )}
    </div>
  );
}

export const REQUIRED = L('Мажбурий майдон', 'Обязательное поле');
export const BAD_PHONE = L('Телефон рақамини тўлиқ киритинг', 'Введите номер телефона полностью');
export const BAD_EMAIL = L('E-mail нотўғри', 'Некорректный e-mail');
export const CONSENT_ERR = L('Розилик талаб қилинади', 'Требуется согласие');
