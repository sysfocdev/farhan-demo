import { Button } from "@/components/ui/button";
import {
  ChartColumn,
  Download,
  RefreshCw,
  Car,
  CarFront,
  BadgeCheck,
  DollarSign,
  FileText,
} from "lucide-react";
import { Card } from "./_components/Card";

const cards: {
  heading: string;
  icon: typeof Car;
  number: number;
  description: string;
  color: "indigo" | "emerald" | "red" | "amber" | "purple";
}[] = [
  {
    heading: "Total Cars",
    icon: Car,
    number: 41,
    description: "All vehicles in inventory",
    color: "indigo",
  },
  {
    heading: "Lease Cars",
    icon: CarFront,
    number: 26,
    description: "Available for lease",
    color: "emerald",
  },
  {
    heading: "Sold Cars",
    icon: BadgeCheck,
    number: 0,
    description: "Cars that have  been sold",
    color: "red",
  },
  {
    heading: "Total invertory worth",
    icon: DollarSign,
    number: 3345364,
    description: "Sum of all Car prices ",
    color: "amber",
  },
  {
    heading: "Total Blogs",
    icon: FileText,
    number: 4,
    description: "Published blog posts",
    color: "purple",
  },
];

export default function Dashboard() {
  return (
    <div className="flex relative top-[80px]   h-full bg-slate-100 p-5">
      <div className="absolute  w-[97%] h-full rounded-md bg-white">
        <div className="flex md:items-center md:justify-between ">
          <div className="left p-5">
            <div className="flex gap-x-2 items-center">
              <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 ">
                <ChartColumn className="h-12 w-12" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Business Dashoard
              </h1>
            </div>
            <div className="text-xl p-2">Business Intelligence overview</div>
          </div>
          <div className="right flex gap-x-3 p-5">
            <Button className="flex  cursor-pointer gap-x-2">
              <Download />
              <div>Export Report</div>
            </Button>
            <Button className="flex cursor-pointer gap-x-2">
              <RefreshCw />
              <div>Refresh</div>
            </Button>
          </div>
        </div>
        <div className="p-5 grid gap-y-4 md:grid-cols-3 gap-x-4">
          {cards.map((card, index) => (
            <Card
              key={index}
              heading={card.heading}
              icon={card.icon}
              number={card.number}
              description={card.description}
              color={card.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
