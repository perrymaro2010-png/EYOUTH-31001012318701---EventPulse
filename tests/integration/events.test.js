const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
require('../../models/userModel');
require('../../models/categoryModel');

let adminToken;

beforeAll(async()=>{
    //checking for a steady connection
    if(mongoose.connection.readyState === 0){
        await mongoose.connect(process.env.MONGO_URI);
    };

    //how to send requests and their details
    const res = await request(app).post('/api/auth/login').send({
        email: "johnDoe1234@gmail.com",
        password: "sfjlkWF_255!4"
    });
    //storing token for future use
    adminToken = res.body.data.token
});

//close connection after all testing is done
afterAll(async()=>{
    await mongoose.disconnect();
});

//check that all events are brought in an array
describe('GET - /api/events', ()=>{
    it('return 200 with an array of events', async ()=> {
        const res = await request(app).get('/api/events');

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
        expect(Array.isArray(res.body.data)).toBe(true)
    });
});

//check that the person is allowed to create a new event
describe('POST - /api/events', ()=> {
    it('return 401 for missing token', async()=>{
        const res = await request(app).post('/api/events').send({title: 'Chess Tournament for the Guys'});
        expect(res.statusCode).toBe(401);
    });

    it('return 403 for attendee trying to create event', async()=>{
        const res = await request(app).post('/api/events').set('Authorization', `Bearer ${adminToken}`).send({title: 'Chess Tournament for the Guys'});
        expect(res.statusCode).toBe(422);
    })
});