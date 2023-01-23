import { ProductClass } from "../../types/Product";
import Input from "../UI/Input";
import Error from "../UI/Error";
import useInput from "../../hooks/use-input";

import classes from "./EditAddProduct.module.css";

export const guid = () => {
	let s4 = () => {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	};
	//return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
	return (
		s4() +
		s4() +
		"-" +
		s4() +
		"-" +
		s4() +
		"-" +
		s4() +
		"-" +
		s4() +
		s4() +
		s4()
	);
};
type MyProps = {
	product: ProductClass;
	editProduct?: (product: ProductClass) => void;
	addProduct?: (product: ProductClass) => void;
};

const EditProduct = (props: MyProps) => {
	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: nameReset,
	} = useInput((value) => value.trim() !== "", props.product.Name);
	const {
		value: enteredKcal,
		isValid: enteredKcalIsValid,
		hasError: kcalHasError,
		valueChangeHandler: kcalChangeHandler,
		inputBlurHandler: kcalBlurHandler,
		reset: kcalReset,
	} = useInput(
		(value) => +value >= 0 && +value <= 1000 && value.trim() !== "",
		props.product.Kcal + ""
	);
	const {
		value: enteredCarbo,
		isValid: enteredCarboIsValid,
		hasError: carboHasError,
		valueChangeHandler: carboChangeHandler,
		inputBlurHandler: carboBlurHandler,
		reset: carboReset,
	} = useInput(
		(value) => +value >= 0 && +value <= 100 && value.trim() !== "",
		props.product.Carbohydrates + ""
	);
	const {
		value: enteredFat,
		isValid: enteredFatIsValid,
		hasError: fatHasError,
		valueChangeHandler: fatChangeHandler,
		inputBlurHandler: fatBlurHandler,
		reset: fatReset,
	} = useInput(
		(value) => +value >= 0 && +value <= 100 && value.trim() !== "",
		props.product.Fat + ""
	);
	const {
		value: enteredProtein,
		isValid: enteredProteinIsValid,
		hasError: proteinHasError,
		valueChangeHandler: proteinChangeHandler,
		inputBlurHandler: proteinBlurHandler,
		reset: proteinReset,
	} = useInput(
		(value) => +value >= 0 && +value <= 100 && value.trim() !== "",
		props.product.Protein + ""
	);

	let formIsValid = false;
	if (
		enteredCarboIsValid &&
		enteredFatIsValid &&
		enteredKcalIsValid &&
		enteredNameIsValid &&
		enteredProteinIsValid
	) {
		formIsValid = true;
	}
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (props.editProduct) {
			props.editProduct(
				new ProductClass(
					enteredCarbo,
					enteredFat,
					enteredKcal,
					enteredName,
					enteredProtein,
					props.product.Id
				)
			);
		} else if (props.addProduct) {
			props.addProduct(
				new ProductClass(
					enteredCarbo,
					enteredFat,
					enteredKcal,
					enteredName,
					enteredProtein,
					guid()
				)
			);
		}
		nameReset();
		kcalReset();
		carboReset();
		fatReset();
		proteinReset();
	};
	return (
		<div className={classes["form-box"]}>
			<div className={classes["add-product-box"]}>
				{props.editProduct && <h2>Edytuj Produkt</h2>}
				{props.addProduct && <h2>Dodaj Produkt</h2>}
				<form onSubmit={submitHandler}>
					<Input
						id="name"
						type="text"
						label="Nazwa"
						value={enteredName}
						onChange={nameChangeHandler}
						onBlur={nameBlurHandler}
						isValid={!nameHasError}></Input>
					{nameHasError && <Error message="Wymagany"></Error>}
					<Input
						id="kcal"
						type="number"
						label="Kcal"
						value={enteredKcal}
						onChange={kcalChangeHandler}
						onBlur={kcalBlurHandler}
						isValid={!kcalHasError}></Input>
					{kcalHasError && (
						<Error message="Podaj wartość z przedziału <0,1000>"></Error>
					)}
					<Input
						id="carbo"
						type="number"
						label="Węglowodany"
						value={enteredCarbo}
						onChange={carboChangeHandler}
						onBlur={carboBlurHandler}
						isValid={!carboHasError}></Input>
					{carboHasError && (
						<Error message="Podaj wartość z przedziału <0,100>"></Error>
					)}
					<Input
						id="fat"
						type="number"
						label="Tłuszcz"
						value={enteredFat}
						onChange={fatChangeHandler}
						onBlur={fatBlurHandler}
						isValid={!fatHasError}></Input>
					{fatHasError && (
						<Error message="Podaj wartość z przedziału <0,100>"></Error>
					)}
					<Input
						id="protein"
						type="number"
						label="Białko"
						value={enteredProtein}
						onChange={proteinChangeHandler}
						onBlur={proteinBlurHandler}
						isValid={!proteinHasError}></Input>
					{proteinHasError && (
						<Error message="Podaj wartość z przedziału <0,100>"></Error>
					)}
					<button disabled={!formIsValid}>
						{props.editProduct ? "Zapisz" : "Dodaj"}
					</button>
				</form>
			</div>
			<div className={classes["form-img"]}>
				<img src="../assets/images/addImg.jpg" alt="" />
			</div>
		</div>
	);
};
export default EditProduct;
