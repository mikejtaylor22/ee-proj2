import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  HttpStatus,} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TeamsModule } from '../src/teams/teams.module';
import Team from 'src/teams/teams/team.entity';


//try to mock the ValidationPipe
// const target: ValidationPipe = new ValidationPipe({   whitelist:true,
//   forbidNonWhitelisted: true,
//   forbidUnknownValues: true,
//   transform:true,
//   disableErrorMessages:true,
//   errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY });

//This entire spec file needs refactored to mock a postgres database -
//  When running e2e test I am getting  Cannot create a new connection named "default", because connection with such name already exist 
// and it now has an active connection session.

describe('TeamsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TeamsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('(POST) to /api/team should return 200 status', () => {
    
    return request(app.getHttpServer())
      .post('/api/team/')
      .send({id:1,})
      .expect(201);
  });

  it('(GET) to /api/team/:id should return 200 status', async () => {
   
    const postResponse = await request(app.getHttpServer())
      .post('/api/team/')
      .send();

    return request(app.getHttpServer())
      .get(`/api/team/${postResponse.text}`)
      .expect(200);
  });

  it('(GET) to /api/team/:id should return 422 HTTP status due to invalid id  ', async () => {
    
    const invalidId = 1;
    const postResponse = await request(app.getHttpServer())
      .post('/api/team/')
      .send();

    return request(app.getHttpServer())
      .get(`/api/team/${invalidId}`)
      .expect(422);
  });

  it('(GET) to /api/teams should return 200 status to get all teams', async () => {
    
    const postResponse = await request(app.getHttpServer())
      .post('/api/team/')
      .send();

    return request(app.getHttpServer())
      .get(`/api/teams`)
      .expect(200);
  });

  it('(POST) to /api/team  Should throw 422 status due to sending invalid data(numCoaches cannot be greater than 30)', async () => {
    const target: ValidationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      disableErrorMessages: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });

    

    return request(app.getHttpServer())
      .post('/api/team/')
      .send()
      .expect(422);
  });

  it('(POST) to /api/team', () => {
    
    return request(app.getHttpServer())
      .post('/api/team/')
      .expect(422);
  });
});
