import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';
import { tap, map, catchError } from 'rxjs/operators';
import { Team } from '../models/team.model';
import { EmployeeService } from './employee.service';
import { NotificationService } from './notification.service';

export interface TeamResponseData {
    id: number;
    name: string;
    teamLeader: number;
    members: number[];
}

@Injectable({ providedIn: 'root' })
export class TeamsService {

    private readonly teamsApiURL = 'https://my-json-server.typicode.com/crialecaldarea/interview/teams';
    private teams: Team[] = [];

    constructor(private httpClient: HttpClient, private employeeService: EmployeeService,
                private notificationService: NotificationService) { }

    getTeamsFromApi(): Observable<Team[]> {
        return this.httpClient.get<TeamResponseData[]>(this.teamsApiURL)
            .pipe(
                map(teams => {
                    return this.convertTeams(teams);
                }),
                tap(teams => {
                    this.setTeamsData(teams);
                }),
                catchError(
                    (error: any) => {
                        this.notificationService.errorNotification('An error occured!' + error.message);
                        return throwError(error);
                    })
            );
    }

    getTeam(id: number): Team | undefined {
        return this.teams.find(
            (t: Team) => t.id === id
        );
    }

    setTeamsData(teamsData: Team[]): void {
        this.teams = teamsData;
    }

    getTeams(): Team[] {
        return this.teams.slice();
    }

    convertTeams(teamsData: TeamResponseData[]): Team[] {
        const teamsArray: Team[] = [];
        teamsData.forEach(teamData => {
            teamsArray.push(new Team(
                teamData.id,
                teamData.name,
                this.employeeService.getEmployee(teamData.teamLeader),
                this.convertMembers(teamData.members)
            ));
        });
        return teamsArray;
    }

    convertMembers(ids: number[]): Employee[] {
        const members: Employee[] = [];
        ids.forEach(member => {
            const employee = this.employeeService.getEmployee(member);
            if (employee) {
                members.push(employee);
            }
        });

        return members;
    }

}
