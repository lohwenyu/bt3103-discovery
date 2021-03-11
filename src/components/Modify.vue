<template>
    <div>
        <div v-for="(item, index) in datapacket" :key="index">
            <p>{{item[0]}}: {{item[1]}}</p>
            <input :id="index" placeholder=0 type="number" min="0"/>
        </div>
        <button type="button" v-on:click="updateOrder()">Update Order</button>
    </div>
</template>
<script>
import database from '../firebase';

export default {
    name: "Modify",
    data() {
        return {
            datapacket: null,
            datapacketCopy: null
        }
    },
    methods: {
        fetchItems: function() {
            database.collection("orders").doc(this.$route.params.id).get().then((snapshot) => {
                this.datapacket = snapshot.data();
                this.datapacketCopy = snapshot.data();
            })
        }, updateOrder: function() {
            for (var i=0; i<Object.keys(this.datapacket).length; i++) {
                var newValue = parseInt(document.getElementById(i).value);
                console.log(newValue);
                if (newValue) {
                    this.datapacketCopy[i][1] = newValue;
                }
            }
            database.collection("orders").doc(this.$route.params.id).set(this.datapacketCopy);
            this.$router.push({ path: '/orders' })
        }
    },
    created() {
        this.fetchItems()
    }
}
</script>
<style scoped>
button {
  width: 100px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  padding: 5px;
  margin: 10px;
}
</style>