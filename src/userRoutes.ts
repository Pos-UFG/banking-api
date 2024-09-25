import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { AuthController } from "./controllers/AuthController";


const userRoutes = Router();
const userController = new UserController();
const path = "/users";
const AuthController = new AuthController();

userRoutes.post(path, userController.create);
userRoutes.get(path, userController.getAll);
userRoutes.get(`${path}/:id`, userController.getById);
userRoutes.delete(`${path}/:id`, userController.verifyifExists,  userController.delete);
userRoutes.put(`${path}/:id`, userController.verifyifExists, userController.update);

userRoutes.post("/login", AuthController.authenticate);
export { userRoutes }


