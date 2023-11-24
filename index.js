import express from "express";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const options = {
  target: "https://jsonplaceholder.typicode.com",
  changeOrigin: true,
  onProxyReq: (req) => {
    console.log("helloo-------");
  },
};

const exampleProxy = createProxyMiddleware(options);

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use("/posts", exampleProxy);
app.use("/users", exampleProxy);
app.use("/users", async (req, res, next) => {
  console.log("res--------");
  next();
});

// error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

// listen
app.listen("3000", () => {
  console.log("app listening on port 3000");
});
