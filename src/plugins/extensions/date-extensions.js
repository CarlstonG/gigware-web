const _MS_PER_DAY = 1000 * 60 * 60 * 24;
const _LOCAL_TZ_OFFSET = (new Date()).getTimezoneOffset() * 60000;

/**
 * Use this for same time zones or add _LOCAL_TZ_OFFSET to getTime()
 *
 * @param date
 */
Date.prototype.diffInDays = function (date) {
  return Math.trunc((this.getTime() - date.getTime()) / _MS_PER_DAY);
}

Date.prototype.toUTCTimezone = function () {
  return new Date(this.getTime() - _LOCAL_TZ_OFFSET);
}

Date.prototype.fromUTCTimezone = function () {
  return new Date(this.getTime() + _LOCAL_TZ_OFFSET);
}


Date.prototype.addDays = (days) => {
  const result = new Date(this);
  result.setDate(result.getDate() + days);
  return result;
}
