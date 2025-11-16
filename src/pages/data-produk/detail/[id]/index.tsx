import React from "react";
import { useNavigate } from "@/routes";
import { useParams as useRRParams } from "react-router";
import { useProductById } from "@/modules/product/api/get-product-by-id";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/back-button";
import { StatusPill } from "@/components/ui/data-display/status-pill";
import { formatRupiah } from "@/utils/format";
import { Dashboard } from "@/components/layout";
import { Edit } from "lucide-react";

const ProductDetailPage: React.FC = () => {
    const params = (useRRParams() as unknown as { id?: string }) ?? {};
    const id = params?.id ?? "";
    const navigate = useNavigate();

    const { data, isLoading, isError } = useProductById({ id });
    const product = data?.data;

    if (isLoading) {
        return (
            <Dashboard>
                <div className="flex flex-col gap-4">
                    <div className="rounded-xl shadow-sm p-6 bg-white">
                        <div className="flex justify-between items-start ">
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

    if (isError || !product) {
        return (
            <Dashboard>
                <div className="flex flex-col gap-4">
                    <div className="rounded-xl shadow-sm p-6 bg-white">
                        <div className="flex justify-between items-start ">
                            <div className="mb-6">
                                <BackButton />
                            </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
                            Terjadi kesalahan saat memuat detail produk.
                        </div>
                    </div>
                </div>
            </Dashboard>
        );
    }

    const inStock = (product?.total_stock ?? 0) > 0;

    return (
        <Dashboard>
            <div className="flex flex-col gap-4">
                <div className="rounded-xl shadow-sm p-6 bg-white">
                    <div className="flex justify-between items-start ">
                        <div className="mb-6">
                            <BackButton />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={"gradien"}
                                icon={<Edit />}
                                text="Edit Produk"
                                onClick={() =>
                                    navigate(`/data-produk/edit/${product._id}` as Parameters<typeof navigate>[0])
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            {product.product_name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2">
                            <StatusPill label={inStock ? "Tersedia" : "Habis"} color={inStock ? "green" : "red"} />
                            <StatusPill label={`Kode: ${product.code}`} color="blue" width="auto" />
                            <StatusPill label={`Kategori: ${product.category}`} color="purple" width="auto" />
                            <StatusPill label={`Variasi: ${product.variation}`} color="orange" width="auto" />
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DetailItem label="Nama Produk" value={product.product_name} />
                        <DetailItem label="Kode" value={product.code} />
                        <DetailItem label="Kategori" value={product.category} />
                        <DetailItem label="Variasi" value={product.variation} />
                        <DetailItem label="Satuan" value={product.unit} />
                        <DetailItem label="Lokasi" value={product.location} />
                        <DetailItem label="Total Stok" value={product.total_stock} />
                        <DetailItem label="Stok Masuk" value={product.stock_in} />
                        <DetailItem label="Stok Keluar" value={product.stock_out} />
                        <DetailItem label="HPP per Piece" value={formatRupiah(product.hpp_per_piece)} />
                        <DetailItem label="ID" value={product._id} />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

const DetailItem: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => {
    return (
        <div className="flex flex-col rounded-lg border border-gray-100 p-4">
            <span className="text-xs text-gray-500">{label}</span>
            <span className="text-base font-semibold text-black">{value ?? "-"}</span>
        </div>
    );
};

export default ProductDetailPage;


