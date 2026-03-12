"use client";

import MainWrapper from "@/app/components/MainWrapper";
import GroupView from "@/app/components/GroupHandling/GroupView";
import Loading from "@/app/components/LoadingSpinner";
import { useGroups } from "@/app/services/useGroups";
import dayjs from "dayjs";
import { useUserEmail } from "@/app/hooks/useUserEmail";

const Groups = () => {
  const { data: groups = [], isLoading } = useGroups(useUserEmail());

  const sortedGroups = [...groups].sort((a, b) =>
    dayjs(b.createdAt).diff(dayjs(a.createdAt)),
  );

  if (isLoading) return <Loading />;

  return (
    <MainWrapper>
      <GroupView groups={sortedGroups} />
    </MainWrapper>
  );
};

export default Groups;
