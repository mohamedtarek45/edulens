import "../config/enviroment.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import UserRoute from "./routes/UserRoute.js";
import questionRoutes from "./routes/questionRoutes.js";
import studentExamRoutes from "./routes/studentExamRoute.js";
import examRoutes from "./routes/examRoute.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const startServer = async () => {

  await connectDB();


  const app = express();


  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://192.168.1.3:5173",
        process.env.FRONTEND_URL,
      ],
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use(express.json());

  
  app.get("/test", (req, res) => {
    res.send("frontend: " + process.env.FRONTEND_URL);
  });


  app.use("/api/dashboard", dashboardRoutes);
  app.use("/api/my/user", UserRoute);
  app.use("/api/questions", questionRoutes);
  app.use("/api/exams", examRoutes);
  app.use("/api/student", studentExamRoutes);


  app.listen(process.env.PORT || 3000, () => {
    console.log(`running at ${process.env.PORT || 3000}`);
  });
};

startServer();