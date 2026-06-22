import express from "express";
import cors from "cors"

const app = express();
app.use(express.json(), cors());

import authRoute from "./src/routes/auth.route.js";
app.use("/", authRoute);

import userRoute from "./src/routes/user.route.js";
app.use("/", userRoute);

import batchRoute from "./src/routes/batch.route.js";
app.use("/", batchRoute);

import productRoute from "./src/routes/product.route.js";
app.use("/", productRoute);

import customerRoute from "./src/routes/customer.route.js";
app.use("/", customerRoute);

import saleRoute from "./src/routes/sale.route.js";
app.use("/", saleRoute);


const port = 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
