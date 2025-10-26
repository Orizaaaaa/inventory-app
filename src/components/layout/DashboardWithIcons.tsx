import React from 'react';
import { 
  Home, 
  Users, 
  Package, 
  Settings, 
  BarChart3, 
  FileText,
  ShoppingCart,
  UserCheck
} from 'lucide-react';
import { Dashboard } from './Dashboard';

// Contoh berbagai penggunaan icon di breadcrumb
export function DashboardWithIcons() {
  return (
    <div className="space-y-8">
      {/* Contoh 1: Dashboard dengan icon Home */}
      <Dashboard
        breadcrumbItems={[
          { label: "Dashboard", isCurrentPage: true, icon: Home }
        ]}
        title="Main Dashboard"
        description="Overview of your application"
      >
        <div className="bg-muted/50 rounded-lg p-6">
          <p>Dashboard utama dengan icon Home</p>
        </div>
      </Dashboard>

      {/* Contoh 2: User Management dengan icon Users */}
      <Dashboard
        breadcrumbItems={[
          { label: "Dashboard", href: "/", icon: Home },
          { label: "User Management", isCurrentPage: true }
        ]}
        title="User Management"
        description="Manage users and permissions"
      >
        <div className="bg-muted/50 rounded-lg p-6">
          <p>User management page dengan icon Users di breadcrumb pertama</p>
        </div>
      </Dashboard>

      {/* Contoh 3: Product dengan icon Package */}
      <Dashboard
        breadcrumbItems={[
          { label: "Inventory", href: "/inventory", icon: Package },
          { label: "Products", href: "/products" },
          { label: "Edit Product", isCurrentPage: true }
        ]}
        title="Edit Product"
        description="Modify product information"
      >
        <div className="bg-muted/50 rounded-lg p-6">
          <p>Product edit page dengan icon Package di breadcrumb pertama</p>
        </div>
      </Dashboard>

      {/* Contoh 4: Analytics dengan icon BarChart3 */}
      <Dashboard
        breadcrumbItems={[
          { label: "Analytics", isCurrentPage: true, icon: BarChart3 }
        ]}
        title="Analytics"
        description="View detailed analytics and reports"
      >
        <div className="bg-muted/50 rounded-lg p-6">
          <p>Analytics page dengan icon BarChart3</p>
        </div>
      </Dashboard>
    </div>
  );
}

// Contoh penggunaan dalam halaman yang berbeda
export function ProductPage() {
  return (
    <Dashboard
      breadcrumbItems={[
        { label: "Inventory", href: "/inventory", icon: Package },
        { label: "Products", isCurrentPage: true }
      ]}
      title="Products"
      description="Manage your product inventory"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card text-card-foreground rounded-lg border p-4">
          <h3 className="font-semibold">Total Products</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg border p-4">
          <h3 className="font-semibold">In Stock</h3>
          <p className="text-2xl font-bold">987</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg border p-4">
          <h3 className="font-semibold">Out of Stock</h3>
          <p className="text-2xl font-bold">247</p>
        </div>
      </div>
    </Dashboard>
  );
}

export function SettingsPage() {
  return (
    <Dashboard
      breadcrumbItems={[
        { label: "Settings", isCurrentPage: true, icon: Settings }
      ]}
      title="Settings"
      description="Configure your application settings"
    >
      <div className="space-y-4">
        <div className="bg-card text-card-foreground rounded-lg border p-4">
          <h3 className="font-semibold">General Settings</h3>
          <p className="text-sm text-muted-foreground">Configure basic application settings</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg border p-4">
          <h3 className="font-semibold">User Preferences</h3>
          <p className="text-sm text-muted-foreground">Customize your user experience</p>
        </div>
      </div>
    </Dashboard>
  );
}
