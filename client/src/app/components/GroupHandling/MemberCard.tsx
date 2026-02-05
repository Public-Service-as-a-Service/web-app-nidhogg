"use client";

import { Card, Checkbox, Avatar, Button } from "@sk-web-gui/react";
import { Member } from "@/app/interfaces/member";
import { ArrowRight } from "lucide-react";

interface MemberCardProps {
  member: Member;
  editMode: boolean;
}

const MemberCard = ({ member, editMode }: MemberCardProps) => {
  return (
    <Card>
      <Card.Body className="w-full pb-16">
        <div className="flex flex-row justify-between">
          <Card.Text>
            <div className="flex flex-row items-center">
              {editMode && <Checkbox className="pr-16" />}
              <Avatar
                rounded={true}
                initials={member.employee.email.slice(0, 2)}
              />
              <div className="flex flex-col pl-12">
                <p>{member.employee.email.slice(0, 10)}...</p>
                <p>{member.employee.telephone}</p>
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
