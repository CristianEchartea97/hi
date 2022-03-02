<template>
  <div v-if="!rendering">
    <bar-chart v-if="barChart.renderBar" :chartData="barChart.chartData" :options="barChart.options"/>
    <bar-chart v-if="barChart2.renderBar" :chartData="barChart2.chartData" :options="barChart2.options"/>
  </div>
  <div v-else>
    <div class="row justify-center">
      <div class="col-12 col-md-auto">
        <q-spinner-audio size="5rem" color="secondary"/>
      </div>
    </div>
  </div>
</template>
<script>
// https://vue-chart-3.netlify.app/guide/usage/
import { BarChart } from 'vue-chart-3'
import Chart from 'chart.js/auto'

export default {
  components: {
    BarChart,
    // eslint-disable-next-line vue/no-unused-components
    Chart
  },
  data () {
    return {
      rendering: true,
      barChart: {
        renderBar: false,
        chartData: null,
        options: null
      },
      barChart2: {
        renderBar: false,
        chartData: null,
        options: null
      }
    }
  },
  mounted () {
    this.getReport()
  },
  methods: {
    async getReport () {
      this.rendering = true
      // https://www.chartjs.org/docs/latest/general/data-structures.html
      const id = this.$route.params.id
      const out = await this.api.get(`/api/mu/report/${id}`)
      const response = out.data
      console.log(response)
      this.barChart.chartData = {
        datasets: [{
          data: response.data.byArtist
        }]
      }
      this.barChart.options = {
        parsing: {
          xAxisKey: 'artist',
          yAxisKey: 'total'
        }
      }
      this.barChart.renderBar = true
      this.barChart2.chartData = {
        datasets: [{
          data: response.data.byDSP
        }]
      }
      this.barChart2.options = {
        parsing: {
          xAxisKey: 'service',
          yAxisKey: 'total'
        }
      }
      this.barChart2.renderBar = true
      this.rendering = false
    }
  }
}
</script>
