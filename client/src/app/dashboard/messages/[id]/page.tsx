"use client";

import Loading from "@/app/components/LoadingSpinner";
import { useMessage } from "@/app/services/useMessage";
import { Button } from "@sk-web-gui/react";
import { useParams, useRouter } from "next/navigation";
import MainWrapper from "@/app/components/MainWrapper";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import RecipientList from "@/app/components/RecipientList";
import ShowAllToggleButton from "@/app/components/ShowAllToggleButton";
import { useTranslations } from "next-intl";
import { useUserEmail } from "@/app/hooks/useUserEmail";
import { useState } from "react";
import { useMessageRecipients } from "@/app/services/useMessageRecipients";

const MessageDetails = () => {
  const params = useParams();
  const id = Number(params.id);
  const email = useUserEmail();
  const router = useRouter();
  const t = useTranslations("MessageDetails");
  const [visibleCount, setVisibleCount] = useState(10);

  const { data: message, isLoading } = useMessage(id, email);
  const { data: messageRecipients } = useMessageRecipients(id);

  const getMessageType = () => {
    if (message?.messageType === "TEAMS") {
      return t("channels.teams");
    } else if (message?.messageType === "SMS") {
      return t("channels.sms");
    } else {
      return t("channels.both");
    }
  };

  if (isLoading) return <Loading />;

  if (!message) {
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
      <h1 className="text-h2-sm !m-0 pb-40">{message?.title}</h1>
      <div className="border-solid border-1 rounded-3xl p-8 gap-8">
        <p className="p-8">
          {dayjs(message?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </p>
        <div className="gap-8 p-8">
          <p className="text-label-large">{t("messageLabel")}</p>
          <p>{message?.content}</p>
        </div>
        <div className="gap-8 p-8">
          <p className="text-label-large">{t("recipientsLabel")}</p>
          <RecipientList
            recipients={messageRecipients?.slice(0, visibleCount)}
          />
          <div className="pt-8">
            <ShowAllToggleButton
              totalCount={messageRecipients?.length ?? 0}
              visibleCount={visibleCount}
              collapsedCount={10}
              onToggle={setVisibleCount}
              showAllText={t("showAll")}
              goBackText={t("goBack")}
            />
          </div>
        </div>
        <div className="gap-8 p-8">
          <p className="text-label-large">{t("channelLabel")}</p>
          <p>{getMessageType()}</p>
        </div>
      </div>
      <div className="pt-40 flex place-content-between">
        <Button variant="secondary" onClick={() => router.back()}>
          <ArrowLeft />
          {t("goBackButton")}
        </Button>
        <Button>{t("newMessageButton")}</Button>
      </div>
    </MainWrapper>
  );
};

export default MessageDetails;
