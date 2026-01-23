"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  BookOpen,
  ShoppingCart,
  MessageSquare,
  Settings,
  Home,
  GraduationCap,
  FileQuestion,
  PlayCircle,
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
} from "@/components/ui/sidebar";
import { LogoutButton } from "@/components/LogoutButton";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/admin-dashboard",
      icon: Home,
    },
    {
      title: "Users",
      url: "/admin-dashboard/users",
      icon: Users,
    },
    {
      title: "Courses",
      url: "/admin-dashboard/courses",
      icon: BookOpen,
    },
    {
      title: "Exams",
      url: "/admin-dashboard/exams",
      icon: GraduationCap,
    },

     {
      title: "Notes",
      url: "/admin-dashboard/notes",
      icon: FileQuestion,
    },
    {
      title: "Test Series",
      url: "/admin-dashboard/test-series",
      icon: FileQuestion,
    },
    {
      title: "Videos",
      url: "/admin-dashboard/videos",
      icon: PlayCircle,
    },
    {
      title: "Orders",
      url: "/admin-dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Reviews",
      url: "/admin-dashboard/reviews",
      icon: MessageSquare,
    },
    {
      title: "Analytics",
      url: "/admin-dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Settings",
      url: "/admin-dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <SidebarUI>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="h-4 w-4" />
          </div>
          <span className="font-semibold">Admin Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2">
          <SidebarMenuButton asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </SidebarMenuButton>
          <LogoutButton />
        </div>
      </SidebarFooter>
    </SidebarUI>
  );
};

export default Sidebar;
