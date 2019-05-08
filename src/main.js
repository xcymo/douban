// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueResource from 'vue-resource'
import $ from 'jquery';
import VueJsonp from 'vue-jsonp';
Vue.config.productionTip = false
Vue.use(ElementUI, VueAxios, axios, VueResource, VueJsonp);
Vue.prototype.HOST = '/api/hotMovie';
window.onresize = setHtmlFontSize;

function setHtmlFontSize() {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  const htmlDom = document.getElementsByTagName('html')[0];
  htmlDom.style.fontSize = htmlWidth / 10 + 'px';
};
setHtmlFontSize();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
