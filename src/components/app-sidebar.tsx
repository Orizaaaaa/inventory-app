"use client"

import * as React from "react"
import {
  AudioWaveform,
  Bot,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Building2,
  Package,
  Warehouse,
  ShoppingCart,
  TrendingUp,
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
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
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
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Data Vendor",
      url: "/data-vendor",
      icon: Building2,
    },
    {
      title: "Data Produk",
      url: "/data-produk",
      icon: Package,
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
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
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
