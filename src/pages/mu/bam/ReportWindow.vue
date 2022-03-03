<template>
  <div v-if="!rendering">
    <bar-chart v-if="barChart.renderBar" :chartData="barChart.chartData" :options="barChart.options"/>
    <bar-chart v-if="barChart2.renderBar" :chartData="barChart2.chartData" :options="barChart2.options"/>
    <bar-chart v-if="barChart3.renderBar" :chartData="barChart3.chartData" :options="barChart3.options"/>
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
      },
      barChart3: {
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
        }],
        labels: [response.data.byArtist.filter(record => record.total > 1).map(record => record.artist)]
      }
      this.barChart.options = {
        plugins: {
          legend: {
            display: false
          }
        },
        parsing: {
          xAxisKey: 'artist',
          yAxisKey: 'total'
        }
      }
      this.barChart.renderBar = true
      this.barChart2.chartData = {
        datasets: [{
          data: response.data.byDSP
        }],
        labels: [response.data.byDSP.filter(record => record.total > 100).map(record => record.service)]
      }
      this.barChart2.options = {
        plugins: {
          legend: {
            display: false
          }
        },
        parsing: {
          xAxisKey: 'service',
          yAxisKey: 'total'
        }
      }
      this.barChart2.renderBar = true
      this.barChart3.chartData = {
        datasets: [
          {
            label: 'population',
            data: [30, 40, 60, 70, 5],
            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED']
          }
        ],
        labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre']
      }
      this.barChart3.options = {
        plugins: {
          legend: {
            display: false
          }
        }
      }
      this.barChart3.renderBar = true
      this.rendering = false
    }
  }
}
</script>
