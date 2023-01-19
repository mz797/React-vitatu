//import Error from './../UI/Error'
import { useState } from "react";
import { ProductClass } from "../../types/Product";
import Input from "./Input";
import Error from "./Error";
import classes from "./Validate.module.css";

type validateProps = {
	products: ProductClass[];
	onAddProduct: (prod: ProductClass) => void;
};

const Validate = (props: validateProps) => {
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [kcal, setKcal] = useState(0);
	const [carbo, setCarbo] = useState(0);
	const [fat, setFat] = useState(0);
	const [protein, setProtein] = useState(0);

	const [idIsValid, setIdIsValid] = useState(false);
	const [nameIsValid, setNameIsValid] = useState(false);
	const [kcalIsValid, setKcalIsValid] = useState(false);
	const [carboIsValid, setCarboIsValid] = useState(false);
	const [fatIsValid, setFatIsValid] = useState(false);
	const [proteinIsValid, setProteinIsValid] = useState(false);

	const idHandler = (e: React.FormEvent<HTMLInputElement>) => {
		if (typeof e.currentTarget.value === "string") {
			setId(e.currentTarget.value);
		} else {
			setId(e.currentTarget.value + "");
		}
		if (props.products.find((p) => +p.Id === +e.currentTarget.value))
			setIdIsValid(false);
		else setIdIsValid(true);
	};
	const nameHandler = (e: React.FormEvent<HTMLInputElement>) => {
		if (typeof e.currentTarget.value === "string") {
			setName(e.currentTarget.value);
		} else {
			setName(e.currentTarget.value + "");
		}
		if (
			e.currentTarget.value.trim().length !== 0 &&
			/^[a-zA-Z]+$/.test(e.currentTarget.value)
		)
			setNameIsValid(true);
		else setNameIsValid(false);
	};
	const kcalHandler = (e: React.FormEvent<HTMLInputElement>) => {
		if (typeof e.currentTarget.value === "number") {
			setKcal(e.currentTarget.value);
		} else {
			setKcal(+e.currentTarget.value);
		}
		if (+e.currentTarget.value < 0 || +e.currentTarget.value > 1000)
			setKcalIsValid(false);
		else setKcalIsValid(true);
	};
	const carboHandler = (e: React.FormEvent<HTMLInputElement>) => {
		if (typeof e.currentTarget.value === "number") {
			setCarbo(e.currentTarget.value);
		} else {
			setCarbo(+e.currentTarget.value);
		}
		if (+e.currentTarget.value < 0 || +e.currentTarget.value > 100)
			setCarboIsValid(false);
		else setCarboIsValid(true);
	};
	const fatHandler = (e: React.FormEvent<HTMLInputElement>) => {
		if (typeof e.currentTarget.value === "number") {
			setFat(e.currentTarget.value);
		} else {
			setFat(+e.currentTarget.value);
		}
		if (+e.currentTarget.value < 0 || +e.currentTarget.value > 100)
			setFatIsValid(false);
		else setFatIsValid(true);
	};
	const proteinHandler = (e: React.FormEvent<HTMLInputElement>) => {
		if (typeof e.currentTarget.value === "number") {
			setProtein(e.currentTarget.value);
		} else {
			setProtein(+e.currentTarget.value);
		}
		if (+e.currentTarget.value < 0 || +e.currentTarget.value > 100)
			setProteinIsValid(false);
		else setProteinIsValid(true);
	};
	const addProductHandler = (e: any) => {
		e.preventDefault();
		if (
			idIsValid &&
			nameIsValid &&
			kcalIsValid &&
			carboIsValid &&
			fatIsValid &&
			proteinIsValid
		) {
			console.log(carbo);
			props.onAddProduct(
				new ProductClass(carbo, fat, kcal, name, protein, id)
			);
			setId("");
			setName("");
			setKcal(0);
			setCarbo(0);
			setFat(0);
			setProtein(0);
			setIdIsValid(false);
			setNameIsValid(false);
			setKcalIsValid(false);
			setCarboIsValid(false);
			setFatIsValid(false);
			setProteinIsValid(false);
		}
	};

	return (
		<div className={classes["form-group"]}>
			<h2>Dodaj produkt</h2>
			<form onSubmit={addProductHandler}>
				<Input
					id="id"
					type="text"
					label="Id"
					value={id}
					onChange={idHandler}></Input>
				{!idIsValid && <Error message="Unikalny klucz"></Error>}
				<Input
					id="name"
					type="text"
					label="Nazwa"
					value={name}
					onChange={nameHandler}></Input>
				{!nameIsValid && <Error message="Wymagany"></Error>}
				<Input
					id="kcal"
					type="number"
					label="Kcal"
					value={kcal + ""}
					onChange={kcalHandler}></Input>
				{!kcalIsValid && <Error message="<0,1000>"></Error>}
				<Input
					id="carbo"
					type="number"
					label="Węglowodany"
					value={carbo + ""}
					onChange={carboHandler}></Input>
				{!carboIsValid && <Error message="<0,1000>"></Error>}
				<Input
					id="fat"
					type="number"
					label="Tłuszcz"
					value={fat + ""}
					onChange={fatHandler}></Input>
				{fatIsValid && <Error message="<0,1000>" ></Error>}
				<Input
					id="protein"
					type="number"
					label="Białko"
					value={protein + ""}
					onChange={proteinHandler}></Input>
				{proteinIsValid && <Error message="<0,1000>" ></Error>}
				<button type="submit">Dodaj</button>
			</form>
		</div>
	);
};
export default Validate;
