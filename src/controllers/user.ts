import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from "express";
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import newUserMail from '../utils/mailer'

export const createUser = async (req: Request, res: Response) => {
    try {
        const {username, email, password, phone, location} = req.body;

        const saltPassword = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, saltPassword);

        type UserTrait = {
            username: string,
            email: string,
            password: string,
            phone: string,
            location: string,
        }

        const userData: UserTrait = {
            username,
            email,
            password: hashPassword,
            phone,
            location,
        }

        const newUser = new User(userData);

        const userToken = jwt.sign({
            id: newUser.id,
            email: newUser.email,
            password: newUser.password
        }, 'process.env.USER_TOKEN', {
            expiresIn: '1d'
        })

        newUser.token = userToken;
        await newUser.save();

        const verifyLink = `${req.protocol}://${req.get("host")}/api/verifyUser/${newUser.id}`;

        const message = `Thanks for registering on stack overflow. Please click on this link ${verifyLink} to verify your account`;

        newUserMail({
            email: newUser.email,
            subject: 'Verification on stack overflow',
            message
        })

        return res.status(200).json({
            message: "New user created",
            data: newUser
        })

    }catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};

export const userLogIn = async (req:Request, res: Response) => {
    try {
        const {email} = req.body;
        const checkEmail = await User.findOne({where: {email: email}});

        if (!checkEmail) 
            res.status(404).json({
                message: `No user with email: ${email}`
            })

        const isPassword = await bcrypt.compare(req.body.password, checkEmail!.password)
            if (isPassword == false)
            res.status(404).json({
                message: `Email or password not correct`
            })

        const token = jwt.sign({
            id: checkEmail?.id,
            email: checkEmail?.email,
            password: checkEmail?.password
        }, 'process.env.USER_TOKEN', {
            expiresIn: '5h'
        })

        checkEmail!.token = token
        await checkEmail!.save()

        const {password, ...others} = checkEmail!.dataValues

        res.status(201).json({
            message: "Log In Successful",
            data: others
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};

export const userForgotPassword = async (req: Request, res: Response) => {
    try {
        const {email} = req.body;
        const checkEmail = await User.findOne({where: {email: email}});
        if (!checkEmail)
        res.status(404).json({
            message: `Wrong email`
        })
    
        const token = jwt.sign({
            id: checkEmail?.id,
            email: checkEmail?.email,
            password: checkEmail?.password
        }, 'process.env.USER_TOKEN', {
            expiresIn: '8h'
        })
    
        const resetPasswordLink = `${req.protocol}://${req.get('host')}/api/${checkEmail?.id}/${token}`
    
        const message = `Use this link ${resetPasswordLink} to reset your password`;
    
        newUserMail({
            email: checkEmail?.email,
            subject:"Reset Password on Stack Overflow",
            message
        })
    
        res.status(202).json({
            message: "A mail has been sent to " + checkEmail!.email + " for you reset your password"
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};

export const verifyUser = async (req:Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({where: {id: id}});
        if (!user) {
            res.status(404).json({
                message: `User with id: ${id} not found`
            })
        }
        user!.isVerify = true
        await user!.save()

        res.status(201).json({
            message: `Your verification was successful`
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};

export const logOutUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {email, password} = req.body;
        const userLogOut = await User.findOne({where: {id: id}})
        const tokenDestroy = jwt.sign({
            id,
            email,
            password
        }, 'process.env.USER_DESTROY_TOKEN')

        userLogOut!.token = tokenDestroy
        res.status(200).json({message:"Sucessfully logged out"
    })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

export const userResetPassword = async (req: Request, res:Response) => {
    try {
        const id = req.params.id;
        const {password} = req.body;
        const userPasswordChange = await User.findOne({where: {id: id}});
        if (!userPasswordChange) {
            res.status(404).json({
                message: `User with id: ${id} not found`
            })
        }
        userPasswordChange!.password = password;
        userPasswordChange?.save()
        const saltPassword = await bcrypt.genSalt(10);
        const hashPassword = bcrypt.hashSync(password, saltPassword);
    
        userPasswordChange!.password = hashPassword;
        await userPasswordChange?.save()
    
        res.status(201).json({
            message: `Password changed successful`
        })
    } catch (error) {
        res.status(501).json({
            message: error
        })
    }
}

export const getUserById = async (req:Request, res: Response) => {
    try {
        const id = req.params.id
    const oneUser = await User.findOne({where: {id: id}});
    if (oneUser === null) {
        res.status(404).json({
            message: `User with id: ${id} not found`
        })
    } else {
        res.status(200).json({
            message: `${oneUser.username} is the user with id: ${id}`,
            data: oneUser
        })
    }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};

export const getAllUsers = async (req:Request, res: Response) => {
    try {
        const allUsers = await User.findAll();
    if (allUsers.length === 0) {
        res.status(404).json({
            message: `No user in this database`
        })
    } else {
        res.status(404).json({
            message: `We have ${allUsers.length} in this database`,
            data: allUsers
        })
    }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
    res.status(404).json({
        message: `USer`
    })
    const updatedUser = await User.update(req.body, {where: {id: id}});
    if (updatedUser[0] === null) {
        res.status(404).json({
            message: `User with id: ${id} not found`
        })
    } else {
        res.status(200).json({
            message: `User with id: ${id} has been updated`,
            data: updatedUser
        })
    }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
    const deletedUser = await User.destroy({where: {id: id}});

    if (deletedUser === null) {
        res.status(404).json({
            message: `User with ${id} not found`
        })
    } else {
        res.status(201).json({
            message: `User with ${id} deleted successfully`
        })
    }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
};