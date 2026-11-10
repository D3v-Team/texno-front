/**
 * Formalarni yuborish — Netlify Forms orqali (backend kerak emas).
 *
 * • Har bir forma nomi index.html dagi yashirin <form data-netlify="true"> bilan mos bo'lishi shart.
 * • Arizalar Netlify paneli → Forms bo'limida ko'rinadi, e-mail xabarnoma yoqish mumkin.
 * • netlify/functions/submission-created.js — har bir arizani Telegram guruhga yuboradi
 *   (TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID muhit o'zgaruvchilari berilsa).
 */

export const FORM_NAMES = {
  business: 'biznes-muammo',
  solution: 'yechim-taklifi',
  startup: 'startap-ariza',
  booking: 'xona-bron',
  investor: 'investor-ariza',
  contact: 'aloqa',
};

const PREFIX = {
  'biznes-muammo': 'BIZ',
  'yechim-taklifi': 'SOL',
  'startap-ariza': 'STR',
  'xona-bron': 'BRN',
  'investor-ariza': 'INV',
  aloqa: 'MSG',
};

/** Ariza raqami: BIZ-2611-4821 */
export function makeRequestId(formName) {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `${PREFIX[formName] || 'REQ'}-${yy}${mm}-${rnd}`;
}

/**
 * @param {string} formName
 * @param {Record<string, any>} data  — qiymatlar: string | string[] | boolean | File
 * @returns {Promise<{ok: true, id: string}>}
 */
export async function submitForm(formName, data) {
  const id = data.request_id || makeRequestId(formName);
  const fd = new FormData();
  fd.append('form-name', formName);
  fd.append('request_id', id);
  fd.append('page', typeof window !== 'undefined' ? window.location.pathname : '');

  let hasFile = false;
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'request_id' || value == null || value === '') return;
    if (value instanceof File) {
      hasFile = true;
      fd.append(key, value);
    } else if (Array.isArray(value)) {
      fd.append(key, value.join(', '));
    } else if (typeof value === 'boolean') {
      fd.append(key, value ? 'ha' : 'yoʻq');
    } else {
      fd.append(key, String(value));
    }
  });

  // Lokal ishlab chiqishda Netlify yo'q — muvaffaqiyatni simulyatsiya qilamiz
  if (import.meta.env.DEV) {
    console.info(`[dev] "${formName}" formasi yuborildi:`, Object.fromEntries(fd.entries()));
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, id };
  }

  const init = hasFile
    ? { method: 'POST', body: fd }
    : {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(fd).toString(),
      };

  const res = await fetch('/', init);
  if (!res.ok) throw new Error(`Form submit failed: ${res.status}`);
  return { ok: true, id };
}

/** +998 XX XXX XX XX formatlash */
export function formatPhone(raw) {
  let digits = String(raw || '').replace(/\D/g, '');
  if (digits.startsWith('998')) digits = digits.slice(3);
  digits = digits.slice(0, 9);
  const p = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)].filter(Boolean);
  return '+998' + (p.length ? ' ' + p.join(' ') : ' ');
}

export function isPhoneValid(v) {
  return String(v || '').replace(/\D/g, '').length === 12;
}

export function isEmailValid(v) {
  return !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

/** LocalStorage — faqat qulaylik uchun (qoralama), xatolarga chidamli */
export const draft = {
  load(key) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  save(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  },
  clear(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};
