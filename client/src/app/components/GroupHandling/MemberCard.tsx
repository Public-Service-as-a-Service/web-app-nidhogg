"use client";

import { Card, Checkbox, Avatar, Button } from "@sk-web-gui/react";
import { Employee } from "@/app/interfaces/employee";
import { ArrowRight } from "lucide-react";

interface MemberCardProps {
  member: Employee;
  editMode: boolean;
}

const MemberCard = ({ member, editMode }: MemberCardProps) => {
  const initials =
    `${member.firstName?.charAt(0) || ""}${member.lastName?.charAt(0) || ""}`.toUpperCase();

  return (
    <Card>
      <Card.Body className="w-full pb-16">
        <div className="flex flex-row justify-between">
          <Card.Text>
            <div className="flex flex-row items-center">
              {editMode && <Checkbox className="pr-16" />}
              <Avatar rounded={true} initials={initials} />
              <div className="flex flex-col pl-12 gap-2">
                <p className="text-small font-bold !p-0">
                  {member.firstName} {member.lastName}
                </p>
                <p className="!p-0">{member.workTitle}</p>
                <p className="!p-0">{member.orgName}</p>
              </div>
            </div>
          </Card.Text>
          <div className="flex items-center">
            <Button iconButton={true} rounded={true} size="md">
              <ArrowRight />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MemberCard;
