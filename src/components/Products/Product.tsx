
import { ProductClass } from "../../types/Product";

import classes from './Product.module.css'

type ProductProps = {
	product: ProductClass;
	addToDiet: (prod: ProductClass) => void;
};
const Product = (props: ProductProps) => {
	const addToDietHandler=()=>{
		props.addToDiet(props.product)
	}
	return (
		<div className={classes.product}>
			<p>{props.product.Name}: </p>
            <p><span>E:</span>{props.product.Kcal}kcal </p>
            <p><span>W:</span>{props.product.Carbohydrates}g </p>
            <p><span>T:</span>{props.product.Fat}g </p>
            <p><span>B:</span>{props.product.Protein}g</p>
			<button onClick={addToDietHandler}>+</button>
			<button>edytuj</button>
		</div>
	);
};
export default Product;
