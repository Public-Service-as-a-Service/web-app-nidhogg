import { useMemo } from "react";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { useEmployees } from "@/app/services/useEmployees";
import { useOrganizations } from "@/app/services/useOrganizations";
import { buildTree } from "@/utils/buildTree";

const filterEmptyBranches = (items: TreeMenuItem[]): TreeMenuItem[] => {
  return items
    .map((item) => ({
      ...item,
      children: item.children ? filterEmptyBranches(item.children) : [],
    }))
    .filter((item) => {
      if (item.type === "emp") return true;
      return item.type === "org" && item.children && item.children.length > 0;
    });
};

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
      type: "org",
      parentId: org.parentOrgId ? `org-${org.parentOrgId}` : null,
      children: [],
    }));

    const employeeNodes: TreeMenuItem[] = employees.map((emp) => ({
      id: `emp-${emp.id}`,
      name: `${emp.firstName} ${emp.lastName}`,
      type: "emp",
      parentId: `org-${emp.orgId}`,
      employee: emp,
      children: [],
    }));

    const fullTree = buildTree([...orgNodes, ...employeeNodes]);

    return filterEmptyBranches(fullTree);
  }, [organizations, employees]);

  return {
    items,
    isLoading: orgLoading || empLoading,
    error: orgError || empError,
  };
}
