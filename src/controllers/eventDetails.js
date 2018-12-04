/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });


var eventId='';

function randomTextDonation(){

    randomNum=Math.floor(Math.random() * 10); 
    if (randomNum<5){
        return "Donate";
    }
    else{

        return "Support"
    }

}


async function eventDetails(ctx) {
    var eventAttendees=[];
    eventsErrors=[];
    eventTitle= 'This is my event';
    var eventDate= ' ';
    var eventLocation= ' ';
    var eventImage='';
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
            eventLocation=queryResult.location;
            eventDate=queryResult.date;
            eventImage=queryResult.image_url;
            var donateText=randomTextDonation();
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
    

    console.log(donateText);
    console.log(queryResult);
    const template = 'eventDetails.njk';
    console.log('Get Request'+ getRequest);
     console.log(queryResult);
    return ctx.render(template, { event: queryResult, eventImage,eventDate,eventLocation, eventsErrors,eventTitle, eventId,eventAttendees,donateText});
}

module.exports = {
    eventDetails,
};