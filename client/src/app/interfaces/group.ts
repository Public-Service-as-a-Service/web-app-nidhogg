import { Employee } from "./employee";

export interface Group {
  id: number;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string; 
  lastModifiedDate: string;
  employees: Employee[];
}
