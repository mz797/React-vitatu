
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import classes from "./CustomLink.module.css";

type MyProps = {
	to: string;
	children: string;
};
const CustomLink = (props: MyProps) => {
	const resolvePath = useResolvedPath(props.to);
	const isActive = useMatch({ path: resolvePath.pathname, end: true });

	let liClasses = `${classes.li}`;
	if (isActive) {
		liClasses = `${classes.li} ${classes.active}`;
	}

	return (
		<li className={liClasses}>
			<Link to={props.to}>{props.children}</Link>
		</li>
	);
};
export default CustomLink;
