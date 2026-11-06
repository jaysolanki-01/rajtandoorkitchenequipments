/**
 * Proportions of the procedural tandoor, derived from the reference photograph.
 * Units are arbitrary scene units (≈ 1 unit = 0.5 m). The product stands on y = 0.
 */
export const DIM = {
  feet: 0.07,
  bodyHeight: 1.9,
  radius: 0.7,
  /** Top of the stainless-steel body. */
  get top() {
    return this.feet + this.bodyHeight;
  },
  /** Radius of the clay-lined opening. */
  openingRadius: 0.45,
  lidRadius: 0.545,
  /** Height of the clay collar above the steel rim. */
  clayRise: 0.022,
  sideHandleY: 1.4,
  emblemY: 1.2,
  emblemSize: 0.54,
} as const;
