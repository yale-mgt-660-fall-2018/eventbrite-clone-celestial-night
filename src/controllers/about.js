/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });

async function index(ctx) {
    
    const template = 'about.njk';
 
    return ctx.render(template);
}

module.exports = {
    index,
};
