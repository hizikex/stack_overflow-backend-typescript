"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUserById = exports.userResetPassword = exports.logOutUser = exports.verifyUser = exports.userForgotPassword = exports.userLogIn = exports.createUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = __importDefault(require("../utils/mailer"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, phone, location } = req.body;
        const saltPassword = bcrypt_1.default.genSaltSync(10);
        const hashPassword = bcrypt_1.default.hashSync(password, saltPassword);
        const userData = {
            username,
            email,
            password: hashPassword,
            phone,
            location,
        };
        const newUser = new user_1.default(userData);
        const userToken = jsonwebtoken_1.default.sign({
            id: newUser.id,
            email: newUser.email,
            password: newUser.password
        }, 'process.env.USER_TOKEN', {
            expiresIn: '1d'
        });
        newUser.token = userToken;
        yield newUser.save();
        const verifyLink = `${req.protocol}://${req.get("host")}/api/verifyUser/${newUser.id}`;
        const message = `<strong>Thanks for registering on stack overflow. Please click on this link ${verifyLink} to verify your account</strong>`;
        (0, mailer_1.default)({
            email: newUser.email,
            subject: 'Verification on stack overflow',
            message
        });
        return res.status(200).json({
            message: "New user created",
            data: newUser
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error
        });
    }
});
exports.createUser = createUser;
const userLogIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const checkEmail = yield user_1.default.findOne({ where: { email: email } });
        if (!checkEmail)
            res.status(404).json({
                message: `No user with email: ${email}`
            });
        const isPassword = yield bcrypt_1.default.compare(req.body.password, checkEmail.password);
        if (isPassword == false)
            res.status(404).json({
                message: `Email or password not correct`
            });
        const token = jsonwebtoken_1.default.sign({
            id: checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail.id,
            email: checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail.email,
            password: checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail.password
        }, 'process.env.USER_TOKEN', {
            expiresIn: '5h'
        });
        checkEmail.token = token;
        yield checkEmail.save();
        const _a = checkEmail.dataValues, { password } = _a, others = __rest(_a, ["password"]);
        res.status(201).json({
            message: "Log In Successful",
            data: others
        });
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.userLogIn = userLogIn;
const userForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const checkEmail = yield user_1.default.findOne({ where: { email: email } });
        if (!checkEmail)
            res.status(404).json({
                message: `Wrong email`
            });
        const token = jsonwebtoken_1.default.sign({
            id: checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail.id,
            email: checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail.email,
            password: checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail.password
        }, 'process.env.USER_TOKEN', {
            expiresIn: '8h'
        });
        const resetPasswordLink = `${req.protocol}://${req.get('host')}/api/${checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail.id}/${token}`;
        const message = `Use this link ${resetPasswordLink} to reset your password`;
        (0, mailer_1.default)({
            email: checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail.email,
            subject: "Reset Password on Stack Overflow",
            message
        });
        res.status(202).json({
            message: "A mail has been sent to " + checkEmail.email + " for you reset your password"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.userForgotPassword = userForgotPassword;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_1.default.findOne({ where: { id: id } });
        if (!user) {
            res.status(404).json({
                message: `User with id: ${id} not found`
            });
        }
        user.isVerify = true;
        yield user.save();
        res.status(201).json({
            message: `Your verification was successful`
        });
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.verifyUser = verifyUser;
const logOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { email, password } = req.body;
        const userLogOut = yield user_1.default.findOne({ where: { id: id } });
        const tokenDestroy = jsonwebtoken_1.default.sign({
            id,
            email,
            password
        }, 'process.env.USER_DESTROY_TOKEN');
        userLogOut.token = tokenDestroy;
        res.status(200).json({ message: "Sucessfully logged out"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.logOutUser = logOutUser;
const userResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { password } = req.body;
        const userPasswordChange = yield user_1.default.findOne({ where: { id: id } });
        if (!userPasswordChange) {
            res.status(404).json({
                message: `User with id: ${id} not found`
            });
        }
        userPasswordChange.password = password;
        userPasswordChange === null || userPasswordChange === void 0 ? void 0 : userPasswordChange.save();
        const saltPassword = yield bcrypt_1.default.genSalt(10);
        const hashPassword = bcrypt_1.default.hashSync(password, saltPassword);
        userPasswordChange.password = hashPassword;
        yield (userPasswordChange === null || userPasswordChange === void 0 ? void 0 : userPasswordChange.save());
        res.status(201).json({
            message: `Password changed successful`
        });
    }
    catch (error) {
        res.status(501).json({
            message: error
        });
    }
});
exports.userResetPassword = userResetPassword;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const oneUser = yield user_1.default.findOne({ where: { id: id } });
        if (oneUser === null) {
            res.status(404).json({
                message: `User with id: ${id} not found`
            });
        }
        else {
            res.status(200).json({
                message: `${oneUser.username} is the user with id: ${id}`,
                data: oneUser
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.getUserById = getUserById;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield user_1.default.findAll();
        if (allUsers.length === 0) {
            res.status(404).json({
                message: `No user in this database`
            });
        }
        else {
            res.status(404).json({
                message: `We have ${allUsers.length} in this database`,
                data: allUsers
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.getAllUsers = getAllUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        res.status(404).json({
            message: `USer`
        });
        const updatedUser = yield user_1.default.update(req.body, { where: { id: id } });
        if (updatedUser[0] === null) {
            res.status(404).json({
                message: `User with id: ${id} not found`
            });
        }
        else {
            res.status(200).json({
                message: `User with id: ${id} has been updated`,
                data: updatedUser
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedUser = yield user_1.default.destroy({ where: { id: id } });
        if (deletedUser === null) {
            res.status(404).json({
                message: `User with ${id} not found`
            });
        }
        else {
            res.status(201).json({
                message: `User with ${id} deleted successfully`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.deleteUser = deleteUser;
