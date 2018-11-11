/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });

db = pgp(process.env.DATABASE_URL);

async function newEvent(ctx) {
    
    waysOfBeingAwesome=[]
    const eventsModel = require('../models/events.js');
    const template = 'newEvent.njk';
    return ctx.render(template);
}



function is_url(str)
{
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
              
            return true;
        }
        else
        {
        
        return false;
          
        }
}

function is_image(str){
    if(str==null){
        return false; 
    }
    var lastDot = str.lastIndexOf(".");
    if (lastDot==-1){
        return false; 
    }
    var lastword=str.substring(lastDot+1, str.length); 
    console.log(lastword);
    if(lastword=='jpg'||lastword=='png'||lastword=='gif'){
        return true;
    }

    return false
}


async function newEventPost(ctx) {
    
    const postRequest=ctx.request.body;

    //Here we check if the post request meet the rules 
    const eventsErrors= [];
    insertIntoDatabase=true; 
    if (postRequest.location==null || postRequest.location==''){
        insertIntoDatabase=false; 
        eventsErrors.push('No location!');
    } else if (String(postRequest.loaction).length >50){
        insertIntoDatabase=false; 
        eventsErrors.push('Location is longer than 50 characters!');
    }
    
    if (postRequest.title==null || postRequest.title==''){
        insertIntoDatabase=false; 
        eventsErrors.push('No title!');
    }else if (String(postRequest.title).length>50){
        insertIntoDatabase=false; 
        eventsErrors.push('Title is longer than 50 characters!');
    }
    
    if (postRequest.image==null || postRequest.image==''){
        insertIntoDatabase=false; 
        eventsErrors.push('No image!');
    }
    

    if (is_url(postRequest.image)==false ||is_image(postRequest.image)==false){
        insertIntoDatabase=false; 
        eventsErrors.push('URL is not valid');
    }

/*
Image with a file extension other than .png, .jpg, or .gif
An image that is not a valid URL
*/


    if(insertIntoDatabase){
    console.log(ctx.request.body);
    const eventsModel = require('../models/events.js');
    const eventDate= postRequest.month +' '+ postRequest.day +','+postRequest.year+ ' '+postRequest.hour+':'+postRequest.minute;
    queryResult=await eventsModel.insert(db,postRequest.title,eventDate,postRequest.image, postRequest.location);
    eventId=queryResult.id;

    ctx.redirect("/events/"+eventId);

    }
    const template = 'newEvent.njk';
 
    //If the post request is wrong we send an error message to be listed. 
    return ctx.render(template ,{ eventsErrors });
}

module.exports = {
    newEvent,newEventPost,
};
