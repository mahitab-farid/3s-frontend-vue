
// import PieChart from '../BaseCharts/Pie.js'

// export default PieChart.extend({
//   mounted () {
//     this.renderChart({
//       labels: ['reviews completed', 'reviews not completed'],
//       datasets: [
//         {
//           backgroundColor: [
//             '#41B883',
//             '#E46651',
           
//           ],
//           data: [40, 60]
//         }
//       ]
//     }, {responsive: true, maintainAspectRatio: false})
//   }
// })

import PieChart from '../BaseCharts/Pie.js'

export default PieChart.extend({
  name: 'pieChart',
  props: ["piedata", "options"],
  mounted () {
    this.renderChart(this.piedata,this.options)
  }
})