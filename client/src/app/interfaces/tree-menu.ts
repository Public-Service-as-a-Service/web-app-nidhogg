import { Employee } from "./employee";

export interface TreeMenuItem {
  id: string;
  name: string;
  type: string;
  parentId: string | null;
  employee?: Employee;
  children?: TreeMenuItem[];
}
