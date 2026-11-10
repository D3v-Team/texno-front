/**
 * Netlify "submission-created" hodisasi — har bir yangi forma arizasidan keyin avtomatik ishga tushadi.
 * Arizani Telegram guruh/kanalga yuboradi.
 *
 * Sozlash (Netlify → Site configuration → Environment variables):
 *   TELEGRAM_BOT_TOKEN — @BotFather dan olingan bot tokeni
 *   TELEGRAM_CHAT_ID   — guruh yoki kanal ID si (masalan: -1001234567890)
 * O'zgaruvchilar berilmasa, funksiya hech narsa qilmaydi (arizalar baribir Netlify Forms'da saqlanadi).
 */

const TITLES = {
  'biznes-muammo': '🏭 Yangi BIZNES MUAMMOSI',
  'yechim-taklifi': '💡 Muammoga YECHIM TAKLIFI',
  'startap-ariza': '🚀 Yangi STARTAP arizasi',
  'xona-bron': '📅 Xona BRON soʻrovi',
  'investor-ariza': '🤝 Yangi INVESTOR',
  aloqa: '✉️ Yangi xabar',
};

const LABELS = {
  company: 'Korxona', sector: 'Soha', district: 'Hudud', size: 'Xodimlar', title: 'Muammo', description: 'Tavsif',
  problem_types: 'Muammo turi', problem_age: 'Qachondan beri', attempts: 'Avval sinalgan', expected: 'Kutilgan natija',
  budget: 'Byudjet', urgency: 'Muddat', pilot: 'Pilotga tayyor', publish: 'Birjada eʼlon', nda: 'NDA kerak',
  solution_interest: 'Qiziqqan yechim', challenge: 'Muammo', solver_type: 'Taklif beruvchi', team: 'Jamoa', idea: 'Yechim',
  experience: 'Tajriba', project: 'Loyiha', stage: 'Bosqich', program: 'Dastur', team_size: 'Jamoa soni',
  problem: 'Muammo', solution: 'Yechim', link: 'Havola', age: 'Yoshi', self_score: 'Oʻz-oʻzini baholash',
  room: 'Xona', date: 'Sana', slot: 'Vaqt', people: 'Qatnashchilar', who: 'Maqomi', purpose: 'Maqsad',
  inv_type: 'Investor turi', organization: 'Tashkilot', ticket: 'Sarmoya hajmi', sectors: 'Sohalar', comment: 'Izoh',
  topic: 'Mavzu', subject: 'Mavzu nomi', message: 'Xabar', name: 'Ism', position: 'Lavozim', phone: 'Telefon',
  email: 'E-mail', telegram: 'Telegram', contact_method: 'Aloqa usuli', lang: 'Til',
};

const SKIP = new Set(['bot-field', 'form-name', 'consent', 'page', 'request_id', 'ip', 'user_agent', 'referrer']);

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

export const handler = async (event) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { statusCode: 200, body: 'telegram not configured' };

  let payload;
  try {
    payload = JSON.parse(event.body).payload;
  } catch {
    return { statusCode: 400, body: 'bad payload' };
  }

  const form = payload.form_name || payload.data?.['form-name'] || 'forma';
  const data = payload.data || {};
  const lines = [`<b>${esc(TITLES[form] || form)}</b>`];
  if (data.request_id) lines.push(`№ <code>${esc(data.request_id)}</code>`);
  lines.push('');

  for (const [key, value] of Object.entries(data)) {
    if (SKIP.has(key) || value == null || value === '') continue;
    if (typeof value === 'object') {
      if (value.url) lines.push(`<b>Fayl:</b> ${esc(value.url)}`);
      continue;
    }
    const text = String(value);
    lines.push(`<b>${esc(LABELS[key] || key)}:</b> ${esc(text.length > 900 ? text.slice(0, 900) + '…' : text)}`);
  }
  if (payload.created_at) lines.push('', `🕒 ${esc(new Date(payload.created_at).toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' }))}`);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: lines.join('\n').slice(0, 4000), parse_mode: 'HTML', disable_web_page_preview: true }),
    });
    if (!res.ok) console.error('Telegram error', res.status, await res.text());
  } catch (err) {
    console.error('Telegram request failed', err);
  }
  return { statusCode: 200, body: 'ok' };
};
