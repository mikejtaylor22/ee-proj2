import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {Min,Max, Length, IsString, IsInt } from 'class-validator'; 

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  public id: number;
 
  
  
  @IsString({always:true})
  @Column()
  name:string;

  @IsInt()
  @Min(1)
  @Max(700)
  @Column()
  numMembers:number;
  
  @IsInt()
  @Min(0)
  @Max(50)
  @Column()
  numCoaches:number;
}
 
export default Team;