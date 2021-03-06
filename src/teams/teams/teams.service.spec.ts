import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Team from './team.entity';
import { TeamsService } from './teams.service';

const testTeam1 = 'Liquid';

const teamArray = [
  { id: '1ab5', name: testTeam1, numMembers: 20, numCoaches: 5 },
  { id: '2ct7', name: 'TSM', numMembers: 50, numCoaches: 1 },
  { id: 'aa54', name: 'Method', numMembers: 100, numCoaches: 7 },
];

const oneTeam = { id: '1ab5', name: testTeam1, numMembers: 20, numCoaches: 5 };

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
      expect(service.getSingleTeam('1ab5')).resolves.toEqual(oneTeam);
      expect(repoSpy).toBeCalledWith('1ab5');
    });
  });

  describe('addTeam', () => {
    it('should successfully add a Team', () => {
      expect(
        service.addTeam({
          id: '1ab5',
          name: testTeam1,
          numMembers: 20,
          numCoaches: 5,
        }),
      ).resolves.toEqual({id:oneTeam.id});
      expect(repo.save).toBeCalledTimes(1);
      expect(repo.save).toBeCalledWith({
        id: '1ab5',
        name: testTeam1,
        numMembers: 20,
        numCoaches: 5,
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('deleteOne', () => {
    it('should return {deleted:true}', () => {
      expect(service.deleteTeam('1ab5')).resolves.toEqual({ deleted: true });
    });

    it('should return {deleted:false, message:err.message}', () => {
      const repoSpy = jest
        .spyOn(repo, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.deleteTeam('2cc')).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
    });
  });

  describe('updateSingleTeam', () => {
    it('should call the updateSingleTeam method', async () => {
      const team = await service.updateSingleTeam('1ab5', oneTeam);
      expect(team).toEqual(oneTeam);
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toBeCalledWith('1ab5', {
        id: '1ab5',
        name: testTeam1,
        numMembers: 20,
        numCoaches: 5,
      });
    });
  });
});
