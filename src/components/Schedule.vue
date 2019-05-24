<template>
    <div>
        <div>
            <Day v-for="date in dates" v-bind:key="date.getDay()" :date="date"></Day>
        </div>
        <div>{{ schedules }}</div>
    </div>
</template>

<script>
    import Day from "./Day";
    import axios from "axios";

    export default {
        name: "Schedule",
        components: {
            Day
        },
        data() {
            return {
                schedules: [],
                dates: (function () {
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
        },
        mounted() {
            axios
                .get("http://localhost:8080/events")
                .then(res => (this.schedules = res.data));
        }
    };
</script>

<style scoped></style>
