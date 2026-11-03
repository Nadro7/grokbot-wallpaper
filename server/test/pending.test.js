import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePending, formatPendingTip, parsePendingItems, resolveItemUrl } from '../../web/lib/pending.js';
import { isAllowedAppUrl, openAppLink } from '../../web/lib/openlink.js';
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

test('parsePending items: max 5, title clamp, only https/grokbot urls kept', () => {
  const p = parsePending({
    bot: 'Jarvis',
    tasks: 2,
    items: [
      { title: '  Draft reply  ', url: 'https://mail.google.com/mail/u/0/#inbox/Abc' },
      { title: 'Open chat', url: 'grokbot://app/v1/agent?id=abc' },
      { title: 'Bad scheme', url: 'javascript:alert(1)' },
      { title: 'No url' },
      { title: 'x'.repeat(80), url: 'https://calendar.google.com/calendar/u/0/r' },
      { title: 'Sixth ignored', url: 'https://docs.google.com/document/d/1' },
      { title: '  ' },
    ],
  });
  assert.equal(p.items.length, 5);
  assert.deepEqual(p.items[0], { title: 'Draft reply', url: 'https://mail.google.com/mail/u/0/#inbox/Abc' });
  assert.deepEqual(p.items[1], { title: 'Open chat', url: 'grokbot://app/v1/agent?id=abc' });
  assert.deepEqual(p.items[2], { title: 'Bad scheme' }); // url dropped
  assert.deepEqual(p.items[3], { title: 'No url' });
  assert.equal(p.items[4].title.length, 60);
  assert.equal(p.items[4].url, 'https://calendar.google.com/calendar/u/0/r');
  // items alone are enough
  const only = parsePending({ bot: 'A', items: [{ title: 'One', url: 'https://drive.google.com/file/d/1' }] });
  assert.equal(only.tasks, 0);
  assert.equal(only.items.length, 1);
});

test('resolveItemUrl: falls back to chat when item url missing or unsafe', () => {
  const chat = 'grokbot://app/v1/agent?id=x';
  assert.equal(resolveItemUrl({ title: 'A', url: 'https://mail.google.com/x' }, chat), 'https://mail.google.com/x');
  assert.equal(resolveItemUrl({ title: 'A' }, chat), chat);
  assert.equal(resolveItemUrl({ title: 'A', url: 'ftp://x' }, chat), chat);
  assert.equal(resolveItemUrl({ title: 'A' }, 'javascript:1'), null);
  assert.equal(parsePendingItems(null).length, 0);
});

test('isAllowedAppUrl / openAppLink: only https and grokbot', () => {
  assert.equal(isAllowedAppUrl('https://mail.google.com/'), true);
  assert.equal(isAllowedAppUrl('grokbot://app/v1/agent?id=1'), true);
  assert.equal(isAllowedAppUrl('http://example.com'), false);
  assert.equal(isAllowedAppUrl('javascript:alert(1)'), false);
  // jsdom-less: openAppLink still builds an <a> when document exists
  if (typeof document !== 'undefined') {
    const r = openAppLink('grokbot://app/v1/agent?id=1');
    assert.equal(r.ok, true);
    assert.equal(r.scheme, 'grokbot');
  } else {
    assert.equal(openAppLink('not-a-url').ok, false);
  }
});
