const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./server/middleware/errorMiddleware");
const connectDB = require("./server/config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", require("./server/routes/postRoutes"));
app.use("/api/users", require("./server/routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`server started on ${port}`));
