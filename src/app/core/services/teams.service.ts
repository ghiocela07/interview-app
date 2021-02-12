import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';
import { tap, map, catchError } from 'rxjs/operators';
import { Team } from '../models/team.model';
import { EmployeeService } from './employee.service';
import { NotificationService } from './notification.service';
import { TeamApiData } from '../models/team-api.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class TeamsService {

    public teamsChanged = new Subject<Team[]>();
    private readonly teamsApiURL = environment.apiUrl + 'teams';
    private teams: Team[] = [];

    constructor(private httpClient: HttpClient, private employeeService: EmployeeService,
                private notificationService: NotificationService) { }


    public async getTeam(id: number): Promise<Team | undefined> {
        const team = this.teams.find(
            (t: Team) => t.id === id
        );
        try {
            if (!team) {
                return await this.getTeamFromApi(id);
            }

        } catch (error) {
            this.notificationService.errorNotification('An error occured!' + error.message);
        }

        return team;
    }

    public async getTeams(): Promise<Team[]> {
        const teams = this.teams.slice();
        try {
            if (teams.length === 0) {
                return await this.getTeamsFromApi();
            }

        } catch (error) {
            this.notificationService.errorNotification('An error occured!' + error.message);
        }
        return teams;
    }

    public async removeDeletedEmployeeFromTeams(employeeId: number): Promise<void> {
        let teamsCount = 0;
        this.teams.forEach(async team => {
            teamsCount++;
            await this.removeDeletedEmployeeFromTeam(employeeId, team);
        });
        this.notificationService.successNotification(teamsCount + ' teams were updated (employee removed from team)');

    }

    public async updateTeam(team: Team): Promise<void> {

        let teamLeaderId = 0;
        if (team.teamLeader !== undefined) {
            teamLeaderId = team.teamLeader?.id ? team.teamLeader?.id : 0;
        }
        const apiTeam = new TeamApiData(
            team.id,
            team.name,
            teamLeaderId,
            []);
        team.members.forEach(member => {
            apiTeam.members.push(member.id);
        });
        const response = await this.updateTeamToApi(apiTeam);
        const updatedTeam = await this.convertTeam(response);
        const updatedIndex = this.teams.findIndex(t => t.id === updatedTeam.id);
        this.teams[updatedIndex] = updatedTeam;
        this.notificationService.successNotification('Team was updated successfully!');
        this.teamsChanged.next(await this.getTeams());
    }

    public async deleteTeam(teamId: number): Promise<void> {
        await this.deleteEmployeesToApi(teamId);
        const deletedIndex = this.teams.findIndex(team => team.id === teamId);
        this.teams.splice(deletedIndex, 1);
        this.notificationService.successNotification('Team deleted successfully!');
        this.teamsChanged.next(await this.getTeams());

    }

    public async getAvailableTeamsForEmployee(employee: Employee): Promise<Team[]> {
        const result = await this.getTeams();
        return result.filter(r => !r.members.includes(employee));
    }

    private async removeDeletedEmployeeFromTeam(employeeId: number, team: Team): Promise<void> {
        let teamLeaderId = 0;
        if (team.teamLeader !== undefined) {
            teamLeaderId = team.teamLeader?.id === employeeId ? 0 : team.teamLeader?.id;
        }
        const apiTeam = new TeamApiData(
            team.id,
            team.name,
            teamLeaderId,
            []);
        team.members.forEach(member => {
            if (member.id !== employeeId) {
                apiTeam.members.push(member.id);
            }
        });

        const response = await this.updateTeamToApi(apiTeam);
        const updatedTeam = await this.convertTeam(response);
        const updatedIndex = this.teams.findIndex(t => t.id === updatedTeam.id);
        this.teams[updatedIndex] = updatedTeam;
        this.teamsChanged.next(await this.getTeams());

    }

    private async getTeamsFromApi(): Promise<Team[]> {
        return await this.httpClient.get<TeamApiData[]>(this.teamsApiURL)
            .pipe(
                map(teams => {
                    return this.convertTeams(teams);
                }),
                tap(teams => {
                    this.setTeamsData(teams);
                }),
                catchError(
                    (error: any) => {
                        return throwError(error);
                    })
            ).toPromise();
    }

    private async getTeamFromApi(id: number): Promise<Team> {
        return this.httpClient.get<TeamApiData>(this.teamsApiURL + '/' + id).pipe(
            map(team => {
                return this.convertTeam(team);
            }),
            catchError(
                (error: any) => {
                    return throwError(error);
                }
            )
        ).toPromise();
    }

    private async updateTeamToApi(team: TeamApiData): Promise<TeamApiData> {
        return this.httpClient.patch<TeamApiData>(this.teamsApiURL + '/' + team.id, team).pipe(
            catchError(
                (error: any) => {
                    this.notificationService.errorNotification('An error occured!' + error.message);
                    return throwError(error);
                }
            )
        ).toPromise();
    }

    private async addTeamToApi(team: TeamApiData): Promise<TeamApiData> {
        return this.httpClient.post<TeamApiData>(this.teamsApiURL, team).pipe(
            catchError(
                (error: any) => {
                    this.notificationService.errorNotification('An error occured!' + error.message);
                    return throwError(error);
                }
            )
        ).toPromise();
    }

    private async deleteEmployeesToApi(teamId: number): Promise<void> {
        return this.httpClient.delete<void>(this.teamsApiURL + '/' + teamId).pipe(
            catchError(
                (error: any) => {
                    this.notificationService.errorNotification('An error occured!' + error.message);
                    return throwError(error);
                }
            )
        ).toPromise();
    }

    private convertTeams(teamsData: TeamApiData[]): Team[] {
        const teamsArray: Team[] = [];
        teamsData.forEach(async teamData => {
            teamsArray.push(await this.convertTeam(teamData));
        });
        return teamsArray;
    }

    private async convertTeam(teamData: TeamApiData): Promise<Team> {
        const teamLeader = teamData.id !== 0 ? await this.employeeService.getEmployee(teamData.teamLeader) : undefined;
        return new Team(
            teamData.id,
            teamData.name,
            teamLeader,
            this.convertMembers(teamData.members)
        );
    }

    private convertMembers(ids: number[]): Employee[] {
        const members: Employee[] = [];
        ids.forEach(async member => {
            const employee = await this.employeeService.getEmployee(member);
            if (employee) {
                members.push(employee);
            }
        });

        return members;
    }

    private setTeamsData(teamsData: Team[]): void {
        this.teams = teamsData;
    }

}
