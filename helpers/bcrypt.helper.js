import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = plainPassword => {
	return new Promise((resolve, reject) => {
		try {
			resolve(bcrypt.hashSync(plainPassword, saltRounds));
		} catch (error) {
			reject(error);
		}
	});
};