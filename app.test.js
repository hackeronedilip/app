// app.test.js
const request = require('supertest');
const app = require('./app');
const { resetUsers } = require('./users');

beforeEach(() => {
  resetUsers();
  
});










describe('User API', () => {
  test('POST /users creates user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Eve', email: 'eve@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Eve');
  });

  test('GET /users/:id returns user', async () => {
    const createRes = await request(app)
      .post('/users')
      .send({ name: 'Frank', email: 'frank@example.com' });
    const id = createRes.body.id;

    const getRes = await request(app).get(`/users/${id}`);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.email).toBe('frank@example.com');
  });

  test('PUT /users/:id updates user', async () => {
    const createRes = await request(app)
      .post('/users')
      .send({ name: 'Grace', email: 'grace@example.com' });
    const id = createRes.body.id;

    const putRes = await request(app)
      .put(`/users/${id}`)
      .send({ name: 'Gracie' });
    expect(putRes.body.name).toBe('Gracie');
  });

  test('DELETE /users/:id deletes user', async () => {
    const createRes = await request(app)
      .post('/users')
      .send({ name: 'Heidi', email: 'heidi@example.com' });
    const id = createRes.body.id;

    const delRes = await request(app).delete(`/users/${id}`);
    expect(delRes.statusCode).toBe(204);
  });
});
