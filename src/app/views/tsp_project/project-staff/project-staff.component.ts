import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NplModule } from 'src/app/npl.module';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-project-staff',
  standalone: true,
  imports: [NplModule],
  templateUrl: './project-staff.component.html',
  styleUrls: ['./project-staff.component.scss'],
})
export class ProjectStaffComponent implements OnInit {
  employees: Employee[] = [];
  editingEmployeeId: number | null = null; // Track the ID of the employee being edited
  showAddEmployeeForm: boolean = false; // Controls visibility of the add employee form
  newEmployee: Employee = {
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

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => (this.employees = data),
      (error) => console.error('Error fetching employee data', error)
    );
  }

  startEditing(employeeId: number): void {
    this.editingEmployeeId = employeeId; // Set the employee ID for editing
  }

  cancelEditing(): void {
    this.editingEmployeeId = null; // Exit editing mode
  }

  saveEmployee(employee: Employee): void {
    if (employee.id !== undefined && employee.id !== null) {
      this.employeeService.updateEmployee(employee.id, employee).subscribe(
        () => {
          this.loadEmployees(); // Refresh the list
          this.cancelEditing(); // Exit editing mode
        },
        (error) => console.error('Error updating employee', error)
      );
    } else {
      console.error('Employee ID is not defined');
    }
  }

  deleteEmployee(id: number): void {
    if (id !== undefined && id !== null) {
      // Ensure id is a number
      this.employeeService.deleteEmployee(id).subscribe(
        () => this.loadEmployees(), // Refresh the list
        (error) => console.error('Error deleting employee', error)
      );
    } else {
      console.error('Employee ID is not defined');
    }
  }

  openAddEmployeeForm(): void {
    this.showAddEmployeeForm = true; // Show the form
  }

  closeAddEmployeeForm(): void {
    this.showAddEmployeeForm = false; // Hide the form
  }

  addEmployee(): void {
    this.employeeService.createEmployee(this.newEmployee).subscribe(
      () => {
        alert('Employee Added Successfully');
        this.closeAddEmployeeForm(); // Hide the form
        this.loadEmployees(); // Refresh the employee list
        this.resetNewEmployeeForm(); // Reset form data
      },
      (error) => {
        console.error('Error adding employee', error);
      }
    );
  }

  private resetNewEmployeeForm(): void {
    this.newEmployee = {
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
