import { TreeMenuItem } from "@/app/interfaces/tree-menu";

const menus: TreeMenuItem[] = [
  {
    id: "stab-1",
    name: "Stab",
    parentId: "root",
    children: [
      { id: "stab-1-1", name: "Pixie Finance Bureau", parentId: "stab-1" },
      { id: "stab-1-2", name: "Gnome Compliance Office", parentId: "stab-1" },
      { id: "stab-1-3", name: "Dryad HR Circle", parentId: "stab-1" },
      {
        id: "stab-elves-1",
        name: "Elf Strategy Cell",
        parentId: "stab-1",
        children: [
          {
            id: "stab-elves-2",
            name: "Plan Division",
            parentId: "stab-elves-1",
            children: [
              {
                id: "stab-elves-3a",
                name: "Long-Term Planning",
                parentId: "stab-elves-2",
                children: [
                  {
                    id: "stab-elves-4a",
                    name: "Scenario Modeling Team",
                    parentId: "stab-elves-3a",
                    children: [
                      {
                        id: "stab-elves-5a",
                        name: "Modeling Subgroup Alpha",
                        parentId: "stab-elves-4a",
                      },
                      {
                        id: "stab-elves-5b",
                        name: "Modeling Subgroup Beta",
                        parentId: "stab-elves-4a",
                        children: [
                          {
                            id: "stab-elves-6a",
                            name: "Forest Insight Cell",
                            parentId: "stab-elves-5b",
                            children: [
                              {
                                id: "stab-elves-7a",
                                name: "Deep Grove Strategy Nexus",
                                parentId: "stab-elves-6a",
                              },
                              {
                                id: "stab-elves-7b",
                                name: "Ancient Tree Wisdom Circle",
                                parentId: "stab-elves-6a",
                              },
                            ],
                          },
                          {
                            id: "stab-elves-6b",
                            name: "Data Bark Analysis Group",
                            parentId: "stab-elves-5b",
                          },
                        ],
                      },
                      {
                        id: "stab-elves-5c",
                        name: "Quick Modeling Cell",
                        parentId: "stab-elves-4a",
                      },
                    ],
                  },
                ],
              },
              {
                id: "stab-elves-3b",
                name: "Short-Term Planning",
                parentId: "stab-elves-2",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "led-1",
    name: "Ledning",
    parentId: "root",
    children: [
      { id: "led-1-1", name: "Unicorn Executive Council", parentId: "led-1" },
      { id: "led-1-2", name: "Dragon Vision & Innovation", parentId: "led-1" },
      {
        id: "led-phoenix-1",
        name: "Phoenix Growth Directorate",
        parentId: "led-1",
        children: [
          {
            id: "led-phoenix-2",
            name: "Ash Cycle Division",
            parentId: "led-phoenix-1",
            children: [
              {
                id: "led-phoenix-3a",
                name: "Rebirth Management Office",
                parentId: "led-phoenix-2",
                children: [
                  {
                    id: "led-phoenix-4a",
                    name: "Fire Essence Unit",
                    parentId: "led-phoenix-3a",
                    children: [
                      {
                        id: "led-phoenix-5a",
                        name: "Spark Analytics Cell",
                        parentId: "led-phoenix-4a",
                        children: [
                          {
                            id: "led-phoenix-6a",
                            name: "Flare Research Team",
                            parentId: "led-phoenix-5a",
                            children: [
                              {
                                id: "led-phoenix-7a",
                                name: "Inferno Strategy Core",
                                parentId: "led-phoenix-6a",
                              },
                              {
                                id: "led-phoenix-7b",
                                name: "Ash Renewal Council",
                                parentId: "led-phoenix-6a",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: "led-phoenix-5b",
                        name: "Thermal Optimization Squad",
                        parentId: "led-phoenix-4a",
                      },
                    ],
                  },
                ],
              },
              {
                id: "led-phoenix-3b",
                name: "Renewal Operations",
                parentId: "led-phoenix-2",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "anst-1",
    name: "Anställda",
    parentId: "root",
    children: [
      { id: "anst-1-1", name: "Hobbit Customer Care", parentId: "anst-1" },
      { id: "anst-1-2", name: "Troll Maintenance Brigade", parentId: "anst-1" },
      { id: "anst-1-3", name: "Sprite Creative Studio", parentId: "anst-1" },
      {
        id: "anst-centaur-1",
        name: "Centaur Product Guild",
        parentId: "anst-1",
        children: [
          {
            id: "anst-centaur-2",
            name: "Centaur Specialist Team",
            parentId: "anst-centaur-1",
            children: [
              {
                id: "anst-centaur-3",
                name: "Expert Cell",
                parentId: "anst-centaur-2",
                children: [
                  {
                    id: "anst-centaur-4a",
                    name: "Advanced Craft Division",
                    parentId: "anst-centaur-3",
                    children: [
                      {
                        id: "anst-centaur-5a",
                        name: "Masterwork Lab",
                        parentId: "anst-centaur-4a",
                        children: [
                          {
                            id: "anst-centaur-6a",
                            name: "Prime Artisan Circle",
                            parentId: "anst-centaur-5a",
                            children: [
                              {
                                id: "anst-centaur-7a",
                                name: "Eternal Forge Nexus",
                                parentId: "anst-centaur-6a",
                              },
                              {
                                id: "anst-centaur-7b",
                                name: "Ironwood Craft Assembly",
                                parentId: "anst-centaur-6a",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: "anst-centaur-5b",
                        name: "Pattern R&D Unit",
                        parentId: "anst-centaur-4a",
                      },
                    ],
                  },
                  {
                    id: "anst-centaur-4b",
                    name: "Innovation Cell",
                    parentId: "anst-centaur-3",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default menus;
