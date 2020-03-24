const Galaxia = require('../models').Galaxia;

module.exports = {
  list(req, res) {
    return Galaxia
      .findAll({
        where: {
          user_id: parseInt(req.query.user_id)
        },
        attributes: ['id', 'name', 'qt_sistema', 'dist_terra'],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((galaxias) => res.status(200).send(galaxias))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Galaxia
      .findByPk(req.params.id, {
        attributes: ['id', 'name', 'qt_sistema', 'dist_terra'],
      })
      .then((galaxia) => {
        if (!galaxia) {
          return res.status(404).send({
            message: 'Galaxia Not Found',
          });
        }
        return res.status(200).send(galaxia);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Galaxia
      .create({
        user_id: req.body.user_id,
        name: req.body.name,
        qt_sistema: 0,
        dist_terra: req.body.dist_terra
      })
      .then((galaxia) => res.status(201).send(galaxia))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Galaxia
      .findByPk(req.params.id, {
        attributes: ['id', 'name', 'qt_sistema', 'dist_terra'],
      })
      .then(galaxia => {
        if (!galaxia) {
          return res.status(404).send({
            message: 'Galaxia Not Found',
          });
        }
        return galaxia
          .update({
            user_id: galaxia.user_id,
            name: req.body.name || galaxia.name,
            qt_sistema: req.body.qt_sistema || galaxia.qt_sistema,
            dist_terra: req.body.dist_terra || galaxia.dist_terra
          })
          .then(() => res.status(200).send(galaxia))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Galaxia
      .findByPk(req.params.id, {
        attributes: ['id', 'name', 'qt_sistema', 'dist_terra'],
      })
      .then(galaxia => {
        if (!galaxia) {
          return res.status(400).send({
            message: 'Galaxia Not Found',
          });
        }
        return galaxia
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};