import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Test, TestingModule } from '@nestjs/testing';
import { TeamDto } from './team.model';
import { TeamsService } from './teams.service';

describe('TeamsService', () => {
  let service: TeamsService;
  const mockInMemoryDb = {get:jest.fn(),create:jest.fn(),getAll:jest.fn()};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamsService,{provide:InMemoryDBService,useValue:mockInMemoryDb}],
      
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });



  it('should create a team',  () => {
    const team = new TeamDto("Team Liquid",100,5)
    service.addTeam(team);
    expect(mockInMemoryDb.create).toHaveBeenCalledWith(team);
  });

  it('should get a team',  () => {
    
    service.getSingleTeam("1");
    expect(mockInMemoryDb.get).toHaveBeenCalledWith("1");
  });

  it('should get all team',  () => {
    
    service.getAll();
    expect(mockInMemoryDb.getAll).toHaveBeenCalled();
  });

});
