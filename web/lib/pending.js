// Neutral pending counters posted on the feed, shown on bot hover (office + face).
// Line: {"pending":{"bot":"<name>","tasks":3,"mails":2,"next_due":"2026-11-05","note":"<max 60, optional>",
//   "items":[{"title":"≤60 chars","url":"https://... or grokbot://..."}]}}  // items optional, max 5
// Only counters and short task titles belong here — no personal content, names of people, or secrets.
import { getLang } from './i18n.js';
import { isAllowedAppUrl } from './openlink.js';

const MAX_ITEMS = 5;
const MAX_TITLE = 60;
const MAX_URL = 2000;

/** @param {unknown} raw */
export function parsePending(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const name = typeof raw.bot === 'string' ? raw.bot.trim().slice(0, 80) : '';
  if (!name) return null;
  const tasks = nonNegInt(raw.tasks);
  const mails = nonNegInt(raw.mails);
  let next_due = null;
  if (typeof raw.next_due === 'string') {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw.next_due.trim());
    if (m) next_due = `${m[1]}-${m[2]}-${m[3]}`;
  }
  const note = typeof raw.note === 'string' ? raw.note.trim().slice(0, MAX_TITLE) : '';
  const items = parsePendingItems(raw.items);
  if (tasks == null && mails == null && !next_due && !note && !items.length) return null;
  return {
    bot: name,
    tasks: tasks ?? 0,
    mails: mails ?? 0,
    next_due,
    ...(note ? { note } : {}),
    ...(items.length ? { items } : {}),
  };
}

/** @param {unknown} raw @returns {{ title: string, url?: string }[]} */
export function parsePendingItems(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const it of raw.slice(0, MAX_ITEMS)) {
    if (!it || typeof it !== 'object' || Array.isArray(it)) continue;
    const title = typeof it.title === 'string' ? it.title.trim().slice(0, MAX_TITLE) : '';
    if (!title) continue;
    let url;
    if (typeof it.url === 'string') {
      const u = it.url.trim().slice(0, MAX_URL);
      if (isAllowedAppUrl(u)) url = u;
    }
    out.push(url ? { title, url } : { title });
  }
  return out;
}

/**
 * Resolve the URL for a pending item: its own url if allowed, else the bot's chat link.
 * @param {{ title?: string, url?: string }|null|undefined} item
 * @param {string|null|undefined} chatUrl
 */
export function resolveItemUrl(item, chatUrl) {
  if (item && isAllowedAppUrl(item.url)) return String(item.url).trim();
  if (isAllowedAppUrl(chatUrl)) return String(chatUrl).trim();
  return null;
}

/** Hover tip: "Tasks: 3 · Pending mail: 2 · Next due: 05/11" (FR when lang is fr). */
export function formatPendingTip(p, lang) {
  if (!p) return '';
  const fr = (lang ?? getLang()) === 'fr';
  const L = fr
    ? { tasks: 'Tâches', mails: 'Mails en attente', due: 'Prochaine échéance', sep: ' : ' }
    : { tasks: 'Tasks', mails: 'Pending mail', due: 'Next due', sep: ': ' };
  const parts = [];
  if (p.tasks != null) parts.push(`${L.tasks}${L.sep}${p.tasks}`);
  if (p.mails != null) parts.push(`${L.mails}${L.sep}${p.mails}`);
  if (p.next_due) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(p.next_due);
    parts.push(`${L.due}${L.sep}${m ? `${m[3]}/${m[2]}` : p.next_due}`);
  }
  return parts.join(' · ');
}

function nonNegInt(v) {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.min(9999, Math.floor(n));
}
