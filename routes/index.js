var express = require('express');
var router = express.Router();

const userController = require('../controllers').user;
const galaxiaController = require('../controllers').galaxia;
const sisplanetarioController = require('../controllers').sisplanetario;
const planetaController = require('../controllers').planeta;
const estrelaController = require('../controllers').estrela;
const satnaturalController = require('../controllers').satnatural;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* User Routes */
router.get('/api/user', userController.login);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);

/* Galaxias Routes */
router.get('/api/galaxia', galaxiaController.list);
router.post('/api/galaxia', galaxiaController.add);
router.put('/api/galaxia/:id', galaxiaController.update);
router.delete('/api/galaxia/:id', galaxiaController.delete);
router.get('/api/galaxia/:id', galaxiaController.getById);

/* SisPlanetario Routes */
router.get('/api/sisplanetario', sisplanetarioController.list);
router.post('/api/sisplanetario', sisplanetarioController.add);
router.put('/api/sisplanetario/:id', sisplanetarioController.update);
router.delete('/api/sisplanetario/:id', sisplanetarioController.delete);
router.get('/api/sisplanetario/:id', sisplanetarioController.getById);

/* Planeta Routes */
router.get('/api/planeta', planetaController.list);
router.post('/api/planeta', planetaController.add);
router.put('/api/planeta/:id', planetaController.update);
router.delete('/api/planeta/:id', planetaController.delete);
router.get('/api/planeta/:id', planetaController.getById);

/* Estrelas Routes */
router.get('/api/estrela', estrelaController.list);
router.post('/api/estrela', estrelaController.add);
router.put('/api/estrela/:id', estrelaController.update);
router.delete('/api/estrela/:id', estrelaController.delete);
router.get('/api/estrela/:id', estrelaController.getById);

/* SatNatural Routes */
router.get('/api/satnatural', satnaturalController.list);
router.post('/api/satnatural', satnaturalController.add);
router.put('/api/satnatural/:id', satnaturalController.update);
router.delete('/api/satnatural/:id', satnaturalController.delete);
router.get('/api/satnatural/:id', satnaturalController.getById);

module.exports = router;
