import { Dashboard } from "@/components/layout";
import TableCategory from "@/modules/master-data/category/components/category-table";

export default function Category() {
    const data = [
        {
            id: "1",
            name: "puding pak hambali ",
        }
    ]
    return (
        <Dashboard>
            <TableCategory data={data} loading={false} />
        </Dashboard>
    );
}