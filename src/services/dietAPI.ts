import api from '../api/posts'
import { DietClass, DietType } from '../types/Diet';

const dietAPI = {
	getDietProducts: async () => {
		try{
			const response = await api.get('./diets');
			const dietList: DietClass[]=[];
			response.data.forEach((prod:DietType)=>{
				dietList.push(
					new DietClass(
						prod.amount,
						prod.carbohydrates,
						prod.date,
						prod.fat,
						prod.idProd,
						prod.kcal,
						prod.name,
						prod.protein,
						prod.id
					)
				);
			});
			return dietList
		}catch(err){
			return false;
		}
	},
	postDiet:async (prod:DietClass)=>{
		try{
			const response = await api.post('./diets',prod)
			return response.data
		}catch(err){
			return false
		}
	},
	deleteDietProduct:async(dietId:string)=>{
		try{
			await api.delete(`./diets/${dietId}`)
		}catch(err){
			return false;
		}
	},
	editDietProduct:async(dietProduct:DietClass)=>{
		try{
			const response= await api.put(`./diets/${dietProduct.IdDiet}`,dietProduct)
			return response.data;
		}catch(err){
			return false
		}
	}

	

};
export default dietAPI;
