import classes from "./Error.module.css";
type ErrorProps = {
	message: string;
	status: boolean;
};

const Error = (props: ErrorProps) => {
	return (
		<div>
			{props.status ? (
				<p className={classes.valid}>{props.message}</p>
			) : (
				<p className={classes.invalid}>{props.message}</p>
			)}
		</div>
	);
};
export default Error;
