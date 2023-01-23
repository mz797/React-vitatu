import classes from "./Error.module.css";
type ErrorProps = {
	message: string;
};

const Error = (props: ErrorProps) => {
	return (
		<div className={classes.error}>
			<p >{props.message}</p>
		</div>
	);
};
export default Error;
