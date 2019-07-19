<template>
  <div
    :class="{
      hour: time.getMinutes() === 45,
      time: time.getMinutes() === 15
    }"
    class="quarter"
    v-bind:style="{
      backgroundColor: this.color
    }"
    v-tooltip.bottom-start="'' + this.amount"
  >
    {{ this.formatTime() }}
  </div>
</template>

<script>
export default {
  name: "Quarter",
  props: {
    time: Date,
    currentMax: Number,
    newMax: Function
  },
  data() {
    return {
      amount: 0,
      color: "hsl(0, 100%, " + this.getPercentage(10) + "%)"
    };
  },
  methods: {
    formatTime() {
      return this.time.getHours() + ":00";
    },
    getPercentage(max) {
      if (max === 0) {
        return 100;
      }
      return 100 - (this.amount / max) * 50;
    },
    addListener() {
      this.$parent.$on("addEvent", event => {
        this.addEvent(event);
      });
      this.$parent.$on("clear", () => {
        this.amount = 0;
      });
    },
    addEvent(event) {
      if (
        this.time.getTime() >= event["startDate"].getTime() &&
        this.time.getTime() < event["endDate"].getTime()
      ) {
        this.amount += event["size"];
        this.newMax(this.amount);
      }
    }
  },
  watch: {
    currentMax: function(val) {
      this.color = "hsl(0, 100%, " + this.getPercentage(val) + "%)";
    },
    amount: function() {
      this.color = "hsl(0, 100%, " + this.getPercentage(this.currentMax) + "%)";
    }
  },
  created() {
    this.addListener();
  }
};
</script>

<style lang="scss" scoped>
@import "cards";

.quarter {
  @extend .slot;
  transition: background-color 0.3s;
  height: 12.5px;
  color: transparent;
  &:hover {
    height: 10.5px;
    border-top: 1px solid rgba(0, 0, 0, 0.24);
    border-bottom: 1px solid rgba(0, 0, 0, 0.24);
  }
}

.hour {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  &:hover {
    height: 11.5px;
  }
}

.time {
  color: black;
}
</style>
