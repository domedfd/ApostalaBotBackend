const bot = require("./bot");
const express = require("express");
const server = express();

bot.launch();

server.get("/teste", (req, res) => {
  res.send("Tudo ok!");
});

server.listen(3000, () => {
  console.log("API ONLINE");
});
