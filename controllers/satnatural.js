const SatNatural = require('../models').SatNatural;
const Planeta = require('../models').Planeta;

module.exports = {
  list(req, res) {
    return SatNatural
      .findAll({
        attributes: ['id', 'nome', 'tamanho', 'peso', 'componentes'],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((satnaturais) => res.status(200).send(satnaturais))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return SatNatural
      .findByPk(req.params.id, {
        attributes: ['id', 'nome', 'tamanho', 'peso', 'componentes'],
      })
      .then((satnaturais) => {
        if (!satnaturais) {
          return res.status(404).send({
            message: 'SatNaturais Not Found',
          });
        }
        return res.status(200).send(satnaturais);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return SatNatural
      .create({
        user_id: req.body.user_id,
        nome: req.body.nome,
        tamanho: req.body.tamanho,
        peso: req.body.peso,
        possui_sn: req.body.possui_sn,
        componentes: req.body.componentes,
      })
      .then((satnatural) => {
        return res.status(201).send(satnatural);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return SatNatural
      .findByPk(req.params.id, {
        attributes: ['id', 'nome', 'tamanho', 'peso', 'componentes'],
      })
      .then(satnatural => {
        if (!satnatural) {
          return res.status(404).send({
            message: 'satnatural Not Found',
          });
        }
        return satnatural
          .update({
            user_id: satnatural.user_id,
            nome: req.body.nome || satnatural.nome,
            tamanho: req.body.tamanho || satnatural.tamanho,
            peso: req.body.peso || satnatural.peso,
            possui_sn: req.body.possui_sn || satnatural.possui_sn,
            componentes: req.body.componentes || satnatural.componentes,
            sis_plan: satnatural.sis_plan
          })
          .then(() => res.status(200).send(satnatural))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return SatNatural
      .findByPk(req.params.id, {
        attributes: ['id', 'nome', 'tamanho', 'peso', 'vel_rotacao', 'possui_sn', 'componentes', 'sis_plan'],
      })
      .then(satnatural => {
        if (!satnatural) {
          return res.status(400).send({
            message: 'satnatural Not Found',
          });
        }
        return satnatural
          .destroy()
          .then(() => {
            return res.status(204).send();
          })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};