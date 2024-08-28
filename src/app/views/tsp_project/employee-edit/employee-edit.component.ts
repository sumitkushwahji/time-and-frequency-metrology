import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { NplModule } from 'src/app/npl.module';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [NplModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss',
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee = {
    name: '',
    designation: '',
    empId: '',
    mobileNo: '',
    emailId: '',
    salary: 0,
    joiningDate: '',
    leavingDate: '',
  };

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(Number(id)).subscribe(
        (data) => (this.employee = data),
        (error) => console.error('Error fetching employee data', error)
      );
    }
  }

  updateEmployee(): void {
    if (this.employee.id) {
      this.employeeService
        .updateEmployee(this.employee.id, this.employee)
        .subscribe(
          () => this.router.navigate(['/employees']),
          (error) => console.error('Error updating employee', error)
        );
    }
  }
}
