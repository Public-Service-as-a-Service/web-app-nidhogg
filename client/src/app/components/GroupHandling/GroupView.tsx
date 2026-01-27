"use client";

import GroupCard from "./GroupCard";

const GroupView = () => {
  return (
    <div className="flex flex-col gap-14">
      <p className="text-center text-h4-md sm:text-xl">Sparade grupper</p>
      <GroupCard />
    </div>
  );
};

export default GroupView;
