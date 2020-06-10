const TaskModel = require("../model/TaskModel");

const TaskValidation = async (req, res, next) => {
  const {
    macaddress,
    type,
    user_name,
    id_user,
    id_task,
    message,
    modified,
  } = req.body;

  if (req.params.id) {
    if (!modified) {
      return res
        .status(400)
        .json({ error: "fecha de modificacion es obligatorio" });
    } else {
      return next();
    }
  }
  if (!macaddress)
    return res.status(400).json({ error: "macaddress es obligatorio" });
  else if (!type) return res.status(400).json({ error: "tipo es obligatorio" });
  else if (!user_name)
    return res.status(400).json({ error: "nombre del usuario es obligatorio" });
  else if (!id_user)
    return res.status(400).json({ error: "id del usuario es obligatorio" });
  else if (!id_task)
    return res.status(400).json({ error: "id de la tarea es obligatorio" });
  else if (!message)
    return res.status(400).json({ error: "mensage es obligatorio" });

  next();
};

module.exports = TaskValidation;
