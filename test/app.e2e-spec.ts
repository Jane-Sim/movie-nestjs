import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeach는 각 테스트를 시작하기 전에 해당 코드를 실행시키라는뜻이다.
  // 즉, describe, it의 테스트를 진행할 때마다 테스트 어플리케이션을 생성하는 것이다.
  // describe, it의 테스트가 10개면, 10개의 어플리케이션이 생성된다.
  // 어플리케이션이 각각 있으니, 데이터도 쌓이지 않는다.
  // beforeAll로 변경해서 어플리케이션은 1개만 만들고, 해당 어플리케이션에 describe('/movies' 의 it('POST')로 생성한 데이터를 계속 갖도록 만들자
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 테스트 어플리케이션은 꼭 실제 테스트용 어플리케이션과 일치한 환경으로 만들어주자.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    //get으로 movies 데이터를 불러올 때, 상태값 200과 빈배열을 받아오는지 테스트해보자.
    // get API가 정상적으로 작동하는지 확인해보기
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
    //post로 데이터를 보낼 땐, send함수로 데이터를 먼저 보내고, 그 다음 201 상태값을 받아야한다.
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
          other: 'thing',
        })
        .expect(400);
    });
    // 없는 데이터를 삭제할 때, Not Found인 404 상태값이 나오는지 확인하자.
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  // 위에서 생성한 테이터를 잘 가져오는지, 못 가져오는지 테스트해보자.
  describe('/movies/:d', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
