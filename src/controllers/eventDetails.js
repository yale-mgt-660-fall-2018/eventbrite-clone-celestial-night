/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });


var eventId='';

function confirmationCodeGen(email){
    const crypto = require('crypto');


const teamNickname = 'celestial-night';
const cc = crypto.createHash('sha256')
    .update(`${email.toLowerCase()}-${teamNickname}`)
    .digest('hex')
    .substring(0, 7);
    console.log ('generating conf code)');
    console.log(cc);
return cc; 
}


function validYaleEmail(emailString){
    if (!validateEmail(emailString)){
        return false;
    }
    
    if (/@yale.edu\s*$/.test(emailString.toLowerCase())) {
        console.log("it ends in @yale");
        return true; 
     } 

     return false; 
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function randomTextDonation(){

    randomNum=Math.floor(Math.random() * 10); 
    if (randomNum<5){
        return "Donate";
    }
    else{

        return "Support"
    }

}

async function attendeeRegistrationPost(ctx) {
    
    const postRequest=ctx.request.body;
    
    const getRequestId=ctx.params.id;
    console.log('RSVP!');
    console.log(postRequest);
    console.log(getRequestId);
    statusAtendee='Fail';
    var confCofe; 

    //Here we check if the post request meet the rules 
    const eventsErrors= [];
    insertIntoDatabase=true; 
    if (postRequest.email==null || postRequest.email==''){
        insertIntoDatabase=false; 
        eventsErrors.push('No Mail!');}
    

    if (getRequestId==null || getRequestId==''){
        insertIntoDatabase=false; 
        eventsErrors.push('No Event ID');}


    if(!validYaleEmail(postRequest.email)){
        insertIntoDatabase=false;
        eventsErrors.push('This is not a valid Yale.edu Email');
    }

    if(insertIntoDatabase){
    console.log(ctx.request.body);
    const eventsModel = require('../models/events.js');
    queryResult=await eventsModel.insertAttendee(ctx.db,postRequest.email, getRequestId);
    console.log("After Registration");
    eventId=queryResult.id;
    statusAtendee='OK';
    confCofe=confirmationCodeGen(postRequest.email);
    }

    var newAttendee = {
        status:  statusAtendee,
        errors: eventsErrors,
        mail: postRequest.email,
        confCode: confCofe
      };
      // Return it
    return newAttendee;


    
    
    //Here I have to return event error, mail, random. 
}





async function eventDetails(ctx) {
    var eventAttendees=[];
    var confCode; 
    var email;
    eventsErrors=[];
    eventTitle= 'This is my event';
    var eventDate= ' ';
    var eventLocation= ' ';
    var eventImage='';
    var getRequest=ctx.params.id;
    console.log(getRequest); //Showing just New Haven. 
    const eventsModel = require('../models/events.js');

    if (getRequest!=null && getRequest!=''){
        
        if(postRequest=ctx.request.body.email!=null){
            //Here we instert the new attendees. 
            var newAttendee=await attendeeRegistrationPost(ctx);
            var status=newAttendee.status;
            email=newAttendee.mail;
            confCode=newAttendee.confCode;
            eventsErrors=newAttendee.errors;
            //Variables from view confCode email
            console.log('Object logging');
            console.log(newAttendee);
            console.log('Logging EMail');
            console.log(email);
            console.log(confCode);
            console.log(eventsErrors);


        }
        
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
    return ctx.render(template, { event: queryResult, eventImage,eventDate,eventLocation, eventsErrors,eventTitle, eventId,eventAttendees,donateText, confCode,email});
}

module.exports = {
    eventDetails,
};
