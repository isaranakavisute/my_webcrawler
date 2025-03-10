const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
const webCrawlerRouter = require("./routes/webcrawler");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/webcrawler", webCrawlerRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});