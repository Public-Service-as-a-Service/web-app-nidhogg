"use client";

import { useGroup } from "@/app/services/useGroup";
import { useMembers } from "@/app/services/useMembers";
import Loading from "@/app/components/LoadingSpinner";
import { useTranslations } from "next-intl";
import MainWrapper from "@/app/components/MainWrapper";
import { useParams } from "next/navigation";
import MemberSection from "@/app/components/GroupHandling/MemberSection";

const EditGroup = () => {
  const params = useParams();
  const id = Number(params.id);
  const t = useTranslations("GroupHandling");

  const { data: group, isLoading } = useGroup(id);
  const { data: members = [] } = useMembers(id);

  if (isLoading) return <Loading />;

  if (!group)
    return (
      <div>
        <p>{t("notFound")}</p>
      </div>
    );

  return (
    <MainWrapper>
      <div className="pt-44 px-20 w-[330px] sm:w-[450px] md:w-[700px]">
        <h1 className="text-h2-sm">{group.name}</h1>
        <p className="text-label-large">{t("groupDescription")}</p>
        <p>{group.description}</p>
        <MemberSection members={members} />
      </div>
    </MainWrapper>
  );
};

export default EditGroup;
