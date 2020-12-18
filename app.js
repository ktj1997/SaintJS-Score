const express = require("express");
const crawling = require("./service/crawling");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", async (req, res, next) => {
  const ret = await crawling(req.body);
  res.json(ret);
});

app.listen(8080, () => {
  console.log(8080, "Port is Running");
});
