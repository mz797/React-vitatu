import classes from "./Input.module.css";

type inputProps = {
	label: string;
	type: string;
	id: string;
	value: string;
	isValid: boolean;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Input = (props: inputProps) => {
	return (
		<div className={classes["input-box"]}>
			<label htmlFor={props.id}>{props.label}:</label>
			<input
				type={props.type}
				value={props.value}
				id={props.id}
				onChange={props.onChange}
				onBlur={props.onBlur}
				className={props.isValid ? "" : classes.invalid}></input>
		</div>
	);
};
export default Input;
