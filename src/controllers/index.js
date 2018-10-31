/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });

db = pgp('postgres://dev_user:dev_pass@localhost:7000/dev_db');//GR: This must be Changed connections shoudl not be managed here. 



async function index(ctx) {
    
    const eventsModel = require('../models/events.js');
    queryResult=await eventsModel.getByLocation(db,'NH');
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
