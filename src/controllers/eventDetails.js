/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });

<<<<<<< HEAD

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
    var getRequest=ctx.params.id;
=======
db = pgp(process.env.DATABASE_URL);

async function eventDetails(ctx) {
    eventTitle= 'This is my event';
    const getRequest=ctx.params.id;
>>>>>>> fix conflicts
    console.log(getRequest); //Showing just New Haven. 
    const eventsModel = require('../models/events.js');

    if (getRequest!=null && getRequest!=''){
        //Here we Query The Event to get the detailed information (We serach using the ID of the event)
<<<<<<< HEAD
        queryResult=await eventsModel.getById(ctx.db,getRequest);
        eventId=getRequest;
        //Here we get the title of the event. 
        if(queryResult!=null){
            eventTitle=queryResult.title;
            var donateText=randomTextDonation();
            attendeesResult=await eventsModel.getAttendeeByEventId(ctx.db,eventId);
            console.log(attendeesResult);
            for (i in attendeesResult){
                console.log(attendeesResult[i].email);
                eventAttendees.push(attendeesResult[i].email);}

=======
        queryResult=await eventsModel.getById(db,getRequest);
        
        //Here we get the title of the event. 
        if(queryResult!=null){
            eventTitle=queryResult.title;
>>>>>>> fix conflicts
        }
        else{
            eventTitle='This Event Does not exists';
        }
        

    }
  //  
    

<<<<<<< HEAD
    console.log(donateText);
    const template = 'eventDetails.njk';
    console.log('Get Request'+ getRequest);
    return ctx.render(template, { eventsErrors,eventTitle, eventId,eventAttendees,donateText});
=======
    console.log(eventTitle);
    const template = 'eventDetails.njk';
 
    return ctx.render(template, { eventTitle });
>>>>>>> fix conflicts
}

module.exports = {
    eventDetails,
};