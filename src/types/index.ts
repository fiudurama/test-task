export type GoodsRaw = {
    B: boolean;
    C: number;
    CV: unknown;
    G: number;
    P: number;
    Pl: unknown;
    T: number;
}

export type GoodsRawResponse = {
    Error: string;
    Id: number;
    Success: boolean;
    Value: Record<string, GoodsRaw[]>;
}

export interface IGood {
    id: number;
    name: string;
    price: number;
}

export interface IGoodCatalog extends IGood {
	availableQty: number;
}

export interface IGoodCart extends IGood {
	qty: number;
}

export type CategoryGoodRaw = {
    N: string;
    T: string | number;
}

export type CategoryGoods = {
    [id:string]: CategoryGoodRaw;
}

export type CategoryRaw = {
    G: string;
    C?: number;
    B: CategoryGoods;
}

export type CategoryResponse = {
    [id:string]: CategoryRaw;
}

export interface ICategory {
    id: number;
    name: string;
    goods: IGoodCatalog[];
}

export type CategoryParams = {
	id: number;
	name: string;
	goods: IGoodCatalog[];
}

export type GoodCatalogParams = {
	id: number;
	name: string;
	price: number;
	availableQty: number;
}

export type GoodCartParams = {
	id: number;
	name: string;
	price: number;
	qty: number;
}
