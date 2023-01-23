import CustomLink from "./CustomLink";
import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../store/auth";
const Navbar = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	console.log(isAuthenticated);
	return (
		<nav className={classes.nav}>
			<Link to="/" className={classes["site-title"]}>
				<i className="fa-solid fa-bowl-food"></i>
				Vitatu
			</Link>
			<ul>
				{isAuthenticated && (
					<>
						<CustomLink to="/diet">Dieta</CustomLink>
						<CustomLink to="/products">Produkty</CustomLink>
						<CustomLink to="/add-product">Dodaj produkt</CustomLink>
						<CustomLink to="/diet-history">Historia</CustomLink>
						<CustomLink to="/user">Profil</CustomLink>
					</>
				)}
				{!isAuthenticated && (
					<CustomLink to="/login">Zaloguj</CustomLink>
				)}
			</ul>
		</nav>
	);
};
export default Navbar;
