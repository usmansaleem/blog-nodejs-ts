import cookieParser from "cookie-parser";
import express from "express";
import { Request, Response } from "express";
import logger from "morgan";
import path from "path";
import BaseRouter from "./routes";

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/rest", BaseRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// default landing page
app.get("/", (req: Request, res: Response) => {
  res.render('index', { title: 'Blog Backend Engine' });
});

// 404
app.use((req: Request, res: Response) => {
  res.status(404);
  res.render('error', { message: 'Resource not found', error: {status: "404"} });
})

// Export express instance
export default app;
