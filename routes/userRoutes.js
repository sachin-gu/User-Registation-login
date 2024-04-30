import  express  from "express";
const router = express.Router();
import UserController from "../controller/userController.js";

// public Routes
router.post('/register', UserController.userRegistation)
router.post('/login', UserController.userLogin)

//Protected route



export default router;
