import { Dashboard } from "@/components/layout";
import BackButton from "@/components/ui/back-button";
import ProductForm from "@/modules/product/components/form/product-form";
import { useProductById } from "@/modules/product/api/get-product-by-id";
import { useNavigate } from "@/routes";
import { useMemo } from "react";
import { useCurrentRoute } from "@/hooks/use-current-route";

export default function EditProductPage() {
  const navigate = useNavigate();
  const pathname = useCurrentRoute();
  
  // Get id from route parameter (from pathname)
  const id = useMemo(() => {
    const match = pathname.match(/\/data-produk\/edit\/([^/]+)/);
    return match ? match[1] : "";
  }, [pathname]);

  const { data: productResponse, isLoading, isError } = useProductById({
    id,
    queryConfig: {
      enabled: !!id,
    },
  });

  const product = productResponse?.data;

  const handleUpdateSuccess = () => {
    navigate("/data-produk" as Parameters<typeof navigate>[0]);
  };

  if (!id) {
    return (
      <Dashboard>
        <div className="flex flex-col gap-4">
          <div className="rounded-xl shadow-sm p-6 bg-white">
            <div className="flex justify-between items-start">
              <div className="mb-6">
                <BackButton />
              </div>
            </div>
            <div className="text-center py-8">
              <p className="text-red-500">ID produk tidak ditemukan</p>
            </div>
          </div>
        </div>
      </Dashboard>
    );
  }

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
            <div className="text-center py-8">
              <p>Memuat data produk...</p>
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
            <div className="flex justify-between items-start">
              <div className="mb-6">
                <BackButton />
              </div>
            </div>
            <div className="text-center py-8">
              <p className="text-red-500">Gagal memuat data produk</p>
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
          </div>

          <ProductForm
            mode="edit"
            initialData={product}
            productId={id}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </div>
      </div>
    </Dashboard>
  );
}

