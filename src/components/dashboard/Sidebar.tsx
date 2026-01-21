"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  GraduationCap,
  FileQuestion,
  PlayCircle,
  ShoppingCart,
  Settings,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { LogoutButton } from "@/components/LogoutButton";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "My Courses", url: "/dashboard/courses", icon: BookOpen },
    { title: "My Exams", url: "/dashboard/exams", icon: GraduationCap },
    { title: "My Test Series", url: "/dashboard/test-series", icon: FileQuestion },
    { title: "Videos", url: "/dashboard/videos", icon: PlayCircle },
    { title: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ];

  return (
    <SidebarUI className="border-r border-slate-200/60 bg-white/50 backdrop-blur-xl">
      <SidebarHeader className="border-b border-slate-200/60 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-200">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900">Master Clinic</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Student Portal</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "group h-11 px-4 transition-all duration-200 rounded-xl",
                        isActive 
                          ? "bg-indigo-50 text-indigo-600 shadow-sm" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <Link href={item.url} className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <item.icon className={cn(
                            "h-[18px] w-[18px] transition-colors",
                            isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                          )} />
                          <span className="text-sm font-medium">{item.title}</span>
                        </div>
                        {isActive && <ChevronRight className="h-3 w-3 opacity-50" />}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/60 p-4">
        <div className="flex flex-col gap-2">
          <SidebarMenuButton 
            asChild 
            className="h-10 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all"
          >
            <Link href="/">
              <Home className="h-[18px] w-[18px] text-slate-400" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </SidebarMenuButton>
          
          <div className="mt-2 rounded-2xl bg-slate-50 p-1">
            <LogoutButton />
          </div>
        </div>
      </SidebarFooter>
    </SidebarUI>
  );
};

export default Sidebar;
