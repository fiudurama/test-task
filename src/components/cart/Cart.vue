<template>
	<div class="cart">
		<p class="cart-title">Корзина</p>
		<ul
			v-if="cartList.length"
			class="cart-list"
		>
			<CartItem
				v-for="cartItem in cartList"
				:key="cartItem.id"
				:cart-item-data="cartItem"
				class="cart-list__item"
			/>
		</ul>
		<div
			v-else
			class="cart-empty"
		>
			<p class="cart-empty__label">
				<span class="cart-empty__text">Корзина пуста</span>
			</p>
		</div>
		<div class="cart-total cart__total">
			<div class="cart-total__item">
				<span class="cart-total__label">Кол-во товаров: </span>
				<span class="cart-total__value">{{ totalGoodsAmount }}</span>
			</div>
			<div class="cart-total__item">
				<span class="cart-total__label">Сумма: </span>
				<span class="cart-total__value">{{ totalGoodsPrice }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {
		defineComponent,
		computed,
	} from 'vue';
	import { useStore } from '@/store';
	import { IGoodCart } from "@/types";
	import CartItem from './CartItem.vue'

	export default defineComponent({
		name: 'Cart',
		components: { CartItem },
		setup() {
			const store = useStore();
			const cartList = computed<IGoodCart[]>(() => store.getters.getCartGoods);
			const totalGoodsPrice = computed<number>(() => store.getters.getCartTotalPrice);
			const totalGoodsAmount = computed<number>(() => store.getters.getCartTotalAmount);

			return {
				cartList,
				totalGoodsPrice,
				totalGoodsAmount,
			}
		}
	});
</script>

<style scoped lang="scss">
	@import './src/styles/cart/cart';
</style>
