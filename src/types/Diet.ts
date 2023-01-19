import { ProductClass } from "./Product";

export type DietType = {
	amount: number;
	carbohydrates: number;
	date: Date;
	fat: number;
	id: string;
	kcal: number;
	name: string;
	protein: number;
    idDiet?: string
};

export class Diet extends ProductClass {
    private date: Date;
    private amount: number;
    private idDiet: string;
    constructor(
      amount: number,
      carbo: number,
      date: Date,
      fat: number,
      id: string,
      kcal: number,
      name: string,
      protein: number,
      idDiet: string
    ) {
      super(carbo, fat, kcal, name, protein, id);
      this.date = date;
      this.amount = amount;
      this.idDiet = idDiet;
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
      return this.idDiet;
    }
    set IdDiet(newId) {
      this.IdDiet = newId;
    }
  }