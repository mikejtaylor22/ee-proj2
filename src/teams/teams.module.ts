import { Module } from '@nestjs/common';
import {TeamsService}  from './teams/teams.service';
import  TeamsController  from './teams/teams.controller';
import { InMemoryDBModule, InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { TypeOrmModule } from '@nestjs/typeorm';
import Team from './teams/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamsService,InMemoryDBService],
  controllers: [TeamsController]
})
export class TeamsModule {}
