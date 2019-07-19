<template>
  <div>
    <div>
      <Day
        :date="date"
        v-bind:key="date.getDay()"
        v-for="date in dates()"
        :url="baseUrl + endpointAttributes"
      ></Day>
      <FilterSettings :onNewEndpoint="updatedFilters"></FilterSettings>
      <DateSettings :onNewStartDate="updateDate"></DateSettings>
    </div>
  </div>
</template>

<script>
import Day from "./Day";
import FilterSettings from "./FilterSettings";
import DateSettings from "./DateSettings";
import axios from "axios";

export default {
  name: "Schedule",
  components: {
    Day,
    FilterSettings,
    DateSettings
  },
  methods: {
    updatedFilters(filters) {
      this.endpointAttributes = filters;
      this.resetMax();
    },
    updateDate(date) {
      this.startDate = date;
    }
  },
  data() {
    return {
      types: [],
      baseUrl: "http://localhost:8080/events?a=b",
      endpointAttributes: "",
      startDate: new Date(),
      dates() {
        let data = [];
        for (let i = 0; i < 7; i++) {
          data.push(
            new Date(
              this.startDate.getFullYear(),
              this.startDate.getMonth(),
              this.startDate.getDate() + i
            )
          );
        }
        return data;
      },
    };
  }
};
</script>

<style scoped></style>
