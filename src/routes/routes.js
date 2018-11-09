const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');
const aboutControllers = require('../controllers/about.js');

const router = new Router();
router.get('/', indexControllers.index);

router.get('/about', aboutControllers.index)

module.exports = router;
