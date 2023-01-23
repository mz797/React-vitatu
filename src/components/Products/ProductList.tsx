import { useState } from "react";
import { DietClass } from "../../types/Diet";
import { ProductClass } from "../../types/Product";
import DeleteBox from "../UI/DeleteBox";
import AddProductToDiet from "./AddProductToDiet";
import EditProduct from "./EditAddProduct";
import Product from "./Product";
import classes from "./ProductList.module.css";

type MyProps = {
	products: ProductClass[];
	onAddProduct: (prod: DietClass) => void;
	onDeleteProduct: (id: string) => void;
	onEditProduct: (prod: ProductClass) => void;
};
const ProductList = (props: MyProps) => {
	const [searchedValue, setSearchedValue] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [productToDelete, setProductToDelete] = useState(0);
	const [isEditing, setIsEditing] = useState(false);
	const [productToEdit, setProductToEdit] = useState(0);
	const [isAddingToDiet, setIsAddingToDiet] = useState(false);
	const [productToAddToDiet, setProductToAddToDiet] = useState(0);

	const openDeleteHandler = (id: string) => {
		setIsDeleting(true);
		setProductToDelete(props.products.findIndex((p) => p.Id === id));
	};
	const confirmDeleteHandler = () => {
		setIsDeleting(false);
		props.onDeleteProduct(props.products[productToDelete].Id);
	};
	const closeDeleteHandler = () => {
		setIsDeleting(false);
	};
	const addToDietHandler = (dietProduct: DietClass) => {
		props.onAddProduct(dietProduct);
	};
	const editProductHandler = (prod: ProductClass) => {
		props.onEditProduct(prod);
		setIsEditing(false);
	};
	const openAddingToDietHandler = (product: ProductClass) => {
		setProductToAddToDiet(
			props.products.findIndex((p) => p.Id === product.Id)
		);
		setIsAddingToDiet(true);
	};
	const openEditHandler = (prod: ProductClass) => {
		setProductToEdit(props.products.findIndex((p) => p.Id === prod.Id));
		setIsEditing(true);
	};
	const closeAddingToDietHandler = () => {
		setIsAddingToDiet(false);
	};
	const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchedValue(e.currentTarget.value);
	};
	return (
		<>
			{!isEditing && (
				<div className={classes["products-box"]}>
					<>
						<div className={classes["product-list-box"]}>
							<h2 className={classes.heading}>Lista produktów</h2>
							<input
								className={classes["search-input"]}
								placeholder="Szukaj..."
								value={searchedValue}
								onChange={searchInputHandler}
							/>
							<ul className={classes["product-list"]}>
								{props.products.map((prod: ProductClass) => {
									if (prod.Name.includes(searchedValue)) {
										return (
											<li key={prod.Id}>
												<Product
													product={prod}
													addToDiet={
														openAddingToDietHandler
													}
													deleteProduct={
														openDeleteHandler
													}
													openEdit={openEditHandler}
												/>
											</li>
										);
									}
								})}
							</ul>
						</div>
						<div className={classes["products-img"]}>
							<img
								src="../../../assets/images/products-1.jpg"
								alt=""
							/>
						</div>
					</>

					{isAddingToDiet && (
						<AddProductToDiet
							product={props.products[productToAddToDiet]}
							addToDiet={addToDietHandler}
							onClose={closeAddingToDietHandler}
						/>
					)}
					{isDeleting && (
						<DeleteBox
							onConfirm={confirmDeleteHandler}
							onCancel={closeDeleteHandler}></DeleteBox>
					)}
				</div>
			)}
			{isEditing && (
				<EditProduct
					product={props.products[productToEdit]}
					editProduct={editProductHandler}
				/>
			)}
		</>
	);
};
export default ProductList;
