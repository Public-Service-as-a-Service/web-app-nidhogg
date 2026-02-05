"use client";

import { useGroup } from "@/app/services/useGroup";
import Loading from "@/app/components/LoadingSpinner";
import { useTranslations } from "next-intl";
import MainWrapper from "@/app/components/MainWrapper";
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
    <MainWrapper>
      <div className="pt-44 px-20 w-[330px] sm:w-[450px] md:w-[700px]">
        <h1 className="text-center sm:text-xl md:text-2xl">{group.name}</h1>
      </div>
    </MainWrapper>
  );
};

export default EditGroup;
