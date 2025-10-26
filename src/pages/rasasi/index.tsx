import { Dashboard } from "@/components/layout"
import { Home } from "lucide-react"

export default function Page() {
    return (
        <Dashboard
            breadcrumbItems={[
                { label: "Building Your Application", href: "#", icon: Home },
                { label: "Data Fetching", isCurrentPage: true }
            ]}
        >
            <h1>halo</h1>
        </Dashboard>
    )
}
