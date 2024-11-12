export interface Employee {
  id?: number; // or id: number | undefined if you need it to be explicitly undefined
  name: string;
  designation: string;
  empId: string;
  mobileNo: string;
  emailId: string;
  salary: number;
  joiningDate: string;
  leavingDate?: string; // Optional if leavingDate is not always present
}
