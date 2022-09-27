<template>
	<div
		v-if="catalogData.length"
		class="page"
	>
		<Catalog
			:catalog-data="catalogData"
			class="page__catalog"
		/>
		<Cart class="page__cart" />
	</div>
</template>

<script lang="ts">
	import {
		defineComponent,
		computed,
		onMounted,
	} from 'vue';
	import { useStore } from '@/store';
	import { ICategory } from "@/types";
	import Catalog from '@/components/catalog/Catalog.vue';
	import Cart from '@/components/cart/Cart.vue';

	export default defineComponent({
		name: 'App',
		components: { Catalog, Cart },
		setup() {
			const store = useStore();
			const catalogData = computed<ICategory[]>(() => store.getters.getCatalog);
			const randomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min)
			let timerId: number;

			onMounted(() => {
				store.dispatch('getData');

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				timerId = setInterval(() => {
					store.dispatch('getData');
					store.commit('updateRate', randomNumber(20, 80));
				}, 15000);
			});

			return {
				catalogData,
			}
		}
	});
</script>

<style scoped lang="scss">
	@import './styles/main';
</style>
