import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee.model';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.scss']
})
export class EmployeeItemComponent implements OnInit {

  @Input() public employee: Employee | undefined;
  @Input() public dividerInset = false;
  constructor() { }

  public ngOnInit(): void {
  }

}
