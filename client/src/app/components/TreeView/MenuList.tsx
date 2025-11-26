import React from "react";
import MenuItem from "./MenuItem";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";

interface MenuListProps {
  list?: TreeMenuItem[];
}

const MenuList = ({ list = [] }: MenuListProps) => {
  return (
    <ul className="menu-list-container">
      {list.map((listItem) => (
        <MenuItem key={listItem.name} item={listItem} />
      ))}
    </ul>
  );
};

export default MenuList;
