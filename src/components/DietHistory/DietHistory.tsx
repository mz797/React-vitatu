import { useState } from "react";
import { DietClass } from "../../types/Diet";
import { DietHistoryClass } from "../../types/DietHistory";
import Card from "../UI/Card";
import DietHistoryItem from "./DietHistoryItem";

import classes from "./DietHistory.module.css";

type MyProps = {
	historyDiet: DietHistoryClass[];
};

const DietHistory = (props: MyProps) => {
	const [dataChanged, setDataChanged] = useState(false);
	return (
		<Card>
			<div className={classes["diet-box"]}>
				<h3>Historia twoich posiłków</h3>
				{props.historyDiet.length === 0 && (
					<p className={classes.emptyDietParagraph}>
						Nie dodałeś dziś żadnych produktów. <br />
						Dodaj produkty,które zjadłeś.
					</p>
				)}
				<ul>
					{props.historyDiet.map((day: DietHistoryClass) => {
						return (
							<li key={day.date}>
								<div className={classes["day-text"]}>
									<h4>{day.date}</h4>
									<p>
										<span>E: </span> {day.kcal.toFixed()}
									</p>
									<p>
										<span>W: </span> {day.carbo.toFixed()}g
									</p>
									<p>
										<span>T: </span> {day.fat.toFixed()}g
									</p>
									<p>
										<span>B: </span> {day.protein.toFixed()}g
									</p>
									<button
										onClick={() => {
											day.visibility = !day.visibility;
											setDataChanged((prev) => !prev);
										}}>
										{!day.visibility ? "Rozwiń" : "Schowaj"}
									</button>
								</div>
								{day.visibility && (
									<div className={classes["day-products"]}>
										{day.dietList.map((prod: DietClass) => {
											return (
												<div key={prod.IdDiet}>
													<DietHistoryItem
														product={
															prod
														}></DietHistoryItem>
												</div>
											);
										})}
									</div>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		</Card>
	);
};
export default DietHistory;
