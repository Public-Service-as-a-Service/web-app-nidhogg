"use client";

import { useGroup } from "@/app/services/useGroup";
import Loading from "@/app/components/LoadingSpinner";
import { useTranslations } from "next-intl";
import MainWrapper from "@/app/components/MainWrapper";
import { useParams, useRouter } from "next/navigation";
import MemberSection from "@/app/components/GroupHandling/MemberSection";
import { useEffect, useState } from "react";
import { Button } from "@sk-web-gui/react";
import { ArrowLeft, SquarePen, Save, Trash2 } from "lucide-react";
import { useDeleteGroup } from "@/app/services/useDeleteGroup";
import { PAGE_ROUTES } from "@/app/constants";
import { Employee } from "@/app/interfaces/employee";
import { useUpdateGroup } from "@/app/services/useUpdateGroup";
import GroupInformation from "@/app/components/GroupHandling/GroupInformation";

const EditGroup = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [members, setMembers] = useState<Employee[]>([]);

  const params = useParams();
  const id = Number(params.id);
  const t = useTranslations("GroupHandling");
  const router = useRouter();

  const { data: group, isLoading } = useGroup(id);
  const deleteMutation = useDeleteGroup();
  const updateMutation = useUpdateGroup();

  useEffect(() => {
    if (!group) return;

    setNewTitle(group.name);
    setNewDescription(group.description);
    setMembers(group.employees);
  }, [group]);

  const handleEditMode = () => {
    if (!group) return;

    setNewTitle(group.name);
    setNewDescription(group.description);
    setMembers(group.employees);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateMutation.mutate(
      {
        groupId: id,
        payload: {
          name: newTitle,
          description: newDescription,
          employees: members.map((member) => member.id),
        },
      },
      {
        onSuccess: (updatedGroup) => {
          setNewTitle(updatedGroup.name);
          setNewDescription(updatedGroup.description);
          setMembers(updatedGroup.employees);
          setIsEditing(false);
        },
      },
    );
  };

  const handleRemoveMember = (memberId: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
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
          <Button onClick={handleSave} disabled={updateMutation.isPending}>
            {t("saveButton")}
            <Save />
          </Button>
        )}
      </div>
      <GroupInformation
        isEditing={isEditing}
        title={newTitle}
        description={newDescription}
        createdAt={group.createdAt}
        titlePlaceholder={group.name}
        descriptionPlaceholder={group.description}
        onTitleChange={setNewTitle}
        onDescriptionChange={setNewDescription}
      />
      <MemberSection
        members={members}
        editMode={isEditing}
        onRemoveMember={handleRemoveMember}
      />
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
