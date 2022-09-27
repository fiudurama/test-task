import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import axios from 'axios';
import {
	IGoodCart,
	IGoodCatalog,
	GoodsRawResponse,
	ICategory,
	CategoryResponse,
} from '@/types';
import { Category } from '@/handlers/Category';
import { GoodCatalog } from '@/handlers/GoodCatalog';

interface IState {
	catalog: ICategory[],
	cart: IGoodCart[],
	rate: number,
}

export const injectionKey: InjectionKey<Store<IState>> = Symbol();

export const store = createStore<IState>({
	state: {
		catalog: [],
		cart: [],
		rate: 70,
	},
	getters: {
		getRate: (state): number => state.rate,
		getCatalog: (state): ICategory[] => state.catalog,
		getCatalogItem: (state): IGoodCatalog | unknown => (id: number) => state.catalog.map((item) => item.goods).flat().find((item) => item.id === id),
		getCartGoods: (state): IGoodCart[] => state.cart,
		getCartItem: (state) => (id: number): IGoodCart | unknown => state.cart.find((item) => item.id === id),
		getCartTotalAmount: (state): number => state.cart.reduce((acc, good) => acc + good.qty, 0),
		getCartTotalPrice: (state): string => state.cart.reduce((acc, good) => acc + good.price * good.qty * state.rate, 0).toFixed(2),
	},
	mutations: {
		updateData(state, payload: ICategory[]) {
			state.catalog = payload;
		},
		addToCart(state, payload: IGoodCart) {
			state.cart.push(payload)
		},
		updateCartItem(state, payload) {
			const {cartItem, qty} = payload;
			const currentGood = state.cart.find((item) => item.id === cartItem.id);

			if (currentGood) {
				currentGood.qty += qty;
			}
		},
		increaseCartItemCount(state, payload: number) {
			const currentGood = state.cart.find((item) => item.id === payload);

			if (currentGood) {
				currentGood.qty++;
			}
		},
		decreaseCartItemCount(state, payload: number) {
			const currentGood = state.cart.find((item) => item.id === payload);

			if (currentGood) {
				currentGood.qty--;
			}
		},
		deleteCartItem(state, payload: number) {
			const goodIndex = state.cart.findIndex((item) => item.id === payload);

			if (goodIndex != -1) {
				state.cart.splice(goodIndex, 1);
			}
		},
		updateRate(state, payload: number) {
			state.rate = payload;
		}
	},
	actions: {
		async getData({commit}) {
			try {
				const categories = await axios.get<CategoryResponse>('./names.json').then((response) => response.data);
				const goodsData = await axios.get<GoodsRawResponse>('./data.json').then((response) => response.data.Value.Goods);
				const result: ICategory[] = [];

				for (const [categoryId, categoryData] of Object.entries(categories)) {
					const availableGoods = goodsData.filter((item) => item.G === Number(categoryId));

					if (availableGoods.length) {
						const goods = availableGoods.map((item) => new GoodCatalog({
							id: item.T,
							name: categoryData.B[item.T].N,
							price: item.C,
							availableQty: item.P,
						}));
						const category = new Category({
							id: Number(categoryId),
							name: categoryData.G,
							goods: goods,
						});

						result.push(category);
					}
				}

				commit('updateData', result);

				return result;
			} catch (error) {
				console.error(error);
			}
		},
	},
});

export const useStore = (): Store<IState> => baseUseStore(injectionKey);
