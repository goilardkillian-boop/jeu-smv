// Catalogue audio. Les fichiers sont attendus dans /public/audio/*.mp3 ;
// en leur absence, l'AudioManager bascule sur une synthèse WebAudio
// discrète pour les effets, et reste silencieux pour la musique.

export const MUSIC_TRACKS = [
  'title', 'sms_notification', 'mission_locale', 'caserne_approach', 'incorporation',
  'fmi_day', 'fmi_night', 'bivouac', 'doubt_crisis', 'protocol_learning',
  'marche_calot', 'ceremony', 'formation', 'permis', 'mission_citoyenne',
  'stage', 'stage_crisis', 'ending_success', 'ending_neutral', 'ending_hard'
] as const;

export const SOUND_EFFECTS = [
  'step_boots_concrete', 'step_boots_mud', 'door_metal', 'crowd_mess_hall',
  'rain_light', 'rain_heavy', 'wind_terrain', 'radio_static',
  'heartbeat_slow', 'heartbeat_fast', 'pixel_blip', 'chime_choice',
  'fanfare_mini', 'fanfare_major', 'notification_sms', 'page_turn',
  'item_pickup', 'item_give', 'relation_up', 'relation_down',
  'gauge_critical', 'qcm_correct', 'qcm_wrong', 'cinematic_whoosh',
  'chapter_title', 'ceremony_clapping'
] as const;

export type MusicTrack = (typeof MUSIC_TRACKS)[number];
export type SoundEffect = (typeof SOUND_EFFECTS)[number];

// ── Musique via YouTube (gratuit, sans clé API) ──────────────
// Le lecteur IFrame YouTube ne nécessite AUCUNE clé. On s'appuie sur des
// radios 24/7 stables et intégrables (vérifiées via oEmbed). Chaque piste
// du jeu est mappée sur une « ambiance » → un flux YouTube.
// Pour changer un flux : remplace simplement l'ID vidéo ci-dessous.

export type MusicMood = 'calm' | 'warm' | 'action' | 'dark';

export const YT_CHANNELS: Record<MusicMood, { videoId: string; label: string }> = {
  // lofi hip hop radio — beats to relax/study to (Lofi Girl)
  calm: { videoId: 'jfKfPfyJRdk', label: 'Lofi Girl — lofi radio' },
  // Chillhop Radio - jazzy & lofi hip hop beats (Chillhop Music)
  warm: { videoId: '5yx6BWlEVcY', label: 'Chillhop — jazzy beats' },
  // synthwave radio — beats to chill/game to (Lofi Girl)
  action: { videoId: '4xDzrJKXOOY', label: 'Lofi Girl — synthwave' },
  // dark ambient radio — music to escape/dream to (Lofi Girl)
  dark: { videoId: 'S_MOd40zlYU', label: 'Lofi Girl — dark ambient' }
};

export const TRACK_TO_MOOD: Record<string, MusicMood> = {
  title: 'calm',
  sms_notification: 'calm',
  mission_locale: 'calm',
  caserne_approach: 'dark',
  incorporation: 'calm',
  fmi_day: 'action',
  fmi_night: 'dark',
  bivouac: 'warm',
  doubt_crisis: 'dark',
  protocol_learning: 'calm',
  marche_calot: 'action',
  ceremony: 'warm',
  formation: 'calm',
  permis: 'calm',
  mission_citoyenne: 'warm',
  stage: 'calm',
  stage_crisis: 'dark',
  ending_success: 'warm',
  ending_neutral: 'calm',
  ending_hard: 'dark'
};

// Fréquences des bips de synthèse (fallback sans assets)
export const SYNTH_NOTES: Partial<Record<string, [number, number]>> = {
  chime_choice: [660, 0.08],
  pixel_blip: [880, 0.05],
  notification_sms: [1040, 0.12],
  qcm_correct: [780, 0.15],
  qcm_wrong: [220, 0.2],
  relation_up: [620, 0.1],
  relation_down: [300, 0.12],
  item_pickup: [520, 0.1],
  fanfare_mini: [700, 0.25],
  fanfare_major: [840, 0.4],
  gauge_critical: [180, 0.3],
  door_metal: [140, 0.15],
  page_turn: [400, 0.06]
};
