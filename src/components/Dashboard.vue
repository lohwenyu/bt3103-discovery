<template>
    <div>
        <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>
        <bar-chart></bar-chart>
        <line-graph></line-graph>
    </div>
</template>
<script>
import BarChart from '../charts/BarChart.vue';
import LineGraph from "../charts/CallAPI.vue";
export default {
    name: "Dashboard",
    components: {
        BarChart,
        LineGraph
    }
}
</script>
<style scoped>

</style>