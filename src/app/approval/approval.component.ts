import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ApprovalAction } from '../core/models/approval-action.enum';
import { ApprovalType } from '../core/models/approval-type.enum';
import { Approval } from '../core/models/approval.model';
import { ApprovalService } from '../core/services/approval.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ApprovalComponent implements OnInit, OnDestroy {

  public changesList: Approval[]  = [];
  public columnsToDisplay = ['action', 'type', 'approve', 'reject'];
  public expandedElement: Approval | null | undefined;

  private approvalChangedSubscription: Subscription | undefined;
  private confirmationDialogSubscription: Subscription | undefined;

  constructor(private approvalService: ApprovalService, private matDialog: MatDialog) { }

  public ngOnInit(): void {
    this.changesList = this.approvalService.getApprovalQueue();
    this.approvalChangedSubscription = this.approvalService.approvalListChanged.subscribe((chnages: Approval[]) => {
      this.changesList = chnages;
    });
    console.log(this.changesList);
  }

  public ngOnDestroy(): void {
    this.approvalChangedSubscription?.unsubscribe();
    this.confirmationDialogSubscription?.unsubscribe();
  }

  public  isEmployee(change: Approval): boolean{
    return change.type === ApprovalType.Employee;
  }
  public  isTeam(change: Approval): boolean{
    return change.type === ApprovalType.Team;
  }

  public onReject(change: Approval): void {
    const dialog = this.openConfirmationDialog('Are you sure you want to reject this change?');
    this.confirmationDialogSubscription = dialog.subscribe((confirm) => {
      if (confirm) {
        this.approvalService.rejectChange(change);
      }
    });
  }

  public async onApprove(change: Approval): Promise<void>{
    const dialog = this.openConfirmationDialog('Are you sure you want to approve this change?');
    this.confirmationDialogSubscription = dialog.subscribe( async confirm => {
      if (confirm) {
        await this.approvalService.approveChange(change);
      }
    });
  }

  private openConfirmationDialog(message: string): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        confirmationMessage: message,
        pleaseNoteMessage: ''
      }
    });

    return dialogRef.afterClosed();
  }
}
