<template>
	<component
		:is="tag"
		class="cart-item"
	>
		<div class="cart-item__name">
			<p class="cart-item__title">{{ cartItemData.name }}</p>
		</div>
		<div class="cart-item__qty">
			<CountControls
				@updateCount="getCount"
				@increaseCount="increaseCount"
				@decreaseCount="decreaseCount"
				:count="currentItemQty"
				:goods-id="cartItemData.id"
			/>
		</div>
		<div class="cart-item__sum">
			<span class="cart-item-sum">Цена: {{ price }}</span>
		</div>
		<button
			@click="deleteItem"
			class="cart-item-delete"
		>
			<span class="cart-item-delete__cross"></span>
		</button>
	</component>
</template>

<script lang="ts">
	import {
		defineComponent,
		computed,
		ref,
		watch,
		PropType,
	} from 'vue';
	import { useStore } from '@/store';
	import CountControls from '../controls/CountControls.vue'
	import { IGoodCart } from "@/types";

	export default defineComponent({
		name: 'CartItem',
		components: {
			CountControls,
		},
		props: {
			tag: {
				type: String,
				default: 'li',
			},
			cartItemData: {
				type: Object as PropType<IGoodCart>,
				default: () => ({}),
			}
		},
		setup(props) {
			const store = useStore();
			const rate = computed<number>(() => store.getters.getRate);
			const currentItem = computed<IGoodCart>(() => store.getters.getCartItem(props.cartItemData.id));
			const currentItemQty = computed<number>(() => currentItem.value?.qty);
			const calculatePrice = (price: number, qty: number, rate: number): string => (price * qty * rate).toFixed(2);
			const price = ref(calculatePrice(currentItem.value.price, currentItemQty.value, rate.value));
			const getCount = (count: number): void => {
				price.value = calculatePrice(currentItem.value.price, count, rate.value);
			}
			const increaseCount = (): void => {
				store.commit('increaseCartItemCount', currentItem.value.id);
			}
			const decreaseCount = (): void => {
				store.commit('decreaseCartItemCount', currentItem.value.id);
			}
			const deleteItem = (): void => {
				store.commit('deleteCartItem', currentItem.value.id);
			}

			watch(() => currentItemQty.value, (newVal) => {
				price.value = calculatePrice(props.cartItemData.price, newVal, rate.value);
			});

			watch(() => rate.value, () => {
				price.value = calculatePrice(props.cartItemData.price, currentItemQty.value, rate.value);
			});

			return {
				currentItemQty,
				price,
				getCount,
				increaseCount,
				decreaseCount,
				deleteItem,
			}
		},
	});
</script>

<style scoped lang="scss">
	@import './src/styles/cart/cart-item';
</style>
