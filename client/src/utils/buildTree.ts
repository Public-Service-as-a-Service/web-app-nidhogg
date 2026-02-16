import { TreeMenuItem } from "@/app/interfaces/tree-menu";

export function buildTree(items: TreeMenuItem[]): TreeMenuItem[] {
  const map = new Map();
  const roots: TreeMenuItem[] = [];

  items.forEach((item) => map.set(item.id, { ...item, children: [] }));

  map.forEach((item) => {
    if (item.parentId && map.has(item.parentId)) {
      map.get(item.parentId).children.push(item);
    } else {
      roots.push(item);
    }
  });

  return roots;
}
