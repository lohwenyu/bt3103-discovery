<template>
	<div id="container">
		<button class="qtyButton" v-on:click="decrement()">-</button>
		<span id="counter">{{ counter }}</span>
		<button class="qtyButton" v-on:click="increment()">+</button>
	</div>
</template>

<script>
export default {
	name: "QuantityCounter",
	props: {
		item: {
			type: Object
		}
	},
    data() {
		return {
			counter: 0
		}
	},
	methods: {
		decrement: function() {
			if (this.counter > 0) {
				this.counter -= 1;
			}
			this.$emit('counter', this.item, this.counter);
		},
		increment: function() {
			if (this.counter == 10) {
				alert("You cannot buy more than 10 items.");
			} else {
				this.counter += 1;
			}
			this.$emit('counter', this.item, this.counter);
		}
	}
}
</script>

<style>
#container {
    box-sizing: border-box;
}
.qtyButton {
	font-size: 30px;
	background-color: lightpink;
	width: 40px;
	height: 40px;
	border-radius: 5px;
	border-width: 1px;
	margin-left: 10px;
	margin-right: 10px;
}
#counter {
	font-size: 30px;
}
</style>
