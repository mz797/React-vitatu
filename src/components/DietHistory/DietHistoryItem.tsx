import Moment from "moment";
import { DietClass } from "../../types/Diet";
import { useState } from "react";

import classes from "./DietHistoryItem.module.css";

type MyProps = {
	product: DietClass;
};
const DietHistoryItem = (props: MyProps) => {
	const [showDetails, setShowDetails] = useState(false);
	let detailsClasses = "details";
	if (showDetails) {
		detailsClasses = "details active";
	}

	const toggleDetailsHandler = () => {
		setShowDetails((prev) => !prev);
	};
	return (
		<div className={classes.history}>
			<div className={classes.product}>
				<p>
					{Moment(props.product.Date).format("HH:mm")}
					<span>||</span>
					{props.product.Name}: <span>{props.product.Kcal} kcal</span>
				</p>
				<button onClick={toggleDetailsHandler}>?</button>
			</div>
			{showDetails && (
				<div className={classes[detailsClasses]}>
					<p className={classes["details-parag"]}>
						Waga: {props.product.Amount}g{" "}
					</p>
					<p className={classes["details-parag"]}>
						Węglowodany: {props.product.Carbohydrates.toFixed()}g
					</p>
					<p className={classes["details-parag"]}>
						Tłuszcz: {props.product.Fat.toFixed()}g{" "}
					</p>
					<p className={classes["details-parag"]}>
						Białko: {props.product.Protein.toFixed()}g{" "}
					</p>
					
				</div>
			)}
		</div>
	);
};
export default DietHistoryItem;
