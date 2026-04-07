"use client";

import Loading from "@/app/components/LoadingSpinner";
import { useMessage } from "@/app/services/useMessage";
import { Button } from "@sk-web-gui/react";
import { useParams, useRouter } from "next/navigation";
import MainWrapper from "@/app/components/MainWrapper";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import RecipientList from "@/app/components/RecipientList";
import PaginationButtons from "@/app/components/GroupHandling/PaginationButtons";
import { useTranslations } from "next-intl";
import { useCurrentUser } from "@/app/services/useCurrentUser";
import { useEffect, useState } from "react";
import { useMessageRecipients } from "@/app/services/useMessageRecipients";

const MessageDetails = () => {
  const params = useParams();
  const id = Number(params.id);
  const { data: currentUser } = useCurrentUser();
  const email = currentUser?.email ?? "";
  const router = useRouter();
  const t = useTranslations("MessageDetails");
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const { data: message, isLoading } = useMessage(id, email);
  const { data: messageRecipients, isFetching } = useMessageRecipients(
    id,
    page,
    pageSize,
  );

  useEffect(() => {
    setPage(0);
  }, [id]);

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
          {isFetching ? (
            <Loading />
          ) : (
            <RecipientList recipients={messageRecipients?.content} />
          )}
          <div className="pt-8">
            <PaginationButtons
              page={messageRecipients?.currentPage ?? 0}
              totalPages={messageRecipients?.totalPages ?? 0}
              onPreviousPage={() => setPage((currentPage) => currentPage - 1)}
              onNextPage={() => setPage((currentPage) => currentPage + 1)}
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
        <Button onClick={ () => router.push(`/dashboard/messages?step=1&messageId=${id}`)}>{t("newMessageButton")}</Button>
      </div>
    </MainWrapper>
  );
};

export default MessageDetails;
