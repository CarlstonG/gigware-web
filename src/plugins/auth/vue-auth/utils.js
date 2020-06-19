export function isObject(val) {
  return (val !== null && typeof val === 'object' && val.constructor !== Array);
}

export function isArray(val) {
  return val.constructor === Array;
}

export function toArray(val) {
  return typeof val === 'string' || typeof val === 'number' ? [val] : val;
}
