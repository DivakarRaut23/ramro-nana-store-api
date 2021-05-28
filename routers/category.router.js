import express from "express";
const router = express.Router();

import {
	getCategories	
} from "../models/category/Category.model.js";


router.all("*", (req, res, next) => {
	next();
});

router.get("/", async (req, res) => {
	try {
		const result = await getCategories();
		res.json({
			status: "success",
			message: "Fetching success",
			result,
		});
	} catch (error) {
		console.log(error);
		throw new Error(error.message);
	}
});



export default router;
