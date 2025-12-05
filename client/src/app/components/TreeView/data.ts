import { TreeMenuItem } from "@/app/interfaces/tree-menu";

const menus: TreeMenuItem[] = [
  {
    id: "1ad77d32-1d7a-4df6-8c34-5c71e0f32e8c",
    name: "Stab",
    parentId: "f2c7c7c8-9e81-4e9a-8e4d-3de84cf70aa1",
    children: [
      {
        id: "b5b1b86b-76e3-4d8e-a09e-41a616d8a932",
        name: "Pixie Finance Bureau",
        parentId: "1ad77d32-1d7a-4df6-8c34-5c71e0f32e8c",
      },
      {
        id: "b2df1a6d-1314-4212-98c5-23191d79a665",
        name: "Gnome Compliance Office",
        parentId: "1ad77d32-1d7a-4df6-8c34-5c71e0f32e8c",
      },
      {
        id: "cb8eb5af-e252-4a2a-b7a0-dc736df7df35",
        name: "Dryad HR Circle",
        parentId: "1ad77d32-1d7a-4df6-8c34-5c71e0f32e8c",
      },
      {
        id: "ad09e856-3f73-4e22-b1b6-afcb02014592",
        name: "Fairy Legal Council",
        parentId: "1ad77d32-1d7a-4df6-8c34-5c71e0f32e8c",
      },
      {
        id: "0dcd7058-0e0f-4d3d-9c1c-667e4b058cda",
        name: "Elf Strategy Cell",
        parentId: "1ad77d32-1d7a-4df6-8c34-5c71e0f32e8c",
      },
    ],
  },
  {
    id: "c8a8b92c-6929-4a5a-9e17-37a7bfb5f5a2",
    name: "Ledning",
    parentId: "f2c7c7c8-9e81-4e9a-8e4d-3de84cf70aa1",
    children: [
      {
        id: "3cd22c03-0c6d-462f-a394-b823e1b87edf",
        name: "Unicorn Executive Council",
        parentId: "c8a8b92c-6929-4a5a-9e17-37a7bfb5f5a2",
      },
      {
        id: "e3a92738-f43c-4cd7-85f5-0c90cd47e7c5",
        name: "Dragon Vision & Innovation",
        parentId: "c8a8b92c-6929-4a5a-9e17-37a7bfb5f5a2",
      },
      {
        id: "8e1e7f03-5b9e-44ff-b72c-8e9bb189bd87",
        name: "Phoenix Growth Directorate",
        parentId: "c8a8b92c-6929-4a5a-9e17-37a7bfb5f5a2",
      },
      {
        id: "0ba6fb67-3fcd-43a8-97e2-82c822c8f22a",
        name: "Mermaid Communications Fleet",
        parentId: "c8a8b92c-6929-4a5a-9e17-37a7bfb5f5a2",
      },
      {
        id: "5a9104ae-9ec5-4ccd-bd9a-a8df52f5482e",
        name: "Griffin Operations Command",
        parentId: "c8a8b92c-6929-4a5a-9e17-37a7bfb5f5a2",
      },
    ],
  },
  {
    id: "db30628f-0651-4f35-8931-8e58f2e7c1c2",
    name: "Anställda",
    parentId: "f2c7c7c8-9e81-4e9a-8e4d-3de84cf70aa1",
    children: [
      {
        id: "a41d231d-8c9a-4c19-8af6-1f907f3bbbba",
        name: "Hobbit Customer Care",
        parentId: "db30628f-0651-4f35-8931-8e58f2e7c1c2",
      },
      {
        id: "77a27a2b-7b4c-4e9a-b0cd-e1ddf3a2095a",
        name: "Troll Maintenance Brigade",
        parentId: "db30628f-0651-4f35-8931-8e58f2e7c1c2",
      },
      {
        id: "46c0c70e-bfcb-451b-a124-0c8be98128c9",
        name: "Sprite Creative Studio",
        parentId: "db30628f-0651-4f35-8931-8e58f2e7c1c2",
      },
      {
        id: "0e3a1b22-dc3b-4b6f-9723-2da105cac265",
        name: "Werewolf Night Shift Ops",
        parentId: "db30628f-0651-4f35-8931-8e58f2e7c1c2",
      },
      {
        id: "c9d0ab8b-916a-4abb-8ef0-7d8b95e05e1c",
        name: "Centaur Product Guild",
        parentId: "db30628f-0651-4f35-8931-8e58f2e7c1c2",
        children: [
          {
            id: "c9d0ab8b-2134-4abb-8ef0-7d8b95e05e1c",
            name: "Centaur Specialist Team",
            parentId: "c9d0ab8b-916a-4abb-8ef0-7d8b95e05e1c",
          },
        ],
      },
    ],
  },
];

export default menus;
