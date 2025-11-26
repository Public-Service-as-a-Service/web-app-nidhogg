import React, { useState } from "react";
import MenuList from "./MenuList";
import { TreeMenuItem } from "@/app/interfaces/tree-menu";

interface MenuItemProps {
  item: TreeMenuItem;
}

const MenuItem = ({ item }: MenuItemProps) => {
  //   const [isExpanded, setIsExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <li>
      <div className="menu-item" tabIndex={0}>
        <p>{item.name}</p>
        <span onClick={handleToggle} className="toggle-icon">
          <input type="checkbox" onChange={() => setIsChecked} />
        </span>
      </div>
      {hasChildren && isChecked && <MenuList list={item.children} />}
      {/* {!hasChildren && <input type="checkbox" onChange={() => setIsChecked} />} */}
    </li>
  );
};

export default MenuItem;
