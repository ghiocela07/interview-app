
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from '../models/employee.model';

import { Approval } from '../models/approval.model';
import { Team } from '../models/team.model';
import { ApprovalAction } from '../models/approval-action.enum';
import { ApprovalStatus } from '../models/approval-status.enum';
import { ApprovalType } from '../models/approval-type.enum';
import { EmployeeService } from './employee.service';
import { NotificationService } from './notification.service';
import { TeamsService } from './teams.service';


@Injectable({ providedIn: 'root' })
export class ApprovalService {

    public approvalListChanged = new Subject<Approval[]>();

    private approvalQueue: Approval[] = [];

    constructor(private employeesService: EmployeeService, private notificatioNService: NotificationService,
                private teamService: TeamsService) { }


    public getApprovalQueue(): Approval[] {
        return this.approvalQueue.slice();
    }

    public addToQueue(action: ApprovalAction, type: ApprovalType,
                      original: Team | Employee | undefined,
                      changed: Team | Employee | undefined): void {
        const id = Math.round(Math.random() * 10);

        this.approvalQueue.push(new Approval(
            id,
            action,
            type,
            ApprovalStatus.Pending,
            original,
            changed,
        ));
        this.notificatioNService.infoNotification(`Request '${action + ' ' + type}' was sent for approval!`);
        this.approvalListChanged.next(this.approvalQueue.slice());
        console.log(this.approvalQueue);
    }
    public rejectChange(change: Approval): void {
        this.notificatioNService.errorNotification(`Request '${change.action + ' ' + change.type}' was rejected!`);
        this.removeFromList(change.id);
    }
    public async approveChange(approval: Approval): Promise<void> {
        try {
            switch (approval.type) {
                case ApprovalType.Employee:
                    await this.manageEmployeeAcions(approval.changed as Employee, approval.action);
                    break;
                case ApprovalType.Team:
                    await this.manageTeamAcions(approval.changed as Team, approval.action);
                    break;
                default:
                    break;
            }
            this.notificatioNService.successNotification(`Request '${approval.action + ' ' + approval.type}' was approved!`);
            this.removeFromList(approval.id);
        }
        catch { }
    }

    private removeFromList(changeId: number): void {
        const rejectedIndex = this.approvalQueue.findIndex((chnage) => chnage.id === changeId);
        this.approvalQueue.splice(rejectedIndex, 1);
        this.approvalListChanged.next(this.approvalQueue.slice());
    }

    private async manageEmployeeAcions(employee: Employee, action: ApprovalAction): Promise<void> {
        try {
            switch (action) {
                case ApprovalAction.Add:
                    await this.employeesService.addEmployee(employee);
                    break;
                case ApprovalAction.Edit:
                    await this.employeesService.updateEmployee(employee);
                    break;
                case ApprovalAction.Delete:
                    await this.employeesService.deleteEmployee(employee.id);
                    await this.teamService.removeDeletedEmployeeFromTeams(employee.id);
                    break;
            }
        }
        catch (error) {
            throw (error);
        }
    }

    private async manageTeamAcions(team: Team, action: ApprovalAction): Promise<void> {
        try {
            switch (action) {
                case ApprovalAction.Add:
                    // add team
                    break;
                case ApprovalAction.Edit:
                    await this.teamService.updateTeam(team);
                    break;
                case ApprovalAction.Delete:
                    await this.teamService.deleteTeam(team.id);
                    break;
            }
        }
        catch (error) {
            throw (error);
        }
    }

}
