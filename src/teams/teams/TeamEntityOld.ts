import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";



export interface TeamEntity extends InMemoryDBEntity {
name:string;
numMembers:number;
numCoaches:number;
}