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
import { useModalStore } from '@/hooks/use-modal-store';
import { useModalConfirmStore } from '@/hooks/use-modal-confirm-store';
import ModalFailed from '../ui/modals/modal-failed';
import ModalSuccess from '../ui/modals/modal-success';
import ModalConfirm from '../ui/modals/modal-confirm';
import ModalDelete from '../ui/modals/modal-delete';
import { useModalConfirm } from '@/hooks/use-modal-confirm';

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
    const modalDelete = useModalConfirm();
    const modalSuccess = useModalStore("modalSuccess");
    const modalFailed = useModalStore("modalFailed");
    const modalSubmit = useModalConfirmStore("modalSubmit");
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='bg-gray-100 overflow-x-hidden'>
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
                <div className="flex flex-1 flex-col gap-4 p-4 pt-1">
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
            <ModalFailed
                visible={modalFailed.visible}
                message={modalFailed.message}
                setOpen={modalFailed.hideModal}
            />
            <ModalSuccess
                visible={modalSuccess.visible}
                message={modalSuccess.message}
                onClose={modalSuccess.hideModal}
            />
            <ModalConfirm
                visible={modalSubmit.visible}
                loading={modalSubmit.loading}
                heading={modalSubmit.options.heading}
                message={modalSubmit.options.message}
                btnText={modalSubmit.options.btnText}
                onSubmit={modalSubmit.onConfirm}
                onCancel={modalSubmit.options.onCancel}
            />

            <ModalDelete visible={modalDelete.visible}
                loading={modalDelete.loading} heading={modalDelete.options.heading}
                message={modalDelete.options.message} btnText={modalDelete.options.btnText}
                onSubmit={modalDelete.onConfirm} onCancel={modalDelete.options.onCancel} />

        </SidebarProvider>
    );
}
