const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const _LOCAL_TZ_OFFSET = (new Date()).getTimezoneOffset() * 60000;

/**
 * Use this for same time zones or add _LOCAL_TZ_OFFSET to getTime()
 *
 * @param date1
 * @param date2
 */
function diffInDays(date1, date2) {
  return Math.trunc((date1.getTime() - date2.getTime()) / _MS_PER_DAY);
}

/**
 * Restores UTC midnight date
 *
 * @param date
 */
function toLocalTZ(date) {
  return new Date(date.getTime() + _LOCAL_TZ_OFFSET);
}

/**
 * Prepare for storing
 *
 * @param date
 */
function toUTC(date) {
  return new Date(date.getTime() - _LOCAL_TZ_OFFSET);
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function convertDatesToSpans(dates) {
  const spans = [];
  let start, prev = null;

  dates.forEach((date) => {
    date = new Date(date);
    date = toLocalTZ(date);
    if (!start) {
      start = prev = date;
      return;
    }

    if (diffInDays(date, prev) > 1) {
      spans.push({ start: start, end: prev })
      start = date;
    }
    prev = date;
  });

  if (start && (!spans.length || spans[spans.length - 1].start.getTime() !== start.getTime())) {
    spans.push({ start: start, end: prev })
  }

  return spans;
}

/**
 * Get exact dates on backend as user see
 *
 * @param dates
 * @returns {*}
 */
export function datesToUTC(dates) {
  return dates.map(date => ({
    start: toUTC(date.start),
    end: toUTC(date.end),
  }));
}
