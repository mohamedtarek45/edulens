import {
  HelpCircle,
  FileText,
  Users,
  ClipboardList,
} from "lucide-react";

import { useDashboardStats } from "../hooks/DashboardStats";
import PageLoader from "./PageLoader";

export default function DashboardHeader() {
  const { data, isPending, isError } = useDashboardStats();

  const stats = [
    {
      label: "Questions",
      value: data?.questions ?? 0,
      icon: HelpCircle,
      gradient: "from-indigo-500 to-blue-400",
      light: "bg-indigo-50 text-indigo-500",
    },
    {
      label: "Exams",
      value: data?.exams ?? 0,
      icon: FileText,
      gradient: "from-violet-500 to-purple-400",
      light: "bg-violet-50 text-violet-500",
    },
    {
      label: "Students",
      value: data?.students ?? 0,
      icon: Users,
      gradient: "from-emerald-500 to-teal-400",
      light: "bg-emerald-50 text-emerald-500",
    },
    {
      label: "Submissions",
      value: data?.submissions ?? 0,
      icon: ClipboardList,
      gradient: "from-orange-500 to-amber-400",
      light: "bg-orange-50 text-orange-500",
    },
  ];

  if (isPending) {
    return (
      <PageLoader />
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-red-500">Failed to load stats</div>
    );
  }

return (
  <div className="bg-gray-50 p-4 sm:p-6 lg:p-8">
    
    <div className="mb-6 sm:mb-8">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
        Overview
      </h1>
      <p className="text-sm text-gray-400 mt-1">
        Platform statistics
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((s) => {
        const Icon = s.icon;

        return (
          <div
            key={s.label}
            className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col gap-5"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center ${s.light}`}
              >
                <Icon size={20} />
              </div>

              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-linear-to-r ${s.gradient} text-white`}
              >
                Live
              </span>
            </div>

            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {s.value}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {s.label}
              </p>
            </div>

            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full bg-linear-to-r ${s.gradient}`}
                style={{ width: "65%" }}
              />
            </div>
          </div>
        );
      })}
    </div>

  </div>
);
}