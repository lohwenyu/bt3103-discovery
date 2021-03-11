<template>
    <div>
        <p>MENU</p>
        <ul>
            <li v-for="(item, index) in itemsSelected" :key="index">
                {{ item[0] }} x {{ item[1] }} 
            </li>
        </ul>
        <button type="button" v-on:click="button(); sendOrder()">Calculate Total</button>
        <p v-show="showTotal">Subtotal: ${{ subtotal }}</p>
        <p v-show="showTotal">Grand Total: ${{ grandTotal }}</p>
    </div>
</template>
<script>
import database from "../firebase.js";

export default {
    name: "Basket",
    props: {
        itemsSelected: {
            type: Array
        }
    }, 
    data() {
        return {
            showTotal: false,
            subtotal: 0,
            grandTotal: 0
        }
    },
    methods: {
        findTotal: function() {
            this.subtotal = 0
            for (let i=0; i<this.itemsSelected.length; i++) {
                this.subtotal += this.itemsSelected[i][1] * this.itemsSelected[i][2];
            }
        },
        button: function() {
            this.findTotal();
            this.showTotal = true;
        },
        sendOrder: function() {
            let order = {};
            for (let i=0; i<this.itemsSelected.length; i++) {
                order[i] = this.itemsSelected[i];
            }

            if (Object.keys(order).length > 0) {
                database.collection("orders").add(
                    order
                ).then(() => {
                    location.reload();
                })
            }
        }
    },
    watch: {
        subtotal: function(val) {
            this.grandTotal = (1.07 * val).toFixed(2);
        }
    }
}
</script>
<style scoped>
ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: circle;
    padding: 0;
}
li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: left;
    padding: 10px;
    border: 0px;
    margin: 10px;
}
</style>