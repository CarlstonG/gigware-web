import { isArray, toArray } from "./utils";

export function compareRoles(one, two) {
  one = toArray(one);
  two = toArray(two);

  if (!one || !two || !isArray(one) || !isArray(two)) {
    return false;
  }

  // any of one's roles should be in two
  return one.some(v => two.includes(v))
}
