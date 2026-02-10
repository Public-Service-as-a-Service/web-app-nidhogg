export interface TreeMenuItem {
  id: string;
  name: string;
  type: string;
  parentId: string | null;
  children?: TreeMenuItem[];
}
