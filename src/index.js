const bot = require("./controller/bot");
bot.launch();

const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

const TaskRoutes = require("./routes/TaskRoutes");
server.use("/task", TaskRoutes);


var server_port = process.env.YOUR_PORT || process.env.PORT || 3333;

server.listen(process.env.PORT || 5000, () => {
  console.log("API ONLINE "+ server_port);
});
