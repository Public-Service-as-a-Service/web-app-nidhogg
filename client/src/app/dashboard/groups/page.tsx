"use client";

import MainWrapper from "@/app/components/MainWrapper";
import GroupView from "@/app/components/GroupHandling/GroupView";
import Loading from "@/app/components/LoadingSpinner";
import { useGroups } from "@/app/services/useGroups";

const Groups = () => {
  const { data: groups = [], isLoading } = useGroups();

  if (isLoading) return <Loading />;

  return (
    <MainWrapper>
       <GroupView list={groups} />
    </MainWrapper>
  );
};

export default Groups;
