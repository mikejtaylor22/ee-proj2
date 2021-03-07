/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Get, Param, Post,UnprocessableEntityException,UseFilters,ValidationPipe,ParseUUIDPipe, HttpCode, Res, ParseIntPipe  } from '@nestjs/common';
import {TeamsService} from './teams.service';
import Team from './team.entity';
import {HttpException,HttpStatus} from '@nestjs/common';






@Controller('api')
export default class TeamsController {
constructor(private teamService:TeamsService){}

    @Get('team/:id')
   async getTeamById(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})) id:number):Promise<Team>{
        return this.teamService.getSingleTeam(id);
    }

    @Get('teams')
    @HttpCode(HttpStatus.OK)
    async getAllTeams():Promise<Team[]>{
        return this.teamService.getAll();
    }

  

    @Post('team')
    @HttpCode(HttpStatus.CREATED)
    async createTeam(@Body() newTeam: Team){
      return {id:(await this.teamService.addTeam(newTeam)).id};
     
    }

}
