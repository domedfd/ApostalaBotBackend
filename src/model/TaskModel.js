const mongoose = require("../config/database");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  macaddress: { type: String, required: true },
  type: { type: Number, required: true },
  user_name: { type: String, required: true },
  id_user: { type: Number, required: true },
  id_task: { type: String, required: true },
  id_task_validator: { type: Boolean, default: true },
  chat_id: { type: String },
  message_id: { type: String },
  message: { type: String, required: true },
  description: { type: String },
  done: { type: Boolean },
  done_when: { type: Date },
  created: { type: Date, default: Date.now() },
  modified: { type: Date },
  accessed: { type: Date },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
