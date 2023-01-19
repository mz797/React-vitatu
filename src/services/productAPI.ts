import api from "../api/posts";
import { ProductClass, ProductType } from "../types/Product";

const productAPI = {
	getProducts: async () => {
		try {
			const response = await api.get("./products");
			const productList: ProductClass[] = [];
			response.data.forEach((prod: ProductType) => {
				productList.push(
					new ProductClass(
						prod.carbohydrates,
						prod.fat,
						prod.kcal,
						prod.name,
						prod.protein,
						prod.id
					)
				);
			});
			return productList;
		} catch (err: any) {
			console.log(err.response.data);
			console.log(err.response.status);
			console.log(err.response.headers);
		}
	},
	postProduct: async (product: ProductClass) => {
		try {
			const response = await api.post("./products", product);

			return response.data;
		} catch (err: any) {
			console.log(`Error ${err.message}`);
		}
	},
};
export default productAPI;
