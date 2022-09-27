<template>
	<ul class="goods-list">
		<GoodsItem
			v-for="goodsItemData in goodsData"
			:key="goodsItemData.id"
			:good-data="goodsItemData"
			class="goods-list__item"
		/>
	</ul>
</template>

<script lang="ts">
	import { defineComponent, PropType } from 'vue';
	import { IGoodCatalog } from '@/types';
	import GoodsItem from '@/components/catalog/GoodsItem.vue';

	export default defineComponent({
		name: 'Goods',
		components: { GoodsItem },
		props: {
			goodsData: {
				type: Array as PropType<IGoodCatalog[]>,
				default: () => [],
			},
		},
	});
</script>

<style scoped lang="scss">
	@import './src/styles/catalog/goods';
</style>
