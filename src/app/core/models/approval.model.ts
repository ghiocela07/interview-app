import { ApprovalAction } from './approval-action.enum';
import { ApprovalStatus } from './approval-status.enum';
import { ApprovalType } from './approval-type.enum';
import { Employee } from './employee.model';
import { Team } from './team.model';

export class Approval {
    public id = 0;
    public action: ApprovalAction;
    public type: ApprovalType;
    public original: Employee | Team | undefined;
    public changed: Employee | Team | undefined;
    public status: ApprovalStatus;

    constructor(id: number, action: ApprovalAction, type: ApprovalType, status: ApprovalStatus,
                original: Employee | Team | undefined, changed: Employee | Team | undefined) {
        this.id = id;
        this.action = action;
        this.type = type;
        this.status = status;
        this.original = original;
        this.changed = changed;
    }
}
