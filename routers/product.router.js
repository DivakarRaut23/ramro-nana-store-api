import express from "express";
const router = express.Router();
import slugify from "slugify";
import multer from "multer";


import {
	getProducts,
	getProductById,
	
} from "../models/product/Product.model.js";

// Multer configuration

const ALLOWED_FILE_TYPE = {
	"image/png": "png",
	"image/jpeg": "jpeg",
	"image/jpg": "jpg",
};

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let error = null;
		const isAllowed = ALLOWED_FILE_TYPE[file.mimetype];

		if (!isAllowed) {
			error = new Error(
				"Some of the file types are not allowd, Only images are allowed"
			);
			error.status = 400;
		}

		cb(error, "public/img/product");
	},
	filename: function (req, file, cb) {
		//he there.jpg ==> he-there-4646465.jpg
		const fileName = slugify(file.originalname.split(".")[0]);
		const extension = ALLOWED_FILE_TYPE[file.mimetype];
		const fullFileName = fileName + "-" + Date.now() + "." + extension;
		cb(null, fullFileName);
	},
});

var upload = multer({ storage: storage });

// End Multer configuration

router.all("*", (req, res, next) => {
	next();
});

router.get("/:_id?", async (req, res) => {
	
	const { _id } = req.params;
	try {
		const result = _id ? await getProductById(_id) : await getProducts();

		res.json({
			status: "success",
			message: "Here are all the products",
			result,
		});
	} catch (error) {
		throw error;
	}
});







export default router;
