<template>
  <div class="big-container">
    <Header title="Date Settings"></Header>
    <div class="schedule">
      <v-date-picker v-model="date" is-inline></v-date-picker>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import axios from "axios";

export default {
  name: "FilterSettings",
  components: {
    Header
  },
  props: {
    onNewStartDate: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      date: new Date()
    };
  },
  watch: {
    date: function(date) {
      this.onNewStartDate(date);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "cards";
.big-container {
  @extend .container;
  width: floor(96vw / 7) * 2;
}

.setting {
  padding: 0.5vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
