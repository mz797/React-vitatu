import { useState } from "react";
import { ProductClass } from "../../types/Product";

import classes from "./Product.module.css";

type ProductProps = {
	product: ProductClass;
	addToDiet: (prod: ProductClass) => void;
	deleteProduct: (id: string) => void;
	openEdit: (prod: ProductClass) => void;
};
const Product = (props: ProductProps) => {
	const [showDetails, setShowDetails] = useState(false);
	
	const addToDietHandler = () => {
		props.addToDiet(props.product);
	};
	const deleteHandler = () => {
		props.deleteProduct(props.product.Id);
	};
	const editProductHandler = () => {
		props.openEdit(props.product);
	};
	const showDetailsHandler = () => {
		setShowDetails((prev) => {
			return !prev;
		});
	};

	let detailsClasses = "product-details";
	if (showDetails) {
		detailsClasses = "product-details active";
	}
	return (
		<div className={classes["product-box"]}>
			<div className={classes.product}>
				<div className={classes.text}>
					<p className={classes["details-parag"]}>
						{props.product.Name}:{" "}
						<span>{props.product.Kcal} kcal</span>
					</p>
				</div>

				<div className="btns">
					<button onClick={showDetailsHandler}>?</button>
					<button onClick={addToDietHandler}>+</button>
					<button onClick={editProductHandler}>
						<i className="fa-solid fa-pen"></i>
					</button>
					<button onClick={deleteHandler}>x</button>
				</div>
			</div>
			<div className={classes[detailsClasses]}>
				<p
					className={
						classes["details-parag"]
					}>{`Węglowodany:  ${props.product.Carbohydrates}g`}</p>
				<p
					className={
						classes["details-parag"]
					}>{`Tłuszcz: ${props.product.Fat}g`}</p>
				<p
					className={
						classes["details-parag"]
					}>{`Białko: ${props.product.Protein}g`}</p>
			</div>
		</div>
	);
};
export default Product;
