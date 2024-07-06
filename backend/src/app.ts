import "express-async-errors";
import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes/index";
import { errorMiddleware } from "./middlewares/error";

dotenv.config();

const app: Express = express();
app.use(express.json());

app.use("/correthor", router);

const PORT = process.env.PORT || 3000;

app.use(errorMiddleware);
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});