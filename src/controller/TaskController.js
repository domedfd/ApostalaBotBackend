const TaskModel = require("../model/TaskModel");

class TaskController {
  //FUNCION CREAR
  async create(req, res) {
    const task = new TaskModel(req.body);
    await task
      .save()
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  //FUNCION MODIFICAR
  async update(req, res) {
    console.log("update");
    const { macaddress, type, user_name, id_user, id_task, message } = req.body;
    await TaskModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        macaddress,
        type,
        user_name,
        id_user,
        id_task,
        message,
        modified: new Date(),
      },
      {
        new: true,
      }
    )
      .then((response) => {
        if (response) return res.status(200).json(response);
        return res.status(404).json({ error: "id de la tarea no existe" });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  //FUNCION LISTAR TODAS TAREAS
  async all(req, res) {
    await TaskModel.find({ deleted: false, done: false })
      .sort("created")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  //FUNCION TAREA EXPECIFICA
  async show(req, res) {
    await TaskModel.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      { accessed: new Date() },

      {
        new: true,
      }
    )
      .then((response) => {
        if (response) return res.status(200).json(response);
        else
          return res.status(404).json({ error: "tarea eliminada o no existe" });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  //FUNCION DELETAR
  async deleted(req, res) {
    console.log("delete");
    const { macaddress, type, user_name, id_user, id_task, message } = req.body;
    await TaskModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        macaddress,
        type,
        user_name,
        id_user,
        id_task,
        message,
        deleted: true,
        modified: new Date(),
      },
      {
        new: true,
      }
    )
      .then((response) => {
        if (response)
          return res
            .status(200)
            .json({ deleted: "tarea eliminada con exito." });
        else return res.status(404).json({ error: "tarea no encontrada" });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  //FUNCION CONCLUIR TAREA
  async done(req, res) {
    console.log("done");
    await TaskModel.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      { done: req.params.done },
      { new: true }
    )
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
}

module.exports = new TaskController();
