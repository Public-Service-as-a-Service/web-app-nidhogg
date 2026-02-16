"use client";

import Loading from "@/app/components/LoadingSpinner";
import { useMessage } from "@/app/services/useMessage";
import { Button } from "@sk-web-gui/react";
import { useParams, useRouter } from "next/navigation";

const MessageDetails = () => {
  const params = useParams();
  const id = String(params.id);
  const router = useRouter();

  const { data: message, isLoading } = useMessage(id);

  if (isLoading) return <Loading />;

  return (
    <div>
      <p>{message?.title}</p>
      <Button onClick={() => router.back()}>Tillbaka</Button>
    </div>
  );
};

export default MessageDetails;
