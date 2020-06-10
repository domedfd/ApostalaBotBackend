const mongoose = require("../config/database");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  macaddress: { type: String, required: true },
  type: { type: Number, required: true },
  user_name: { type: String, required: true },
  id_user: { type: Number, required: true },
  id_task: { type: String, required: true },
  id_task_validator: { type: Boolean, default: true },
  description: { type: String },
  done: { type: Boolean, default: false },
  done_when: { type: Date },
  created: { type: Date, default: Date.now() },
  modified: { type: Date, default: Date.now() },
  accessed: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Task", TaskSchema);
