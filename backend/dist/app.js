"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
const error_1 = require("./middlewares/error");
dotenv_1.default.config();
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.use("/correthor", index_1.default);
const PORT = process.env.PORT || 3000;
app.use(error_1.errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
