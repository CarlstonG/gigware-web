import Vue from "vue";
import VCalendar from 'v-calendar'
import VueCropper from 'vue-cropperjs'
import * as VueSVGIcon from 'vue-svgicon'

import '@/core/icons/index'
import 'cropperjs/dist/cropper.css'

Vue.use(VueSVGIcon, {
  tagName: 'svg-icon',
  classPrefix: 'gigwire',
  isOriginalDefault: true,
})

Vue.use(VCalendar)
Vue.component('VueCropper', VueCropper)
