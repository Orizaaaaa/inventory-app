import { Dashboard } from "@/components/layout"
import { HomeIcon } from "lucide-react";


export default function Home() {
    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Dashboard", isCurrentPage: true, icon: HomeIcon }
            ]}
            title="Welcome to Inventory App"
            description="Manage your inventory efficiently with our modern dashboard"
        >
            <h1>dshboard</h1>
        </Dashboard>
    );
}