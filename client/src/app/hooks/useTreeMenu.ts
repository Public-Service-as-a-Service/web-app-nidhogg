import { useMemo } from "react";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { useEmployees } from "@/app/services/useEmployees";
import { useOrganizations } from "@/app/services/useOrganizations";
import { buildTree } from "@/utils/buildTree";

export function useTreeMenu() {
  const {
    data: organizations,
    isLoading: orgLoading,
    error: orgError,
  } = useOrganizations();

  const {
    data: employees,
    isLoading: empLoading,
    error: empError,
  } = useEmployees();

  const items = useMemo<TreeMenuItem[]>(() => {
    if (!organizations || !employees) return [];

    const orgNodes: TreeMenuItem[] = organizations.map((org) => ({
      id: `org-${org.orgId}`,
      name: org.name,
      parentId: `org-${org.parentOrgId}`,
      children: undefined,
    }));

    const employeeNodes: TreeMenuItem[] = employees.map((emp) => ({
      id: `emp-${emp.personId}`,
      name: `${emp.firstName} ${emp.lastName}`,
      parentId: `org-${emp.orgId}`,
      children: [],
    }));

    console.log(employeeNodes[0]);
    console.log(orgNodes[0]);

    return buildTree([...orgNodes, ...employeeNodes]);
  }, [organizations, employees]);

  return {
    items,
    isLoading: orgLoading || empLoading,
    error: orgError || empError,
  };
}
