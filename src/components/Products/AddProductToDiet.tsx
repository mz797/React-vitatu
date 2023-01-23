import useInput from "../../hooks/use-input";
import { ProductClass } from "../../types/Product";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Error from "../UI/Error";
import { DietClass } from "../../types/Diet";
import { useState } from "react";
import AddedToDietDetails from "./AddedToDietDetails";

import classes from "./AddProductToDiet.module.css";

const guid = () => {
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
	addToDiet: (prod: DietClass) => void;
	onClose: () => void;
};

const AddProductToDiet = (props: MyProps) => {
	const [dietProduct, setDietProduct] = useState<DietClass>();
	const [showDetails, setShowDetails] = useState(false);
	const product = props.product;
	const {
		value: enteredAmount,
		isValid: enteredAmountIsValid,
		hasError: amountHasError,
		valueChangeHandler: amountChangeHandler,
		inputBlurHandler: amountBlurHandler,
		reset: amountReset,
	} = useInput((value) => +value >= 1, "1");

	const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const dietProductTmp = new DietClass(
			enteredAmount,
			(product.Carbohydrates * enteredAmount) / 100,
			new Date(),
			(product.Fat * enteredAmount) / 100,
			product.Id,
			(product.Kcal * enteredAmount) / 100,
			product.Name,
			(product.Protein * enteredAmount) / 100,
			guid()
		);
		props.addToDiet(dietProductTmp);
		amountReset();
		setDietProduct(dietProductTmp);
		setShowDetails(true);
	};
	const closeDetailsHandler = () => {
		setShowDetails(false);
		props.onClose();
	};
	const closeAddtoProductHandler = () => {
		props.onClose();
	};

	return (
		<div className={classes["add-to-diet-box"]}>
			<Card>
				<>
					{!showDetails && !dietProduct && (
						<>
							<h3>Dodaj do diety</h3>
							<h4>{props.product.Name}</h4>
							<form onSubmit={submitFormHandler}>
								<Input
									label="Waga produktu[g]"
									type="number"
									id="amount"
									value={enteredAmount}
									onChange={amountChangeHandler}
									onBlur={amountBlurHandler}
									isValid={!amountHasError}></Input>
								{!enteredAmountIsValid && (
									<Error message="Wprowadz poprawną wartość"></Error>
								)}
								<div className={classes.btns}>
									<button
										type="submit"
										disabled={!enteredAmountIsValid}>
										Zapisz
									</button>
									<button
										type="button"
										onClick={closeAddtoProductHandler}>
										Anuluj
									</button>
								</div>
							</form>
						</>
					)}
					{showDetails && dietProduct && (
						<AddedToDietDetails
							dietProduct={dietProduct}
							onClose={closeDetailsHandler}></AddedToDietDetails>
					)}
				</>
			</Card>
		</div>
	);
};
export default AddProductToDiet;
