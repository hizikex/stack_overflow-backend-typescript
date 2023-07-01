"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const tag_1 = __importDefault(require("./routes/tag"));
const question_1 = __importDefault(require("./routes/question"));
const answer_1 = __importDefault(require("./routes/answer"));
const config_1 = __importDefault(require("./config/config"));
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', user_1.default);
app.use('/api/v1', tag_1.default);
app.use('/api/v1', question_1.default);
app.use('/api/v1', answer_1.default);
config_1.default.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
}).catch((err) => {
    console.log(err.message);
});
