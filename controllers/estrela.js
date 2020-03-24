const Estrela = require('../models').Estrela;
const SisPlanetario = require('../models').SisPlanetario;

module.exports = {
  list(req, res) {
    return Estrela
      .findAll({
        where: {
          sis_plan: parseInt(req.query.sis_plan)
        },
        attributes: ['id', 'nome', 'tamanho', 'idade', 'possui_sn', 'dist_terra', 'gig_verm', 'buraco_negro'],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((estrelas) => res.status(200).send(estrelas))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Estrela
      .findByPk(req.params.id, {
        attributes: ['id', 'nome', 'tamanho', 'idade', 'possui_sn', 'dist_terra', 'gig_verm', 'buraco_negro'],
      })
      .then((estrela) => {
        if (!estrela) {
          return res.status(404).send({
            message: 'Estrela Not Found',
          });
        }
        return res.status(200).send(estrela);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Estrela
      .create({
        user_id: req.body.user_id,
        nome: req.body.nome,
        tamanho: req.body.tamanho,
        idade: req.body.idade,
        possui_sn: req.body.possui_sn,
        dist_terra: req.body.dist_terra,
        sis_plan: req.body.sis_plan,
        gig_verm: req.body.gig_verm,
        buraco_negro: req.body.buraco_negro
      })
      .then((estrela) => {
        SisPlanetario.findByPk(req.body.sis_plan, {
          attributes: ['id', 'nome', 'qtd_planetas', 'qtd_estrelas', 'idade', 'galaxia'],
        }).then((sisplanetario) => sisplanetario
          .update({
            user_id: sisplanetario.user_id,
            nome: sisplanetario.nome,
            qtd_planetas: sisplanetario.qtd_planetas,
            qtd_estrelas: sisplanetario.qtd_estrelas + 1,
            idade: sisplanetario.idade,
            galaxia: sisplanetario.galaxia
          }));
        return res.status(201).send(estrela);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Estrela
      .findByPk(req.params.id, {
        attributes: ['id', 'nome', 'tamanho', 'idade', 'possui_sn', 'dist_terra', 'gig_verm', 'buraco_negro'],
      })
      .then(estrela => {
        if (!estrela) {
          return res.status(404).send({
            message: 'Estrela Not Found',
          });
        }
        return estrela
          .update({
            user_id: estrela.user_id,
            nome: req.body.nome || estrela.nome,
            tamanho: req.body.tamanho || estrela.tamanho,
            idade: req.body.idade || estrela.idade,
            possui_sn: req.body.possui_sn || estrela.possui_sn,
            dist_terra: req.body.dist_terra || estrela.dist_terra,
            sis_plan: estrela.sis_plan,
            gig_verm: req.body.gig_verm || estrela.gig_verm,
            buraco_negro: req.body.buraco_negro || estrela.buraco_negro,
          })
          .then(() => res.status(200).send(estrela))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Estrela
      .findByPk(req.params.id, {
        attributes: ['id', 'nome', 'tamanho', 'idade', 'possui_sn', 'dist_terra', 'sis_plan', 'gig_verm', 'buraco_negro'],
      })
      .then(estrela => {
        if (!estrela) {
          return res.status(400).send({
            message: 'Estrela Not Found',
          });
        }
        let sis_plan = estrela.sis_plan;
        return estrela
          .destroy()
          .then(() => {
            SisPlanetario.findByPk(sis_plan, {
              attributes: ['id', 'nome', 'qtd_planetas', 'qtd_estrelas', 'idade', 'galaxia'],
            }).then((sisplanetario) => sisplanetario
              .update({
                user_id: sisplanetario.user_id,
                nome: sisplanetario.nome,
                qtd_planetas: sisplanetario.qtd_planetas,
                qtd_estrelas: sisplanetario.qtd_estrelas - 1,
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