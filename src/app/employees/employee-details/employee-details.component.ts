import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() public employee: Employee | undefined;
  constructor() { }

  public ngOnInit(): void {
  }

}
