/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });

db = pgp(process.env.DATABASE_URL);

async function eventDetails(ctx) {
    eventTitle= 'This is my event';
    const getRequest=ctx.params.id;
    console.log(getRequest); //Showing just New Haven. 
    const eventsModel = require('../models/events.js');

    if (getRequest!=null && getRequest!=''){
        //Here we Query The Event to get the detailed information (We serach using the ID of the event)
        queryResult=await eventsModel.getById(db,getRequest);
        
        //Here we get the title of the event. 
        if(queryResult!=null){
            eventTitle=queryResult.title;
        }
        else{
            eventTitle='This Event Does not exists';
        }
        

    }
  //  
    

    console.log(eventTitle);
    const template = 'eventDetails.njk';
 
    return ctx.render(template, { eventTitle });
}

module.exports = {
    eventDetails,
};