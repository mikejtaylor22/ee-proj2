import { Test, TestingModule } from '@nestjs/testing';
import TeamsController from './teams.controller';
import Team from './team.entity';
import {TeamsService} from './teams.service';

const testTeam1 = 'Liquid';


describe('Teams Controller', () => {
  let controller: TeamsController;
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
     
      providers: [
        {
          provide: TeamsService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              { id:1, name: testTeam1, numMembers:20, numCoaches:5 },
              { id:2, name: 'TSM', numMembers:50, numCoaches:1},
              { id:3, name: 'Method', numMembers: 100, numCoaches: 7 },
            ]),
            getSingleTeam: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                name: testTeam1,
                numMembers:20,
                numCoaches: 5,
                id,
              }),
            ),
            addTeam: jest
              .fn()
              .mockImplementation((team:Team) =>
                Promise.resolve({ id: team.id}),
              ),
           
          },
        },
      ],
    }).compile();

    controller = module.get<TeamsController>(TeamsController);
    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should get all Teams', async () => {
      await expect(controller.getAllTeams()).resolves.toEqual([
        {
            id:1,
            name: testTeam1,
             numMembers:20, 
             numCoaches:5 
        },
        {
          id:2,
            name: 'TSM', numMembers:50, numCoaches:1
        },
        {
          id:3,
            name: 'Method', numMembers: 100, numCoaches: 7
        },
      ]);
    });
  });

  describe('getTeamById', () => {
    it('should get a single team', async () => {
      await expect(controller.getTeamById(1)).resolves.toEqual({
          id:1,
        name: testTeam1,
        numMembers: 20,
        numCoaches: 5,
        
      });
    });
  });
  
  describe('createTeam', () => {
    it('should create a new team', async () => {
      const newTeam: Team = {
        id:5,  
        name: 'EG',
        numMembers:200,
        numCoaches:12,
      };
      await expect(controller.createTeam(newTeam)).resolves.toEqual({
        id: 5
         
      });
    });
  });
 
 
});