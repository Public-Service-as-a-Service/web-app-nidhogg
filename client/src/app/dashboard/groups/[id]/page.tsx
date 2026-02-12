"use client";

import { useGroup } from "@/app/services/useGroup";
import Loading from "@/app/components/LoadingSpinner";
import { useTranslations } from "next-intl";
import MainWrapper from "@/app/components/MainWrapper";
import { useParams, useRouter } from "next/navigation";
import MemberSection from "@/app/components/GroupHandling/MemberSection";
import { useState } from "react";
import dayjs from "dayjs";
import { Button } from "@sk-web-gui/react";
import { ArrowLeft, SquarePen, Save, Trash2 } from "lucide-react";

const EditGroup = () => {
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const id = Number(params.id);
  const t = useTranslations("GroupHandling");
  const router = useRouter();

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
        <div className="flex justify-between pb-40">
          <Button variant="secondary">
            {t("deleteButton")}
            <Trash2 />
          </Button>
          {!isEditing ? (
            <Button onClick={handleEditMode}>
              {t("editButton")}
              <SquarePen />
            </Button>
          ) : (
            <Button onClick={handleEditMode}>
              {t("saveButton")}
              <Save />
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-10">
            <h1 className="text-h2-sm !m-0">{group.name}</h1>
            <p className="text-small">
              {t("wasCreated")}
              {dayjs(group.createdAt).format("YYYY-MM-DD")}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-label-large !m-0">{t("groupDescription")}</p>
            <p>{group.description}</p>
          </div>
        </div>
        <MemberSection members={group.employees} editMode={isEditing} />
        <div className="flex justify-start">
          <Button
            variant="secondary"
            rounded={true}
            onClick={() => router.back()}
          >
            <ArrowLeft />
            {t("goBackButton")}
          </Button>
        </div>
      </div>
    </MainWrapper>
  );
};

export default EditGroup;
