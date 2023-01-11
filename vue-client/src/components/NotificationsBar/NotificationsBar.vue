<template>
    <div v-if="render">
        <v-row no-gutters>
            <v-col>
                <v-alert class="menu-notification text-center pb-3 pt-2.5" style="font-size:20px" >
                    {{ currentDate() }} - {{ hours }}:{{ minutes }}:{{ seconds }}
                    {{ amPm }}
                </v-alert>
            </v-col>
            <v-col :cols="10">
                <v-alert class="menu-notification" v-if="$store.state.notification === 0">
                </v-alert>
                <v-alert class="menu-notification" type="success" v-if="$store.state.notification === 1">
                    Order successfully added.
                </v-alert>
                <v-alert class="menu-notification" type="error" v-if="$store.state.notification === 2">
                    Order failed please check the status and try again.
                </v-alert>
                <v-alert class="menu-notification" type="error" v-if="$store.state.notification === 3">
                    No connection to the server.
                </v-alert>
                <v-alert class="menu-notification" type="info" v-if="$store.state.notification === 4">
                    Please wait...
                </v-alert>
                <v-alert class="menu-notification" type="error" v-if="$store.state.notification === 5">
                    {{ $store.state.errorToDisplay }} - Please try again.
                </v-alert>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
const date = new Date();
export default {
    name: "NotificationsBar",
    data() {
        return {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            amPm: "AM",
            interval: 0,
            notification: 0,
            render: true,
        };
    },
    mounted() {
        this.interval = setInterval(this.updateClock, 1000);
        this.interval = setInterval(this.clearAlert, 20000);
    },
    methods: {
        clearAlert() {
            if (this.$store.state.notification !== 3) {
                this.$store.state.notification = 0;
            }
        },
        updateClock() {
            const date = new Date();
            this.hours = date.getHours();
            this.minutes = date.getMinutes();
            this.seconds = date.getSeconds();
            this.amPm = this.hours >= 12 ? 'PM' : 'AM';
            this.hours = this.hours % 12 || 12;
            this.hours = this.hours < 10 ? `0${this.hours}` : this.hours;
            this.minutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
            this.seconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
        },
        currentDate() {
            const current = new Date();
            const date = `${current.getFullYear()}/${current.getMonth() + 1
                }/${current.getDate()}`;
            return date;
        },
    },
};
</script>
  
<style>
.menu-notification {
    position: relative;
    margin-bottom: 0;
}
</style>
    