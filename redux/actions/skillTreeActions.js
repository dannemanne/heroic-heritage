import { ACTIVATE_SKILL, PURCHASE_SKILL } from '../types';

export const activateSkill = (skillId) => ({
  type: ACTIVATE_SKILL,
  skillId,
});

export const purchaseSkill = (skillId) => ({
  type: PURCHASE_SKILL,
  skillId,
});
