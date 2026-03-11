"use client";

import { useGroup } from "@/app/services/useGroup";
import Loading from "@/app/components/LoadingSpinner";
import { useTranslations } from "next-intl";
import MainWrapper from "@/app/components/MainWrapper";
import { useParams, useRouter } from "next/navigation";
import MemberSection from "@/app/components/GroupHandling/MemberSection";
import { useState } from "react";
import dayjs from "dayjs";
import { Button, Input, Textarea } from "@sk-web-gui/react";
import { ArrowLeft, SquarePen, Save, Trash2 } from "lucide-react";
import { useDeleteGroup } from "@/app/services/useDeleteGroup";
import { PAGE_ROUTES } from "@/app/constants";

const EditGroup = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const params = useParams();
  const id = Number(params.id);
  const t = useTranslations("GroupHandling");
  const router = useRouter();

  const { data: group, isLoading } = useGroup(id);
  const deleteMutation = useDeleteGroup();

  const handleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Är du säker?")) {
      deleteMutation.mutate(id);
      router.push(PAGE_ROUTES.dashboardGroups);
    }
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
      <div className="flex justify-between pb-40">
        <Button variant="secondary" onClick={() => handleDelete(id)}>
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
          {!isEditing ? (
            <h1 className="text-h2-sm !m-0">{group.name}</h1>
          ) : (
            <div>
              <p className="text-label-large">Titel</p>
              {/* Lägg till översättning!!! */}
              <Input
                placeholder={group.name}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full"
              />
            </div>
          )}
          <p className="text-small">
            {t("wasCreated")}
            {dayjs(group.createdAt).format("YYYY-MM-DD")}
          </p>
        </div>
        <div className="flex flex-col">
          {!isEditing ? (
            <div>
              <p className="text-label-large !m-0">{t("groupDescription")}</p>
              <p>{group.description}</p>
            </div>
          ) : (
            <div className="w-full">
              <p className="text-label-large !m-0">{t("groupDescription")}</p>
              <Textarea
                placeholder={group.description}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full"
              />
            </div>
          )}
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
    </MainWrapper>
  );
};

export default EditGroup;
