const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/apostala_bot";
mongoose.connect(url, { useNewUrlParser: true });

module.exports = mongoose;
