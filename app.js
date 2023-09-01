import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import path from "path";

export const app = express();
app.use(express.static(path.resolve(__dirname, 'dist')));

config({
  path: "./data/config.env",
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "PUT", "POST", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(cors({
//   origin: '*',
//   methods: ["GET", "PUT", "POST", "DELETE"],
//   credentials: true
// }));
app.use(cors({
  origin: '*', // Replace with your frontend's actual URL in production
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true
}));


// Using routes
app.use("/users", userRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Nice working");
});

// Using Error Middleware
app.use(errorMiddleware);

