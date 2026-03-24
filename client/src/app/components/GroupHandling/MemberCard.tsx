"use client";

import { Card, Checkbox, Button, Icon } from "@sk-web-gui/react";
import { Employee } from "@/app/interfaces/employee";
import { Trash } from "lucide-react";
import type { ChangeEvent } from "react";
import { User } from "lucide-react";

interface MemberCardProps {
  member: Employee;
  editMode: boolean;
  checked?: boolean;
  onCheckedChange?: (memberId: number, isChecked: boolean) => void;
  onRemove?: (memberId: number) => void;
  disabled?: boolean;
}

const MemberCard = ({
  member,
  editMode,
  checked = false,
  onCheckedChange,
  onRemove,
  disabled = false,
}: MemberCardProps) => {
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(member.id, e.target.checked);
  };

  const isRemoveMode = editMode && !!onRemove;

  return (
    <Card>
      <Card.Body className="w-full pb-16">
        <div className="flex flex-row justify-between">
          <Card.Text>
            <div className="flex flex-row items-center">
              {editMode && !isRemoveMode && (
                <Checkbox
                  className="pr-16"
                  onChange={handleCheck}
                  checked={checked}
                  disabled={disabled}
                />
              )}
              {!editMode && (
                <Icon icon={<User />} className="flex self-start" />
              )}
              <div className="flex flex-col pl-12 gap-2">
                <p className="text-small font-bold !p-0">
                  {member.firstName} {member.lastName}
                </p>
                <p className="!p-0">{member.workTitle}</p>
                {member.orgName && <p className="!p-0">{member.orgName}</p>}
                {!editMode && (
                  <>
                    {member.workMobile && (
                      <p className="!p-0">{member.workMobile}</p>
                    )}
                    {member.workPhone && (
                      <p className="!p-0">{member.workPhone}</p>
                    )}
                    {member.email && <p className="!p-0">{member.email}</p>}
                  </>
                )}
              </div>
            </div>
          </Card.Text>
          <div className="flex items-center">
            {isRemoveMode && (
              <Button
                iconButton={true}
                rounded={true}
                size="md"
                variant="secondary"
                onClick={() => onRemove(member.id)}
              >
                <Trash />
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MemberCard;
