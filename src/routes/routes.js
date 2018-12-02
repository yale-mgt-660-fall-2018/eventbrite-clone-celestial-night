const Router = require('koa-router');
const indexControllers = require('../controllers/index.js');
const aboutControllers = require('../controllers/about.js');
const newEventControllers = require('../controllers/newEvent.js');
const eventDetailsControllers = require('../controllers/eventDetails.js');
const rsvpControllers = require('../controllers/rsvp.js');
<<<<<<< HEAD
const donateControllers= require ('../controllers/donate.js');
=======

>>>>>>> Updating changes to SQL
const router = new Router();

router.get('/', indexControllers.index);
router.get('/events/new', newEventControllers.newEvent);
router.post('/events/new', newEventControllers.newEventPost);
router.get('/events', eventDetailsControllers.eventDetails);
//The line bellow allow us to hanlde URL having the event ID after the slash. 
router.get('/events/:id', eventDetailsControllers.eventDetails);
router.get('/about', aboutControllers.index);
router.post('/rsvp/:id', rsvpControllers.attendeeRegistrationPost);
<<<<<<< HEAD
router.get('/donate', donateControllers.donate);

=======
>>>>>>> Updating changes to SQL
module.exports = router;
