import { Dashboard } from "@/components/layout";
import TableSupplier from "@/modules/master-data/supplier/components/supplier-table";


export default function Supplier() {
    const data = [
        {
            id: "1",
            name: "diding",
            phone: "0812345678"
        }
    ]
    return (
        <Dashboard>
            <TableSupplier data={data} loading={false} />
        </Dashboard>
    );
}