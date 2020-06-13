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
    await TaskModel.findOneAndUpdate(
      { _id: req.params.id, done: false, deleted: false },
      {
        macaddress,
        type,
        user_name,
        id_user,
        id_task,
        message,
        modified: new Date(),
        accessed: new Date(),
      },
      {
        new: true,
      }
    )
      .then((response) => {
        if (response) return res.status(200).json(response);
        return res
          .status(404)
          .json({ error: "tarea hecha, eliminada o no existe" });
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
        console.log(error);
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
  async delete(req, res) {
    console.log("delete");
    const { macaddress, type, user_name, id_user, id_task, message } = req.body;
    await TaskModel.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      {
        macaddress,
        type,
        user_name,
        id_user,
        id_task,
        message,
        deleted: true,
        modified: new Date(),
        accessed: new Date(),
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
        else
          return res
            .status(404)
            .json({ error: "tarea ya eliminada o no existe" });
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
      { done: req.params.done, accessed: new Date() },
      { new: true }
    )
      .then((response) => {
        if (response) return res.status(200).json(response);
        return res.status(404).json({ error: "tarea eliminada o no existe" });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }
  //BUSCAR TAREAS HECHAS
  async dones(req, res) {
    await TaskModel.find({ done: true, deleted: false }).then((response) => {
      return res
        .status(200)
        .json(response)
        .catch((error) => {
          return res.status(500).json(error);
        });
    });
  }
  //BUSCAR ACTIVAR
  async activate(req, res) {
    await TaskModel.find({
      done: false,
      deleted: false,
      type: 1,
    }).then((response) => {
      return res
        .status(200)
        .json(response)
        .catch((error) => {
          return res.status(500).json(error);
        });
    });
  }
  //BUSCAR AUTORIZAR
  async authorize(req, res) {
    await TaskModel.find({
      done: false,
      deleted: false,
      type: 2,
    }).then((response) => {
      return res
        .status(200)
        .json(response)
        .catch((error) => {
          return res.status(500).json(error);
        });
    });
  }
  //BUSCAR VALIDAR
  async validate(req, res) {
    await TaskModel.find({
      done: false,
      deleted: false,
      type: 3,
    }).then((response) => {
      return res
        .status(200)
        .json(response)
        .catch((error) => {
          return res.status(500).json(error);
        });
    });
  }
  //BUSCAR DESBLOQUEAR
  async unlock(req, res) {
    await TaskModel.find({
      done: false,
      deleted: false,
      type: 4,
    }).then((response) => {
      return res
        .status(200)
        .json(response)
        .catch((error) => {
          return res.status(500).json(error);
        });
    });
  }
}

module.exports = new TaskController();
