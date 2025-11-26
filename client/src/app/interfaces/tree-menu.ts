export interface TreeMenuItem {
  id: string;
  name: string;
  parentId: string | null;
  children?: TreeMenuItem[];
}
