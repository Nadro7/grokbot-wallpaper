// UI language: FR or EN. Resolve once at load from ?lang= / #…&lang= / navigator.language.
// Usage: import { lang, t, resolveLang, setLang } from './i18n.js'; then t('open_chat').

const DICT = {
  en: {
    // statuses (short / chip / counter words)
    st_working: 'working', st_idle: 'resting', st_waiting_user: 'waiting for you',
    st_error: 'error', st_stuck: 'stuck', st_done: 'done',
    chip_working: 'Working', chip_idle: 'Resting', chip_waiting_user: 'Waiting for you',
    chip_error: 'Error', chip_stuck: 'Stuck', chip_done: 'Done',
    w_working: 'working', w_waiting: 'waiting', w_error: 'error', w_errors: 'errors',
    w_stuck: 'stuck', w_resting: 'resting', w_done: 'done',
    // top / chrome
    brand: 'Grok Bot Dashboard', bot_statuses: 'Bot statuses',
    week: 'Week', day: 'Day', month: 'Month', limit: 'Limit',
    usage_week: 'Usage this week', usage_day: 'Usage today', usage_month: 'Usage this month', usage: 'Usage',
    usage_limit: 'Usage limit', demo_title: 'Demo data, not real bots',
    share: 'Share', share_office: 'Share an image of your office', share_dialog: 'Share your office',
    floors: 'Floors', floors_aria: 'Floors', office_aria: 'Office', activity: 'Activity',
    activity_feed: 'Activity feed', activity_panel: 'Bot card and floor team',
    floor_team: 'Floor team', bot_card: 'Bot card', scene_zoom: 'Scene zoom',
    zoom_in: 'Zoom in', zoom_out: 'Zoom out',
    working: 'working', waiting: 'waiting', errors: 'errors', error: 'error',
    nobody_here: 'Nobody here yet. A bot shows up when it logs its first step.',
    close_card: 'Close bot card', close_esc: 'Close (Esc)',
    task: 'Task', recent_steps: 'Recent steps', open_chat: 'Open chat',
    no_chat: 'No chat link yet', usage_share: 'Share of total usage',
    no_events: 'No events yet.',
    hide_camera: 'Hide this panel for the camera', hide_for_camera: 'Hide for the camera',
    show_panel: 'Show this panel', show: 'Show',
    dock_aria: 'Waiting on me, finished work and routines',
    dock_check: 'Status check', dock_waiting: 'Waiting on me', dock_finished: 'Finished', dock_routines: 'Routines',
    nothing_waiting: 'Nothing is waiting on you.',
    nothing_finished: 'Nothing finished in the last 24 hours.',
    no_routines: 'No routines scheduled.',
    expand_panel: 'Expand panel', collapse_panel: 'Collapse panel', floor_panel: 'Floor panel',
    resets_in: 'resets in ', resetting_now: 'resetting now', updated_at: 'Updated at ',
    no_floor: 'No floor selected', pick_floor_above: 'Pick a floor above', pick_floor_left: 'Pick a floor on the left',
    bot: 'bot', bots: 'bots', step: 'step', steps: 'steps', task_one: 'task', tasks: 'tasks',
    no_status_yet: 'No status line yet', last_status: 'Last status line ',
    went_quiet: 'Went quiet after: ', a_task: 'a task',
    no_step_data: 'No data on the current step', no_steps_yet: 'No steps yet.',
    every_answered: 'Every bot answered.',
    check_late: 'Ask the bots that did not answer to re-read their instructions, or run the setup again.',
    check_started: 'Started ', check_started_tail: '. Each bot ticks off when its own status line arrives.',
    no_answer: 'no answer', waiting_ellipsis: 'waiting…',
    copied_chat: 'Copied — paste it in the chat',
    could_not_copy: 'Could not copy — send: ',
    turn_off: 'Turn off',
    turn_off_title: 'Copies "pause routine {name}" and opens the chat',
    no_date: 'no date',
    stuck_word: 'stuck',
    under_a_minute: 'under a minute',
    just_now: 'just now', min_ago: ' min ago', h_ago: ' h ago', d_ago: ' d ago',
    ago_prefix: '',
    due_now: 'due now', in_prefix: 'in ',
    worked_unreported: 'Worked (unreported)', never_reported: 'never reported', seen_prefix: 'seen ',
    pending_tasks: 'Tasks', pending_mails: 'Pending mail', pending_due: 'Next due', pending_sep: ': ',
    // face
    face_all_bots: 'All bots', face_limit: 'limit', face_limit_title: 'Weekly usage limit',
    face_waiting_for_you: 'waiting for you', face_resting: 'resting',
    face_needs_reply: 'needs your reply', face_stuck_look: 'stuck, take a look',
    // share
    share_ellipsis: 'Share…', copy_image: 'Copy image', download: 'Download', post_on_x: 'Post on X',
    share_note_mac: 'Post on X copies the image: paste it with ⌘V.',
    share_note_win: 'Post on X copies the image: paste it with Ctrl V.',
    copied_paste: 'Copied. Paste it anywhere.',
    copy_blocked: 'Copying is blocked here. Use Download instead.',
    image_copied_mac: 'Image copied. In the post, paste it with ⌘V.',
    image_copied_win: 'Image copied. In the post, paste it with Ctrl V.',
    download_then_post: 'Download the image, then add it to your post.',
    share_failed: 'Sharing did not work here. Use Download instead.',
    close: 'Close', framing: 'Framing your office…', still_loading: 'The office is still loading. Try again in a moment.',
    your_office_alt: 'Your office, ready to post',
  },
  fr: {
    st_working: 'au travail', st_idle: 'au repos', st_waiting_user: 'en attente de vous',
    st_error: 'erreur', st_stuck: 'bloqué', st_done: 'terminé',
    chip_working: 'Au travail', chip_idle: 'Au repos', chip_waiting_user: 'En attente de vous',
    chip_error: 'Erreur', chip_stuck: 'Bloqué', chip_done: 'Terminé',
    w_working: 'au travail', w_waiting: 'en attente', w_error: 'erreur', w_errors: 'erreurs',
    w_stuck: 'bloqué', w_resting: 'au repos', w_done: 'terminé',
    brand: 'Tableau de bord Grok Bot', bot_statuses: 'États des bots',
    week: 'Semaine', day: 'Jour', month: 'Mois', limit: 'Limite',
    usage_week: 'Usage cette semaine', usage_day: 'Usage aujourd’hui', usage_month: 'Usage ce mois', usage: 'Usage',
    usage_limit: 'Limite d’usage', demo_title: 'Données de démo, pas de vrais bots',
    share: 'Partager', share_office: 'Partager une image de votre bureau', share_dialog: 'Partager votre bureau',
    floors: 'Étages', floors_aria: 'Étages', office_aria: 'Bureau', activity: 'Activité',
    activity_feed: 'Fil d’activité', activity_panel: 'Fiche bot et équipe de l’étage',
    floor_team: 'Équipe de l’étage', bot_card: 'Fiche bot', scene_zoom: 'Zoom de la scène',
    zoom_in: 'Zoom avant', zoom_out: 'Zoom arrière',
    working: 'au travail', waiting: 'en attente', errors: 'erreurs', error: 'erreur',
    nobody_here: 'Personne ici pour l’instant. Un bot apparaît à son premier pas.',
    close_card: 'Fermer la fiche bot', close_esc: 'Fermer (Échap)',
    task: 'Tâche', recent_steps: 'Pas récents', open_chat: 'Ouvrir le chat',
    no_chat: 'Pas encore de lien de chat', usage_share: 'Part de l’usage total',
    no_events: 'Aucun événement pour l’instant.',
    hide_camera: 'Masquer ce panneau pour la caméra', hide_for_camera: 'Masquer pour la caméra',
    show_panel: 'Afficher ce panneau', show: 'Afficher',
    dock_aria: 'En attente de vous, travaux terminés et routines',
    dock_check: 'Vérification', dock_waiting: 'En attente de vous', dock_finished: 'Terminés', dock_routines: 'Routines',
    nothing_waiting: 'Rien n’attend votre réponse.',
    nothing_finished: 'Rien de terminé ces dernières 24 heures.',
    no_routines: 'Aucune routine planifiée.',
    expand_panel: 'Déplier le panneau', collapse_panel: 'Replier le panneau', floor_panel: 'Panneau d’étage',
    resets_in: 'réinitialisation dans ', resetting_now: 'réinitialisation…', updated_at: 'Mis à jour à ',
    no_floor: 'Aucun étage sélectionné', pick_floor_above: 'Choisissez un étage ci-dessus', pick_floor_left: 'Choisissez un étage à gauche',
    bot: 'bot', bots: 'bots', step: 'pas', steps: 'pas', task_one: 'tâche', tasks: 'tâches',
    no_status_yet: 'Aucune ligne de statut encore', last_status: 'Dernière ligne de statut ',
    went_quiet: 'S’est tu après : ', a_task: 'une tâche',
    no_step_data: 'Pas d’info sur l’étape en cours', no_steps_yet: 'Aucun pas pour l’instant.',
    every_answered: 'Tous les bots ont répondu.',
    check_late: 'Demandez aux bots silencieux de relire leurs instructions, ou relancez l’installation.',
    check_started: 'Démarré à ', check_started_tail: '. Chaque bot se coche quand sa propre ligne de statut arrive.',
    no_answer: 'pas de réponse', waiting_ellipsis: 'en attente…',
    copied_chat: 'Copié — collez-le dans le chat',
    could_not_copy: 'Impossible de copier — envoyez : ',
    turn_off: 'Désactiver',
    turn_off_title: 'Copie « pause routine {name} » et ouvre le chat',
    no_date: 'pas de date',
    stuck_word: 'bloqué',
    under_a_minute: 'moins d’une minute',
    just_now: 'à l’instant', min_ago: ' min', h_ago: ' h', d_ago: ' j',
    // French often omits "ago"; we keep a short form: "il y a X min" via prefix
    ago_prefix: 'il y a ',
    due_now: 'échéance maintenant', in_prefix: 'dans ',
    worked_unreported: 'A travaillé (non signalé)', never_reported: 'jamais signalé', seen_prefix: 'vu ',
    pending_tasks: 'Tâches', pending_mails: 'Mails en attente', pending_due: 'Prochaine échéance', pending_sep: ' : ',
    face_all_bots: 'Tous les bots', face_limit: 'limite', face_limit_title: 'Limite d’usage hebdomadaire',
    face_waiting_for_you: 'en attente de vous', face_resting: 'au repos',
    face_needs_reply: 'attend votre réponse', face_stuck_look: 'bloqué, jetez un œil',
    share_ellipsis: 'Partager…', copy_image: 'Copier l’image', download: 'Télécharger', post_on_x: 'Poster sur X',
    share_note_mac: 'Poster sur X copie l’image : collez-la avec ⌘V.',
    share_note_win: 'Poster sur X copie l’image : collez-la avec Ctrl V.',
    copied_paste: 'Copié. Collez-la où vous voulez.',
    copy_blocked: 'La copie est bloquée ici. Utilisez Télécharger.',
    image_copied_mac: 'Image copiée. Dans le post, collez-la avec ⌘V.',
    image_copied_win: 'Image copiée. Dans le post, collez-la avec Ctrl V.',
    download_then_post: 'Téléchargez l’image, puis ajoutez-la à votre post.',
    share_failed: 'Le partage n’a pas fonctionné ici. Utilisez Télécharger.',
    close: 'Fermer', framing: 'Cadre de votre bureau…', still_loading: 'Le bureau charge encore. Réessayez dans un instant.',
    your_office_alt: 'Votre bureau, prêt à publier',
  },
};

