import Vue from "vue";

Vue.filter('bgImage', function (value) {
  return 'background-image: url(' + value + ');';
})
