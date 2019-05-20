import request from 'supertest';
import app from '../index';
import models from '../models';

describe('Test the root path', () => {
    beforeAll(async() => {
      const contacts = [
        {name: 'test', phone: '0700777888'},
        {name: 'random', phone: '0700888777'},
      ]
      await models.Contact.bulkCreate(contacts)
    });
    test('It should response the GET method', async() => {
      const response = await request(app).get('/api/contacts');
      expect(response.statusCode).toBe(200);
    });
    test('Can create contacts', async() => {
      const payload = { name: 'some name', phone_number: '0701777888' }
      const response = await request(app).post('/api/contacts')
        .set('Content-Type', 'application/json')
        .send(payload)
      expect(JSON.parse(response.text).message).toEqual('sms created successfully')
    })
});
