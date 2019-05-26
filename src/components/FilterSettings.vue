<template>
  <div class="big-container">
    <Header title="Filter Settings"></Header>
    <div class="schedule">
      <StudyTypeSelector
        :onChange="updateType"
        class="setting"
      ></StudyTypeSelector>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import axios from "axios";
import StudyTypeSelector from "./StudyTypeSelector";
export default {
  name: "FilterSettings",
  components: {
    Header,
    StudyTypeSelector
  },
  props: {
    onNewEndpoint: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      endpoint: {}
    };
  },
  methods: {
    updateFilters() {
      this.onNewEndpoint(this.composeEndpoint());
    },
    composeEndpoint() {
      let res = "";
      for (let key in this.endpoint) {
        if (this.endpoint.hasOwnProperty(key)) {
          let value = this.endpoint[key];
          if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            value.length !== 0
          ) {
            res += "&" + key + "=";
            if (Array.isArray(value)) {
              res += value.join(",");
            } else {
              res += value;
            }
          }
        }
      }
      return res;
    },
    updateType(types) {
      this.endpoint.types = types;
      this.updateFilters();
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
