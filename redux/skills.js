function xpFn(baseXP, lvl) {
  return Math.floor(baseXP * 1.07 ** (lvl-1));
}

function dmgFn(baseDmg, lvl) {
  return Math.floor(baseDmg * 2 ** (lvl-1));
}

function dpsFn(baseDPS, lvl) {
  return Math.floor(baseDPS * 1.5 ** (lvl-1));
}

export const charge = {
  id: 'charge',
  title: 'Charge',
  xpFn,
  dmgFn,
  dpsFn,
  baseCost: 20,
  baseXP: 20,
  baseDPS: 0,
  baseDmg: 1,
}

export const threaten = {
  id: 'threaten',
  title: 'Threaten',
  xpFn,
  dmgFn,
  dpsFn,
  baseCost: 50,
  baseXP: 50,
  baseDPS: 5,
  baseDmg: 0,
}
