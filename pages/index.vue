<template>
  <section class='calendar'>
    <img class="background" src="../static/img/well.jpg"/>
    <transition name="fade">
      <div class='calendar-month__tooltip'
           v-show="tooltipState"
           :style="setTransition"
           @mouseover="catchTooltip"
           @mouseleave="closeTooltip('true')">
            <tooltip :tooltip="tooltip"></tooltip>
      </div>
    </transition>
    <div class='calendar-month' v-for='month in getMonth'>
      <div class='calendar-month__title' :ref=month.title>{{month.title}}</div>
      <div class='calendar-month__container' :style="setBackgroundImage(month)">
        <div class='calendar-month__list'
             v-for='index in getAbsoluteDaysOfMonth(month)'>
          <div class='calendar-month__list-inner' v-if="index <= month.daysToMonday"></div>
          <div class='calendar-month__list-inner' v-if="index > month.daysToMonday"
               :class='[
                 {active: isCelebrate(month, index - month.daysToMonday)},
                 {today: isDayToday(month, index - month.daysToMonday)}
                 ]'
               @mouseleave='closeTooltip'
               @mouseover='openTooltip(month, index - month.daysToMonday)'>
            {{index - month.daysToMonday}} <p>{{getDaysOfWeek(index - month.daysToMonday, month)}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Tooltip from '~/components/Tooltip.vue'
import celebrate from '../static/celebrate'
import January from '../static/img/1.jpg'
import February from '../static/img/2.jpg'
import March from '../static/img/3.jpg'
import April from '../static/img/4.jpg'
import May from '../static/img/5.jpg'
import June from '../static/img/6.jpg'
import July from '../static/img/7.jpg'
import August from '../static/img/8.jpg'
import September from '../static/img/9.jpg'
import October from '../static/img/10.jpg'
import November from '../static/img/11.jpg'
import December from '../static/img/12.jpg'
//  import storage from '../static/storageService'
//  import getConstants from '../static/cosntants'
//  const {
//  token
//  } = getConstants

export default {
  fetch ({ store, redirect }) {
    console.log(store.state.authUser.username)
    if (!store.state.authUser.username) {
      return redirect('/security')
    }
  },
  data () {
    return {
      transitionTime: 0.5,
      tooltip: '',
      tooltipState: false,
      save: false,
      opened: false,
      dayOfMonth: 31,
      monthArray: [
        {
          title: 'January',
          daysToMonday: null,
          img: January
        },
        {
          title: 'February',
          daysToMonday: null,
          img: February
        },
        {
          title: 'March',
          daysToMonday: null,
          img: March
        },
        {
          title: 'April',
          daysToMonday: null,
          img: April
        },
        {
          title: 'May',
          daysToMonday: null,
          img: May
        },
        {
          title: 'June',
          daysToMonday: null,
          img: June
        },
        {
          title: 'July',
          daysToMonday: null,
          img: July
        },
        {
          title: 'August',
          daysToMonday: null,
          img: August
        },
        {
          title: 'September',
          daysToMonday: null,
          img: September
        },
        {
          title: 'October',
          daysToMonday: null,
          img: October
        },
        {
          title: 'November',
          daysToMonday: null,
          img: November
        },
        {
          title: 'December',
          daysToMonday: null,
          img: December
        }
      ],
      dayOfWeekArray: ['В', 'ПН', 'В', 'С', 'Ч', 'П', 'С'],
      celebrationDays: celebrate
    }
  },
  components: {
    Tooltip
  },
  computed: {
    week () {
      return Math.round(this.dayOfMonth / 3)
    },
    getMonth () {
      this.monthArray.forEach((month) => {
        if (this.getDaysOfWeek(1, month) === 'ПН') {
          month.daysToMonday = 0
        } else {
          for (let i = 1; i < this.dayOfWeekArray.length; i++) {
            if (this.getDaysOfWeek(i, month) === 'ПН') {
              month.daysToMonday = 8 - i
            }
          }
        }
      })
      return this.monthArray
    },
    setTransition () {
      return {
        transition: `${this.transitionTime}s`
      }
    }
  },
  methods: {
    // style
    setBackgroundImage (month) {
      return {
        background: `-webkit-linear-gradient(top, rgba(255,255,255,0.5) 0%,rgba(255,255,255,0.5) 100%), url(${month.img}) repeat 100% 100%;`
      }
    },
    indexOfMonth (month) {
      return new Date(`21, ${month}, 2017`).getMonth()
    },
    getAbsoluteDaysOfMonth (month) {
      let index = this.indexOfMonth(month.title)
      let daysOfMonth = new Date(2018, index + 1, 0).getDate()
      return daysOfMonth + month.daysToMonday
    },
    getDaysOfWeek (day, month) {
      let index = this.indexOfMonth(month.title)
      let date = new Date(2018, index, day).getDay()
      return this.dayOfWeekArray[date].substring(0, 2)
    },
    isCelebrate (month, day) {
      let index = this.indexOfMonth(month.title)
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
    isDayToday (month, day) {
      let d = new Date()
      let currentMonth = d.getMonth()
      let currentDay = d.getUTCDate()
      if (this.indexOfMonth(month.title) === currentMonth) {
        if (day === currentDay) {
          return true
        }
      }
      return false
    },
    openTooltip (month, day) {
      let index = this.indexOfMonth(month.title)
      let currentMonthCelebration = this.celebrationDays[index]
      if (currentMonthCelebration) {
        let i
        for (i in currentMonthCelebration.days) {
          if (currentMonthCelebration.days[i].number === day) {
            this.tooltip = currentMonthCelebration.days[i]
            this.transitionTime = 1
            this.tooltipState = true
          }
          i++
        }
      }
    },
    closeTooltip (bool) {
      this.tooltipState = false
      if (bool === 'true') {
        this.tooltipState = false
      }
    },
    catchTooltip () {
      this.tooltipState = true
    }
  },
  mounted () {
    setTimeout(() => {
      let d = new Date()
      let n = d.getMonth()
      let el = this.$refs[this.monthArray[n].title][0]
      el.scrollIntoView()
    }, 300)
  }
}
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
.calendar {
  overflow-X: hidden;
}
.background {
  margin-top: -200px;
  margin-left: -20px;
  top: 0;
  position: fixed;
  filter: blur(5px);
  z-index: -10;
}
.calendar-month {
  width: 35%;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
}
.calendar-month__list {
  display: flex;
  width: 14.44%;
  margin: -0.5px -0.5px;
}
.calendar-month__list-inner {
  position: relative;
  height: 50px;
  width: 100%;
  padding: 13px;
  display: flex;
  border-collapse: collapse;
  border: 1px solid rgba(0,0,0,.3);
  justify-content: center;
}

.calendar-month__list-inner p {
  font-size: 13px;
  top: 0;
  right: 1.5px;
  position: absolute;
  border-radius: 50%;
  color: black;
}

.calendar-month__list .active {
  cursor: pointer;
  z-index: 10;
  background: -webkit-linear-gradient(top, rgba(255,255,255,0.4) 0%,rgba(255,255,255,0.6) 100%);
}
.today {
  border: 1px solid red;
  background: -webkit-linear-gradient(top, rgba(255,255,255,0.9) 0%,rgba(255,255,255,0.9) 100%);
}

.calendar-month__title {
  z-index: 10;
  margin-bottom: 10px;
  text-align: center;
}
.calendar-month__container {
  display: flex;
  flex-wrap: wrap;
}

.calendar-month__tooltip {
  position: fixed;
}

.fade-enter-active {
  transition: 0.35s;
  opacity: 1;
}
.fade-enter {
  opacity: 0
}
</style>
