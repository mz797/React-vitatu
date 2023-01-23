export class User {
	private bmr: number = 0;
	private carbsDaily: number = 0;
	private proteineDaily: number = 0;
	private fatDaily: number = 0;
	constructor(
		private name: string,
		private age: number,
		private height: number,
		private weight: number,
		private activity: number,
		private gender: string,
		private diabets: boolean,
		private goal: number
	) {
		this.countBMR();
	}
	get Name(): string {
		return this.name;
	}
	set Name(name: string) {
		this.name = name;
	}
	get Age(): number {
		return this.age;
	}
	set Age(age: number) {
		this.age = age;
	}
	get Height(): number {
		return this.height;
	}
	set Height(height: number) {
		this.height = height;
	}
	get Weight(): number {
		return this.weight;
	}
	set Weight(weight: number) {
		this.weight = weight;
	}
	get Activity(): number {
		return this.activity;
	}
	set Activity(activity: number) {
		this.activity = activity;
	}
	get Gender(): string {
		return this.gender;
	}
	set Gender(gender: string) {
		this.gender = gender;
	}
	get Diabets(): boolean {
		return this.diabets;
	}
	set Diabets(diabets: boolean) {
		this.diabets = diabets;
	}
	get Goal(): number {
		return this.goal;
	}
	set Goal(goal: number) {
		this.goal = goal;
	}
	get BMR(): number {
		return this.bmr;
	}
	get Carbs(): number {
		return this.carbsDaily;
	}
	get Protein(): number {
		return this.proteineDaily;
	}
	get Fat(): number {
		return this.fatDaily;
	}
	countBMR(): void {
		if (this.gender === "Kobieta") {
			this.bmr =
				(655 + 9.6 * this.weight + 1.8 * this.height - 4.7 * this.age) *
				this.Activity;
		} else {
			this.bmr =
				(66 + 13.7 * this.weight + 5 * this.height - 6.8 * this.age) *
				this.Activity;
		}
		this.countCarbs();
		this.countProtein();
		this.countFat();
	}
	countCarbs(): void {
		this.carbsDaily = (0.55 * this.bmr) / 4;
	}
	countProtein(): void {
		this.proteineDaily = (0.2 * this.bmr) / 4;
	}
	countFat(): void {
		this.fatDaily = (0.35 * this.bmr) / 9;
	}
}
