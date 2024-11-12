import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { NplModule } from 'src/app/npl.module';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-analytics',
  standalone: true,
  imports: [NplModule],
  templateUrl: './employee-analytics.component.html',
  styleUrls: ['./employee-analytics.component.scss'],
})
export class EmployeeAnalyticsComponent implements OnInit {
  employees: Employee[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching employee data', error);
        this.error = 'Error fetching employee data';
        this.loading = false;
      }
    );
  }

  calculateTenure(joiningDate: string, leavingDate?: string): number {
    const startDate = new Date(joiningDate);
    const endDate = leavingDate ? new Date(leavingDate) : new Date();
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    return years + months / 12;
  }

  calculateTotalSalary(
    salary: number,
    joiningDate: string,
    leavingDate?: string
  ): number {
    const years = this.calculateTenure(joiningDate, leavingDate);
    return salary * years;
  }
}
