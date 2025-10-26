import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardProps {
    children: React.ReactNode;
    breadcrumbItems?: {
        label: string;
        href?: string;
        isCurrentPage?: boolean;
        icon?: LucideIcon;
    }[];
    title?: string;
    description?: string;
}

export function Dashboard({ 
    children, 
    breadcrumbItems = [],
    title,
    description 
}: DashboardProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-10 bg-white mx-4 mt-3 mb-1 rounded-lg header-card-shadow border-0">
                    <div className="flex items-center gap-2 px-3">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        {breadcrumbItems.length > 0 && (
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbItems.map((item, index) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <React.Fragment key={index}>
                                                {index > 0 && <BreadcrumbSeparator />}
                                                <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                                                    {item.isCurrentPage ? (
                                                        <BreadcrumbPage className="flex items-center gap-2">
                                                            {index === 0 && IconComponent && <IconComponent className="h-4 w-4" />}
                                                            {item.label}
                                                        </BreadcrumbPage>
                                                    ) : (
                                                        <BreadcrumbLink href={item.href || "#"} className="flex items-center gap-2">
                                                            {index === 0 && IconComponent && <IconComponent className="h-4 w-4" />}
                                                            {item.label}
                                                        </BreadcrumbLink>
                                                    )}
                                                </BreadcrumbItem>
                                            </React.Fragment>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        )}
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-1 bg-gray-50/30">
                    {(title || description) && (
                        <div className="space-y-2">
                            {title && (
                                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                            )}
                            {description && (
                                <p className="text-muted-foreground">{description}</p>
                            )}
                        </div>
                    )}
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
