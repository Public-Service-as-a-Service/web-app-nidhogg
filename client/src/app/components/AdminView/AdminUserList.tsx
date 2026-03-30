"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Input } from "@sk-web-gui/react";
import { Plus, Search } from "lucide-react";
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M1.5 14.249V3.74902C1.50004 3.15235 1.73726 2.58012 2.15918 2.1582C2.58113 1.7363 3.1533 1.49902 3.75 1.49902H9C9.41416 1.49902 9.74991 1.83489 9.75 2.24902C9.75 2.66324 9.41421 2.99902 9 2.99902H3.75C3.55113 2.99902 3.36037 3.07815 3.21973 3.21875C3.07911 3.35936 3.00004 3.55017 3 3.74902V14.249C3 14.4479 3.07913 14.6387 3.21973 14.7793C3.36038 14.9199 3.55109 14.999 3.75 14.999H14.25C14.4489 14.999 14.6396 14.9199 14.7803 14.7793C14.9209 14.6387 15 14.4479 15 14.249V8.99902C15.0001 8.58489 15.3358 8.24902 15.75 8.24902C16.1642 8.24902 16.4999 8.58489 16.5 8.99902V14.249C16.5 14.8457 16.2627 15.4179 15.8408 15.8398C15.4189 16.2618 14.8467 16.499 14.25 16.499H3.75C3.15326 16.499 2.58114 16.2618 2.15918 15.8398C1.73728 15.4179 1.5 14.8457 1.5 14.249ZM15.7471 3.09277C15.747 2.86979 15.6587 2.65572 15.501 2.49805C15.3433 2.34038 15.1293 2.25195 14.9062 2.25195C14.6832 2.25195 14.4692 2.34038 14.3115 2.49805L7.552 9.25903H7.55127C7.4623 9.34785 7.39704 9.45776 7.36157 9.57837L6.92358 11.0747L8.42139 10.6375L8.51001 10.6052C8.56745 10.5803 8.62166 10.5484 8.67114 10.51L8.74146 10.4478L15.501 3.6875C15.6586 3.52979 15.7471 3.31578 15.7471 3.09277ZM17.2471 3.09277C17.2471 3.7136 17.0005 4.30903 16.5615 4.74805L9.802 11.509H9.80127C9.53417 11.7758 9.20419 11.9708 8.8418 12.0767L8.84253 12.0774L6.68774 12.7073H6.68701C6.49346 12.7637 6.28833 12.7668 6.09302 12.7168C5.89766 12.6667 5.71927 12.565 5.57666 12.4224C5.43418 12.2798 5.3323 12.1019 5.28223 11.9067C5.23218 11.7114 5.23528 11.5056 5.29175 11.312H5.29248L5.92236 9.15723V9.15649C6.01543 8.83952 6.17683 8.54702 6.39478 8.30029L6.49146 8.19775L13.251 1.4375C13.69 0.998532 14.2854 0.751953 14.9062 0.751953C15.5271 0.751953 16.1225 0.998532 16.5615 1.4375C17.0005 1.87648 17.247 2.47197 17.2471 3.09277Z" fill="currentColor"/>
                  </svg>
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
