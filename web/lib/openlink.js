// Open https: / grokbot: links from a real user gesture.
// Prefer a synthetic <a> click (custom schemes often ignore location.href / window.open
// inside iframes and wallpaper hosts such as Lively). Returns { ok, url, scheme }.

const ALLOWED = /^(https:|grokbot:)/i;

/** @param {unknown} url */
export function isAllowedAppUrl(url) {
  return typeof url === 'string' && ALLOWED.test(url.trim()) && url.trim().length <= 2000;
}

/**
 * @param {unknown} url
 * @returns {{ ok: boolean, url?: string, scheme?: string }}
 */
export function openAppLink(url) {
  if (!isAllowedAppUrl(url)) return { ok: false };
  const u = String(url).trim();
  const scheme = /^grokbot:/i.test(u) ? 'grokbot' : 'https';
  const a = document.createElement('a');
  a.href = u;
  a.rel = 'noopener noreferrer';
  if (scheme === 'https') a.target = '_blank';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  return { ok: true, url: u, scheme };
}

/** Copy text; returns whether the clipboard write succeeded. */
export async function copyText(text) {
  const s = String(text ?? '');
  if (!s) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(s);
      return true;
    }
  } catch { /* fall through */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = s;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}
