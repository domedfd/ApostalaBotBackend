const mongoose = require("mongoose");

const url = "mongodb://domenico:apostala123@ds145997.mlab.com:45997/heroku_vq5939k4";
mongoose.connect(url, { useNewUrlParser: true });

module.exports = mongoose;
