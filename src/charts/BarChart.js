import { Bar } from "vue-chartjs";
import database from "../firebase.js";

export default {
    extends: Bar,
    data: function() {
        return {
            datacollection : {
                labels: [],
                datasets: [{
                    label: "Number of Orders",
                    backgroundColor: ["#bfe6ff", "#8cd3ff", "#59bfff", "#26abff", "#0da2ff", "#009dff"],
                    data: []
                }]
            },
            options : {
                legend: { display: false },
                title: {
                    display: true,
                    text: "Total Number of Each Dish"
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
            allOrders: {}
        }
    },
    methods: {
        fetchItems: function() {
            database.collection("orders").get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    var order = Object.values(doc.data());
                    for (var i=0; i<order.length; i++) {
                        var dish = order[i];
                        if (!(dish[0] in this.allOrders)) {
                            this.allOrders[dish[0]] = dish[1];
                        } else {
                            this.allOrders[dish[0]] += dish[1];
                        }
                    }
                })
            }).then(() => {
                this.datacollection.labels = Object.keys(this.allOrders);
                this.datacollection.datasets[0].data = Object.values(this.allOrders);
                this.renderChart(this.datacollection, this.options);
            })
        }
    },
    created () {
        this.fetchItems()
    }
}