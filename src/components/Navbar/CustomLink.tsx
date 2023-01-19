import { Link, useMatch, useResolvedPath } from "react-router-dom";

type MyProps = {
	to: string;
	children: string;
};
const CustomLink = (props: MyProps) => {
	const resolvePath = useResolvedPath(props.to);
	const isActive = useMatch({ path: resolvePath.pathname, end: true });

	return (
		<li className={isActive ? "active" : ""}>
			<Link to={props.to}>{props.children}</Link>
		</li>
	);
};
export default CustomLink;
