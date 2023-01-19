import { useEffect, useState } from "react";
import { ProductClass } from "./types/Product";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/Products/ProductList";
import Card from "./components/UI/Card";

import Validate from "./components/UI/Validate";
import styles from "./App.module.css";
import DietList from "./components/Diet/DietList";
import Navbar from "./components/Navbar/Navbar";
import productAPI from "./services/productAPI";

function App() {
	let dietItems: ProductClass[] = [];
	const [productList, setProductList] = useState<ProductClass[]>([]);
	const [dietList, setDietList] = useState(dietItems);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await productAPI.getProducts();
			if (!response) {
				console.error("[App.tsx] Products not found in API");
				return;
			}
			setProductList(response);
		};
		fetchPosts();
	}, [productList]);

	const addProductHandler = (product: ProductClass) => {
		const post = async (product: ProductClass) => {
			const response = await productAPI.postProduct(product);
			setProductList((prev) => {
				return [...prev, response.data];
			});
		};
		post(product);
	};
	const deleteProductHandler = (id: string) => {
		const deleteProduct = async (id: string) => {
			await productAPI.deleteProduct(id);
		};
		deleteProduct(id);
	};
	const editProductHandler = (product: ProductClass) => {
		const editProduct=async(product:ProductClass)=>{
			await productAPI.editProduct(product)
		}
		editProduct(product);
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
			onAddProduct={addProductToDietHandler}
			onDeleteProduct={deleteProductHandler}
			onEditProduct={editProductHandler}></ProductList>
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
					<Route path="/products" element={ProductsComponent}></Route>
					<Route
						path="/add-product"
						element={<Card>{AddProductComponent}</Card>}></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
