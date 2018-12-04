/**
 * @param  {Context} ctx - A Koa Context
 * @returns {Promise} - Returns a promise that resolves to undefined
 */
const bluebird = require('bluebird');
const pgp = require('pg-promise')({ promiseLib: bluebird });

async function index(ctx) {
    
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
      };
 
    return ctx;
}

module.exports = {
    index,
};