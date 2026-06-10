import type { QcmQuestion } from '../../engine/types';
import { QCM_MATHS } from './qcm_maths';
import { QCM_FRANCAIS } from './qcm_francais';
import { QCM_LOGIQUE } from './qcm_logique';
import { QCM_CODE_ROUTE } from './qcm_code_route';
import { QCM_NOEUDS } from './qcm_noeuds';
import { QCM_PROTOCOLE } from './qcm_protocole';
import { QCM_CULTURE_G } from './qcm_culture_g';

export const QCM_POOLS: Record<string, QcmQuestion[]> = {
  maths: QCM_MATHS,
  francais: QCM_FRANCAIS,
  logique: QCM_LOGIQUE,
  code_route: QCM_CODE_ROUTE,
  noeuds: QCM_NOEUDS,
  protocole: QCM_PROTOCOLE,
  culture_g: QCM_CULTURE_G
};

export { TOC_TOC_SEQUENCE } from './qcm_protocole';
