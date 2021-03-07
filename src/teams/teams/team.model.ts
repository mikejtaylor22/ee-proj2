import {Min,Max, Length, IsString, IsInt } from 'class-validator';
import { TeamEntity } from './TeamEntityOld';


export class TeamDto implements TeamEntity{
  
    
   id:string;

    @Length(1,50)
    @IsString({always:true})
    name:string;

    @IsInt()
    @Min(1)
    @Max(500)
    numMembers:number;
    
    @IsInt()
    @Min(0)
    @Max(30)
    numCoaches:number;

    constructor(name:string,numMembers:number,numCoaches:number)
    {
    this.name = name;
    this.numMembers = numMembers;
    this.numCoaches = numCoaches;
    }

   

}