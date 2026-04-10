"use client";
import MainWrapper from "@/app/components/MainWrapper";
import { JSX, useState, useEffect } from "react";
import { ProgressStepper } from "@sk-web-gui/react";
import InfoStep from "@/app/components/CreateGroupSteps/InfoStep";
import MembersStep from "@/app/components/CreateGroupSteps/MembersStep";
import { useTranslations } from "next-intl";
import { Employee } from "@/app/interfaces/employee";
import { useRouter } from "next/navigation";
import { PAGE_ROUTES } from "@/app/constants";
import { useLeavePageGuard } from "@/app/components/LeavePageGuard";

interface StepsProps {
  label: string;
  content: JSX.Element;
}

const CreateGroup = () => {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [membersById, setMembersById] = useState<Record<number, Employee>>({});
  const t = useTranslations("GroupHandling");
  const router = useRouter();
  const { setHasChanges, setShowAlert, setPendingAction } = useLeavePageGuard();

  const hasChanges = !!(title || description || Object.keys(membersById).length > 0);

  useEffect(() => {
    setHasChanges(hasChanges);
  }, [hasChanges, setHasChanges]);

  // Rensa hasChanges när komponenten unmountas
  useEffect(() => {
    return () => setHasChanges(false);
  }, [setHasChanges]);

  // Fångar webbläsarens bakåtknapp
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (hasChanges) {
        window.history.pushState(null, "", window.location.href);
        setPendingAction(() => () => router.push(PAGE_ROUTES.dashboardGroups));
        setShowAlert(true);
      } else {
        router.push(PAGE_ROUTES.dashboardGroups);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [hasChanges, router, setPendingAction, setShowAlert]);

  const handleGoBack = () => {
    if (hasChanges) {
      setPendingAction(() => () => router.push(PAGE_ROUTES.dashboardGroups));
      setShowAlert(true);
    } else {
      router.push(PAGE_ROUTES.dashboardGroups);
    }
  };

  const handleBulkMembers = (members: Employee[]) => {
    setMembersById((prev) => {
      const next = { ...prev };
      for (const member of members) {
        next[member.id] = member;
      }
      return next;
    });
  };

  const handleDeleteMember = (id: number) => {
    setMembersById((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const selectedMembers = Object.values(membersById);

  const steps: StepsProps[] = [
    {
      label: t("steps.groupInfo"),
      content: (
        <InfoStep
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onNext={() => setStep(1)}
          onPrev={handleGoBack}
        />
      ),
    },
    {
      label: t("steps.groupMembers"),
      content: (
        <MembersStep
          onPrev={() => setStep(0)}
          members={selectedMembers}
          handleBulkMembers={handleBulkMembers}
          handleDeleteMember={handleDeleteMember}
          title={title}
          description={description}
        />
      ),
    },
  ];

  return (
    <MainWrapper>
      <ProgressStepper
        steps={steps.map((s) => s.label)}
        labelPosition="bottom"
        current={step}
        size="sm"
        className="pb-40"
      />
      {steps[step].content}
    </MainWrapper>
  );
};

export default CreateGroup;