let _lang = 'en';

/** From ?lang= / hash &lang= / navigator. Default FR when the browser is French. */
export function resolveLang(search = '', hash = '') {
  const fromParam = (raw) => {
    try {
      const q = new URLSearchParams(String(raw || '').replace(/^[?#]/, ''));
      // also accept ...#topic&lang=fr (hash is not a query string)
      const m = /(?:^|[?&#])lang=(fr|en)\b/i.exec(String(raw || ''));
      if (m) return m[1].toLowerCase();
      const v = (q.get('lang') || '').toLowerCase();
      if (v === 'fr' || v === 'en') return v;
    } catch { /* ignore */ }
    return null;
  };
  return fromParam(search) || fromParam(hash) || (/^fr\b/i.test((typeof navigator !== 'undefined' && navigator.language) || '') ? 'fr' : 'en');
}

export function setLang(code) {
  _lang = code === 'fr' ? 'fr' : 'en';
  try { document.documentElement.lang = _lang; } catch { /* non-DOM */ }
  return _lang;
}

export function getLang() { return _lang; }
export const lang = () => _lang; // alias

/** Translate a key; `{name}` placeholders are replaced from vars. Falls back to English then the key. */
export function t(key, vars) {
  const d = DICT[_lang] || DICT.en;
  let s = d[key] ?? DICT.en[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}

export function statusLabel(s) {
  return t(`st_${s}`) !== `st_${s}` ? t(`st_${s}`) : (s || '');
}

export function statusChip(s) {
  return t(`chip_${s}`) !== `chip_${s}` ? t(`chip_${s}`) : statusLabel(s);
}

export function statusWord(s, n) {
  if (s === 'waiting_user') return t('w_waiting');
  if (s === 'error') return n === 1 ? t('w_error') : t('w_errors');
  if (s === 'working') return t('w_working');
  if (s === 'idle') return t('w_resting');
  if (s === 'stuck') return t('w_stuck');
  if (s === 'done') return t('w_done');
  return statusLabel(s);
}

export function weekdayShort(i) {
  const en = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fr = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
  return (_lang === 'fr' ? fr : en)[i] || '';
}

export { DICT };
