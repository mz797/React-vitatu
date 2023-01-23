import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { User } from "../../types/User";
import "./Footer.css";

type MyProps = {
	user: User;
	nutritionalValues: {
		kcal: number;
		carbo: number;
		fat: number;
		protein: number;
	};
};
const Footer = (props: MyProps) => {
	const procentageMacros = {
		kcal: 0,
		carbo: 0,
		fat: 0,
		protein: 0,
	};
	procentageMacros.kcal = +(
		(props.nutritionalValues.kcal / props.user.BMR) *
		100
	).toFixed(0);
	procentageMacros.fat = +(
		(props.nutritionalValues.fat / props.user.Fat) *
		100
	).toFixed();
	procentageMacros.carbo = +(
		(props.nutritionalValues.carbo / props.user.Carbs) *
		100
	).toFixed();
	procentageMacros.protein = +(
		(props.nutritionalValues.protein / props.user.Protein) *
		100
	).toFixed();
	const kcalColor = procentageMacros.kcal <= 100 ? "#77ff33" : "red";
	const carboColor = procentageMacros.carbo <= 100 ? "#77ff33" : "red";
	const fatColor = procentageMacros.fat <= 100 ? "#77ff33" : "red";
	const proteinColor = procentageMacros.protein <= 100 ? "#77ff33" : "red";

	return (
		<div className="footer">
			<div className="measure-box">
				<div className="measure-text">
					<p>Kcal</p>
					<p>
						{props.nutritionalValues.kcal.toFixed(0)}/
						{props.user.BMR.toFixed(0)}
					</p>
				</div>
				<div className="measure-circle">
					<CircularProgressbar
						value={procentageMacros.kcal}
						text={`${procentageMacros.kcal}%`}
						// strokeWidth={5}
						styles={buildStyles({
							pathColor: kcalColor,
							trailColor: "#eee",
							textColor: "#222",
							strokeLinecap: "butt",
						})}
					/>
				</div>
			</div>
			<div className="measure-box">
				<div className="measure-text">
					<p>Węglowodany</p>
					<p>
						{props.nutritionalValues.carbo.toFixed(0)}/
						{props.user.Carbs.toFixed(0)}
					</p>
				</div>
				<div className="measure-circle">
					<CircularProgressbar
						value={procentageMacros.carbo}
						text={`${procentageMacros.carbo}%`}
						// strokeWidth={5}
						styles={buildStyles({
							pathColor: carboColor,
							trailColor: "#eee",
							textColor: "#222",
							strokeLinecap: "butt",
						})}
					/>
				</div>
			</div>
			<div className="measure-box">
				<div className="measure-text">
					<p>Tłuszcz</p>
					<p>
						{props.nutritionalValues.fat.toFixed(0)}/
						{props.user.Fat.toFixed(0)}
					</p>
				</div>
				<div className="measure-circle">
					<CircularProgressbar
						value={procentageMacros.fat}
						text={`${procentageMacros.fat}%`}
						// strokeWidth={5}
						styles={buildStyles({
							pathColor: fatColor,
							trailColor: "#eee",
							textColor: "#222",
							strokeLinecap: "butt",
						})}
					/>
				</div>
			</div>
			<div className="measure-box">
				<div className="measure-text">
					<p>Białko</p>
					<p>
						{props.nutritionalValues.protein.toFixed(0)}/
						{props.user.Protein.toFixed(0)}
					</p>
				</div>
				<div className="measure-circle">
					<CircularProgressbar
						value={procentageMacros.protein}
						text={`${procentageMacros.protein}%`}
						// strokeWidth={5}
						styles={buildStyles({
							pathColor: proteinColor,
							trailColor: "#eee",
							textColor: "#222",
							strokeLinecap: "butt",
						})}
					/>
				</div>
			</div>
		</div>
	);
};

export default Footer;
