import useInput from "../../hooks/use-input";
import { User } from "../../types/User";
import Input from "../UI/Input";
import Error from "../UI/Error";
import "./EditUser.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

type MyProps = {
	user: User;
	onClose: () => void;
};
const EditUser = (props: MyProps) => {
	const dispatch = useDispatch();

	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
	} = useInput((value) => value?.trim() !== "", props.user.Name);
	const {
		value: enteredAge,
		isValid: enteredAgeIsValid,
		hasError: ageHasError,
		valueChangeHandler: ageChangeHandler,
		inputBlurHandler: ageBlurHandler,
	} = useInput((value) => +value >= 18, props.user.Age + "");
	const {
		value: enteredHeight,
		isValid: enteredHeightIsValid,
		hasError: heightHasError,
		valueChangeHandler: heightChangeHandler,
		inputBlurHandler: heightBlurHandler,
	} = useInput((value) => +value >= 130, props.user.Height + "");
	const {
		value: enteredWeight,
		isValid: enteredWeightIsValid,
		hasError: weightHasError,
		valueChangeHandler: weightChangeHandler,
		inputBlurHandler: weightBlurHandler,
	} = useInput((value) => +value >= 35, props.user.Weight + "");
	const [enteredActivity, setEnteredActivity] = useState(props.user.Activity);
	const [enteredGoal, setEnteredGoal] = useState(props.user.Goal);
	const [enteredGender, setEnteredGender] = useState(props.user.Gender);
	const [enteredDiabets, setEnteredDiabets] = useState(
		props.user.Diabets + ""
	);
	const formIsValid =
		enteredNameIsValid &&
		enteredAgeIsValid &&
		enteredHeightIsValid &&
		enteredWeightIsValid;

	const activityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setEnteredActivity(+e.target.value);
	};
	const goalHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setEnteredGoal(+e.target.value);
	};
	const ganderHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredGender(e.target.value);
	};
	const diabetsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredDiabets(e.target.value);
	};

	const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			enteredNameIsValid &&
			enteredAgeIsValid &&
			enteredHeightIsValid &&
			enteredWeightIsValid
		) {
			const diabets = enteredDiabets === "true" ? true : false;
			const editedUser = new User(
				enteredName,
				+enteredAge,
				+enteredHeight,
				+enteredWeight,
				+enteredActivity,
				enteredGender,
				diabets,
				enteredGoal
			);
			dispatch(authActions.changeUser({ user: editedUser }));
			props.onClose();
		}
	};

	return (
		<div className="body-user">
			<div className="form-box">
				<h3>Edytuj dane</h3>
				<form onSubmit={formSubmitHandler}>
					<div className="form-group">
						<Input
							id="name"
							type="text"
							label="Nazwa"
							value={enteredName}
							onChange={nameChangeHandler}
							onBlur={nameBlurHandler}
							isValid={!nameHasError}></Input>
						{nameHasError && <Error message="Wymagany"></Error>}
					</div>
					<div className="form-group">
						<Input
							id="age"
							type="number"
							label="Wiek"
							value={enteredAge}
							onChange={ageChangeHandler}
							onBlur={ageBlurHandler}
							isValid={!ageHasError}></Input>
						{ageHasError && <Error message=">=18"></Error>}
					</div>
					<div className="form-group">
						<Input
							id="height"
							type="number"
							label="Wzrost"
							value={enteredHeight}
							onChange={heightChangeHandler}
							onBlur={heightBlurHandler}
							isValid={!heightHasError}></Input>
						{heightHasError && <Error message=">=130"></Error>}
					</div>
					<div className="form-group">
						<Input
							id="weight"
							type="number"
							label="Waga"
							value={enteredWeight}
							onChange={weightChangeHandler}
							onBlur={weightBlurHandler}
							isValid={!weightHasError}></Input>
						{weightHasError && <Error message=">=35"></Error>}
					</div>
					<div className="form-select-box">
						<div className="form-group">
							<label htmlFor="activity">Aktywność:</label>
							<select
								name="activity"
								id="activity"
								value={enteredActivity}
								onChange={activityHandler}>
								<option value={1.2}>Prawie brak</option>
								<option value={1.375}>Lekka aktywność</option>
								<option value={1.55}>
									Umiarkowana aktywność
								</option>
								<option value={1.725}>Duża aktywność</option>
								<option value={1.9}>
									Bardzo duża aktywność
								</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="goal">Cel:</label>
							<select
								name="goal"
								id="goal"
								value={enteredGoal}
								onChange={goalHandler}>
								<option value={0}>Schudnąć</option>
								<option value={1}>Pozostać przy wadze</option>
								<option value={2}>Przytyć</option>
							</select>
						</div>
					</div>
					<div className="radio-box">
						<div className="form-group">
							<label htmlFor="gender">
								Kobieta
								<input
									type="radio"
									value="Kobieta"
									name="gender"
									checked={enteredGender === "Kobieta"}
									onChange={ganderHandler}
								/>
								Mężczyzna
								<input
									type="radio"
									value="Mężczyzna"
									name="gender"
									checked={enteredGender === "Mężczyzna"}
									onChange={ganderHandler}
								/>
							</label>
						</div>
						<div className="form-group">
							<label htmlFor="diabets">
								Cukrzyca
								<input
									type="radio"
									value="true"
									name="diabets"
									checked={enteredDiabets === "true"}
									onChange={diabetsHandler}
								/>
								Brak cukrzycy
								<input
									type="radio"
									value="false"
									name="diabets"
									checked={enteredDiabets === "false"}
									onChange={diabetsHandler}
								/>
							</label>
						</div>
					</div>

					<button type="submit" disabled={!formIsValid}>
						Zapisz
					</button>
				</form>
			</div>
		</div>
	);
};
export default EditUser;
