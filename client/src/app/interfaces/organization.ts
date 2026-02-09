export interface Organization {
  companyId: string;
  parentOrgId?: string;
  orgId: string;
  name: string;
  treeLevel: number;
}
