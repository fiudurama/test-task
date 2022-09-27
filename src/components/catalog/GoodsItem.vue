<template>
	<component
		:is="tag"
		class="goods"
	>
		<p class="goods__title">
			<span class="goods__name">{{ goodData.name }}</span>
			<span class="goods__qty"> ({{ goodData.availableQty }})</span>
		</p>
		<div class="goods__controls">
			<CountControls
				@updateCount="getCount"
				@buyRequest="toCart"
				:count="countValue"
				:goods-id="goodData.id"
				catalog-controls
			/>
		</div>
		<div
			:class="goodsPriceModifiers"
			class="goods-price goods__price"
		>
			<span class="goods-price__text">{{ goodsPrice }}</span>
		</div>
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
	import CountControls from '@/components/controls/CountControls.vue';
	import { IGoodCart, IGoodCatalog } from '@/types';
	import { GoodCart } from '@/handlers/GoodCart';

	export default defineComponent({
		name: 'GoodsItem',
		components: { CountControls },
		props: {
			tag: {
				type: String,
				default: 'li',
			},
			goodData: {
				type: Object as PropType<IGoodCatalog>,
				default: () => ({}),
			},
		},
		setup(props) {
			const store = useStore();
			const rate = computed<number>(() => store.getters.getRate);
			const currentCartItem = computed<IGoodCart>(() => store.getters.getCartItem(props.goodData.id));
			const goodsPrice = computed<string>(() => (props.goodData.price * rate.value).toFixed(2));
			const countValue = ref(1);
			const goodsPriceModifiers = ref('');

			const getCount = (count: number): void => {
				countValue.value = count;
			}

			watch(() => rate.value, (newVal, oldValue) => {
				goodsPriceModifiers.value = newVal > oldValue ? 'goods-price--up' : 'goods-price--down';

				setTimeout(() => {
					goodsPriceModifiers.value = '';
				}, 2000)
			})

			const toCart = (): void => {
				if (currentCartItem.value) {
					store.commit('updateCartItem', {
						cartItem: currentCartItem.value,
						qty: countValue.value,
					});
				} else {
					store.commit('addToCart', new GoodCart({
						id: props.goodData.id,
						name: props.goodData.name,
						price: props.goodData.price,
						qty: countValue.value,
					}));
				}

				countValue.value = 1;
			}

			return {
				goodsPrice,
				getCount,
				countValue,
				toCart,
				currentCartItem,
				goodsPriceModifiers,
			}
		},
	});
</script>

<style scoped lang="scss">
	@import './src/styles/catalog/goods-item';
</style>
