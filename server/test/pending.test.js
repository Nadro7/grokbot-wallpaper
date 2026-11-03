import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePending, formatPendingTip } from '../../web/lib/pending.js';
import { setLang } from '../../web/lib/i18n.js';

test('parsePending: keeps last-shape fields, clamps, drops empty', () => {
  assert.equal(parsePending(null), null);
  assert.equal(parsePending({}), null);
  assert.equal(parsePending({ bot: '  ' }), null);
  const p = parsePending({
    bot: ' X Writer ',
    tasks: 3.9,
    mails: '2',
    next_due: '2026-11-05',
    note: 'x'.repeat(80),
  });
  assert.deepEqual(p, {
    bot: 'X Writer',
    tasks: 3,
    mails: 2,
    next_due: '2026-11-05',
    note: 'x'.repeat(60),
  });
  assert.equal(parsePending({ bot: 'A', tasks: 1, next_due: '05/11/2026' }).next_due, null);
  assert.equal(parsePending({ bot: 'A', tasks: -1, mails: -2 }), null);
  assert.deepEqual(parsePending({ bot: 'A', tasks: 0, mails: 0 }), {
    bot: 'A', tasks: 0, mails: 0, next_due: null,
  });
});

test('formatPendingTip: English by default, French when lang=fr', () => {
  setLang('en');
  const p = { bot: 'X', tasks: 3, mails: 2, next_due: '2026-11-05' };
  assert.equal(formatPendingTip(p, 'en'), 'Tasks: 3 · Pending mail: 2 · Next due: 05/11');
  assert.equal(formatPendingTip(p, 'fr'), 'Tâches : 3 · Mails en attente : 2 · Prochaine échéance : 05/11');
  setLang('fr');
  assert.equal(formatPendingTip(p), 'Tâches : 3 · Mails en attente : 2 · Prochaine échéance : 05/11');
  assert.equal(formatPendingTip(null, 'en'), '');
  assert.equal(formatPendingTip({ bot: 'X', tasks: 1, mails: 0, next_due: null }, 'en'), 'Tasks: 1 · Pending mail: 0');
});
