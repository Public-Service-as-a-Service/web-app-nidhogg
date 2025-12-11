import React from "react";
import { Label } from "@sk-web-gui/react";

interface SelectedListProps {
  listItems: string[];
}

const SelectedList = ({ listItems }: SelectedListProps) => {
  return (
    <div className="pt-10 flex flex-wrap gap-6">
      {listItems.length >= 1 ? (
        listItems.map((name) => <Label key={name}>{name}</Label>)
      ) : (
        <Label inverted={true}>Inga mottagare valda</Label>
      )}
    </div>
  );
};

export default SelectedList;
