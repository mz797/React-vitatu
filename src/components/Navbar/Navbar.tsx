import CustomLink from "./CustomLink";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
	
	return (
		<nav className="nav">
			<Link to="/" className="site-title">
				Vitatu
			</Link>
			<ul>
				<CustomLink to="/diet">Dieta</CustomLink>
				<CustomLink to="/products">Produkty</CustomLink>
				<CustomLink to="/add-product">Dodaj produkt</CustomLink>
			</ul>
		</nav>
	);
};
export default Navbar;
