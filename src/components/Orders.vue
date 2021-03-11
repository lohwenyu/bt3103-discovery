<template>
    <div>
        <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>
        <ul>
            <li v-for="order in orders" :key="order.index">
                <div class="column">
                    <p v-for="(item, index) in order[1]" :key="index">
                        {{item[0]}}: {{item[1]}}
                    </p>
                </div>
                <div class="column">
                    <button type="button" v-bind:id="order[0]" v-on:click="deleteItem($event)">Delete</button>
                    <button type="button" v-bind:id="order[0]" v-on:click="route($event)">Modify</button>
                </div>
            </li>
        </ul>
        
    </div>
</template>
<script>
import database from "../firebase.js";

export default {
    name: "Orders",
    data() {
        return {
            orders: []
        }
    },
    methods: {
        fetchItems: function() {
            database.collection("orders").get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    this.orders.push([doc.id, doc.data()]);
                })
            })
        },
        deleteItem: function(event) {
            let doc_id = event.target.getAttribute("id");
            database.collection("orders").doc(doc_id).delete().then(() => {
                location.reload();
            });
        },
        route: function(event) {
            this.$router.push({ name: "Modify", params: {id: event.target.getAttribute("id")} })
        }
    },
    created() {
        this.fetchItems()
    }
}
</script>
<style scoped>
body {
    box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
  /* float: left; */
  /* max-width: 300px; */
  /* max-width: 50%; */
}
.column {
    float: left;
    width: 50%;
    /* margin-left: 50px;
    margin-right: 50px; */
}
button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>