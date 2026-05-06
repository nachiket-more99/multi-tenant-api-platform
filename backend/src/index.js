console.log(process.env.DATABASE_URL);

import express from "express";
import userRouter from "./modules/user/user.routes.js";
import tenantRouter from "./modules/tenant/tenant.routes.js";
import apiKeyRouter from "./modules/apikey/apikey.routes.js";
import requestLogRouter from "./modules/request-log/request-log.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/user", userRouter);
app.use("/tenant", tenantRouter);
app.use("/apikey", apiKeyRouter);
app.use("/logs", requestLogRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});