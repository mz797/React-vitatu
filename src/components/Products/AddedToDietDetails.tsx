import { DietClass } from "../../types/Diet";
import classes from './AddedToDietDetails.module.css'
type MyProps = {
	dietProduct: DietClass;
	onClose: () => void;
};
const AddedToDietDetails = (props: MyProps) => {
	return (
		<div className={classes['macro-info-box']}>
			<h3>
				Do diety dodano:<br/> <span>{props.dietProduct.Name}</span>
			</h3>
			<div className={classes['macro-info']}>
				<p>Waga: {props.dietProduct.Amount}g</p>
				<p>Kcal: {Math.floor(props.dietProduct.Kcal)}</p>
				<p>
					Węglowodany: {Math.floor(props.dietProduct.Carbohydrates)}g
				</p>
				<p>Tłuszcz: {Math.floor(props.dietProduct.Fat)}g</p>
				<p>Białko: {Math.floor(props.dietProduct.Protein)}g</p>
			</div>
			<button onClick={props.onClose}>Zamknij</button>
		</div>
	);
};
export default AddedToDietDetails;
