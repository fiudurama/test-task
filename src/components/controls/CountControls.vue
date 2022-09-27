<template>
	<div class="count-controls">
		<div class="count-controls__layout">
			<button
				@click="decreaseCount"
				class="count-controls-btn count-controls-btn--minus count-controls__btn"
			>
				<span class="count-controls-btn__icon"></span>
			</button>
			<input
				:value="countModel"
				type="number"
				class="count-controls__ipt"
			>
			<button
				@click="increaseCount"
				class="count-controls-btn count-controls-btn--plus count-controls__btn"
			>
				<span class="count-controls-btn__icon"></span>
			</button>
		</div>
		<button
			v-if="catalogControls"
			@click="toCart"
			class="count-controls-buy-btn"
		>
			<span class="count-controls-but-btn__text">Купить</span>
		</button>
	</div>
</template>

<script lang="ts">
	import {
		defineComponent,
		computed,
		ref,
		watch,
	} from 'vue';
	import { useStore } from '@/store';
	import { IGoodCart, IGoodCatalog } from "@/types";

	export default defineComponent({
		name: 'CountControls',
		props: {
			count: {
				type: Number,
				default: 1,
			},
			catalogControls: {
				type: Boolean,
				default: false,
			},
			goodsId: {
				type: Number,
				required: true,
			},
		},
		setup(props, {emit}) {
			const countModel = ref(props.count);
			const store = useStore();
			const currentCartGood = computed<IGoodCart>(() => store.getters.getCartItem(props.goodsId));
			const currentCartGoodQty = computed<number>(() => currentCartGood.value?.qty);
			const currentCatalogItem = computed<IGoodCatalog>(() => store.getters.getCatalogItem(props.goodsId));

			const increaseCount = (): void => {
				let totalAmountValue = (currentCartGoodQty.value || 0) + (props.catalogControls ? countModel.value : 0);

				if (++totalAmountValue > currentCatalogItem.value?.availableQty) {
					alert('Кол-во товаров превышает доступное.');
					return;
				}

				countModel.value++
				emit('updateCount', countModel.value);
				emit('increaseCount');
			};
			const decreaseCount = (): void => {
				if (countModel.value > 1) {
					countModel.value--;
					emit('updateCount', countModel.value);
					emit('decreaseCount');
				}
			};
			const toCart = (): void => {
				if ((currentCartGoodQty.value || 0) + countModel.value > currentCatalogItem.value?.availableQty) {
					alert('Кол-во товаров превышает доступное.');
					return;
				}

				emit('buyRequest', countModel.value);
				countModel.value = 1;
			}


			if (currentCartGoodQty.value) {
				watch(() => currentCartGoodQty.value, (newVal) => {
					countModel.value = newVal;
				});
			}

			return {
				countModel,
				increaseCount,
				decreaseCount,
				toCart,
			}
		},
	});
</script>

<style scoped lang="scss">
	@import './src/styles/controls/controls';
</style>
