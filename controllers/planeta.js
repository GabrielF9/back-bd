const Planeta = require('../models').Planeta;
const SisPlanetario = require('../models').SisPlanetario;

module.exports = {
  list(req, res) {
    return Planeta
      .findAll({
        where: {
          sis_plan: parseInt(req.query.sis_plan)
        },
        attributes: ['id', 'nome', 'tamanho', 'peso', 'vel_rotacao', 'possui_sn', 'componentes'],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((planetas) => res.status(200).send(planetas))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Planeta
      .findByPk(req.params.id, {
        attributes: ['id', 'nome', 'tamanho', 'peso', 'vel_rotacao', 'possui_sn', 'componentes'],
      })
      .then((planeta) => {
        if (!planeta) {
          return res.status(404).send({
            message: 'Planeta Not Found',
          });
        }
        return res.status(200).send(planeta);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Planeta
      .create({
        user_id: req.body.user_id,
        nome: req.body.nome,
        tamanho: req.body.tamanho,
        peso: req.body.peso,
        vel_rotacao: req.body.vel_rotacao,
        possui_sn: req.body.possui_sn,
        componentes: req.body.componentes,
        sis_plan: req.body.sis_plan
      })
      .then((planeta) => {
        SisPlanetario.findByPk(req.body.sis_plan, {
          attributes: ['id', 'nome', 'qtd_planetas', 'qtd_estrelas', 'idade', 'galaxia'],
        }).then((sisplanetario) => sisplanetario
          .update({
            user_id: sisplanetario.user_id,
            nome: sisplanetario.nome,
            qtd_planetas: sisplanetario.qtd_planetas + 1,
            qtd_estrelas: sisplanetario.qtd_estrelas,
            idade: sisplanetario.idade,
            galaxia: sisplanetario.galaxia
          }));
        return res.status(201).send(planeta);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Planeta
      .findByPk(req.params.id, {
        attributes: ['id', 'nome', 'tamanho', 'peso', 'vel_rotacao', 'possui_sn', 'componentes'],
      })
      .then(planeta => {
        if (!planeta) {
          return res.status(404).send({
            message: 'Planeta Not Found',
          });
        }
        return planeta
          .update({
            user_id: planeta.user_id,
            nome: req.body.nome || planeta.nome,
            tamanho: req.body.tamanho || planeta.tamanho,
            peso: req.body.peso || planeta.peso,
            vel_rotacao: req.body.vel_rotacao || planeta.vel_rotacao,
            possui_sn: req.body.possui_sn || planeta.possui_sn,
            componentes: req.body.componentes || planeta.componentes,
            sis_plan: planeta.sis_plan
          })
          .then(() => res.status(200).send(planeta))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Planeta
      .findByPk(req.params.id, {
        attributes: ['id', 'nome', 'tamanho', 'peso', 'vel_rotacao', 'possui_sn', 'componentes', 'sis_plan'],
      })
      .then(planeta => {
        if (!planeta) {
          return res.status(400).send({
            message: 'Planeta Not Found',
          });
        }
        let sis_plan = planeta.sis_plan;
        return planeta
          .destroy()
          .then(() => {
            SisPlanetario.findByPk(sis_plan, {
              attributes: ['id', 'nome', 'qtd_planetas', 'qtd_estrelas', 'idade', 'galaxia'],
            }).then((sisplanetario) => sisplanetario
              .update({
                user_id: sisplanetario.user_id,
                nome: sisplanetario.nome,
                qtd_planetas: sisplanetario.qtd_planetas - 1,
                qtd_estrelas: sisplanetario.qtd_estrelas,
                idade: sisplanetario.idade,
                galaxia: sisplanetario.galaxia
              }));
            res.status(204).send();
          })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};