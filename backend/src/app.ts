import dotenv from "dotenv";
import express, { Express } from "express";
import routes from "./routes";
import connectToDatabase from "./database/connection";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use("/api", routes);

const PORT = Number(process.env.PORT || 3000);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT} `);
  });
}).catch((e: any) => {
  if (e instanceof Error) {
    console.error("Error connecting to database: ", e.message);
  } else {
    console.error("Error connectin to database: ", e)
  }
});
