<template>
    <div
            class="quarter"
            :class="{
      hour: time.getMinutes() === 45,
      time: time.getMinutes() === 15
    }"
            v-bind:style="{
      backgroundColor: this.color
    }"
    >
        {{ this.formatTime() }}
    </div>
</template>

<script>
    export default {
        name: "Quarter",
        props: {
            time: Date
        },
        data() {
            return {
                amount: 0,
                color: "hsl(0, 100%, " + this.getPercentage(0) + "%)",
                currentMax: 0
            };
        },
        methods: {
            formatTime() {
                return this.time.getHours() + ":00";
            },
            getPercentage(max) {
                if (this.amount === 0 || max === 0) {
                    return 100;
                }
                return 100 - (this.amount / max) * 50;
            },
            setNewMax(val) {
                this.currentMax = val;
            },
            addListener() {
                this.$parent.$on("addEvent", event => {
                    this.addEvent(event);
                });
                this.$root.$on("newMax", max => {
                    this.setNewMax(max);
                });
            },
            addEvent(event) {
                if (
                    this.time.getTime() >= event["startDate"].getTime() &&
                    this.time.getTime() < event["endDate"].getTime()
                ) {
                    this.amount += 1;
                    this.setMax(this.amount);
                }
            }
        },
        watch: {
            currentMax: function (val) {
                this.color = "hsl(0, 100%, " + this.getPercentage(val) + "%)";
            }
        },
        created() {
            this.addListener();
        }
    };
</script>

<style scoped lang="scss">
    @import "cards";

    .quarter {
        @extend .slot;
        height: 12.5px;
        color: transparent;
    }

    .hour {
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .time {
        color: black;
    }
</style>
