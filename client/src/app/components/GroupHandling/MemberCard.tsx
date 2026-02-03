"use client";

import { Card, Checkbox, Avatar } from "@sk-web-gui/react";
import { Member } from "@/app/interfaces/member";

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text>
          <div className="flex flex-row items-center">
            <Checkbox className="pr-16" />
            <Avatar initials={member.employee.email.slice(0, 2)} />
            <div className="flex flex-col pl-12">
              <p>{member.employee.email.slice(0, 10)}...</p>
              <p>{member.employee.telephone}</p>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MemberCard;
