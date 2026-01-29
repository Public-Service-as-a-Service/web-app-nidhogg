"use client";

import { useGroup } from "@/app/services/useGroup";
import Loading from "@/app/components/LoadingSpinner";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const EditGroup = () => {
  const params = useParams();
  const id = Number(params.id);
  const t = useTranslations("GroupHandling");
  const { data: group, isLoading } = useGroup(id);

  if (isLoading) return <Loading />;

  if (!group)
    return (
      <div>
        <p>{t("notFound")}</p>
      </div>
    );

  return (
    <div>
      <p>{group.name}</p>
    </div>
  );
};

export default EditGroup;
