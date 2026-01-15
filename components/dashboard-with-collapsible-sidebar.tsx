"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  ShoppingCart,
  BarChart3,
  Users,
  ChevronsRight,
  Moon,
  Sun,
  TrendingUp,
  Package,
  Bell,
  Settings,
  HelpCircle,
  User,
  Menu,
  CheckSquare,
  BellRing,
  UserCog,
  LayoutGrid,
} from "lucide-react";

/* ================== DASHBOARD ================== */
export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50"
        />
      )}

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        selected={selectedMenu}
        setSelected={setSelectedMenu}
        isMobile={isMobile}
      />

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <Header
          isDark={isDark}
          setIsDark={setIsDark}
          isMobile={isMobile}
          setSidebarOpen={setSidebarOpen}
        />
        <Stats />
        <Content />
      </main>
    </div>
  );
}

/* ================== SIDEBAR ================== */
const Sidebar = ({ open, setOpen, selected, setSelected, isMobile }) => {
  const menu = [
    { icon: LayoutGrid, title: "Dashboard" },
    { icon: CheckSquare, title: "Tasks" },
    { icon: Users, title: "Clients" },
    { icon: BellRing, title: "Follow-ups" },
    { icon: Package, title: "Products" },
    { icon: UserCog, title: "Workers" },
    { icon: BarChart3, title: "Reports" },
  ];

  const account = [
    { icon: Settings, title: "Settings" },
    { icon: HelpCircle, title: "Help & Support" },
  ];

  return (
    <aside
      className={`
        fixed md:sticky top-0 z-50 h-screen
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        transition-all duration-300
        ${open ? "w-64" : "w-16"}
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Logo />
          {open && (
            <div>
              <p className="text-sm font-semibold">FieldService</p>
              <p className="text-xs text-gray-500">Leader Console</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-2 space-y-1">
        {menu.map((m) => (
          <SidebarItem
            key={m.title}
            {...m}
            open={open}
            selected={selected}
            setSelected={setSelected}
            onClick={() => isMobile && setOpen(false)}
          />
        ))}
      </div>

      {open && (
        <div className="p-2 border-t mt-4 space-y-1">
          {account.map((m) => (
            <SidebarItem
              key={m.title}
              {...m}
              open={open}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>
      )}

      {!isMobile && (
        <button
          onClick={() => setOpen(!open)}
          className="absolute bottom-0 w-full border-t p-3 flex items-center gap-2"
        >
          <ChevronsRight
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
          {open && <span>Collapse</span>}
        </button>
      )}
    </aside>
  );
};

const SidebarItem = ({
  icon: Icon,
  title,
  open,
  selected,
  setSelected,
  onClick,
}) => {
  const active = selected === title;
  return (
    <button
      onClick={() => {
        setSelected(title);
        onClick?.();
      }}
      className={`flex items-center h-11 w-full rounded-md transition
        ${
          active
            ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600"
            : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
        }
      `}
    >
      <div className="w-12 grid place-content-center">
        <Icon className="h-4 w-4" />
      </div>
      {open && <span className="text-sm">{title}</span>}
    </button>
  );
};

/* ================== HEADER ================== */
const Header = ({ isDark, setIsDark, isMobile, setSidebarOpen }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg border"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <button className="relative p-2 rounded-lg border">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
      </button>
      <button
        onClick={() => setIsDark(!isDark)}
        className="p-2 rounded-lg border"
      >
        {isDark ? <Sun /> : <Moon />}
      </button>
      <button className="p-2 rounded-lg border">
        <User />
      </button>
    </div>
  </div>
);

/* ================== STATS ================== */
const Stats = () => {
  const data = [
    { title: "Sales", value: "$24,567", icon: DollarSign },
    { title: "Users", value: "1,234", icon: Users },
    { title: "Orders", value: "456", icon: ShoppingCart },
    { title: "Products", value: "89", icon: Package },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {data.map((d) => (
        <div
          key={d.title}
          className="p-4 bg-white dark:bg-gray-900 border rounded-xl"
        >
          <div className="flex justify-between mb-2">
            <d.icon className="h-5 w-5 text-blue-500" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-sm text-gray-500">{d.title}</p>
          <p className="text-2xl font-bold">{d.value}</p>
        </div>
      ))}
    </div>
  );
};

/* ================== CONTENT ================== */
const Content = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl border">
      Recent Activity
    </div>
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border">
      Top Products
    </div>
  </div>
);

const Logo = () => (
  <div className="h-10 w-10 rounded-lg bg-blue-600 text-white grid place-content-center font-bold">
    FS
  </div>
);
