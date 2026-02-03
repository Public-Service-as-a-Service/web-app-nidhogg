"use client";

import { Card } from "@sk-web-gui/react";
import { Member } from "@/app/interfaces/member";

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text>{member.employee.email}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MemberCard;
