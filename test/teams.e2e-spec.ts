import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TeamsModule } from '../src/teams/teams.module';
import Team from '../src/teams/teams/team.entity';
import { DatabaseModule } from '../src/database/database.module';

const team = {id:"1a5c",name:"Team Liquid",numMembers:5,numCoaches:1};
const app = 'http://localhost:3000';

describe('TeamsController (e2e)', () => {
  // let app: INestApplication;


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TeamsModule,DatabaseModule]
    }).compile();
    
    // app = moduleFixture.createNestApplication();
    // await app.init();
  });

  // it('(POST) to /api/team should return 201 status', async () => {
  //  console.log(team); 
   
  // });

  it('(GET) to /api/team/:id should return 200 status', async () => {
   
    const postResponse = await request(app)
      .post('/api/team/')
      .send(team);

      console.log(postResponse)

    await request(app)
      .get(`/api/team/${postResponse.text}`)
      .expect(200);
  });

  // it('(GET) to /api/team/:id should return 422 HTTP status due to invalid id  ', async () => {
    
  //   const invalidId = 1;
  //   const postResponse = await request(app.getHttpServer())
  //     .post('/api/team/')
  //     .send();

  //   return request(app.getHttpServer())
  //     .get(`/api/team/${invalidId}`)
  //     .expect(422);
  // });

  // it('(GET) to /api/teams should return 200 status to get all teams', async () => {
    
  //   const postResponse = await request(app.getHttpServer())
  //     .post('/api/team/')
  //     .send();

  //   return request(app.getHttpServer())
  //     .get(`/api/teams`)
  //     .expect(200);
  // });

  // it('(POST) to /api/team  Should throw 422 status due to sending invalid data(numCoaches cannot be greater than 30)', async () => {
  //   const target: ValidationPipe = new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     forbidUnknownValues: true,
  //     transform: true,
  //     disableErrorMessages: true,
  //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //   });

    

  //   return request(app.getHttpServer())
  //     .post('/api/team/')
  //     .send()
  //     .expect(422);
  // });

  // it('(POST) to /api/team', () => {
    
  //   return request(app.getHttpServer())
  //     .post('/api/team/')
  //     .expect(422);
  // });
});
