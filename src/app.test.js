/* globals describe, test, expect, beforeAll */

// Jest testing for our app.
// See https://hackernoon.com/async-testing-koa-with-jest-1b6e84521b71

const request = require('supertest');
const makeApp = require('./app.js');

describe('our app', () => {
    let app;
    beforeAll(() => {
        app = makeApp({
            databaseURL: process.env.TEST_DATABASE_URL,
        });
    });

    test('root route is up', async () => {
        const response = await request(app.callback())
            .get('/');

        expect(response.status)
            .toBe(200);
    });

    /* Missing Test for event detail */

    test('new events is up', async () => {
        const response = await request(app.callback())
            .get('/events/new');

        expect(response.status)
            .toBe(200);
    });


    test('about route is up', async () => {
        const response = await request(app.callback())
            .get('/about');

        expect(response.status)
            .toBe(200);
    });

    test('donate is up', async () => {
        const response = await request(app.callback())
            .get('/donate');

        expect(response.status)
            .toBe(200);
    });

    test('API is up', async () => {
        const response = await request(app.callback())
            .get('/api/events');

        expect(response.status)
            .toBe(200);
    });

    test('JSON Response', async () => {
        const response = await request(app.callback())
            .get('/api/events');

        expect(response.type)
            .toEqual('application/json');
            expect(response.status)
    
    });


    res.body.data[0].should.include.keys(
        'id', 'name', 'genre', 'rating', 'explicit'
      );





});
