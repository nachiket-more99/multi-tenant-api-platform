console.log(process.env.DATABASE_URL);

import express from "express";
import userRouter from "./modules/user/user.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/user", userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});