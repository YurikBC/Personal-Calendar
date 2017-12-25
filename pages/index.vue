<template>
  <section class="calendar">
    <div class="calendar-month__tooltip">{{tooltip}}</div>
    <div class="calendar-month" v-for="month in monthArray">
      <div class="calendar-month__title">{{month}}</div>
      <div class="calendar-month__container">
        <div class="calendar-month__list" v-for="index in getDaysOfMonth(month)">
          <div :class="{active: isCelebrate(month, index)}"
               @mouseleave="closeTooltip"
               @mouseover="openTooltip(month, index)">{{index}}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import celebrate from '../static/celebrate'
export default {
  data () {
    return {
      tooltip: 'sccdssdc',
      dayOfMonth: 31,
      monthArray: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      celebrationDays: celebrate
    }
  },
  components: {
    Logo
  },
  computed: {
    week () {
      return Math.round(this.dayOfMonth / 3)
    }
  },
  methods: {
    indexOfMonth (month) {
      return new Date(`21, ${month}, 2017`).getMonth()
    },
    getDaysOfMonth (month) {
      let index = this.indexOfMonth(month)
      let daysOfMonth = new Date(2017, index + 1, 0).getDate()
      return daysOfMonth
    },
    isCelebrate (month, day) {
      let index = this.indexOfMonth(month)
      let currentMonthCelebration = this.celebrationDays[index]
      if (currentMonthCelebration) {
        let i
        for (i in currentMonthCelebration.days) {
          if (currentMonthCelebration.days[i].number === day) {
            return true
          }
          i++
        }
      }
    },
    openTooltip (month, day) {
      let index = this.indexOfMonth(month)
      let currentMonthCelebration = this.celebrationDays[index]
      if (currentMonthCelebration) {
        let i
        for (i in currentMonthCelebration.days) {
          if (currentMonthCelebration.days[i].number === day) {
            this.tooltip = currentMonthCelebration.days[i].description
          }
          i++
        }
      }
    },
    closeTooltip () {
      this.tooltip = ''
    }
  }
}
</script>

<style>
.calendar-month {
  width: 500px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
}
.calendar-month__list {
  width: 14%;
  height: 30px;
}
.calendar-month__list div {
  height: 100%;
  vertical-align: center;
  border: 1px solid rgba(0,0,0,.3);
}

.calendar-month__list .active {
  background-color: red;
  cursor: pointer;
}

.calendar-month__title {
  text-align: center;
}
.calendar-month__container {
  display: flex;
  flex-wrap: wrap;
}

.calendar-month__tooltip {
  position: fixed;
  left: 200px;
  font-size: 20px;
}
</style>
