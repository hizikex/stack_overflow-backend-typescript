"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
// GET /users
router.get('/users', user_1.getAllUsers);
// POST /users
router.post('/users', user_1.createUser);
// GET /users/:id
router.get('/users/:id', user_1.getUserById);
// PUT /users/:id
router.patch('/users/:id', user_1.updateUser);
// DELETE /users/:id
router.delete('/users/:id', user_1.deleteUser);
//LOG IN 
router.post('/userlogin', user_1.userLogIn);
//USER FORGOT PASSWORD
router.post('/forgotpassword', user_1.userForgotPassword);
//VERIFY USER
router.post('/verifyuser/:id', user_1.verifyUser);
//USER RESET PASSWORD
router.post('/userchangepassword/:id', user_1.userResetPassword);
//USER LOG OUT 
router.post('/logoutuser/:id', user_1.logOutUser);
exports.default = router;
