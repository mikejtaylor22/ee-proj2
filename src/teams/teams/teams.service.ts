import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Team from '../teams/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private teamsRepository: Repository<Team>,
  ) {}

  async addTeam(team: Team): Promise<Team> {
    return await this.teamsRepository.save(team);
  }

  async getAll(): Promise<Team[]> {
    return await this.teamsRepository.find();
  }

  async getSingleTeam(id: number): Promise<Team> {
    const team = await this.teamsRepository.findOne(id);
    if (team) {
      return team;
    }
    throw new HttpException('Team not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }

 
}
