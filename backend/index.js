import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3333;

import express from "express";

const app = express();

import kabumRoutes from "./src/routes/kabum.routes.js";

app.use("/kabum", kabumRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}🚀`);
});
