import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let taskId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect([]);
  });

    it('/tasks (POST)', () => {
    return request(app.getHttpServer())
        .post('/tasks')
        .send({ content: 'Test task' })
        .expect(201)
        .expect((res) => {
            taskId = res.body.id;
            expect(res.body.content).toBe('Test task');
            expect(res.body.done).toBe(false);
        });
    });

    it('/tasks/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .expect(200)
  });

  it('/tasks/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/tasks/${taskId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
