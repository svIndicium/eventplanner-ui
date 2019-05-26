import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.prototype.$max = 0;
Vue.prototype.setMax = function(newMax: number) {
  if (newMax > this.$max) {
    this.$max = newMax;
    this.$root.$emit("newMax", newMax);
  }
};
Vue.prototype.getMax = function() {
  return this.$max;
};
new Vue({
  render: h => h(App)
}).$mount("#app");
