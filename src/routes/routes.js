const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');
const aboutControllers = require('../controllers/about.js');
const newEventControllers = require('../controllers/newEvent.js');

const router = new Router();
router.get('/', indexControllers.index);
router.get('/events/new', newEventControllers.newEvent);
router.post('/events/new', newEventControllers.newEventPost);

router.get('/about', aboutControllers.index)

module.exports = router;
