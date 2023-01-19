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
		} catch (err) {
            return false;
		}
	},
	postProduct: async (product: ProductClass) => {
		try {
			const response = await api.post("./products", product);
			return response.data;

		} catch (err) {
			return false
		}
	},
	deleteProduct:async(productId:string)=>{
		try{
			await api.delete(`./products/${productId}`)
		}catch(error){
			return false;
		}
	},
	editProduct:async(product:ProductClass)=>{
		try{
			const response = await api.put(`./products/${product.Id}`,product)
			console.log(response.data);
			return response.data
		}catch(err){
			return false;
		}
	}

};
export default productAPI;
