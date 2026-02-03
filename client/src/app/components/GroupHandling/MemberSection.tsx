"use client";

import { Member } from "@/app/interfaces/member";
import MemberCard from "./MemberCard";

interface MemberSectionProps {
  members: Member[];
}

const MemberSection = ({ members = [] }: MemberSectionProps) => {
  return (
    <div>
      {members.map((member) => (
        <MemberCard key={member.employeeId + member.groupId} member={member} />
      ))}
    </div>
  );
};

export default MemberSection;
