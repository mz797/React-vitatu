import { useState } from "react";
import { ProductClass } from "../../types/Product";
import Card from "../UI/Card";
import EditProduct from "./EditProduct";
import Product from "./Product";
import classes from "./ProductList.module.css";

type MyProps = {
	products: ProductClass[];
	onAddProduct: (prod: ProductClass) => void;
	onDeleteProduct: (id: string) => void;
	onEditProduct: (prod: ProductClass) => void;
};
const ProductList = (props: MyProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [productToEdit, setProductToEdit] = useState(0);

	const addToDietHandler = (product: ProductClass) => {
		props.onAddProduct(product);
	};
	const deleteProductHandler = (id: string) => {
		props.onDeleteProduct(id);
	};
	const editProductHandler = (prod: ProductClass) => {
		props.onEditProduct(prod);
		setIsEditing(false);
	};
	const openEditHandler = (prod: ProductClass) => {
		setProductToEdit(props.products.findIndex(p=>p.Id===prod.Id))	
		setIsEditing(true);
	};
	return (
		<Card>
			<>
				{!isEditing && (
					<div className={classes["product-list-box"]}>
						<h2 className={classes.heading}>Lista produktów</h2>
						<ul className={classes["product-list"]}>
							{props.products.map((prod: ProductClass) => {
								return (
									<li key={prod.Id}>
										<Product
											product={prod}
											addToDiet={addToDietHandler}
											deleteProduct={deleteProductHandler}
											openEdit={
												openEditHandler
											}></Product>
									</li>
								);
							})}
						</ul>
					</div>
				)}
				{isEditing && (
					<EditProduct
						product={props.products[productToEdit]}
						editProduct={editProductHandler}></EditProduct>
				)}
			</>
		</Card>
	);
};
export default ProductList;
