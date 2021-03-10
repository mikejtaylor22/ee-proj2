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

  async getSingleTeam(id: string): Promise<Team> {
    const team = await this.teamsRepository.findOne(id);
    if (team) {
      return team;
    }
    throw new HttpException('Team not found!',HttpStatus.NOT_FOUND)
  }

  async deleteTeam(id:string): Promise<{ deleted: boolean; message?: string }>{
 try{
  const team = await this.teamsRepository.findOne(id);
   await this.teamsRepository.delete(team.id);
   return {deleted:true}
 } catch(err) {
   return {deleted:false, message:err.message};
 }
   
  }

  async updateSingleTeam(id:string,team:Team):Promise<Team>{
    try{
      await this.teamsRepository.update(id,team);
      return this.getSingleTeam(id);
    } catch(err){
      return err.message;
    }
  }

 
 
}
