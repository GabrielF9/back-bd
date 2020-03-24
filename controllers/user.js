const MD5 = require('crypto-js/md5');
const User = require('../models').User;

function encrypt(data) {
  return MD5(data + 'Batatinha quando nasce se esparrama pelo chão').toString();
}

module.exports = {
  login(req, res) {
    return User
      .findOne({ where: { email: req.query.email } })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        if (req.query.email === user.email && encrypt(req.query.password) === user.password) {
          return res.status(200).send({ id: user.id, email: user.email });
        } else {
          return res.status(400).send({
            message: 'Invalid data',
          });
        }
      })
      .catch((error) => { res.status(400).send(error); });
  },

  add(req, res) {
    return User
      .create({
        email: req.body.email,
        password: encrypt(req.body.password)
      })
      .then((user) => res.status(201).send({ id: user.id, email: user.email }))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return User
      .findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            email: req.body.email || user.email,
            password: encrypt(req.body.password) || user.password,
          })
          .then(() => res.status(200).send({ id: user.id, email: user.email }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};