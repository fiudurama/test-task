<template>
	<component
		:is="tag"
		class="category"
	>
		<p class="category-name category__name">
			<span class="category-name__text">{{ catalogItemData.name }}</span>
		</p>
		<Goods
			:goods-data="catalogItemData.goods"
			class="category__goods"
		/>
	</component>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue';
	import { ICategory } from '@/types';
	import Goods from '@/components/catalog/Goods.vue';

	export default defineComponent({
		name: 'CatalogItem',
		components: { Goods },
		props: {
			tag: {
				type: String,
				default: 'li',
			},
			catalogItemData: {
				type: Object as PropType<ICategory>,
				default: () => ({}),
			},
		},
	});
</script>

<style scoped lang="scss">
	@import './src/styles/catalog/catalog-item';
</style>
