import { useEffect, useState } from "react";
import { ProductClass } from "./types/Product";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProductList from "./components/Products/ProductList";
import Card from "./components/UI/Card";
import Moment from "moment";

import styles from "./App.module.css";
import DietList from "./components/Diet/DietList";
import Navbar from "./components/Navbar/Navbar";
import productAPI from "./services/productAPI";
import EditProduct from "./components/Products/EditAddProduct";
import { DietClass } from "./types/Diet";
import dietAPI from "./services/dietAPI";
import DietHistory from "./components/DietHistory/DietHistory";
import { DietHistoryClass } from "./types/DietHistory";
import UserSite from "./components/UserSite/UserSite";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "./store/auth";
import Login from "./components/Login/Login";

function App() {
	const navigate = useNavigate();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);

	const [productList, setProductList] = useState<ProductClass[]>([]);
	const [dietList, setDietList] = useState<DietClass[]>([]);
	const [historyList, setHistoryList] = useState<DietHistoryClass[]>([]);
	const [dataChange, setDataChange] = useState(false);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	}, []);
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await productAPI.getProducts();
			if (!response) {
				console.error("[App.tsx] Products not found in API");
				return;
			}
			setProductList(
				response.sort((a: ProductClass, b: ProductClass) =>
					a.Name.localeCompare(b.Name)
				)
			);
		};
		fetchPosts();
	}, [dataChange]);
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await dietAPI.getDietProducts();
			if (!response) {
				console.log("[App.tsx] Diets not found in API");
				return;
			}
			const historyDietList: DietHistoryClass[] = [];
			for (let p of response) {
				const historyId = historyDietList.findIndex(
					(d) =>
						Moment(d.date).format("DD-MM-YYYY").toString() ===
						Moment(p.Date).format("DD-MM-YYYY").toString()
				);
				if (historyId !== -1) {
					historyDietList[historyId].dietList.push(p);
					historyDietList[historyId].kcal += p.Kcal;
					historyDietList[historyId].carbo += p.Carbohydrates;
					historyDietList[historyId].protein += p.Protein;
					historyDietList[historyId].fat += p.Fat;
					historyDietList[historyId].visibility = false;
				} else {
					historyDietList.push(
						new DietHistoryClass(
							p.Date.toString().slice(0, 10),
							[p],
							p.Kcal,
							p.Carbohydrates,
							p.Protein,
							p.Fat,
							false
						)
					);
				}
			}
			setHistoryList(historyDietList);
			setDietList(response);
		};
		fetchPosts();
	}, [dataChange]);

	const addProductHandler = (product: ProductClass) => {
		const post = async (product: ProductClass) => {
			const response = await productAPI.postProduct(product);
			setProductList((prev) => {
				return [...prev, response.data];
			});
			setDataChange((prev) => {
				return !prev;
			});
		};
		post(product);
	};
	const deleteProductHandler = (id: string) => {
		const deleteProduct = async (id: string) => {
			await productAPI.deleteProduct(id);
			setDataChange((prev) => {
				return !prev;
			});
		};
		deleteProduct(id);
	};
	const editProductHandler = (product: ProductClass) => {
		const editProduct = async (product: ProductClass) => {
			await productAPI.editProduct(product);
			setDataChange((prev) => {
				return !prev;
			});
		};
		editProduct(product);
	};
	const addProductToDietHandler = (dietProduct: DietClass) => {
		const post = async (diet: DietClass) => {
			const response = await dietAPI.postDiet(diet);
			setDietList((prev) => {
				return [...prev, response.data];
			});
			setDataChange((prev) => {
				return !prev;
			});
		};
		post(dietProduct);
	};
	const deleteFromDietHandler = (dietProduct: DietClass) => {
		const deleteDietProduct = async (dietProduct: DietClass) => {
			await dietAPI.deleteDietProduct(dietProduct.IdDiet);
			setDataChange((prev) => {
				return !prev;
			});
		};
		deleteDietProduct(dietProduct);
	};
	const editDietProductHandler = (dietProduct: DietClass) => {
		const editDietProduct = async (dietProduct: DietClass) => {
			await dietAPI.editDietProduct(dietProduct);
			setDataChange((prev) => !prev);
		};
		editDietProduct(dietProduct);
	};
	const DietComponent = (
		<DietList
			dietList={dietList}
			productList={productList}
			onDeleteDiet={deleteFromDietHandler}
			onEditDiet={editDietProductHandler}
			historyDiet={historyList}></DietList>
	);

	const ProductsComponent = (
		<ProductList
			products={productList}
			onAddProduct={addProductToDietHandler}
			onDeleteProduct={deleteProductHandler}
			onEditProduct={editProductHandler}></ProductList>
	);
	const AddProductComponent = (
		<EditProduct
			product={new ProductClass(0, 0, 0, "", 0, "")}
			addProduct={addProductHandler}></EditProduct>
	);
	const DietHistoryComponent = (
		<DietHistory historyDiet={historyList}></DietHistory>
	);
	const UserComponent = <UserSite user={user}></UserSite>;
	const LoginComponent = (
		<Card>
			<Login></Login>
		</Card>
	);
	return (
		<>
			<Navbar></Navbar>
			<div className={styles.app}>
				<Routes>
					<Route path="/" element={ProductsComponent}></Route>
					<Route path="/diet" element={DietComponent}></Route>
					<Route path="/products" element={ProductsComponent}></Route>
					<Route
						path="/add-product"
						element={AddProductComponent}></Route>
					<Route
						path="/diet-history"
						element={DietHistoryComponent}></Route>
					<Route path="/user" element={UserComponent}></Route>
					<Route path="/login" element={LoginComponent}></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
