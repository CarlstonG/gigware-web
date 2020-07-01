export function convertDatesToSpans(dates) {
  const spans = [];
  let start, prev = null;

  dates.forEach((date) => {
    date = (new Date(date)).fromUTCTimezone();
    if (!start) {
      start = prev = date;
      return;
    }

    if (date.diffInDays(prev) > 1) {
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
    start: date.start.toUTCTimezone(),
    end: date.end.toUTCTimezone(),
  }));
}
