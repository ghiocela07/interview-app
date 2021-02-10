import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Approval } from './core/models/approval.model';
import { ApprovalService } from './core/services/approval.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'interview-app';
  public changesCount = 0;
  public approvalChangedSubscription: Subscription | undefined;

  constructor(private approvalService: ApprovalService) { }

  public ngOnInit(): void {
    this.changesCount = this.approvalService.getApprovalQueue().length;
    this.approvalChangedSubscription = this.approvalService.approvalListChanged.subscribe((changes: Approval[]) => {
      this.changesCount = changes.length;
    });
  }
  public ngOnDestroy(): void {
    this.approvalChangedSubscription?.unsubscribe();
  }
}
