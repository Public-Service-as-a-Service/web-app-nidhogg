import { TreeMenuItem } from "@/app/interfaces/tree-menu";

const menus: TreeMenuItem[] = [
  {
    id: "stab-1",
    name: "Stab",
    parentId: "root",
    children: [
      {
        id: "stab-1-1",
        name: "Pixie Finance Bureau",
        parentId: "stab-1",
        children: [
          {
            id: "stab-1-1-extra-1",
            name: "Pixie Audit Cell",
            parentId: "stab-1-1",
          },
        ],
      },
      {
        id: "stab-1-2",
        name: "Gnome Compliance Office",
        parentId: "stab-1",
        children: [
          {
            id: "stab-1-2-extra-1",
            name: "Gnome Regulation Unit",
            parentId: "stab-1-2",
          },
        ],
      },
      {
        id: "stab-1-3",
        name: "Dryad HR Circle",
        parentId: "stab-1",
        children: [
          {
            id: "stab-1-3-extra-1",
            name: "Dryad Talent Cell",
            parentId: "stab-1-3",
          },
        ],
      },
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
                        children: [
                          {
                            id: "stab-elves-5a-extra-1",
                            name: "Alpha Analysis Pod",
                            parentId: "stab-elves-5a",
                          },
                        ],
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
                                children: [
                                  {
                                    id: "stab-elves-7a-extra-1",
                                    name: "Deep Grove Subnode",
                                    parentId: "stab-elves-7a",
                                  },
                                ],
                              },
                              {
                                id: "stab-elves-7b",
                                name: "Ancient Tree Wisdom Circle",
                                parentId: "stab-elves-6a",
                                children: [
                                  {
                                    id: "stab-elves-7b-extra-1",
                                    name: "Ancient Tree Subnode",
                                    parentId: "stab-elves-7b",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            id: "stab-elves-6b",
                            name: "Data Bark Analysis Group",
                            parentId: "stab-elves-5b",
                            children: [
                              {
                                id: "stab-elves-6b-extra-1",
                                name: "Tree Data Cell",
                                parentId: "stab-elves-6b",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: "stab-elves-5c",
                        name: "Quick Modeling Cell",
                        parentId: "stab-elves-4a",
                        children: [
                          {
                            id: "stab-elves-5c-extra-1",
                            name: "Rapid Calc Pod",
                            parentId: "stab-elves-5c",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: "stab-elves-3b",
                name: "Short-Term Planning",
                parentId: "stab-elves-2",
                children: [
                  {
                    id: "stab-elves-3b-extra-1",
                    name: "Urgent Response Unit",
                    parentId: "stab-elves-3b",
                  },
                ],
              },
            ],
          },
          {
            id: "stab-elves-1-extra-1",
            name: "Elf Supplemental Strategy Pod",
            parentId: "stab-elves-1",
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
      {
        id: "led-1-1",
        name: "Unicorn Executive Council",
        parentId: "led-1",
        children: [
          {
            id: "led-1-1-extra-1",
            name: "Unicorn Strategy Pod",
            parentId: "led-1-1",
          },
        ],
      },
      {
        id: "led-1-2",
        name: "Dragon Vision & Innovation",
        parentId: "led-1",
        children: [
          {
            id: "led-1-2-extra-1",
            name: "Dragon Insight Unit",
            parentId: "led-1-2",
          },
        ],
      },
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
                                children: [
                                  {
                                    id: "led-phoenix-7a-extra-1",
                                    name: "Inferno Subnode",
                                    parentId: "led-phoenix-7a",
                                  },
                                ],
                              },
                              {
                                id: "led-phoenix-7b",
                                name: "Ash Renewal Council",
                                parentId: "led-phoenix-6a",
                                children: [
                                  {
                                    id: "led-phoenix-7b-extra-1",
                                    name: "Ash Renewal Subnode",
                                    parentId: "led-phoenix-7b",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: "led-phoenix-5b",
                        name: "Thermal Optimization Squad",
                        parentId: "led-phoenix-4a",
                        children: [
                          {
                            id: "led-phoenix-5b-extra-1",
                            name: "Thermal Test Pod",
                            parentId: "led-phoenix-5b",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                id: "led-phoenix-3b",
                name: "Renewal Operations",
                parentId: "led-phoenix-2",
                children: [
                  {
                    id: "led-phoenix-3b-extra-1",
                    name: "Renewal Subunit",
                    parentId: "led-phoenix-3b",
                  },
                ],
              },
            ],
          },
          {
            id: "led-phoenix-1-extra-1",
            name: "Phoenix Expansion Pod",
            parentId: "led-phoenix-1",
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
      {
        id: "anst-1-1",
        name: "Hobbit Customer Care",
        parentId: "anst-1",
        children: [
          {
            id: "anst-1-1-extra-1",
            name: "Hobbit Feedback Cell",
            parentId: "anst-1-1",
          },
        ],
      },
      {
        id: "anst-1-2",
        name: "Troll Maintenance Brigade",
        parentId: "anst-1",
        children: [
          {
            id: "anst-1-2-extra-1",
            name: "Troll Repair Unit",
            parentId: "anst-1-2",
          },
        ],
      },
      {
        id: "anst-1-3",
        name: "Sprite Creative Studio",
        parentId: "anst-1",
        children: [
          {
            id: "anst-1-3-extra-1",
            name: "Sprite Art Pod",
            parentId: "anst-1-3",
          },
        ],
      },
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
                                children: [
                                  {
                                    id: "anst-centaur-7a-extra-1",
                                    name: "Forge Subnode",
                                    parentId: "anst-centaur-7a",
                                  },
                                ],
                              },
                              {
                                id: "anst-centaur-7b",
                                name: "Ironwood Craft Assembly",
                                parentId: "anst-centaur-6a",
                                children: [
                                  {
                                    id: "anst-centaur-7b-extra-1",
                                    name: "Ironwood Subnode",
                                    parentId: "anst-centaur-7b",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: "anst-centaur-5b",
                        name: "Pattern R&D Unit",
                        parentId: "anst-centaur-4a",
                        children: [
                          {
                            id: "anst-centaur-5b-extra-1",
                            name: "Pattern Prototype Cell",
                            parentId: "anst-centaur-5b",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: "anst-centaur-4b",
                    name: "Innovation Cell",
                    parentId: "anst-centaur-3",
                    children: [
                      {
                        id: "anst-centaur-4b-extra-1",
                        name: "Innovation Subnode",
                        parentId: "anst-centaur-4b",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "anst-centaur-1-extra-1",
            name: "Centaur Extra Guild Node",
            parentId: "anst-centaur-1",
          },
        ],
      },
    ],
  },
];

export default menus;
