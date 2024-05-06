export interface Choice{
    id : number,
    name: string,
    value: string
  }

export const choicesList =[
    {
      id: 1,
      name: "Pick up",
      value:"pickup"
    },
    {
      id: 2,
      name: "4 Star",
      value:"4star"
    },
    {
      id: 3,
      name: "3 Star",
      value:"3Star"
    },
    {
      id: 4,
      name: "Under 30 Min",
      value:"Under30Min"
    },
    {
      id: 5,
      name: "Recommended",
      value:"recommended"
    }
  ];