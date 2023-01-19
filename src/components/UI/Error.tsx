import classes from "./Error.module.css";
type ErrorProps = {
	message: string;
};

const Error = (props: ErrorProps) => {
	return (
		<div>
			<p className={classes.invalid}>{props.message}</p>
		</div>
	);
};
export default Error;
