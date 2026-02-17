"use client";

import MainWrapper from "@/app/components/MainWrapper";
// import { useSearchEmployees } from "@/app/services/useSearchEmployees";
import { Input } from "@sk-web-gui/react";

const Groups = () => {
  //   const { mutate: searchEmployees } = useSearchEmployees();

  //   const handleSearch = (query: string) => {
  //     searchEmployees({
  //       query,
  //       page: 0,
  //       size: 10,
  //     });
  //   };

  return (
    <MainWrapper>
      <h1 className="text-h2-sm">Skapa grupp</h1>
      <Input />
    </MainWrapper>
  );
};

export default Groups;
