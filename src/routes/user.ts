import express from 'express';
import {createUser, deleteUser, getAllUsers, getUserById, logOutUser, updateUser, userForgotPassword, userLogIn, userResetPassword, verifyUser} from '../controllers/user';

const router = express.Router();

// GET /users
router.get('/users', getAllUsers);

// POST /users
router.post('/users', createUser);

// GET /users/:id
router.get('/users/:id', getUserById);

// PUT /users/:id
router.patch('/users/:id', updateUser);

// DELETE /users/:id
router.delete('/users/:id', deleteUser);

//LOG IN 
router.post('/userlogin', userLogIn)

//USER FORGOT PASSWORD
router.post('/forgotpassword', userForgotPassword)

//VERIFY USER
router.post('/verifyuser/:id', verifyUser)

//USER RESET PASSWORD
router.post('/userchangepassword/:id', userResetPassword)

//USER LOG OUT 
router.post('/logoutuser/:id', logOutUser)


export default router;
