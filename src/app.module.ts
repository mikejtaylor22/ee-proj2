import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';


@Module({
  imports: [TeamsModule,ConfigModule.forRoot({ 
    envFilePath: ['src/db.env','.env.development.local'],
    validationSchema: Joi.object({
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    PORT: Joi.number()
  })
}), DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
