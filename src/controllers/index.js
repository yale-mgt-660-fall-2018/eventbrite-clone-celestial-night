/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });



async function index(ctx) {
    
    const eventsModel = require('../models/events.js');
    queryResult=await eventsModel.getByLocation(ctx.db,'NH');
    console.log(queryResult); //Showing just New Haven. 
    const waysOfBeingAwesome= [];

    for (i in queryResult){
        console.log(queryResult[i].title);
        waysOfBeingAwesome.push(queryResult[i].title);
    }
    console.log(waysOfBeingAwesome);
    const template = 'index.njk';
 
    return ctx.render(template, { waysOfBeingAwesome });
}

module.exports = {
    index,
};
