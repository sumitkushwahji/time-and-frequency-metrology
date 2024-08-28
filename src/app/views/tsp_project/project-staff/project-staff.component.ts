import { Component, OnInit } from '@angular/core';
import { NplModule } from 'src/app/npl.module';
import { routes } from '../../dashboard/routes';
import { AppComponent } from '../../../app.component';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-project-staff',
  standalone: true,
  imports: [NplModule],
  templateUrl: './project-staff.component.html',
  styleUrl: './project-staff.component.scss',
})
export class ProjectStaffComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => (this.employees = data),
      (error) => console.error('Error fetching employee data', error)
    );
  }

  editEmployee(id: number | undefined): void {
    if (id !== undefined) {
      // Implement navigation to the edit form
      console.log(`Editing employee with id: ${id}`);
      // e.g., this.router.navigate(['/employees/edit', id]);
    } else {
      console.error('Employee ID is undefined');
    }
  }

  deleteEmployee(id: number | undefined): void {
    if (id !== undefined) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => this.loadEmployees(), // Refresh the list
        (error) => console.error('Error deleting employee', error)
      );
    } else {
      console.error('Employee ID is undefined');
    }
  }
}
