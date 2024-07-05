import dotenv from "dotenv";
import express, { Express } from "express";
import routes from "./routes";
import dbConnection from "./database/connection";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use("/correthor", routes);

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});