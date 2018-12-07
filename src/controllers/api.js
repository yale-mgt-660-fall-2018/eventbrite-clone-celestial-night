/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });

async function index(ctx) {
    
    getRequest=ctx.request.query.search;

    const eventsModel = require('../models/events.js');
    
    if(getRequest!=null && getRequest!=''){
        events=await eventsModel.getByTitle(ctx.db, getRequest)
    }
    else{
        events=await eventsModel.getAll(ctx.db);
    }
   
    
    for(i in events) {
     
     eventId=events[i].id ;
     attendeesResult=await eventsModel.getAttendeeByEventId(ctx.db,eventId); 
     console.log(attendeesResult);
     events[i].attendees=attendeesResult; 
    }

    
    ctx.body = {
        
        
        events
        
        
      };
 

    return ctx;
}

module.exports = {
    index,
};