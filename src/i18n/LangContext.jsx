import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toLatin } from './translit';

/**
 * Tillar:
 *  lat — O'zbekcha (lotin) — kirill matndan avtomatik
 *  cyr — Ўзбекча (кирилл)
 *  ru  — Русский
 */
export const LANGS = [
  { code: 'lat', short: 'UZ', label: 'Oʻzbekcha', htmlLang: 'uz-Latn' },
  { code: 'cyr', short: 'ЎЗ', label: 'Ўзбекча', htmlLang: 'uz-Cyrl' },
  { code: 'ru', short: 'RU', label: 'Русский', htmlLang: 'ru' },
];

const STORAGE_KEY = 'syt-lang';
const LangContext = createContext(null);

function readStoredLang() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (LANGS.some((l) => l.code === v)) return v;
  } catch {
    /* storage unavailable */
  }
  try {
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('ru')) return 'ru';
  } catch {
    /* ignore */
  }
  return 'lat';
}

/** Matn juftligi: L('кирилл ўзбекча', 'русский') */
export const L = (uz, ru) => ({ uz, ru });

export function translate(value, lang) {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (Array.isArray(value)) return value.map((v) => translate(v, lang));
  if (typeof value === 'object' && ('uz' in value || 'ru' in value)) {
    if (lang === 'ru') return value.ru ?? value.uz ?? '';
    if (lang === 'cyr') return value.uz ?? value.ru ?? '';
    return toLatin(value.uz ?? value.ru ?? '');
  }
  return value;
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang);

  const setLang = useCallback((code) => {
    setLangState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const meta = LANGS.find((l) => l.code === lang);
    document.documentElement.lang = meta?.htmlLang || 'uz';
  }, [lang]);

  const value = useMemo(() => {
    const t = (v) => translate(v, lang);
    return { lang, setLang, t };
  }, [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
