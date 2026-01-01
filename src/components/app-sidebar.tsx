"use client"

import * as React from "react"
import {
  Bot,
  Command,
  LayoutDashboard,
  Building2,
  Package,
  Warehouse,
  ShoppingCart,
  TrendingUp,
  Layers,
  UserCog,
  Handshake,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "LAF",
    email: "laf@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "LAF Admin",
      logo: UserCog,
      plan: "Enterprise",
    },
    {
      name: "LAF Busdev",
      logo: Handshake,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Data Produk",
      url: "/data-produk",
      icon: Package,
    },
    {
      title: "Data Vendor",
      url: "/data-vendor",
      icon: Building2,
    },
    {
      title: "Data Bahan Baku",
      url: "/data-bahan-baku",
      icon: Bot,
    },
    {
      title: "Warehouse",
      url: "/warehouse",
      icon: Warehouse,
      items: [
        {
          title: "Barang Masuk",
          url: "/warehouse/barang-masuk",
        },
        {
          title: "Barang Keluar",
          url: "/warehouse/barang-keluar",
        },
      ],
    },
    {
      title: "Data Pre Order",
      url: "/data-pre-order",
      icon: ShoppingCart,
      items: [
        {
          title: "Rincian Pre Order",
          url: "/data-pre-order/rincian",
        },
        {
          title: "Data sisa Pre Order",
          url: "/data-pre-order/sisa",
        },
        {
          title: "Format Pre Order",
          url: "/data-pre-order/format",
        },
      ],
    },
    {
      title: "Data Penjualan",
      url: "/data-penjualan",
      icon: TrendingUp,
      items: [
        {
          title: "Market Place",
          url: "/data-penjualan/market-place",
        },
        {
          title: "Offline Store/Website",
          url: "/data-penjualan/offline-store-website",
        },
        {
          title: "Data Forecasting",
          url: "/data-penjualan/forecasting",
        },
      ],
    },
    {
      title: "Master Data",
      url: "/master-data",
      icon: Layers,
      items: [
        {
          title: "Customer",
          url: "/master-data/customer",
        },
        {
          title: "Supplier",
          url: "/master-data/supplier",
        },
        {
          title: "Category",
          url: "/master-data/category",
        },
        {
          title: "Nota",
          url: "/master-data/nota",
        },
        {
          title: "Lokasi Warehouse",
          url: "/master-data/location",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="bg-gray-100" variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
