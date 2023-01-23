import { DietClass } from "../../types/Diet";
import Input from "../UI/Input";
import Error from "../UI/Error";
import useInput from "../../hooks/use-input";
import classes from "./EditDietProduct.module.css";
import Card from "../UI/Card";
import { ProductClass } from "../../types/Product";

type MyProps = {
	dietProduct: DietClass;
	originalProduct: ProductClass;
	onClose: () => void;
	onConfirm: (dietProduct: DietClass) => void;
};
const EditDietProduct = (props: MyProps) => {
	const {
		value: enteredAmount,
		hasError: amountHasError,
		valueChangeHandler: amountChangeHandler,
		inputBlurHandler: amountBlurHandler,
		reset: amountReset,
	} = useInput((value) => +value >= 1, props.dietProduct.Amount + "");

	const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (enteredAmount === props.dietProduct.Amount) {
			props.onClose();
		} else {
			const product = props.dietProduct;
			console.log(props.originalProduct);
			props.onConfirm(
				new DietClass(
					enteredAmount,
					(props.originalProduct.Carbohydrates * enteredAmount) / 100,
					product.Date,
					(props.originalProduct.Fat * enteredAmount) / 100,
					product.IdProd,
					(props.originalProduct.Kcal * enteredAmount) / 100,
					product.Name,
					(props.originalProduct.Protein * enteredAmount) / 100,
					product.IdDiet
				)
			);
		}

		amountReset();
	};
	return (
		<form onSubmit={formHandler} className={classes.form}>
			<Card>
				<>
					<h3>Edytuj produkt</h3>
					<h4>{props.dietProduct.Name}</h4>
					<Input
						id="amount"
						type="number"
						label="ilość"
						value={enteredAmount}
						onChange={amountChangeHandler}
						onBlur={amountBlurHandler}
						isValid={enteredAmount.hasError}></Input>
					{amountHasError && (
						<Error message="Wprowadź poprawną wartość"></Error>
					)}
					<div className={classes.btns}>
						<button type="submit" disabled={amountHasError}>
							Zapisz
						</button>
						<button onClick={props.onClose}>Anuluj</button>
					</div>
				</>
			</Card>
		</form>
	);
};
export default EditDietProduct;
