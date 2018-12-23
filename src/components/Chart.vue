<template>
  <div style="background-color: #fff">
  <div class="backG">
    <div class="show">
      <div class="title">注册用户性别数据图</div>
      <button @click="changeType">切换图表类型</button>
      <ve-chart width="500px" class="size" :data="chartData" :settings="chartSettings"></ve-chart>
    </div>
    <div class="show">
      <div class="title">注册用户省份统计图</div>
      <button @click="changeType1">切换图表类型</button>
      <ve-chart width="500px" class="size" :data="chartData1" :settings="chartSettings1"></ve-chart>
      <ve-map width="500px" class="size" :data="chartData1"></ve-map>
    </div>
    <div class="show">
      <div class="title">注册用户年龄段统计图</div>
      <button @click="changeType2">切换图表类型</button>
      <ve-chart width="500px" class="size" :data="chartData2" :settings="chartSettings2"></ve-chart>
    </div>
  </div>
  </div>
</template>
<script>
  import VeChart from 'v-charts/lib/chart.common'
  import VCharts from 'v-charts'
  import VeMap from 'v-charts/lib/map.common'
  export default {
    data() {
      this.typeArr = ['line', 'histogram', 'pie']
      this.typeArr1 = ['line', 'histogram', 'pie']
      this.typeArr2 = ['line', 'histogram', 'pie']
      this.index2 = 0
      this.index1 = 0
      this.index = 0
      return {
        chartData: {
          columns: ['性别','人数'],
          rows: []
        },
        chartData1: {
          columns: ['省份','人数'],
          rows: []
        },
        chartData2: {
          columns: ['年代','人数'],
          rows: []
        },
        chartSettings: {type: this.typeArr[this.index]},
        chartSettings1: {type: this.typeArr1[this.index1]},
        chartSettings2: {type: this.typeArr2[this.index2]},
        baseUrl1: "http://119.29.150.121:8080/BBS"
      }
    },
    methods: {
      changeType: function () {
        this.index++
        if (this.index >= this.typeArr.length) { this.index = 0 }
        this.chartSettings = { type: this.typeArr[this.index] }
      },
      changeType1: function () {
        this.index1++
        if (this.index1 >= this.typeArr1.length) { this.index1 = 0 }
        this.chartSettings1 = { type: this.typeArr1[this.index1] }
      },
      changeType2: function () {
        this.index2++
        if (this.index2 >= this.typeArr2.length) { this.index2 = 0 }
        this.chartSettings2 = { type: this.typeArr2[this.index2] }
      },
      getSex() {
        this.axios.get(this.baseUrl1 + "/api/getUserStatisticsBySex")
          .then(res => {
            if(res.data.status == '1') {
              this.chartData.rows = res.data.data
            }
          })
      },
      getPro() {
        this.axios.get(this.baseUrl1 + "/api/getUserStatisticsByProvince")
          .then(res => {
            if(res.data.status == '1') {
              this.chartData1.rows = res.data.data
            }
          })
      },
      getAge() {
        this.axios.get(this.baseUrl1 + "/api/getUserStatisticsByBirthday")
          .then(res => {
            if (res.data.status == '1') {
              this.chartData2.rows = res.data.data
            }
          })
      }
    },
    components: {
      VeChart,
      VeMap
    },
    mounted() {
      this.getPro()
      this.getSex()
      this.getAge()
    }
    //   let _this = this
    //  setInterval(function () {
    //    _this.getSex()
    //  },7000)
    // }
  }
</script>
<style>
  .size {
    margin: 0 auto;
    color: #fff !important;
  }
  .show {
    width: 50%;
    margin: 0 auto;
    padding-top: 30px;
  }
  .title {
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #cdcdcd;
  }
  .backG {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    margin: 0;
    margin-top: -20px;
  }
</style>
