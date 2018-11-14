/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */



async function index(ctx) {
    
    const eventsModel = require('../models/events.js');
    const events = await eventsModel.getAll(ctx.db);
    const waysOfBeingAwesome= [];

    const template = 'index.njk';
 
    return ctx.render(template, { waysOfBeingAwesome, events });
}

module.exports = {
    index,
};
