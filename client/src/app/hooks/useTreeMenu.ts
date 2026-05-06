import { useCallback, useEffect, useRef, useState } from "react";
import { isAxiosError } from "axios";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";
import { Employee } from "@/app/interfaces/employee";
import { Organization } from "@/app/interfaces/organization";
import {
  fetchEmployeesByOrgId,
  fetchOrganizationChildren,
} from "@/app/services/notifierTree";

const ROOT_ORG_ID = process.env.NEXT_PUBLIC_TREE_ROOT_ORG_ID ?? "organizations";

const getOrgIdFromNodeId = (nodeId: string) => nodeId.replace(/^org-/, "");

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "Could not fetch data.";
};

const isNotFound = (error: unknown) =>
  isAxiosError(error) && error.response?.status === 404;

const mapOrganizationToNode = (
  organization: Organization,
  parentId?: string | null,
): TreeMenuItem => ({
  id: `org-${organization.orgId}`,
  name: organization.name,
  type: "org",
  treeLevel: organization.treeLevel,
  parentId:
    parentId !== undefined
      ? parentId
      : organization.parentOrgId
        ? `org-${organization.parentOrgId}`
        : null,
  children: [],
  childrenLoaded: false,
  childrenLoading: false,
  childrenError: null,
});

const mapEmployeeToNode = (employee: Employee): TreeMenuItem => ({
  id: `emp-${employee.id}`,
  name: `${employee.firstName} ${employee.lastName}`,
  type: "emp",
  parentId: `org-${employee.orgId}`,
  employee,
  children: [],
});

const findNodeById = (
  items: TreeMenuItem[],
  id: string,
): TreeMenuItem | null => {
  for (const item of items) {
    if (item.id === id) return item;
    if (!item.children?.length) continue;

    const childMatch = findNodeById(item.children, id);
    if (childMatch) return childMatch;
  }

  return null;
};

const updateNodeById = (
  items: TreeMenuItem[],
  id: string,
  updater: (item: TreeMenuItem) => TreeMenuItem,
): TreeMenuItem[] => {
  return items.map((item) => {
    if (item.id === id) return updater(item);
    if (!item.children?.length) return item;

    return {
      ...item,
      children: updateNodeById(item.children, id, updater),
    };
  });
};

const resolveAutoExpand = async (
  child: TreeMenuItem,
  parentName: string,
  fetchDirectChildren: (orgId: string) => Promise<TreeMenuItem[]>,
): Promise<TreeMenuItem> => {
  if (child.type !== "org" || child.name !== parentName) return child;

  const grandchildren = await fetchDirectChildren(getOrgIdFromNodeId(child.id));

  if (grandchildren.length !== 1 || grandchildren[0].name !== child.name) {
    return {
      ...child,
      children: grandchildren,
      childrenLoaded: true,
    };
  }

  const resolvedGrandchildren = await Promise.all(
    grandchildren.map((gc) =>
      resolveAutoExpand(gc, child.name, fetchDirectChildren),
    ),
  );

  return {
    ...child,
    children: resolvedGrandchildren,
    childrenLoaded: true,
  };
};

export function useTreeMenu() {
  const [items, setItems] = useState<TreeMenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const itemsRef = useRef<TreeMenuItem[]>([]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const fetchDirectChildren = useCallback(async (orgId: string) => {
    let organizations: Organization[] = [];

    try {
      organizations = await fetchOrganizationChildren(orgId);
    } catch (err) {
      if (!isNotFound(err)) throw err;
    }

    if (organizations.length > 0) {
      return organizations.map((organization) =>
        mapOrganizationToNode(organization),
      );
    }

    const employees = await fetchEmployeesByOrgId(orgId);
    return employees.map((employee) => mapEmployeeToNode(employee));
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadInitialTree = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const rootChildren = await fetchDirectChildren(ROOT_ORG_ID);

        if (!isMounted) return;
        setItems(rootChildren);
      } catch (err) {
        if (!isMounted) return;
        const message = getErrorMessage(err);
        setError(new Error(message));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadInitialTree();

    return () => {
      isMounted = false;
    };
  }, [fetchDirectChildren]);

  const loadNodeChildren = useCallback(
    async (node: TreeMenuItem): Promise<TreeMenuItem> => {
      if (node.type !== "org") return node;

      const latestNode = findNodeById(itemsRef.current, node.id) ?? node;
      if (latestNode.childrenLoaded || latestNode.childrenLoading) {
        return latestNode;
      }

      setItems((prev) =>
        updateNodeById(prev, node.id, (current) => ({
          ...current,
          childrenLoading: true,
          childrenError: null,
        })),
      );

      try {
        const initialChildren = await fetchDirectChildren(
          getOrgIdFromNodeId(node.id),
        );

        const children = await Promise.all(
          initialChildren.map((child) =>
            resolveAutoExpand(child, node.name, fetchDirectChildren),
          ),
        );

        const updatedNode: TreeMenuItem = {
          ...latestNode,
          children,
          childrenLoaded: true,
          childrenLoading: false,
          childrenError: null,
        };

        setItems((prev) =>
          updateNodeById(prev, node.id, (current) => ({
            ...current,
            children,
            childrenLoaded: true,
            childrenLoading: false,
            childrenError: null,
          })),
        );

        return updatedNode;
      } catch (err) {
        const message = getErrorMessage(err);
        setItems((prev) =>
          updateNodeById(prev, node.id, (current) => ({
            ...current,
            childrenLoading: false,
            childrenError: message,
          })),
        );
        throw err;
      }
    },
    [fetchDirectChildren],
  );

  return {
    items,
    isLoading,
    error,
    loadNodeChildren,
  };
}
