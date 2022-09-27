import { IGoodCart, GoodCartParams } from "@/types";

export class GoodCart implements IGoodCart {
	public id;
	public name;
	public price;
	public qty;

	constructor({id, name, price, qty}: GoodCartParams) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.qty = qty;
	}
}
