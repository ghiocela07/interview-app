import { Employee } from './employee.model';

export class Team {
    public id: number;
    public name: string;
    public teamLeader: Employee | undefined;
    public members: Employee[];

    constructor(id: number, name: string, teamLeader: Employee | undefined, members: Employee[]) {
        this.id = id;
        this.name = name;
        this.teamLeader = teamLeader;
        this.members = members;
    }
}
