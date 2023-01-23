import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { User } from "../../types/User";
import Card from "../UI/Card";
import EditUser from "./EditUser";

import classes from "./UserSite.module.css";

type MyProps = {
	user: User;
};
const UserSite = (props: MyProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	let activityText;
	let goalText;
	props.user.Activity === 1.2
		? (activityText = "Prawie brak")
		: props.user.Activity === 1.375
		? (activityText = "Lekka aktywność")
		: props.user.Activity === 1.55
		? (activityText = "Umiarkowana aktywność")
		: props.user.Activity === 1.725
		? (activityText = "Duża aktywność")
		: (activityText = "Bardzo duża aktywność");
	props.user.Goal === 0
		? (goalText = "Schudnąć")
		: props.user.Goal === 1
		? (goalText = "Utrzymać obecną wagę")
		: (goalText = "Przytyć");

	const openEditHandller = () => {
		setIsEditing(true);
	};
	const closeEditingHandler = () => {
		setIsEditing(false);
	};
	const logoutHandler = () => {
		dispatch(authActions.logout());
		navigate("/login");
	};
	return (
		<>
			<Card>
				<>
					{!isEditing && (
						<div className={classes["usersite-box"]}>
							<div className={classes["heading"]}>
								<h3>Witaj {props.user.Name} </h3>
								<i className="fa-regular fa-user"></i>
							</div>
							<hr />
							<div className={classes["user-info"]}>
								<div className={classes["user-info-left"]}>
									<p>
										<span>Wiek:</span> {props.user.Age}{" "}
										lat/a{" "}
									</p>
									<p>
										<span>Wzrost:</span> {props.user.Height}
										cm
									</p>
									<p>
										<span>Waga:</span> {props.user.Weight}kg{" "}
									</p>
									<p>
										<span>Płeć:</span> {props.user.Gender}{" "}
									</p>
									<p>
										<span>Aktywność:</span> {activityText}{" "}
									</p>
									<p>
										<span>Cel:</span> {goalText}{" "}
									</p>
									<p>
										<span>Cukrzyca:</span>{" "}
										{props.user.Diabets ? "Tak" : "Nie"}{" "}
									</p>
								</div>
								<div className={classes["user-info-right"]}>
									<p>
										<span>Zapotrzebowanie:</span>{" "}
										{props.user.BMR.toFixed(0)} kcal{" "}
									</p>
									<p>
										<span>Węglowodany:</span>{" "}
										{props.user.Carbs.toFixed(0)} g{" "}
									</p>
									<p>
										<span>Białko:</span>{" "}
										{props.user.Protein.toFixed(0)} g{" "}
									</p>
									<p>
										<span>Tłuszcz:</span>{" "}
										{props.user.Fat.toFixed(0)} g{" "}
									</p>
								</div>
							</div>
							<div className={classes["btns"]}>
								<button onClick={openEditHandller}>
									Edytuj
								</button>
								<button onClick={logoutHandler}>Wyloguj</button>
							</div>
						</div>
					)}

					{isEditing && (
						<EditUser
							user={props.user}
							onClose={closeEditingHandler}></EditUser>
					)}
				</>
			</Card>
			{/* <Card>
			</Card> */}
		</>
	);
};
export default UserSite;
