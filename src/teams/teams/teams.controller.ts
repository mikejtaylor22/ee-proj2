/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Get, Param, Post,HttpCode,ParseIntPipe, Delete  } from '@nestjs/common';
import {TeamsService} from './teams.service';
import Team from './team.entity';
import {HttpException,HttpStatus} from '@nestjs/common';






@Controller('api')
export default class TeamsController {
constructor(private teamService:TeamsService){}

    @Get('team/:id')
   async getTeamById(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY})) id:number):Promise<Team>{
        return await this.teamService.getSingleTeam(id);
    }

    @Get('teams')
    @HttpCode(HttpStatus.OK)
    async getAllTeams():Promise<Team[]>{
        return await this.teamService.getAll();
    }

  

    @Post('team')
    @HttpCode(HttpStatus.CREATED)
    async createTeam(@Body() newTeam: Team){
      return {id:(await this.teamService.addTeam(newTeam)).id};
     
    }

    @Delete('team/:id')
    async deleteTeamById(@Param('id') id:number):Promise<{ deleted: boolean }> {
        return await this.teamService.deleteOne(id);
    }

}
