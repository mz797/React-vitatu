import { ProductClass } from "../../types/Product";
import Input from "../UI/Input";
import Error from "../UI/Error";
import useInput from "../../hooks/use-input";

type MyProps = {
	product: ProductClass;
	editProduct: (product: ProductClass) => void;
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
		(value) => +value >= 0 && +value <= 1000,
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
		(value) => +value >= 0 && +value <= 100,
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
		(value) => +value >= 0 && +value <= 100,
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
		(value) => +value >= 0 && +value <= 100,
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
		nameReset();
		kcalReset();
		carboReset();
		fatReset();
		proteinReset();
	};
	return (
		<>
			<h2>Edytuj Produkt</h2>
			<form onSubmit={submitHandler}>
				<Input
					id="name"
					type="text"
					label="Nazwa"
					value={enteredName}
					onChange={nameChangeHandler}
					onBlur={nameBlurHandler}></Input>
				{nameHasError && <Error message="Wymagany"></Error>}
				<Input
					id="kcal"
					type="number"
					label="Kcal"
					value={enteredKcal}
					onChange={kcalChangeHandler}
					onBlur={kcalBlurHandler}></Input>
				{kcalHasError && <Error message="<0,1000>"></Error>}
				<Input
					id="carbo"
					type="number"
					label="Węglowodany"
					value={enteredCarbo}
					onChange={carboChangeHandler}
					onBlur={carboBlurHandler}></Input>
				{carboHasError && <Error message="<0,1000>"></Error>}
				<Input
					id="fat"
					type="number"
					label="Tłuszcz"
					value={enteredFat}
					onChange={fatChangeHandler}
					onBlur={fatBlurHandler}></Input>
				{fatHasError && <Error message="<0,1000>"></Error>}
				<Input
					id="protein"
					type="number"
					label="Białko"
					value={enteredProtein}
					onChange={proteinChangeHandler}
					onBlur={proteinBlurHandler}></Input>
				{proteinHasError && <Error message="<0,1000>"></Error>}
				<button disabled={!formIsValid}>Zapisz</button>
			</form>
		</>
	);
};
export default EditProduct;
