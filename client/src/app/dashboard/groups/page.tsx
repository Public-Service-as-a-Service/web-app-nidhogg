"use client";

import MainWrapper from "@/app/components/MainWrapper";
import GroupView from "@/app/components/GroupHandling/GroupView";
import Loading from "@/app/components/LoadingSpinner";
import { useGroups } from "@/app/services/useGroups";
import { useUserEmail } from "@/app/hooks/useUserEmail";

const Groups = () => {
  const { data: groups = [], isLoading } = useGroups(useUserEmail());

  if (isLoading) return <Loading />;

  return (
    <MainWrapper>
      <GroupView groups={groups} />
    </MainWrapper>
  );
};

export default Groups;
