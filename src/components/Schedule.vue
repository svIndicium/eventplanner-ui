<template>
  <div>
    <div>
      <Day
        :date="date"
        v-bind:key="date.getDay()"
        v-for="date in dates"
        :url="baseUrl + endpointAttributes"
      ></Day>
      <FilterSettings :onNewEndpoint="updatedFilters"></FilterSettings>
    </div>
  </div>
</template>

<script>
import Day from "./Day";
import FilterSettings from "./FilterSettings";
import axios from "axios";

export default {
  name: "Schedule",
  components: {
    Day,
    FilterSettings
  },
  methods: {
    updatedFilters(filters) {
      this.endpointAttributes = filters;
      this.resetMax();
    }
  },
  data() {
    return {
      types: [],
      baseUrl: "http://localhost:8080/events?a=b",
      endpointAttributes: "",
      dates: (function() {
        let data = [];
        let today = new Date();
        for (let i = 0; i < 7; i++) {
          data.push(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate() - today.getDay() + 1 + i
            )
          );
        }
        return data;
      })()
    };
  }
};
</script>

<style scoped></style>
