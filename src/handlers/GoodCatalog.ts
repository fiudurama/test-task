import { IGoodCatalog, GoodCatalogParams } from "@/types";

export class GoodCatalog implements IGoodCatalog {
	public id;
	public name;
	public price;
	public availableQty;

	constructor({id, name, price, availableQty}: GoodCatalogParams) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.availableQty = availableQty;
	}
}
