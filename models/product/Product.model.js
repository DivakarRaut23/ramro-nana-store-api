import ProdSchema from "./Product.schema.js";

export const getProducts = () => {
	
	return new Promise(async (resolve, reject) => {
		try {
			
			const result = await ProdSchema.find();
			console.log("Result inside product model >>", result)
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

export const getProductById = _id => {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await ProdSchema.findById(_id);

			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};

