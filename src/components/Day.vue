<template>
  <div class="container">
    <Header :title="formatDate(date)"></Header>
    <div class="schedule">
      <Quarter
        :key="index"
        :time="getTime(index)"
        v-for="index in 96"
      ></Quarter>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Quarter from "./Quarter";
import Header from "./Header";

export default {
  name: "Day",
  data() {
    return {
      data: []
    };
  },
  components: { Quarter, Header },
  props: { date: Date },
  methods: {
    getDayName(weekDay) {
      let weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      return weekDays[weekDay];
    },
    getMonthName(month) {
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      return months[month];
    },
    formatDate(date) {
      return (
        this.getDayName(date.getDay()) +
        " " +
        date.getDate() +
        " " +
        this.getMonthName(date.getMonth())
      );
    },
    parseDate(date) {
      let year = date.slice(0, 4);
      let month = date.slice(5, 7);
      let day = date.slice(8, 10);
      let hour = date.slice(11, 13);
      let minute = date.slice(14, 16);
      let second = date.slice(17, 19);
      return new Date(year, month - 1, day, hour, minute, second);
    },
    addEvents(data) {
      for (let lesson of data) {
        this.$emit("addEvent", lesson);
      }
    },
    getTime(index) {
      return new Date(this.date.getTime() + (index - 1) * 900000);
    }
  },
  mounted() {
    axios
      .get(
        "http://localhost:8080/events?year=" +
          this.date.getFullYear() +
          "&month=" +
          (this.date.getMonth() + 1) +
          "&day=" +
          this.date.getDate()
      )
      .then(res => {
        for (let lesson of res.data) {
          lesson["startDate"] = this.parseDate(lesson["startDate"]);
          lesson["endDate"] = this.parseDate(lesson["endDate"]);
        }
        this.addEvents(res.data);
      });
  }
};
</script>

<style lang="scss">
@import "variables";

.container {
  width: floor(86vw / 7);
  margin: 1vw;
  display: inline-block;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  @media only screen and (max-width: 600px) {
    width: 90vw;
    margin: 5vw;
  }
}

.schedule {
  height: 300px;
  overflow-y: scroll;
}
</style>
