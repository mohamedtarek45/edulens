import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Question Bank", path: "/dashboard/questions" },
    { name: "Exams", path: "/dashboard/exams" },
    { name: "Export", path: "/dashboard/export" },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-full w-60 bg-gray-950 p-5 flex flex-col gap-8
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-white text-lg font-semibold tracking-tight">
            Exam System
          </h1>

          {/* Close (mobile only) */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)} 
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-white text-gray-900"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`
              }
              end={link.path === "/dashboard"}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}