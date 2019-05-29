import request from 'supertest';
import pushid from 'pushid';
import app from '../index';
import models from '../models';

describe('Test the root path', () => {
    beforeAll(async() => {
      const locations = [
        {id: pushid(), name: 'location1', males: '5', females: '10'},
        {id: pushid(), name: 'random', males: '6', females: '12'},
      ]
      await models.Location.bulkCreate(locations);
    });
    test('It should response the GET method', async() => {
      const response = await request(app).get('/api/locations');
      expect(response.statusCode).toBe(200);
    });
    test('Can create locations', async() => {
      const payload = { name: 'roysambu', males: '3', females: '3' }
      const response = await request(app).post('/api/locations')
        .set('Content-Type', 'application/json')
        .send(payload)
      expect(JSON.parse(response.text).message).toEqual('location created successfully')
    })
    test('name is required when creating locations', async() => {
      const payload = { males: '3', females: '3' }
      const response = await request(app).post('/api/locations')
        .set('Content-Type', 'application/json')
        .send(payload)
      expect(JSON.parse(response.text).name).toEqual('error, name is required')
    })
    test('males is required creating location', async() => {
      const payload = { name: 'roysambu', females: '3' }
      const response = await request(app).post('/api/locations')
        .set('Content-Type', 'application/json')
        .send(payload)
      expect(JSON.parse(response.text).males).toEqual('error, males is required')
    })
    test('should create location', async() => {
      const payload = { name: 'roysambuu', males: '3', females: '3' }
      const res = await request(app).post('/api/locations')
        .set('Content-Type', 'application/json')
        .send(payload)
     expect(JSON.parse(res.text).message).toEqual('location created successfully');
    })
    test('should not create location if parentLocation does not exist.', async() => {
      const payload = { name: 'roysambuii', males: '3', females: '3', parentLocation: "_jhgfjhg" }
      const res = await request(app).post('/api/locations')
        .set('Content-Type', 'application/json')
        .send(payload)
     expect(JSON.parse(res.text).message).toEqual('Parent Location name does not exist.');
    })
    test('should show list of locations', async() => {
      const payload = { name: 'roysambu', males: '3', females: '3' }
      await request(app).post('/api/locations')
        .set('Content-Type', 'application/json')
        .send(payload)
     const res = await request(app).get('/api/locations')
     expect(res.body[0].name).toEqual('location1');
    })
});

