import { PRESET_MAYA } from './preset_maya';
import { PRESET_THEO } from './preset_theo';
import { PRESET_SARA } from './preset_sara';
import { PRESET_KYLIAN } from './preset_kylian';
import { PRESET_NOAH } from './preset_noah';
import { PRESET_LENA } from './preset_lena';
import { PRESET_RACHID } from './preset_rachid';
import { PRESET_JADE } from './preset_jade';
import type { Preset } from '../../engine/types';

export const PRESETS: Preset[] = [
  PRESET_MAYA,
  PRESET_THEO,
  PRESET_SARA,
  PRESET_KYLIAN,
  PRESET_NOAH,
  PRESET_LENA,
  PRESET_RACHID,
  PRESET_JADE
];

export const presetById = (id: string) => PRESETS.find((p) => p.id === id);
