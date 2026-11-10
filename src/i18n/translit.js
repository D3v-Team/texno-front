/**
 * O'zbek kirill → lotin transliteratsiyasi (1995-yilgi rasmiy alifbo, ʻ belgisi bilan).
 * Kontent kirill yozuvida saqlanadi, lotin varianti avtomatik hosil qilinadi.
 */
const MAP = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', ё: 'yo', ж: 'j', з: 'z', и: 'i', й: 'y',
  к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
  ф: 'f', х: 'x', ч: 'ch', ш: 'sh', щ: 'sh', ъ: 'ʼ', ы: 'i', ь: '', э: 'e', ю: 'yu',
  я: 'ya', ў: 'oʻ', қ: 'q', ғ: 'gʻ', ҳ: 'h',
};

const VOWELS = new Set('аеёиоуўэюяaeiou'.split(''));
const isCyr = (ch) => /[Ѐ-ӿ]/.test(ch);
const isLetter = (ch) => !!ch && /[\p{L}]/u.test(ch);
const isUpper = (ch) => !!ch && ch !== ch.toLowerCase() && ch === ch.toUpperCase();

const cache = new Map();

export function toLatin(input) {
  if (!input || typeof input !== 'string') return input;
  const hit = cache.get(input);
  if (hit !== undefined) return hit;

  let out = '';
  const s = input;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (!isCyr(ch)) {
      out += ch;
      continue;
    }
    const lower = ch.toLowerCase();
    const prev = s[i - 1];
    const prevLower = prev ? prev.toLowerCase() : '';
    const atWordStart = !isLetter(prev);
    let rep;

    if (lower === 'е') {
      rep = atWordStart || VOWELS.has(prevLower) || prevLower === 'ъ' || prevLower === 'ь' ? 'ye' : 'e';
    } else if (lower === 'ц') {
      rep = atWordStart ? 's' : 'ts';
    } else {
      rep = MAP[lower];
      if (rep === undefined) rep = ch;
    }

    if (isUpper(ch) && rep) {
      const next = s[i + 1];
      const wordIsCaps = (isUpper(next) && isLetter(next)) || (!isLetter(next) && isUpper(prev) && isLetter(prev));
      if (rep.length > 1 && !wordIsCaps) {
        rep = rep[0].toUpperCase() + rep.slice(1);
      } else {
        rep = rep.toUpperCase();
      }
    }
    out += rep;
  }

  cache.set(input, out);
  return out;
}
