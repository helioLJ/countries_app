import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/countries (GET)', () => {
    return request(app.getHttpServer())
      .get('/countries')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('/countries/:countryCode (GET)', () => {
    return request(app.getHttpServer())
      .get('/countries/US')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('borderCountries');
        expect(res.body).toHaveProperty('populationData');
        expect(res.body).toHaveProperty('flagUrl');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
