import express from "express";
const router = express.Router();

import { hashPassword } from "../helpers/bcrypt.helper.js";
import {
	newUserValidation
} from "../middlewares/formValidation.middleware.js";
import {
	createUser
} from "../models/user/User.model.js";


router.all("*", (req, res, next) => {
	next();
});


router.post("/", newUserValidation, async (req, res) => {
	try {
		const { password } = req.body;

		const hashPass = await hashPassword(password);

		const newUser = {
			...req.body,
			password: hashPass,
		};

		

		const result = await createUser(newUser);
		if (result?._id) {
			return res.json({ status: "success", message: "login success", result });
		}

		console.log(result)

		res.json({ status: "error", message: "Invalid login details" });
	} catch (error) {
		console.log(error.message);

		if (error.message.includes("duplicate key error collection")) {
			return res.json({ status: "error", message: "This email already exist" });
		}

		throw new Error(error.message);
	}
});

export default router;