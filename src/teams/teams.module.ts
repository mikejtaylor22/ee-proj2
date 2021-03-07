import { Module } from '@nestjs/common';
import {TeamsService}  from './teams/teams.service';
import  TeamsController  from './teams/teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Team from './teams/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamsService],
  controllers: [TeamsController]
})
export class TeamsModule {}
