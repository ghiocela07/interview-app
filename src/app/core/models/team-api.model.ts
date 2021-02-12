
export class TeamApiData {
    id: number;
    name: string;
    teamLeader: number;
    members: number[];

    constructor(id: number, name: string, teamLeader: number, members: number[]){
        this.id = id;
        this.name =  name;
        this.teamLeader = teamLeader;
        this.members = members;
    }
}
