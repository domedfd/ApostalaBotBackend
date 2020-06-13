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
var server_host = process.env.YOUR_HOST || '0.0.0.0';

server.listen(server_port, () => {
  console.log("API ONLINE");
});
