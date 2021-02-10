
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


@Injectable({ providedIn: 'root' })
export class ApprovalService {

    public approvalListChanged = new Subject<Approval[]>();

    private approvalQueue: Approval[] = [];

    constructor(private employeesService: EmployeeService, private notificatioNService: NotificationService) { }


    getApprovalQueue(): Approval[] {
        return this.approvalQueue.slice();
    }

    addToQueue(action: ApprovalAction, type: ApprovalType,
               original: Team | Employee | undefined, changed: Team | Employee | undefined): void {
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
    rejectChange(change: Approval): void {
        this.notificatioNService.errorNotification(`Request '${change.action + ' ' + change.type}' was rejected!`);
        this.removeFromList(change.id);
    }
    approveChange(approval: Approval): void {

        switch (approval.type) {
            case ApprovalType.Employee:
                this.employeesService.manageEmployee(approval.changed as Employee, approval.action);
                break;
            case ApprovalType.Team:
                break;
            default:
                break;
        }
        this.notificatioNService.successNotification(`Request '${approval.action + ' ' + approval.type}' was approved!`);
        this.removeFromList(approval.id);
    }

    removeFromList(changeId: number): void {
        const rejectedIndex = this.approvalQueue.findIndex((chnage) => chnage.id === changeId);
        this.approvalQueue.splice(rejectedIndex, 1);
        this.approvalListChanged.next(this.approvalQueue.slice());
    }

}
