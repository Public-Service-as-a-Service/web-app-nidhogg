"use client";

import MainWrapper from "@/app/components/MainWrapper";
import GroupView from "@/app/components/GroupHandling/GroupView";
import Loading from "@/app/components/LoadingSpinner";
import { useGroups } from "@/app/services/useGroups";
import { useCurrentUser } from "@/app/services/useCurrentUser";

const Groups = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: groups = [], isLoading } = useGroups(currentUser?.email ?? "");

  if (isLoading) return <Loading />;

  return (
    <MainWrapper>
      <GroupView groups={groups} />
    </MainWrapper>
  );
};

export default Groups;
