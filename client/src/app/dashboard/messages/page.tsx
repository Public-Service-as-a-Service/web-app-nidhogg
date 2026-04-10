"use client";
import MainWrapper from "../../components/MainWrapper";
import { useTranslations } from "next-intl";
import { JSX, useEffect, useState } from "react";
import RecipientsStep from "@/app/components/MessageSteps/RecipientsStep";
import MessageStep from "@/app/components/MessageSteps/MessageStep";
import ViewStep from "@/app/components/MessageSteps/ViewStep";
import { ProgressStepper } from "@sk-web-gui/react";
import { Employee } from "@/app/interfaces/employee";
import { useSearchParams } from "next/navigation";
import { MessageRecipient } from "@/app/interfaces/message";
import { API_ENDPOINTS } from "@/app/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PAGE_ROUTES } from "@/app/constants";
import { useLeavePageGuard } from "@/app/components/LeavePageGuard";

export interface GroupRecipient {
  id: number | string;
  name: string;
  endpoint?: string;
  employees?: Employee[];
  recipientIds?: number[];
}

interface StepsProps {
  label: string;
  content: JSX.Element;
}

const Messages = () => {
  const [step, setStep] = useState(0);
  const searchParams = useSearchParams();

  const mapRecipientToEmployee = (r: MessageRecipient): Employee => ({
    id: r.employeeId ?? 0,
    firstName: r.firstName,
    lastName: r.lastName,
    orgId: r.orgId ?? "",
    orgName: r.orgName ?? "",
    workTitle: r.workTitle ?? "",
    personId: "",
    email: "",
    workMobile: "",
    workPhone: "",
    createDate: "",
    lastModifiedDate: "",
  });

  useEffect(() => {
    const stepParam = searchParams.get("step");
    const messageId = searchParams.get("messageId");

    if (stepParam != null) {
      setStep(Number(stepParam));
    }
    if (messageId) {
      const fetchAllRecipients = async () => {
        const all: Record<string, Employee> = {};
        const pageSize = 1000;
        let currentPage = 0;
        let totalPages = 1;

        while (currentPage < totalPages) {
          const result = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.messageRecipients(Number(messageId))}`,
            {
              params: { page: currentPage, size: pageSize },
              withCredentials: true,
            },
          );
          result.data.content.forEach((r: MessageRecipient) => {
            all[`emp-${r.employeeId}`] = mapRecipientToEmployee(r);
          });
          totalPages = result.data.totalPages;
          currentPage++;
        }

        setRecipientEmployees(all);
      };

      fetchAllRecipients();
    }
  }, [searchParams]);

  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [recipientGroups, setRecipientGroups] = useState<Record<string, GroupRecipient>>({});
  const [recipientEmployees, setRecipientEmployees] = useState<Record<string, Employee>>({});
  const [title, setTitle] = useState<string>("");
  const [messageBody, setMessageBody] = useState<string>("");
  const [channels, setChannels] = useState<string[]>([]);
  const router = useRouter();

  const { setHasChanges, setShowAlert, setPendingAction } = useLeavePageGuard();
  const hasChanges = !!(
  title ||
  messageBody ||
  channels.length > 0 ||
  Object.keys(recipientGroups).length > 0 ||
  Object.keys(recipientEmployees).length > 0 ||
  allChecked
);
  
  useEffect(() => {
    setHasChanges(hasChanges);
  }, [title, messageBody, channels, recipientGroups, recipientEmployees, allChecked, setHasChanges]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (hasChanges) {
        window.history.pushState(null, "", window.location.href);
        setPendingAction(() => () => router.push(PAGE_ROUTES.dashboard));
        setShowAlert(true);
      } else {
        router.push(PAGE_ROUTES.dashboard);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [title, messageBody, channels, router, setPendingAction, setShowAlert]);

  const handleAllCheckedChange = (checked: boolean) => {
    setAllChecked(checked);
    if (checked) {
      setRecipientGroups({});
      setRecipientEmployees({});
    }
  };

  const toggleItem = (list: string[], item: string) =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const handleGroupRecipients = (group: GroupRecipient) => {
    if (allChecked) return;
    const key = String(group.id);
    setRecipientGroups((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = group;
      }
      return next;
    });
  };

  const handleEmployeeRecipients = (nextRecipients: Record<string, Employee>) => {
    if (allChecked) return;
    setRecipientEmployees(nextRecipients);
  };

  const handleChannels = (channel: string) => {
    setChannels((prev) => toggleItem(prev, channel));
  };

  const handleGoBack = () => {
    if (hasChanges) {
      setPendingAction(() => () => router.push(PAGE_ROUTES.dashboard));
      setShowAlert(true);
    } else {
      router.push(PAGE_ROUTES.dashboard);
    }
  };

  const t_steps = useTranslations("ProgressSteps");

  const commonProps = {
    recipientGroups,
    recipientEmployees,
    allChecked,
  };

  const steps: StepsProps[] = [
    {
      label: t_steps("recipients"),
      content: (
        <RecipientsStep
          onNext={() => setStep(1)}
          onPrev={handleGoBack}
          handleGroupRecipients={handleGroupRecipients}
          handleEmployeeRecipients={handleEmployeeRecipients}
          setAllChecked={handleAllCheckedChange}
          {...commonProps}
        />
      ),
    },
    {
      label: t_steps("message"),
      content: (
        <MessageStep
          onNext={() => setStep(2)}
          onPrev={() => setStep(0)}
          title={title}
          messageBody={messageBody}
          setTitle={setTitle}
          setMessageBody={setMessageBody}
          channels={channels}
          handleChannels={handleChannels}
          {...commonProps}
        />
      ),
    },
    {
      label: t_steps("view"),
      content: (
        <ViewStep
          onPrev={() => setStep(1)}
          title={title}
          messageBody={messageBody}
          channels={channels}
          {...commonProps}
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

export default Messages;