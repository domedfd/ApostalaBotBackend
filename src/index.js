const bot = require("./controller/bot");
bot.launch();

const express = require("express");

const server = express();
server.use(express.json());

const TaskRoutes = require("./routes/TaskRoutes");
server.use("/task", TaskRoutes);

server.listen(3333, () => {
  console.log("API ONLINE");
});
