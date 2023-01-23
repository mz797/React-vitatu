import { DietClass } from "../../types/Diet";
import Moment from "moment";
import classes from "./DietItem.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth";
import { useNavigate } from "react-router-dom";

type MyProps = {
	product: DietClass;
	onEdit: (product: DietClass) => void;
};
const DietItem = (props: MyProps) => {
	const navigate = useNavigate();
	const user = useSelector(selectUser);

	const [showDetails, setShowDetails] = useState(false);

	const deleteDietItemHandler = () => {
		navigate(`/diet/${props.product.IdDiet}`);
	};
	const toggleDetailsHandler = () => {
		setShowDetails((prev) => !prev);
	};
	const editHandler = () => {
		props.onEdit(props.product);
	};
	return (
		<>
			<div className={classes.product}>
				<p className={classes["details-parag"]}>
					{Moment(props.product.Date).format("HH:mm")} <span>||</span>{" "}
					{props.product.Name}:{" "}
					<span>
						{props.product.Kcal.toFixed()}
						{" kcal"}
					</span>
				</p>
				<div className="btns">
					<button onClick={toggleDetailsHandler}>?</button>
					<button onClick={editHandler}>
						<i className="fa-solid fa-pen"></i>
					</button>

					<button onClick={deleteDietItemHandler}>x</button>
				</div>
			</div>
			{showDetails && (
				<div className={classes.details}>
					<p className={classes["details-parag"]}>
						Waga: {props.product.Amount}g{" "}
					</p>
					<p className={classes["details-parag"]}>
						Węglowodany: {props.product.Carbohydrates.toFixed()}g{" "}
					</p>
					<p className={classes["details-parag"]}>
						Tłuszcz: {props.product.Fat.toFixed()}g{" "}
					</p>
					<p className={classes["details-parag"]}>
						Białko: {props.product.Protein.toFixed()}g{" "}
					</p>
					{user.Diabets && (
						<>
							<p className={classes["details-parag"]}>
								<b>
									WW:{" "}
									{(props.product.Carbohydrates / 10).toFixed(
										2
									)}
								</b>
							</p>
							<p className={classes["details-parag"]}>
								<b>
									WBT:{" "}
									{(
										(props.product.Protein * 4 +
											props.product.Fat * 9) /
										100
									).toFixed(2)}
								</b>
							</p>
						</>
					)}
				</div>
			)}
		</>
	);
};
export default DietItem;
