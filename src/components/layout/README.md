# Dashboard Component

Komponen `Dashboard` adalah wrapper layout yang menyediakan struktur sidebar dan header yang konsisten untuk semua halaman aplikasi.

## Fitur

- ✅ Font Inter untuk semua halaman
- ✅ Sidebar yang dapat di-collapse
- ✅ Breadcrumb navigation dengan icon (hanya di item pertama)
- ✅ Header dengan title dan description
- ✅ Layout yang responsif
- ✅ Mudah digunakan dengan children props
- ✅ Tidak ada loading skeleton (clean UI)

## Penggunaan

### Basic Usage

```tsx
import { Dashboard } from "@/components/layout";

export default function MyPage() {
  return (
    <Dashboard>
      <div>Konten halaman Anda di sini</div>
    </Dashboard>
  );
}
```

### Dengan Breadcrumb

```tsx
import { Dashboard } from "@/components/layout";
import { Home, Package, Edit } from "lucide-react";

export default function MyPage() {
  return (
    <Dashboard
      breadcrumbItems={[
        { label: "Home", href: "/", icon: Home },
        { label: "Products", href: "/products" },
        { label: "Edit Product", isCurrentPage: true },
      ]}
    >
      <div>Form edit product</div>
    </Dashboard>
  );
}
```

### Dengan Title dan Description

```tsx
import { Dashboard } from "@/components/layout";

export default function MyPage() {
  return (
    <Dashboard
      title="Product Management"
      description="Manage your product inventory and details"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Products", isCurrentPage: true },
      ]}
    >
      <div>Konten halaman product management</div>
    </Dashboard>
  );
}
```

## Props

| Prop              | Type               | Required | Description                                       |
| ----------------- | ------------------ | -------- | ------------------------------------------------- |
| `children`        | `React.ReactNode`  | ✅       | Konten yang akan ditampilkan di dalam dashboard   |
| `breadcrumbItems` | `BreadcrumbItem[]` | ❌       | Array item untuk breadcrumb navigation            |
| `title`           | `string`           | ❌       | Judul halaman yang ditampilkan di header          |
| `description`     | `string`           | ❌       | Deskripsi halaman yang ditampilkan di bawah title |

### BreadcrumbItem Type

```tsx
interface BreadcrumbItem {
  label: string; // Text yang ditampilkan
  href?: string; // URL link (optional)
  isCurrentPage?: boolean; // Apakah ini halaman saat ini
  icon?: LucideIcon; // Icon yang ditampilkan (hanya di item pertama)
}
```

## Icon di Breadcrumb

Icon hanya ditampilkan di item breadcrumb pertama (paling kiri) untuk menunjukkan konteks halaman utama. Icon menggunakan Lucide React icons.

```tsx
import { Home, Package, Settings } from "lucide-react";

<Dashboard
  breadcrumbItems={[
    { label: "Home", href: "/", icon: Home }, // Icon akan ditampilkan
    { label: "Products", href: "/products" }, // Tidak ada icon
    { label: "Edit", isCurrentPage: true }, // Tidak ada icon
  ]}
>
  {/* Konten */}
</Dashboard>;
```

## Contoh Lengkap

- `DashboardExample.tsx` - Contoh penggunaan dengan cards dan layout kompleks
- `DashboardWithIcons.tsx` - Berbagai contoh penggunaan icon di breadcrumb

## Font Inter

Font Inter sudah dikonfigurasi secara global untuk semua halaman melalui:

- Google Fonts import di `index.html`
- CSS utility class di `src/index.css`
- Applied ke body element secara otomatis
