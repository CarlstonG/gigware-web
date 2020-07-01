import Vue from "vue";
import VCalendar from 'v-calendar'
import VueCropper from 'vue-cropperjs'
import * as VueSVGIcon from 'vue-svgicon'
import vueSmoothScroll from 'vue2-smooth-scroll'
import UtcDatePicker from "@/core/components/forms/UtcDatePicker";

import '@/core/icons/index'
import 'cropperjs/dist/cropper.css'

Vue.use(VueSVGIcon, {
  tagName: 'svg-icon',
  classPrefix: 'gigwire',
  isOriginalDefault: true,
})

Vue.use(VCalendar)
Vue.component('VueCropper', VueCropper)

Vue.use(vueSmoothScroll)

Vue.component('UtcDatePicker', UtcDatePicker)
