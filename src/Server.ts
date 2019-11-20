import cookieParser from "cookie-parser";
import express from "express";
import { Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import rfs from "rotating-file-stream";
import BaseRouter from "./routes";
import BlogViewRouter from "./routes/BlogView";

// Init express
const app = express();

// Add middleware/settings/routes to express.

// set up morgan access logging
app.use(
  morgan("combined", {
    stream: rfs("access.log", {
      interval: "1d", // rotate daily
      path: "./logs"
    })
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// set up routes
app.use("/rest", BaseRouter);
app.use("/view", BlogViewRouter);

// 404
app.use((req: Request, res: Response) => {
  res.status(404);
  res.render("error", { message: "Page not found",
    desc: "Sorry, the page you are trying to view is not available." });
});

// Export express instance
export default app;
