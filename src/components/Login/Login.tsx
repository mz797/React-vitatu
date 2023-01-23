import { useNavigate } from "react-router-dom";
import Input from "../UI/Input";
import Error from "../UI/Error";
import useInput from "../../hooks/use-input";

import classes from "./Login.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [correctUser, setCorrectUser] = useState(true);

	const {
		value: enteredName,
		hasError: nameHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: nameReset,
	} = useInput((value) => value.trim() !== "", "");
	const {
		value: enteredPswd,
		hasError: pswdHasError,
		valueChangeHandler: pswdChangeHandler,
		inputBlurHandler: pswdBlurHandler,
		reset: pswdReset,
	} = useInput((value) => value.trim() !== "", "");

	const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (enteredName === "admin" && enteredPswd === "admin") {
			nameReset();
			pswdReset();
			setCorrectUser(true);
			dispatch(authActions.login());
			navigate("/");
		} else {
			setCorrectUser(false);
		}
	};
	return (
		<div className={classes["login-body"]}>
			<div className={classes["form-box"]}>
				<h3>Zaloguj się</h3>
				{!correctUser && (
					<p className={classes.invalid}>
						Nie ma takiego użytkownika
					</p>
				)}
				<form onSubmit={formHandler}>
					<Input
						id="name"
						type="text"
						label="Nazwa"
						value={enteredName}
						onChange={nameChangeHandler}
						onBlur={nameBlurHandler}
						isValid={!nameHasError}></Input>
					{nameHasError && <Error message="Wymagany"></Error>}
					<Input
						id="pswd"
						type="password"
						label="Hasło"
						value={enteredPswd}
						onChange={pswdChangeHandler}
						onBlur={pswdBlurHandler}
						isValid={!pswdHasError}></Input>
					{pswdHasError && <Error message="Wymagany"></Error>}

					<button type="submit">Zaloguj</button>
				</form>
			</div>
		</div>
	);
};
export default Login;
