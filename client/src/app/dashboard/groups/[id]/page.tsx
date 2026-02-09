"use client";

import { useGroup } from "@/app/services/useGroup";
import Loading from "@/app/components/LoadingSpinner";
import { useTranslations } from "next-intl";
import MainWrapper from "@/app/components/MainWrapper";
import { useParams } from "next/navigation";
import MemberSection from "@/app/components/GroupHandling/MemberSection";
import { useState } from "react";

const EditGroup = () => {
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const id = Number(params.id);
  const t = useTranslations("GroupHandling");

  const { data: group, isLoading } = useGroup(id);

  const handleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  if (isLoading) return <Loading />;

  if (!group) {
    return (
      <MainWrapper>
        <div className="pt-44 text-center">
          <h1 className="text-h2-sm">{t("notFound")}</h1>
        </div>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper>
      <div className="pt-44 px-20 w-[330px] sm:w-[450px] md:w-[700px]">
        <h1 className="text-h2-sm">{group.name}</h1>
        <p className="text-label-large">{t("groupDescription")}</p>
        <p>{group.description}</p>
        <MemberSection
          members={group.employees}
          editMode={isEditing}
          handleEditMode={handleEditMode}
        />
      </div>
    </MainWrapper>
  );
};

export default EditGroup;
