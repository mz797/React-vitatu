
import { ProductClass } from "../../types/Product";
import classes from './DietItem.module.css'

type ProductProps = {
	product: ProductClass;
    onDelete:(product:ProductClass)=>void;
};
const DietItem = (props: ProductProps) => {
	const deleteDietItemHandler=()=>{
        props.onDelete(props.product)
        // console.log(props.product)
    }
	return (
		<div className={classes.product}>
			<p>{props.product.Name}: </p>
            <p><span>E:</span>{props.product.Kcal}kcal </p>
            <p><span>W:</span>{props.product.Carbohydrates}g </p>
            <p><span>T:</span>{props.product.Fat}g </p>
            <p><span>B:</span>{props.product.Protein}g</p>
            <button onClick={deleteDietItemHandler}>Usuń</button>
            {/* <button onClick={deleteDietItemHandler} >usuń</button> */}
		</div>
	);
};
export default DietItem;
