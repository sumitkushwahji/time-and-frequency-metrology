// src/app/employee.model.ts
export interface Employee {
  id?: number;
  name: string;
  designation: string;
  empId: string;
  mobileNo: string;
  emailId: string;
  salary: number;
  joiningDate: string; // ISO date string
  leavingDate?: string; // ISO date string, optional
}
