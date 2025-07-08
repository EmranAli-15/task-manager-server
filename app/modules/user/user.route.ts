import express from "express";
import { JoiValidator } from "../../utils/joiValidator";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
const route = express.Router();

route.post("/createUser", JoiValidator(userValidation.createUser), userController.createUser)
route.post("/loginUser", userController.loginUser)


export const userRoute = route;