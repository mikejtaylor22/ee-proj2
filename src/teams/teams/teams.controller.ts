/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  ParseUUIDPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import Team from './team.entity';
import {HttpStatus } from '@nestjs/common';

@Controller('api')
export default class TeamsController {
  constructor(private teamService: TeamsService) {}

  @Get('team/:id')
  async getTeamById(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    id: string,
  ): Promise<Team> {
    return await this.teamService.getSingleTeam(id);
  }

  @Get('teams')
  @HttpCode(HttpStatus.OK)
  async getAllTeams(): Promise<Team[]> {
    return await this.teamService.getAll();
  }

  @Post('team')
  @HttpCode(HttpStatus.CREATED)
  async createTeam(@Body() newTeam: Team) {
    return await this.teamService.addTeam(newTeam);
  }

  @Delete('team/:id')
  async deleteTeam(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    id: string,
  ) {
    return await this.teamService.deleteTeam(id);
  }

  @Patch('team/:id')
  @HttpCode(HttpStatus.OK)
  async updateTeam(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    id: string,
    @Body() team: Team,
  ): Promise<Team> {
    return await this.teamService.updateSingleTeam(id, team);
  }
}
