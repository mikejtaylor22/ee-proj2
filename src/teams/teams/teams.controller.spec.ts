import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import {TeamsService} from './teams.service';

describe('TeamsController', () => {
  let controller: TeamsController;
  const mockTeamService = {addTeam:jest.fn(),getAll:jest.fn(),getSingleTeam:jest.fn()}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers:[{provide:TeamsService,useValue:mockTeamService}]
    }).compile();
    
    controller = module.get<TeamsController>(TeamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call addTeam to add a team', async () => {
    await controller.getTeam("1");
    expect(mockTeamService.getSingleTeam).toHaveBeenCalledWith("1");
    
  });

  it('should call getAll to get all the teams', async () => {
    await controller.getAllTeams();
    expect(mockTeamService.getAll).toBeCalled();
  });
  //test the other 2 controller methods.. await controller.getAllTeams() and .createTeams();
});
