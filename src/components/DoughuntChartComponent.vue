

<script>
import {Doughnut} from 'vue-chartjs'

export default Doughnut.extend({
  props:['labels', 'data', 'colors'],
  watch: {
  'data': {
      handler: function (newData, oldData) {
        this.drawChart();
      },
      deep: true
    }
  },
   mounted () {
      this.drawChart();
   },
   methods:{
      drawChart: function(){
             this.renderChart({
               labels: this.labels,
               datasets: [
                 {
                   backgroundColor: this.colors,
                   data: this.data
                 }
               ]
             }, {responsive: true, maintainAspectRatio: false})
      }
   },

   computed:{
      computedDrawChart: function(){
          this.drawChart();
      }
   }

})

</script>