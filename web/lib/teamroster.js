// Static fallback roster for when the live channel is empty (ntfy keeps ~12 hours).
// Face and the 3D office both load ../data/team-roster.json (published at /data/ on Pages).
export async function fetchTeamRoster(url = '../data/team-roster.json') {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data && typeof data === 'object' && !Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

/** Payload objects the feed already understands: roster, chat, looks, groups. */
export function rosterMessages(data) {
  if (!data) return [];
  const out = [];
  if (Array.isArray(data.roster) && data.roster.length) out.push({ roster: data.roster });
  if (isMap(data.chat)) out.push({ chat: data.chat });
  if (isMap(data.looks)) out.push({ looks: data.looks });
  if (isMap(data.groups)) out.push({ groups: data.groups });
  return out;
}

function isMap(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }
