import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApprovalType } from '../core/models/approval-type.enum';
import { Approval } from '../core/models/approval.model';
import { ApprovalService } from '../core/services/approval.service';

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
  public expandedElement: ApprovalType | null | undefined;

  private approvalChangedSubscription: Subscription | undefined;

  constructor(private approvalService: ApprovalService) { }

  public ngOnInit(): void {
    this.changesList = this.approvalService.getApprovalQueue();
    this.approvalChangedSubscription = this.approvalService.approvalListChanged.subscribe((chnages: Approval[]) => {
      this.changesList = chnages;
    });
    console.log(this.changesList);
  }

  public ngOnDestroy(): void {
    this.approvalChangedSubscription?.unsubscribe();
  }

  public onReject(change: Approval): void {
    this.approvalService.rejectChange(change);
  }

  public onApprove(change: Approval): void{
    this.approvalService.approveChange(change);
  }
}
