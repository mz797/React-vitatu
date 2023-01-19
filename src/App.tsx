import { useEffect, useState } from "react";
import { ProductClass } from "./types/Product";
// import axios from "axios";
import productAPI from "./services/productAPI";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/Products/ProductList";
import Card from "./components/UI/Card";

import Validate from "./components/UI/Validate";
import styles from "./App.module.css";
import DietList from "./components/Diet/DistList";
import Navbar from "./components/Navbar/Navbar";

function App() {
	const products: ProductClass[] = [];
	let dietItems: ProductClass[] = [];
	const [productList, setProductList] = useState(products);
	const [dietList, setDietList] = useState(dietItems);

	useEffect(() => {
		let response;
		const fetchPosts = async () => {
			response = await productAPI.getProducts();
			setProductList(response);
		};
		fetchPosts();
	}, []);

	const addProductHandler = (product: ProductClass) => {
		const post = async (product: ProductClass) => {
			const response = await productAPI.postProduct(product);
			await setProductList((prev) => {
				return [...prev, response.data];
			});
		};
		post(product);
	};
	const addProductToDietHandler = (product: ProductClass) => {
		setDietList((prev) => {
			return [...prev, product];
		});
	};
	const deleteFromDietHandler = (product: ProductClass) => {
		setDietList((prev) => {
			const itemId = prev.findIndex((item) => item.Id === product.Id);
			console.log(itemId);
			if (itemId !== -1) {
				prev.splice(itemId, 1);
				return [...prev];
			} else {
				return [...prev];
			}
		});
	};
	const DietComponent = (
		<DietList
			dietList={dietList}
			onDeleteDiet={deleteFromDietHandler}></DietList>
	);

	const ProductsComponent = (
		<ProductList
			products={productList}
			onAddProduct={addProductToDietHandler}></ProductList>
	);
	const AddProductComponent = (
		<Validate
			products={productList}
			onAddProduct={addProductHandler}></Validate>
	);
	return (
		<>
			<Navbar></Navbar>
			<div className={styles.app}>
				<Routes>
					<Route
						path="/"
						element={<Card>{DietComponent}</Card>}></Route>
					<Route
						path="/diet"
						element={<Card>{DietComponent}</Card>}></Route>
					<Route
						path="/products"
						element={<Card>{ProductsComponent}</Card>}></Route>
					<Route
						path="/add-product"
						element={<Card>{AddProductComponent}</Card>}></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
