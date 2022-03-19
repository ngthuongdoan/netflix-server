import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app';
import setupTestDB from '../utils/setupTestDB';
import { insertTodos, todoOne, todoTwo } from '../mocks/todo.mock';
import InsertReturnType from 'tests/utils/InsertReturnType';

setupTestDB();

describe('Todo route', () => {
  describe('GET /todo', () => {
    test('should return 200 and apply the default query options', async () => {
      await insertTodos([todoOne, todoTwo]);

      const res = await request(app).get('/todo').send().expect(httpStatus.OK);

      expect(res.body).toHaveLength(2);

      expect(res.body[0]).toMatchObject({
        title: todoOne.title,
        description: todoOne.description,
        time: todoOne.time.toISOString(),
        status: todoOne.status,
      });
    });
  });

  describe('GET /todo/:id', () => {
    test('should return 200 and apply the default query options', async () => {
      const [{ _id }]: InsertReturnType[] = await insertTodos([todoOne]);

      const res = await request(app)
        .get(`/todo/${_id}`)
        .send()
        .expect(httpStatus.OK);

        expect(res.body.id).toMatch(_id.toString());
      expect(res.body).toMatchObject({
        title: todoOne.title,
        description: todoOne.description,
        time: todoOne.time.toISOString(),
        status: todoOne.status,
      });
    });
  });
});
