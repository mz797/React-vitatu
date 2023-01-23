

export type DietType = {
	amount: number;
	carbohydrates: number;
	date: Date;
	fat: number;
	idProd: string;
	kcal: number;
	name: string;
	protein: number;
  id: string
};
export class DietClass  {
    constructor(
      private amount: number,
      private carbohydrates: number,
      private date: Date,
      private fat: number,
      private idProd: string,
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
    get IdProd(): string {
      return this.idProd;
    }
    set IdProd(newId: string) {
      this.idProd = newId;
    }
    get Date(): Date {
      return this.date;
    }
    set Date(newDate) {
      this.date = newDate;
    }
    get Amount(): number {
      return this.amount;
    }
    set Amount(newAmount) {
      this.amount = newAmount;
    }
    get IdDiet(): string {
      return this.id;
    }
    set IdDiet(newId) {
      this.id = newId;
    }
  }