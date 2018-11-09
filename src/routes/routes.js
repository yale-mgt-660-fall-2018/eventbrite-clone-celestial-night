const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');
const aboutControllers = require('../controllers/about.js');
const newEventControllers = require('../controllers/newEvent.js');
<<<<<<< HEAD
const eventDetailsControllers = require('../controllers/eventDetails.js');
const rsvpControllers = require('../controllers/rsvp.js');
const donateControllers= require ('../controllers/donate.js');
=======
const aboutControllers = require('../controllers/about.js');
>>>>>>> Adding routes

const router = new Router();
router.get('/', indexControllers.index);
router.get('/events/new', newEventControllers.newEvent);
router.post('/events/new', newEventControllers.newEventPost);
<<<<<<< HEAD
router.get('/events', eventDetailsControllers.eventDetails);
//The line bellow allow us to hanlde URL having the event ID after the slash. 
router.get('/events/:id', eventDetailsControllers.eventDetails);
router.get('/about', aboutControllers.index);
router.post('/rsvp/:id', rsvpControllers.attendeeRegistrationPost);
router.get('/donate', donateControllers.donate);
=======

router.get('/about', aboutControllers.index)

>>>>>>> Adding routes
module.exports = router;
