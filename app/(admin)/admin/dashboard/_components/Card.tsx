import { LucideIcon } from "lucide-react";

interface CardProps {
  heading: string;
  icon: LucideIcon;
  number: number;
  description: string;
  color: "indigo" | "emerald" | "red" | "amber" | "purple";
}
const colorMap: Record<CardProps["color"], string> = {
  indigo: "bg-indigo-500/10 border-indigo-200/50",
  emerald: "bg-emerald-500/10 border-emerald-200/50",
  red: "bg-red-500/10 border-red-200/50",
  amber: "bg-amber-500/10 border-amber-200/50",
  purple: "bg-purple-500/10 border-purple-200/50",
};

const colorIconMap: Record<CardProps["color"], string> = {
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  red: "bg-red-500",
  amber: "bg-amber-500",
  purple: "bg-purple-500",
};
export function Card({
  heading,
  icon: Icon,
  number,
  description,
  color,
}: CardProps) {
  return (
    <div
      className={`
        p-3 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        ${colorMap[color]}
      `}
    >
      <div
        className={` p-1 ${colorIconMap[color]} text-white shadow-sm inline-block rounded-xl`}
      >
        <Icon className="h-10 w-10" />
      </div>
      <h1 className="text-gray-600 tracking-wider uppercase font-semibold ">
        {heading}
      </h1>
      <p className="text-gray-900 text-3xl font-bold">{number}</p>
      <span className="text-sm text-gray-500 space-y-4">{description}</span>
    </div>
  );
}
