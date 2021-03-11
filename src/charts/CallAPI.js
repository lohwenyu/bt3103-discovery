import { Line } from 'vue-chartjs';
import axios from 'axios';

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [
                { 
                    label: "West",
                    data: [],
                    fill: false,
                    borderColor: "#E0BBE4"
                }, { 
                    label: "East",
                    data: [],
                    fill: false,
                    borderColor: "#957DAD"
                }, { 
                    label: "Central",
                    data: [],
                    fill: false,
                    borderColor: "#D291BC"
                }, { 
                    label: "South",
                    data: [],
                    fill: false,
                    borderColor: "#FEC8D8"
                }, { 
                    label: "North",
                    data: [],
                    fill: false,
                    borderColor: "#FFDFD3"
                }, 
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            console.log(response.data.items);
            response.data.items.forEach(data => { 
                console.log(data)
                this.datacollection.labels.push(data.timestamp);
                this.datacollection.datasets[0].data.push(data.readings.psi_twenty_four_hourly.west);
                this.datacollection.datasets[1].data.push(data.readings.psi_twenty_four_hourly.east);
                this.datacollection.datasets[2].data.push(data.readings.psi_twenty_four_hourly.central);
                this.datacollection.datasets[3].data.push(data.readings.psi_twenty_four_hourly.south);
                this.datacollection.datasets[4].data.push(data.readings.psi_twenty_four_hourly.north)
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}