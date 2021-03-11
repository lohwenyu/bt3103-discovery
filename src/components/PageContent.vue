<template>
    <div>
        <ul id="itemsList">
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>
        <ul id="itemsList">
            <li v-for="item in itemsList" :key="item.index">
                <span id="itemName">{{ item.name }}</span><br/>
                <img v-bind:src="item.imageURL"/>
                <p id="price">${{ item.price }}</p>
                <QuantityCounter v-bind:item="item" v-on:counter="onCounter"></QuantityCounter>
            </li>

        </ul>
        <div id="shoppingBasket">  
            <Basket v-bind:itemsSelected="itemsSelected"></Basket>
        </div>
    </div>
</template>

<script>
import QuantityCounter from "./QuantityCounter";
import Basket from "./Basket";
import database from "../firebase.js";

export default {
    name: "PageContent",
    components: {
        QuantityCounter,
        Basket
    },
    props: {
    },
    data() {
        return {
            itemsSelected: [],
            itemsList: []
        }
    },
    methods: {
        onCounter: function (item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                this.itemsSelected.push([item.name, count, item.price]);
            } else {

                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];

                    if (item_name === item.name && count > 0) {
                        this.itemsSelected.splice(i, 1);
                        return this.itemsSelected.push([item.name, count, item.price]);
                    } else if (item_name === item.name && count == 0) {
                        return this.itemsSelected.splice(i, 1);
                    } else {
                        continue
                    }                
                }

                if (count > 0) {
                    return this.itemsSelected.push([item.name, count, item.price]);
                }
            }
        },
        fetchItems: function () {
            database.collection('menu').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.itemsList.push(doc.data());
                });
            });
        }
    },
    created() {
        this.fetchItems()
    }
}
</script>

<style>
#itemsList {
    width: 100%;
    max-width: 70%;
    margin: 0px;
    padding: 0 5px;
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
}
img {
    width: 135px;
    height: 135px;
}

#price {
    font-size: 30px;
}

#itemName {
    font-size: 30px;
}

#shoppingBasket {
    position: absolute;
    top: 23%;
    left: 78%;
}
</style>