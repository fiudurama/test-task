import { CategoryParams, ICategory } from "@/types";

export class Category implements ICategory {
	public id;
	public name;
	public goods;

	constructor({id, name, goods}: CategoryParams) {
		this.id = id;
		this.name = name;
		this.goods = goods;
	}
}
