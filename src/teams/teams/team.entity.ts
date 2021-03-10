import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Min, Max, IsString, IsInt} from 'class-validator';

@Entity()
export class Team {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString({ always: true })
  @Column()
  name: string;

  @IsInt()
  @Min(1)
  @Max(1000)
  @Column()
  numMembers: number;

  @IsInt()
  @Min(0)
  @Max(200)
  @Column()
  numCoaches: number;
}

export default Team;
