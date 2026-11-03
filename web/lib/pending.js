// Neutral pending counters posted on the feed, shown on bot hover (office + face).
// Line: {"pending":{"bot":"<name>","tasks":3,"mails":2,"next_due":"2026-11-05","note":"<max 60, optional>"}}
// Only counters belong here — no personal content, names of people, or secrets.
import { getLang } from './i18n.js';

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
  const note = typeof raw.note === 'string' ? raw.note.trim().slice(0, 60) : '';
  if (tasks == null && mails == null && !next_due && !note) return null;
  return {
    bot: name,
    tasks: tasks ?? 0,
    mails: mails ?? 0,
    next_due,
    ...(note ? { note } : {}),
  };
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
