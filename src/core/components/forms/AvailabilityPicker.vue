<template>
  <v-date-picker
      ref="el"
      mode="range"
      is-expanded
      is-inline
      :columns="columns"
      :min-date="minDate"
      :attributes="attrs"
      v-bind="$attrs"
      v-bind:value="selectValue"
      v-on:input="onInput"
  />
</template>
<style scoped lang="scss" src="./AvailabilityPicker.scss"></style>

<script>
  export default {
    name: "AvailabilityPicker",
    inheritAttrs: false,
    props: {
      value: {
        default: null
      },
    },
    data() {
      return {
        selectValue: {},
        attrs: [{
          highlight: {}, // does not work without this
          dates: this.value
        }]
      }
    },
    methods: {
      onInput(e) {
        if (!e || e.start === undefined) return;

        let merged = false;
        const obj = this.attrs[0].dates;
        let index = 0;
        let selectedRange = e;

        while (index < obj.length) {
          const dateSpan = this._newDateSpanFromIntersection(obj[index], selectedRange);
          if (dateSpan) {
            obj.splice(index, 1);
            selectedRange = dateSpan;
            if (!obj.some(date => date.start.getTime() === selectedRange.start.getTime() && date.end.getTime() === selectedRange.end.getTime())) {
              obj.unshift(selectedRange);
              index++;
            }
            merged = true;
          } else {
            index++;
          }
        }

        if (!merged && !obj.some(date => date.start.getTime() === selectedRange.start.getTime() && date.end.getTime() === selectedRange.end.getTime())) {
          this.attrs[0].dates.unshift(selectedRange);
        }

        this.$emit('input', this.attrs[0].dates)
        this.selectValue = {};
        this.$refs.el.$el.blur();
      },
      /**
       * Returns a new date interval.
       * If intervals are connected to each other without intersection it merges them,
       * if they intersect each other it returns the second one.
       *
       * Params should have the same day time.
       * @param dateSpan1
       * @param dateSpan2
       * @private
       */
      _newDateSpanFromIntersection(dateSpan1, dateSpan2) {
        dateSpan1 = this._toDateSpan(dateSpan1);
        dateSpan2 = this._toDateSpan(dateSpan2);

        const dateSpan2Ext = { start: dateSpan2.start.addDays(-1), end: dateSpan2.end.addDays(+1) }

        /* --1---2-- */
        if (this._lessOrEqualDates(dateSpan1.start, dateSpan2Ext.start) && this._greaterOrEqualDates(dateSpan1.end, dateSpan2Ext.start)) {
          if (this._equalDates(dateSpan1.end, dateSpan2Ext.start)) {
            return { start: dateSpan1.start, end: dateSpan2.end };
          } else {
            return dateSpan2;
          }
        }
        /* --2---1-- */
        else if (this._lessOrEqualDates(dateSpan2Ext.start, dateSpan1.start) && this._greaterOrEqualDates(dateSpan2Ext.end, dateSpan1.start)) {
          if (this._equalDates(dateSpan2Ext.end, dateSpan1.start)) {
            return { start: dateSpan2.start, end: dateSpan1.end };
          } else {
            return dateSpan2;
          }
        }

        return null;
      },
      _toDateSpan(date) {
        if (date instanceof Date) {
          return { start: date, end: this.date };
        }

        // set correct order
        if (date.start.getTime() > date.end.getTime()) {
          return { start: date.end, end: date.start };
        }

        return date;
      },
      _equalDates(date1, date2) {
        return date1.getTime() === date2.getTime()
      },
      _lessOrEqualDates(date1, date2) {
        return date1.getTime() <= date2.getTime()
      },
      _greaterOrEqualDates(date1, date2) {
        return date1.getTime() >= date2.getTime()
      }
    },
    computed: {
      columns() {
        return this.$attrs.columns || this.$root.$screens({ default: 1, lg: 3 })
      },
      minDate() {
        return this.$attrs.minDate || new Date()
      },
    },
  }
</script>
