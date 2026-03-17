"use client";

import { useMemo, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Loading from "@/app/components/LoadingSpinner";
import MainWrapper from "@/app/components/MainWrapper";
import GroupInformation from "@/app/components/GroupHandling/GroupInformation";
import EditButtons from "@/app/components/GroupHandling/EditButtons";
import GroupMembersView from "@/app/components/GroupHandling/GroupMembersView";
import { useGroup } from "@/app/services/useGroup";
import { useDeleteGroup } from "@/app/services/useDeleteGroup";
import { useUpdateGroup } from "@/app/services/useUpdateGroup";
import { PAGE_ROUTES } from "@/app/constants";
import { Employee } from "@/app/interfaces/employee";
import { Group } from "@/app/interfaces/group";

const EditGroup = () => {
  const t = useTranslations("GroupHandling");
  const router = useRouter();
  const { id: paramId } = useParams();
  const id = Number(paramId);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [membersById, setMembersById] = useState<Record<number, Employee>>({});

  const { data: group, isLoading } = useGroup(id);
  const updateMutation = useUpdateGroup();
  const deleteMutation = useDeleteGroup();

  const syncState = useCallback((group: Group) => {
    setNewTitle(group.name);
    setNewDescription(group.description);
    setMembersById(
      Object.fromEntries(group.employees.map((e) => [e.id, e])),
    );
  }, []);

  const selectedMembers = useMemo(
    () => Object.values(membersById),
    [membersById],
  );
  const memberIdSet = useMemo(
    () => new Set(selectedMembers.map((m) => m.id)),
    [selectedMembers],
  );

  const handleEnterEditMode = () => {
    if (!group) return;
    syncState(group);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleBulkMembers = (members: Employee[]) => {
    setMembersById((prev) => ({
      ...prev,
      ...Object.fromEntries(members.map((m) => [m.id, m])),
    }));
  };

  const handleRemoveMember = (memberId: number) => {
    setMembersById((prev) => {
      const next = { ...prev };
      delete next[memberId];
      return next;
    });
  };

  const handleSave = () => {
    updateMutation.mutate(
      {
        groupId: id,
        payload: {
          name: newTitle,
          description: newDescription,
          employees: Array.from(memberIdSet),
        },
      },
      {
        onSuccess: (updated) => {
          syncState(updated);
          setIsEditing(false);
          setIsAdding(false);
        },
      },
    );
  };

  const handleDelete = () => {
    if (window.confirm(t("deleteConfirm"))) {
      deleteMutation.mutate(id, {
        onSuccess: () => router.push(PAGE_ROUTES.dashboardGroups),
      });
    }
  };

  if (isLoading) return <Loading />;
  if (!group)
    return (
      <MainWrapper>
        <h1 className="pt-44 text-center text-h2-sm">{t("notFound")}</h1>
      </MainWrapper>
    );

  return (
    <MainWrapper>
      <EditButtons
        isEditing={isEditing}
        isPending={updateMutation.isPending}
        onDelete={handleDelete}
        onEditMode={handleEnterEditMode}
        onSave={handleSave}
        disabled={newTitle === "" || newDescription === ""}
      />
      <GroupInformation
        isEditing={isEditing}
        title={isEditing ? newTitle : group.name}
        description={isEditing ? newDescription : group.description}
        createdAt={group.createdAt}
        titlePlaceholder={group.name}
        descriptionPlaceholder={group.description}
        onTitleChange={setNewTitle}
        onDescriptionChange={setNewDescription}
      />
      <GroupMembersView
        isEditing={isEditing}
        isAdding={isAdding}
        selectedMembers={isEditing ? selectedMembers : group.employees}
        memberIdSet={memberIdSet}
        onStartAddingMembers={() => setIsAdding(true)}
        onCancelAddingMembers={() => setIsAdding(false)}
        onBulkMembers={handleBulkMembers}
        onRemoveMember={handleRemoveMember}
        onGoBack={() => router.back()}
      />
    </MainWrapper>
  );
};

export default EditGroup;
