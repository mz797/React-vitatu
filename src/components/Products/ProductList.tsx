import { ProductClass } from "../../types/Product";
import Product from "./Product";
import classes from "./ProductList.module.css";

type MyProps = {
	products: ProductClass[];
	onAddProduct: (prod: ProductClass) => void;
};
const ProductList = (props: MyProps) => {
	const addToDietHandler = (product: ProductClass) => {
		props.onAddProduct(product);
	};
	return (
		<div className={classes["product-list-box"]}>
			<h2 className={classes.heading}>Lista produktów</h2>
			<ul className={classes["product-list"]}>
				{props.products.map((prod: ProductClass) => {
					return (
						<li key={prod.Id}>
							<Product
								product={prod}
								addToDiet={addToDietHandler}></Product>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default ProductList;
