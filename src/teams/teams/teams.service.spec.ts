import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Team from './team.entity';
import { TeamsService } from './teams.service';

const testTeam1 = 'Liquid';


const teamArray = [
    { id:1, name: testTeam1, numMembers:20, numCoaches:5 },
    { id:2, name: 'TSM', numMembers:50, numCoaches:1},
    { id:3, name: 'Method', numMembers: 100, numCoaches: 7 }
];

const oneTeam = { id:1, name: testTeam1, numMembers:20, numCoaches:5};

describe('TeamService', () => {
  let service: TeamsService;
  let repo: Repository<Team>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getRepositoryToken(Team),
          useValue: {
            find: jest.fn().mockResolvedValue(teamArray),
            findOne: jest.fn().mockResolvedValue(oneTeam),
            save: jest.fn().mockReturnValue(oneTeam),
            create: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    repo = module.get<Repository<Team>>(getRepositoryToken(Team));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return all teams', async () => {
      const teams = await service.getAll();
      expect(teams).toEqual(teamArray);
    });
  });
  describe('getSingleTeam', () => {
    it('should get a single team', () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      expect(service.getSingleTeam(1)).resolves.toEqual(oneTeam);
      expect(repoSpy).toBeCalledWith(1);
    });
  });
 
  describe('addTeam', () => {
    it('should successfully add a Team', () => {
      expect(
        service.addTeam({
            id:1, 
            name: testTeam1, 
            numMembers:20, 
            numCoaches:5
        }),
      ).resolves.toEqual(oneTeam);
      expect(repo.save).toBeCalledTimes(1);
      expect(repo.save).toBeCalledWith({
        id:1, 
        name: testTeam1, 
        numMembers:20, 
        numCoaches:5
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });
});