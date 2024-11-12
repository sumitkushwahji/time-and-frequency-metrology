import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { NplModule } from 'src/app/npl.module';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NplModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
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
}
