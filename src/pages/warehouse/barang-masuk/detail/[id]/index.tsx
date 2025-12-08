import React from "react";
import { useNavigate } from "@/routes";
import { useParams as useRRParams } from "react-router";
import { useBarangMasukById } from "@/modules/warehouse/barang-masuk/api/get-barang-masuk-id";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/back-button";
import { StatusPill } from "@/components/ui/data-display/status-pill";
import { formatRupiah } from "@/utils/format";
import { formatDateLong } from "@/utils/format-date";
import { Dashboard } from "@/components/layout";
import { Edit, Calendar, Package, MapPin, User, FileText, Truck, DollarSign } from "lucide-react";

const BarangMasukDetailPage: React.FC = () => {
    const params = (useRRParams() as unknown as { id?: string }) ?? {};
    const id = params?.id ?? "";
    const navigate = useNavigate();

    const { data, isLoading, isError } = useBarangMasukById({ id });
    const barangMasuk = data?.data;

    if (isLoading) {
        return (
            <Dashboard>
                <div className="flex flex-col gap-4">
                    <div className="rounded-xl shadow-sm p-6 bg-white">
                        <div className="flex justify-between items-start">
                            <div className="mb-6">
                                <BackButton />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="h-8 w-1/3 rounded bg-gray-100 animate-pulse" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="h-20 rounded-lg bg-gray-100 animate-pulse" />
                                <div className="h-20 rounded-lg bg-gray-100 animate-pulse" />
                                <div className="h-20 rounded-lg bg-gray-100 animate-pulse" />
                                <div className="h-20 rounded-lg bg-gray-100 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </Dashboard>
        );
    }

    if (isError || !barangMasuk) {
        return (
            <Dashboard>
                <div className="flex flex-col gap-4">
                    <div className="rounded-xl shadow-sm p-6 bg-white">
                        <div className="flex justify-between items-start">
                            <div className="mb-6">
                                <BackButton />
                            </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
                            Terjadi kesalahan saat memuat detail barang masuk.
                        </div>
                    </div>
                </div>
            </Dashboard>
        );
    }

    return (
        <Dashboard>
            <div className="flex flex-col gap-4">
                <div className="rounded-xl shadow-sm p-6 bg-white">
                    <div className="flex justify-between items-start">
                        <div className="mb-6">
                            <BackButton />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={"gradien"}
                                icon={<Edit />}
                                text="Edit Barang Masuk"
                                onClick={() =>
                                    navigate(`/warehouse/barang-masuk/update/${barangMasuk._id}` as Parameters<typeof navigate>[0])
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            Detail Barang Masuk
                        </h1>
                        <div className="flex flex-wrap items-center gap-2">
                            <StatusPill label={`Note: ${barangMasuk.note_number}`} color="blue" width="auto" />
                            <StatusPill label={`Tanggal: ${formatDateLong(barangMasuk.date)}`} color="green" width="auto" />
                            <StatusPill label={`Qty: ${barangMasuk.qty_in} ${barangMasuk.unit}`} color="purple" width="auto" />
                        </div>
                    </div>

                    {/* Basic Information Section */}
                    <div className="mt-8 bg-linear-to-br from-blue-50/50 to-purple-50/50 rounded-xl p-6 border border-blue-100/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Informasi Dasar</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem
                                label="Tanggal"
                                value={formatDateLong(barangMasuk.date)}
                                icon={<Calendar className="w-4 h-4" />}
                            />
                            <DetailItem
                                label="Note Number"
                                value={barangMasuk.note_number}
                                icon={<FileText className="w-4 h-4" />}
                            />
                            <DetailItem
                                label="Note Type"
                                value={barangMasuk.note_type?.name || "-"}
                                icon={<FileText className="w-4 h-4" />}
                            />
                            <DetailItem
                                label="Supplier"
                                value={barangMasuk.supplier?.name || "-"}
                                icon={<Truck className="w-4 h-4" />}
                            />
                        </div>
                    </div>

                    {/* Product Information Section */}
                    <div className="mt-6 bg-linear-to-br from-green-50/50 to-emerald-50/50 rounded-xl p-6 border border-green-100/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg">
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Informasi Produk</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem
                                label="Nama Produk"
                                value={barangMasuk.product?.product_name || "-"}
                                icon={<Package className="w-4 h-4" />}
                            />
                            <DetailItem
                                label="Kode Produk"
                                value={barangMasuk.product?.code || "-"}
                                icon={<Package className="w-4 h-4" />}
                            />
                            <DetailItem
                                label="Quantity In"
                                value={`${barangMasuk.qty_in} ${barangMasuk.unit}`}
                                icon={<Package className="w-4 h-4" />}
                            />
                            <DetailItem
                                label="Unit"
                                value={barangMasuk.unit}
                                icon={<Package className="w-4 h-4" />}
                            />
                            <DetailItem
                                label="HPP"
                                value={formatRupiah(barangMasuk.hpp)}
                                icon={<DollarSign className="w-4 h-4" />}
                            />
                        </div>
                    </div>

                    {/* Location & Additional Info Section */}
                    <div className="mt-6 bg-linear-to-br from-indigo-50/50 to-violet-50/50 rounded-xl p-6 border border-indigo-100/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-linear-to-br from-indigo-500 to-violet-600 rounded-lg">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Lokasi & Informasi Tambahan</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem
                                label="Storage Location"
                                value={barangMasuk.storage_location?.name || "-"}
                                icon={<MapPin className="w-4 h-4" />}
                            />
                            <DetailItem
                                label="Entered By"
                                value={barangMasuk.entered_by?.name || "-"}
                                icon={<User className="w-4 h-4" />}
                            />
                            <DetailItem
                                label="Additional Notes"
                                value={barangMasuk.additional_notes || "-"}
                                icon={<FileText className="w-4 h-4" />}
                                fullWidth
                            />
                        </div>
                    </div>

                    {/* Metadata Section */}
                    <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Sistem</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <DetailItem
                                label="Created At"
                                value={formatDateLong(barangMasuk.createdAt)}
                            />
                            <DetailItem
                                label="Updated At"
                                value={formatDateLong(barangMasuk.updatedAt)}
                            />
                            <DetailItem
                                label="ID"
                                value={barangMasuk._id}
                                fullWidth
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

interface DetailItemProps {
    label: string;
    value?: React.ReactNode;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, icon, fullWidth = false }) => {
    return (
        <div className={`flex flex-col rounded-lg border border-gray-100 p-4 bg-white ${fullWidth ? "md:col-span-2" : ""}`}>
            <div className="flex items-center gap-2 mb-2">
                {icon && <span className="text-gray-400">{icon}</span>}
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
            </div>
            <span className="text-base font-semibold text-gray-900">{value ?? "-"}</span>
        </div>
    );
};

export default BarangMasukDetailPage;

