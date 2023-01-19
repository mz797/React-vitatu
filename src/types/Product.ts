export type ProductType = {
	id: string;
	name: string;
	kcal: number;
	carbohydrates: number;
	fat: number;
	protein: number;
};
export class ProductClass {
	constructor(
		private carbohydrates: number,
		private fat: number,
		private kcal: number,
		private name: string,
		private protein: number,
		private id: string
	) {}

	get Name(): string {
		return this.name;
	}
	set Name(newName: string) {
		this.name = newName;
	}
	get Kcal(): number {
		return this.kcal;
	}
	set Kcal(newKcal: number) {
		this.kcal = newKcal;
	}
	get Fat(): number {
		return this.fat;
	}
	set Fat(newFat: number) {
		this.fat = newFat;
	}
	get Carbohydrates(): number {
		return this.carbohydrates;
	}
	set Carbohydrates(newCarbohydrates: number) {
		this.carbohydrates = newCarbohydrates;
	}
	get Protein(): number {
		return this.protein;
	}
	set Protein(newProtein: number) {
		this.protein = newProtein;
	}
	get Id(): string {
		return this.id;
	}
	set Id(newId: string) {
		this.id = newId;
	}
}
