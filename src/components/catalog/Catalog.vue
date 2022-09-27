<template>
	<div class="catalog">
		<ul class="catalog-list catalog__list">
			<CatalogItem
				v-for="catalogItem in catalogData"
				:key="catalogItem.id"
				:catalog-item-data="catalogItem"
				class="catalog-list__item"
			/>
		</ul>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue';
	import { ICategory } from '@/types';
	import CatalogItem from '@/components/catalog/CatalogItem.vue';

	export default defineComponent({
		name: 'Catalog',
		components: { CatalogItem },
		props: {
			catalogData: {
				type: Array as PropType<ICategory[]>,
				default: () => [],
			},
		}
	});
</script>

<style scoped lang="scss">
	@import './src/styles/catalog/catalog';
</style>
