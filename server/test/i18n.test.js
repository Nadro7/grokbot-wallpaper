import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveLang, setLang, t, getLang } from '../../web/lib/i18n.js';

test('resolveLang: query, hash, default', () => {
  assert.equal(resolveLang('?lang=fr', ''), 'fr');
  assert.equal(resolveLang('?lang=en', ''), 'en');
  assert.equal(resolveLang('', '#gbw-abcdef1234567890abcd&lang=fr'), 'fr');
  assert.equal(resolveLang('?foo=1', '#x&lang=en'), 'en');
  // without param: depends on navigator (node usually en-US / undefined → en)
  const d = resolveLang('', '');
  assert.ok(d === 'en' || d === 'fr');
});

test('t: switches with setLang', () => {
  setLang('en');
  assert.equal(t('open_chat'), 'Open chat');
  setLang('fr');
  assert.equal(t('open_chat'), 'Ouvrir le chat');
  assert.equal(t('pending_tasks'), 'Tâches');
  assert.equal(getLang(), 'fr');
});
