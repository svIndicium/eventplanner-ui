<template>
  <div id="app">
    <Schedule></Schedule>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Day from "./components/Day.vue";
import Schedule from "./components/Schedule.vue";
@Component({
  components: {
    Schedule
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500");

  body {
    font-family: "Roboto Light", serif;
}
</style>
