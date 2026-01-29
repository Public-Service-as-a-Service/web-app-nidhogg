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
        <p className="text-center text-h4-md sm:text-xl">{group.name}</p>
      </div>
    </MainWrapper>
  );
};

export default EditGroup;
