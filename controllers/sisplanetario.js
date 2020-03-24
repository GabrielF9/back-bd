const SisPlanetario = require('../models').SisPlanetario;
const Galaxia = require('../models').Galaxia;

module.exports = {
  list(req, res) {
    return SisPlanetario
      .findAll({
        where: {
          galaxia: parseInt(req.query.galaxia)
        },
        attributes: ['id', 'nome', 'qtd_planetas', 'qtd_estrelas', 'idade'],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((sisplanetarios) => res.status(200).send(sisplanetarios))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return SisPlanetario
      .findByPk(req.params.id, {
        attributes: ['id', 'nome', 'qtd_planetas', 'qtd_estrelas', 'idade'],
      })
      .then((sisplanetario) => {
        if (!sisplanetario) {
          return res.status(404).send({
            message: 'SisPlanetario Not Found',
          });
        }
        return res.status(200).send(sisplanetario);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return SisPlanetario
      .create({
        user_id: req.body.user_id,
        nome: req.body.nome,
        qtd_planetas: 0,
        qtd_estrelas: 0,
        idade: req.body.idade,
        galaxia: req.body.galaxia
      })
      .then((sisplanetario) => {
        Galaxia.findByPk(req.body.galaxia, {
          attributes: ['id', 'name', 'qt_sistema', 'dist_terra'],
        }).then((galaxia) => galaxia
          .update({
            user_id: galaxia.user_id,
            name: galaxia.name,
            qt_sistema: galaxia.qt_sistema + 1,
            dist_terra: galaxia.dist_terra
          }));
        return res.status(201).send(sisplanetario);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return SisPlanetario
      .findByPk(req.params.id, {
        attributes: ['id', 'nome', 'qtd_planetas', 'qtd_estrelas', 'idade'],
      })
      .then(sisplanetario => {
        if (!sisplanetario) {
          return res.status(404).send({
            message: 'SisPlanetario Not Found',
          });
        }
        return sisplanetario
          .update({
            user_id: sisplanetario.user_id,
            nome: req.body.nome || sisplanetario.nome,
            qtd_planetas: sisplanetario.qtd_planetas,
            qtd_estrelas: sisplanetario.qtd_estrelas,
            idade: req.body.idade || sisplanetario.idade,
            galaxia: sisplanetario.galaxia
          })
          .then(() => res.status(200).send(sisplanetario))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return SisPlanetario
      .findByPk(req.params.id, {
        attributes: ['id', 'nome', 'qtd_planetas', 'qtd_estrelas', 'idade', 'galaxia'],
      })
      .then(sisplanetario => {
        if (!sisplanetario) {
          return res.status(400).send({
            message: 'SisPlanetario Not Found',
          });
        }
        let galaxia = sisplanetario.galaxia;
        return sisplanetario
          .destroy()
          .then(() => {
            Galaxia.findByPk(galaxia, {
              attributes: ['id', 'name', 'qt_sistema', 'dist_terra'],
            }).then((galaxia) => galaxia
              .update({
                user_id: galaxia.user_id,
                name: galaxia.name,
                qt_sistema: galaxia.qt_sistema - 1,
                dist_terra: galaxia.dist_terra
              }));
            return res.status(204).send();
          })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};