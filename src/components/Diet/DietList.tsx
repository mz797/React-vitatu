import { useEffect, useState } from "react";
import { DietClass } from "../../types/Diet";
import { ProductClass } from "../../types/Product";
import DeleteBox from "../UI/DeleteBox";
import DietItem from "./DietItem";
import classes from "./DietList.module.css";
import EditDietProduct from "./EditDietProduct";
import Moment from "moment";
import { DietHistoryClass } from "../../types/DietHistory";
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import { selectUser } from "../../store/auth";
import { useNavigate, useParams } from "react-router-dom";

type MyProps = {
	dietList: DietClass[];
	productList: ProductClass[];
	historyDiet: DietHistoryClass[];
	onDeleteDiet: (product: DietClass) => void;
	onEditDiet: (dietProduct: DietClass) => void;
};
const DietList = (props: MyProps) => {
	const params = useParams();
	const navigate = useNavigate();

	const user = useSelector(selectUser);
	
	const [isDeleting, setIsDeleting] = useState(false);
	const [productToDelete, setProductToDelete] = useState(props.dietList[0]);
	const [isEditing, setIsEditing] = useState(false);
	const [productToEdite, setProductToEdite] = useState(props.dietList[0]);
	const nutritionalValues = {
		kcal: 0,
		carbo: 0,
		fat: 0,
		protein: 0,
	};
	const [originalProduct, setOriginalProduct] = useState(
		props.productList[0]
	);
	useEffect(() => {
		const historyId = props.historyDiet.findIndex(
			(h) => h.date === Moment(new Date()).format("YYYY-MM-DD").toString()
		);
		const nutritionalValues = { kcal: 0, carbo: 0, fat: 0, protein: 0 };
		if (historyId !== -1) {
			for (let prod of props.historyDiet[historyId].dietList) {
				nutritionalValues.kcal += prod.Kcal;
				nutritionalValues.fat += prod.Fat;
				nutritionalValues.carbo += prod.Carbohydrates;
				nutritionalValues.protein += prod.Protein;
			}
			// setNutritionalValues(nutritionalValues);
			const procentageMacros = { kcal: 0, carbo: 0, fat: 0, protein: 0 };
			procentageMacros.kcal = +(
				(nutritionalValues.kcal / user.BMR) *
				100
			).toFixed(0);
			procentageMacros.fat = +(
				(nutritionalValues.fat / user.Fat) *
				100
			).toFixed();
			procentageMacros.carbo = +(
				(nutritionalValues.carbo / user.Carbs) *
				100
			).toFixed();
			procentageMacros.protein = +(
				(nutritionalValues.protein / user.Protein) *
				100
			).toFixed();
			// setProcentageMacros(procentageMacros);
		}
	}, [props.historyDiet, user]);

	useEffect(() => {
		if (params.id) {
			const prodId = props.dietList.findIndex(
				(p) => p.IdDiet === params.id
			);
			if (prodId !== -1) {
				setProductToDelete(props.dietList[prodId]);
				setIsDeleting(true);
			}
		}
	}, [params]);

	const confirmDeleteHandler = () => {
		navigate("/diet");
		setIsDeleting(false);
		props.onDeleteDiet(productToDelete);
	};
	const cancelDeleteHandler = () => {
		setIsDeleting(false);
	};
	const openEditingHandler = (product: DietClass) => {
		const index = props.productList.findIndex(
			(prod) => prod.Id === product.IdProd
		);
		if (index !== -1) {
			setOriginalProduct(props.productList[index]);
		}
		setIsEditing(true);
		setProductToEdite(product);
	};
	const confirmEditingHanndler = (product: DietClass) => {
		props.onEditDiet(product);
		setIsEditing(false);
	};
	const closeEditingHandler = () => {
		setIsEditing(false);
	};
	let counter = 0;
	return (
		<>
			<div className={classes.diet}>
				<div className={classes["product-list-box"]}>
					<h2 className={classes.heading}>Twoja dzisiejsza dieta</h2>

					<ul className={classes["product-list"]}>
						{props.dietList.map((prod: DietClass) => {
							if (
								Moment(prod.Date).format("DD-MM-YY") ===
								Moment(new Date()).format("DD-MM-YY")
							) {
								counter++;
								nutritionalValues.kcal += prod.Kcal;
								nutritionalValues.fat += prod.Fat;
								nutritionalValues.carbo += prod.Carbohydrates;
								nutritionalValues.protein += prod.Protein;
								return (
									<li
										key={`${counter}`}
										className={classes["diet-li"]}>
										<DietItem
											product={prod}
											onEdit={
												openEditingHandler
											}></DietItem>
									</li>
								);
							}
							return <></>;
						})}
					</ul>
					{counter === 0 && (
						<p className={classes.emptyDietParagraph}>
							Nie dodałeś dziś żadnych produktów. <br />
							Dodaj produkty,które zjadłeś.
						</p>
					)}
					<Footer
						user={user}
						nutritionalValues={nutritionalValues}></Footer>
				</div>
				<div className={classes["diet-img-bg"]}>
					<img src="../../assets/images/diet-img.jpg" alt="" />
				</div>
			</div>
			{isDeleting && (
				<DeleteBox
					onConfirm={confirmDeleteHandler}
					onCancel={cancelDeleteHandler}></DeleteBox>
			)}
			{isEditing && (
				<EditDietProduct
					dietProduct={productToEdite}
					originalProduct={originalProduct}
					onClose={closeEditingHandler}
					onConfirm={confirmEditingHanndler}></EditDietProduct>
			)}
		</>
	);
};
export default DietList;
