import { Employee } from "./employee";

export interface Member {
  groupId: number;
  employeeId: number;
  employee: Employee;
}
