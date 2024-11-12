import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { NplModule } from 'src/app/npl.module';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [NplModule],
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent {
  employee: Employee = {
    name: '',
    designation: '',
    empId: '',
    mobileNo: '',
    emailId: '',
    salary: 0,
    joiningDate: new Date().toISOString().split('T')[0],
    leavingDate: '',
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  addEmployee(): void {
    this.employeeService.createEmployee(this.employee).subscribe(
      () => {
        alert('Employee Added Successfully');
        // Reset the form
        this.resetForm();
      },
      (error) => {
        console.error('Error adding employee', error);
      }
    );
  }

  private resetForm(): void {
    this.employee = {
      name: '',
      designation: '',
      empId: '',
      mobileNo: '',
      emailId: '',
      salary: 0,
      joiningDate: new Date().toISOString().split('T')[0],
      leavingDate: '',
    };
  }
}
