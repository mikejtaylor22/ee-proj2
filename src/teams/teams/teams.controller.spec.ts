import { Test, TestingModule } from '@nestjs/testing';
import TeamsController from './teams.controller';
import Team from './team.entity';
import { TeamsService } from './teams.service';

const testTeam1 = 'Liquid';

const oneTeam = { id: '1ab5', name: testTeam1, numMembers: 20, numCoaches: 5 };
const invalidUuid = '2cc';

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
              { id: '1ab5', name: testTeam1, numMembers: 20, numCoaches: 5 },
              { id: '2ct7', name: 'TSM', numMembers: 50, numCoaches: 1 },
              { id: 'aa54', name: 'Method', numMembers: 100, numCoaches: 7 },
            ]),
            getSingleTeam: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: testTeam1,
                numMembers: 20,
                numCoaches: 5,
                id,
              }),
            ),
            addTeam: jest
              .fn()
              .mockImplementation((team: Team) => Promise.resolve({id:team.id})),
            updateSingleTeam: jest
              .fn()
              .mockImplementation((id: string, team: Team) =>
                Promise.resolve(team),
              ),
            deleteTeam: jest.fn().mockResolvedValue({ deleted: true }),
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
          id: '1ab5',
          name: testTeam1,
          numMembers: 20,
          numCoaches: 5,
        },
        {
          id: '2ct7',
          name: 'TSM',
          numMembers: 50,
          numCoaches: 1,
        },
        {
          id: 'aa54',
          name: 'Method',
          numMembers: 100,
          numCoaches: 7,
        },
      ]);
    });
  });

  describe('getTeamById', () => {
    it('should get a single team', async () => {
      await expect(controller.getTeamById('1ab5')).resolves.toEqual({
        id: '1ab5',
        name: testTeam1,
        numMembers: 20,
        numCoaches: 5,
      });
    });
  });

  describe('createTeam', () => {
    it('should create a new team', async () => {
      const newTeam: Team = {
        id: 'a5cv',
        name: 'EG',
        numMembers: 200,
        numCoaches: 12,
      };
      await expect(controller.createTeam(newTeam)).resolves.toEqual({
        id: 'a5cv',
      });
    });
  });

  describe('updateTeam', () => {
    it('should update a team', async () => {
      const newTeam: Team = {
        id: 'a5cv',
        name: 'Method',
        numMembers: 20,
        numCoaches: 4,
      };
      await expect(controller.updateTeam('a5cv', newTeam)).resolves.toEqual({
        id: 'a5cv',
        name: 'Method',
        numMembers: 20,
        numCoaches: 4,
      });
    });
  });

  describe('deleteTeam', () => {
    it('should return that it deleted a team', async () => {
      await expect(controller.deleteTeam(oneTeam.id)).resolves.toEqual({
        deleted: true,
      });
    });
    it('should return that it did not delete a team', async () => {
      const deleteSpy = jest
        .spyOn(service, 'deleteTeam')
        .mockResolvedValueOnce({ deleted: false });
      await expect(controller.deleteTeam(invalidUuid)).resolves.toEqual({
        deleted: false,
      });
      expect(deleteSpy).toBeCalledWith(invalidUuid);
    });
  });
});
