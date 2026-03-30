"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Input } from "@sk-web-gui/react";
import { Plus, Search, SquarePen } from "lucide-react";
import MainWrapper from "@/app/components/MainWrapper";
import { type AdminUser } from "@/app/services/useAdminUsers";

interface Props {
  users: AdminUser[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onEdit: (user: AdminUser) => void;
  onCreateClick: () => void;
}

const badgeTextStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: "16px",
  fontVariantNumeric: "lining-nums proportional-nums",
};

const StatusBadge = ({ status, t }: { status: string | undefined; t: ReturnType<typeof useTranslations> }) => {
  if (status === "ACTIVE") {
    return (
      <span className="inline-flex items-center px-10 py-2 text-white" style={{ ...badgeTextStyle, borderRadius: "1000px", background: "#00733B" }}>
        {t("statusActive")}
      </span>
    );
  }
  if (status === "SUSPENDED") {
    return (
      <span className="inline-flex items-center px-10 py-2 rounded-full bg-yellow-100 text-yellow-800" style={badgeTextStyle}>
        {t("statusSuspended")}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-10 py-2 rounded-full bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900" style={badgeTextStyle}>
      {t("statusInactive")}
    </span>
  );
};

const AdminUserList = ({ users, isLoading, isError, onEdit, onCreateClick }: Props) => {
  const t = useTranslations("Admin");
  const [search, setSearch] = useState("");

  const filtered = users?.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      u.email?.toLowerCase().includes(q) ||
      u.municipalityName?.toLowerCase().includes(q) ||
      u.phoneNumber?.toLowerCase().includes(q)
    );
  });

  return (
    <MainWrapper>
      <div className="flex flex-col gap-24">
        <div>
          <h1 className="text-h1-sm md:text-h1-lg">{t("title")}</h1>
          <p style={{ fontSize: "18px", fontWeight: 400, lineHeight: "26px", fontVariantNumeric: "lining-nums proportional-nums" }} className="mt-4">{t("subtitle")}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-12">
          <div className="flex flex-col gap-[8px] w-full sm:max-w-[367px]">
            <span style={{ fontSize: "18px", fontWeight: 700, lineHeight: "32px", fontVariantNumeric: "lining-nums proportional-nums" }}>{t("searchPlaceholder")}</span>
            <div className="flex items-center gap-8">
              <Search size={18} className="shrink-0 opacity-60" />
              <Input
                size="lg"
                className="w-full"
                placeholder="Sök"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <Button size="sm" onClick={onCreateClick}>
            <Plus size={16} />
            <span style={{ fontSize: "18px", fontWeight: 700, lineHeight: "32px", fontVariantNumeric: "lining-nums proportional-nums" }}>{t("newUserButton")}</span>
          </Button>
        </div>

        {isLoading && <p>{t("loading")}</p>}
        {isError && <p className="text-error">{t("errors.loadFailed")}</p>}
        {!isLoading && !isError && filtered?.length === 0 && <p>{t("noUsers")}</p>}

        {filtered?.map((user) => (
          <Card key={user.id}>
            <Card.Body className="flex flex-col gap-[15px] w-full">
              <div className="flex items-center justify-between w-full">
                <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "24px", fontVariantNumeric: "lining-nums proportional-nums" }}>ID: {user.id}</span>
                <Button size="sm" variant="secondary" className="dark:ring-[0.5px] dark:ring-white/5" style={{ borderRadius: "12px", background: "rgba(28, 28, 40, 0.12)", border: "none" }} onClick={() => onEdit(user)}>
                  <SquarePen size={18} />
                  <span style={{ fontSize: "16px", fontWeight: 700, lineHeight: "24px", fontVariantNumeric: "lining-nums proportional-nums" }}>{t("editButton")}</span>
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-32 gap-12 min-w-0">
                <div className="flex flex-col gap-2 min-w-0 sm:w-[220px]">
                  <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "24px", fontVariantNumeric: "lining-nums proportional-nums", overflow: "hidden", textOverflow: "ellipsis" }}>{t("emailLabel")}:</span>
                  <span className="truncate" style={{ fontSize: "16px", fontWeight: 700, lineHeight: "24px", fontVariantNumeric: "lining-nums proportional-nums" }}>
                    {user.email || "—"}
                  </span>
                </div>
                <div className="flex flex-col gap-2 min-w-0 sm:w-[120px]">
                  <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "24px", fontVariantNumeric: "lining-nums proportional-nums", overflow: "hidden", textOverflow: "ellipsis" }}>{t("phoneLabel")}:</span>
                  <span className="truncate" style={{ fontSize: "16px", fontWeight: 700, lineHeight: "24px", fontVariantNumeric: "lining-nums proportional-nums" }}>
                    {user.phoneNumber || "—"}
                  </span>
                </div>
                <div className="flex flex-col gap-2 min-w-0 sm:w-[120px]">
                  <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "24px", fontVariantNumeric: "lining-nums proportional-nums", overflow: "hidden", textOverflow: "ellipsis" }}>{t("municipalityLabel")}:</span>
                  <span className="truncate" style={{ fontSize: "16px", fontWeight: 700, lineHeight: "24px", fontVariantNumeric: "lining-nums proportional-nums" }}>
                    {user.municipalityName || "—"}
                  </span>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <span style={{ fontSize: "16px", fontWeight: 400, lineHeight: "24px", fontVariantNumeric: "lining-nums proportional-nums", overflow: "hidden", textOverflow: "ellipsis" }}>{t("statusLabel")}:</span>
                  <StatusBadge status={user.status} t={t} />
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </MainWrapper>
  );
};

export default AdminUserList;
