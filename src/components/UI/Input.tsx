import classes from "./Input.module.css";

type inputProps = {
	label: string;
	type: string;
	id: string;
	value: string;
	onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Input = (props: inputProps) => {
	return (
		<div className={classes.input}>
			<label htmlFor={props.id}>{props.label}:</label>
			<input
				type={props.type}
				value={props.value}
				id={props.id}
				onChange={props.onChange}></input>
		</div>
	);
};
export default Input;
