import { Dashboard } from "@/components/layout"
import { HomeIcon } from "lucide-react";


export default function Home() {
    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Dashboard", isCurrentPage: true, icon: HomeIcon }
            ]}
        >
            <section className="space-y-4 shadow-xl p-6 min-h-screen rounded-xl">
                <h1>dshboard</h1>
            </section>

        </Dashboard>
    );
}