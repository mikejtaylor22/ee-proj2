import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Team from '../teams/team.entity';

import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
    

  constructor(@InjectRepository(Team) private teamsRepository: Repository<Team>){ }
   

    addTeam(team:Team):Promise<Team>{
        return this.teamsRepository.save(team);
        // return this.dbService.create(team); 
    }

    getAll():Promise<Team[]> {
        return this.teamsRepository.find();
    }

    async getSingleTeam(id:number):Promise<Team>{
        const team = await this.teamsRepository.findOne(id);
        if(team){
            return team;
        }
        throw new HttpException('Team not found',HttpStatus.NOT_FOUND)
        // return this.dbService.get(id);
    }
   
     
    
   
}
