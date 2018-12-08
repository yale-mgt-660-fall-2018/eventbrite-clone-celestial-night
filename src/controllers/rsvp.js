/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });

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


async function attendeeRegistrationPost(ctx) {
    
    const postRequest=ctx.request.body;
    
    const getRequestId=ctx.params.id;
    console.log('RSVP!');
    console.log(postRequest);
    console.log(getRequestId);

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
    console.log("After Registration")
    eventId=queryResult.id;

    ctx.redirect("/events/"+getRequestId);

    }
    const template = 'newEvent.njk';
    //If the post request is wrong we send an error message to be listed. 
    return ctx.render(template ,{ eventsErrors });
}

module.exports = {
    attendeeRegistrationPost,
};
