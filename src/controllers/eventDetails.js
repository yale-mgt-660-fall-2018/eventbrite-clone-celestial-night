/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });


var eventId='';

async function eventDetails(ctx) {
    var eventAttendees=[];
    eventsErrors=[];
    eventTitle= 'This is my event';
    var getRequest=ctx.params.id;
    console.log(getRequest); //Showing just New Haven. 
    const eventsModel = require('../models/events.js');

    if (getRequest!=null && getRequest!=''){
        //Here we Query The Event to get the detailed information (We serach using the ID of the event)
        queryResult=await eventsModel.getById(ctx.db,getRequest);
        eventId=getRequest;
        //Here we get the title of the event. 
        if(queryResult!=null){
            eventTitle=queryResult.title;
            attendeesResult=await eventsModel.getAttendeeByEventId(ctx.db,eventId);
            console.log(attendeesResult);
            for (i in attendeesResult){
                console.log(attendeesResult[i].email);
                eventAttendees.push(attendeesResult[i].email);}

        }
        else{
            eventTitle='This Event Does not exists';
        }
        

    }
  //  
    

    console.log(eventTitle);
    const template = 'eventDetails.njk';
    console.log('Get Request'+ getRequest);
    return ctx.render(template, { eventsErrors,eventTitle, eventId,eventAttendees});
}

module.exports = {
    eventDetails,
};