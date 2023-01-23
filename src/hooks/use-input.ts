import { useReducer } from "react";

const initialInputState = {
	value: "",
	isTouched: false,
};
const inputStateReducer = (state: { isTouched: any; value: any; }, action: { type: string; value: any; }) => {
	if (action.type === "INPUT") {
		return {
			value: action.value,
			isTouched: state.isTouched,
		};
	} else if (action.type === "BLUR") {
		return {
			value: state.value,
			isTouched: true,
		};
	} else if (action.type === "RESET") {
		return {
			value: "",
			isTouched: false,
		};
	}
	return initialInputState;
};
const useInput = (validateValue: (arg0: any) => boolean,value:string) => {
	const [inputState, dispatch] = useReducer(
		inputStateReducer,
		{value: value,
        isTouched: false,}
	);

	const valueIsValid = validateValue(inputState.value);
	const hasError = !valueIsValid && inputState.isTouched;

	const valueChangeHandler = (event:React.FormEvent<HTMLInputElement> ) => {
		dispatch({ type: "INPUT", value: event.currentTarget.value });
	};
	const inputBlurHandler = (event: React.FormEvent<HTMLInputElement>) => {
		dispatch({ type: "BLUR",value:'' });
	};
	const reset = () => {
		dispatch({ type: "RESET",value:'' });
	};

	return {
		value: inputState?.value ?? '',
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInput;
