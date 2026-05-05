import { Employee } from "./employee";

export interface TreeMenuItem {
  id: string;
  name: string;
  type: "org" | "emp";
  parentId: string | null;
  treeLevel?: number;
  employee?: Employee;
  children?: TreeMenuItem[];
  childrenLoaded?: boolean;
  childrenLoading?: boolean;
  childrenError?: string | null;
}
