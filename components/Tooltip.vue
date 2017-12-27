<template>
  <div class="tooltip">
    <h1 class="tooltip__title">{{tooltip.title}}</h1>
    <div class="tooltip__conditions">
      <h3>Условия:</h3>
      <p v-for="condition in tooltip.conditions">{{ condition }}</p>
    </div>
    <div class="tooltip__conditions">
      <h3>Исключения:</h3>
      <p v-for="exeption in tooltip.exeptions">- {{ exeption }}</p>
    </div>
    <div class="tooltip__history">
      <h3>История:</h3>
      <p>{{tooltip.history}}</p>
    </div>
    <div class="tooltip__year">
      <h3>Первый год празднования:</h3>
      <p>{{tooltip.year}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['tooltip']
}
</script>

<style>
  .tooltip {
    position: fixed;
    top: 50px;
    width: 400px;
    left: 50px;
    font-size: 20px;
    border-radius: 5%;
    background-color: rgba(1,1,1, 0.4);
    padding: 10px 20px 20px 20px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    z-index: 10;
    color: white;
  }
  .tooltip__title {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    color: white;
  }
  h3 {
    margin-top: 15px;
    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 17px;
    letter-spacing: -0.3px;
    color: white;
  }
  p {
    font-size: 17px;
    color: white;
  }
  .tooltip__title {
    width: 100%;
    text-align: center;
    color: white;
  }

</style>
