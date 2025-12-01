import { useForm, Controller, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/forms/input";
import { InputNumber } from "@/components/ui/forms/input-number";
import { InputCurrency } from "@/components/ui/forms/input-currency";
import { Select } from "@/components/ui/forms/select-field";
import { productCreateSchema, type ProductFormData, type Product } from "../../types/main";
import { useEffect, useImperativeHandle, forwardRef, useMemo } from "react";
import CreateProductButton from "../action/create-product-button";
import UpdateProductButton from "../action/update-product-button";
import { Package, DollarSign, MapPin, BarChart3 } from "lucide-react";
import { useCategory } from "@/modules/master-data/category/api/get-all-category";
import { useLocation } from "@/modules/master-data/location/api/get-all-location";

type ProductFormProps = {
  mode?: "create" | "edit";
  initialData?: Product;
  onSubmit?: (data: ProductFormData) => void;
  productId?: string;
  onUpdateSuccess?: () => void;
};

const unitOptions = [
  { label: "pcs", value: "pcs" },
  { label: "kg", value: "kg" },
  { label: "gr", value: "gr" },
  { label: "liter", value: "liter" },
  { label: "ml", value: "ml" },
  { label: "box", value: "box" },
  { label: "pack", value: "pack" },
];


const ProductForm = forwardRef<UseFormReturn<ProductFormData>, ProductFormProps>(
  ({ mode = "create", initialData, onSubmit, productId, onUpdateSuccess }, ref) => {
    // Fetch category data from API
    const { data: categoryResponse, isLoading: isLoadingCategory } = useCategory();
    const categories = categoryResponse?.data || [];
    
    // Fetch location data from API
    const { data: locationResponse, isLoading: isLoadingLocation } = useLocation();
    const locations = locationResponse?.data || [];

    // Transform category data to options format
    const categoryOptions = useMemo(() => {
      return categories.map((category) => ({
        label: category.name,
        value: category.name,
      }));
    }, [categories]);

    // Transform location data to options format
    const locationOptions = useMemo(() => {
      return locations.map((location) => ({
        label: location.name,
        value: location.name,
      }));
    }, [locations]);

    const getDefaultValues = (): Partial<ProductFormData> => {
      if (mode === "edit" && initialData) {
        return {
          hpp_per_piece: initialData.hpp_per_piece,
          product_name: initialData.product_name,
          category: initialData.category,
          code: initialData.code,
          name: initialData.name,
          variation: initialData.variation,
          unit: initialData.unit,
          stock_in: initialData.stock_in,
          stock_out: initialData.stock_out,
          total_stock: initialData.total_stock,
          location: initialData.location,
        };
      }
      return {};
    };

    const form = useForm<ProductFormData>({
      resolver: zodResolver(productCreateSchema),
      defaultValues: getDefaultValues(),
    });

    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
      reset,
      watch,
      setValue,
    } = form;

    useImperativeHandle(ref, () => form, [form]);

    const stockIn = watch("stock_in");
    const stockOut = watch("stock_out");

    // Auto calculate total_stock
    useEffect(() => {
      const total = (stockIn || 0) - (stockOut || 0);
      if (total >= 0) {
        setValue("total_stock", total, { shouldValidate: true });
      }
    }, [stockIn, stockOut, setValue]);

    useEffect(() => {
      if (initialData && mode === "edit") {
        reset({
          hpp_per_piece: initialData.hpp_per_piece,
          product_name: initialData.product_name,
          category: initialData.category,
          code: initialData.code,
          name: initialData.name,
          variation: initialData.variation,
          unit: initialData.unit,
          stock_in: initialData.stock_in,
          stock_out: initialData.stock_out,
          total_stock: initialData.total_stock,
          location: initialData.location,
        });
      }
    }, [initialData, mode, reset]);

    return (
      <form onSubmit={onSubmit ? handleSubmit(onSubmit) : (e) => e.preventDefault()} className="space-y-6">
        {/* Product Information Section */}
        <div className="bg-linear-to-br from-blue-500/25 to-purple-50/50 rounded-xl p-6 border border-blue-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Informasi Produk</h3>
              <p className="text-sm text-gray-600">Detail informasi produk yang akan ditambahkan</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <Input
              label="Product Name"
              required
              error={errors.product_name?.message}
              {...register("product_name")}
            />

            {/* Code */}
            <Input
              label="Code"
              required
              error={errors.code?.message}
              {...register("code")}
            />

            {/* Name */}
            <Input
              label="Name"
              required
              error={errors.name?.message}
              {...register("name")}
            />

            {/* Variation */}
            <Input
              label="Variation"
              required
              error={errors.variation?.message}
              {...register("variation")}
            />

            {/* Category */}
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  label="Category"
                  required
                  datalist={categoryOptions}
                  defValue={field.value || undefined}
                  onChange={field.onChange}
                  errorMsg={errors.category?.message}
                  placeholder="Pilih Category"
                  disabled={isLoadingCategory}
                />
              )}
            />

            {/* Unit */}
            <Controller
              name="unit"
              control={control}
              render={({ field }) => (
                <Select
                  label="Unit"
                  required
                  datalist={unitOptions}
                  defValue={field.value || undefined}
                  onChange={field.onChange}
                  errorMsg={errors.unit?.message}
                  placeholder="Pilih Unit"
                />
              )}
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-linear-to-br from-green-50/50 to-emerald-50/50 rounded-xl p-6 border border-green-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Harga & Biaya</h3>
              <p className="text-sm text-gray-600">Informasi harga per unit produk</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* HPP Per Piece */}
            <Controller
              name="hpp_per_piece"
              control={control}
              render={({ field }) => (
                <InputCurrency
                  label="HPP Per Piece"
                  required
                  error={errors.hpp_per_piece?.message}
                  value={field.value}
                  onChange={(value) => field.onChange(value || 0)}
                />
              )}
            />
          </div>
        </div>

        {/* Stock Management Section */}
        <div className="bg-linear-to-br from-orange-50/50 to-amber-50/50 rounded-xl p-6 border border-orange-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-linear-to-br from-orange-500 to-amber-600 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Manajemen Stok</h3>
              <p className="text-sm text-gray-600">Kelola stok masuk, keluar, dan total stok</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stock In */}
            <Controller
              name="stock_in"
              control={control}
              render={({ field }) => (
                <InputNumber
                  label="Stock In"
                  required
                  min={0}
                  error={errors.stock_in?.message}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                />
              )}
            />

            {/* Stock Out */}
            <Controller
              name="stock_out"
              control={control}
              render={({ field }) => (
                <InputNumber
                  label="Stock Out"
                  required
                  min={0}
                  error={errors.stock_out?.message}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                />
              )}
            />

            {/* Total Stock (auto calculated, read-only) */}
            <div className="relative">
              <InputNumber
                label="Total Stock"
                required
                disabled
                value={watch("total_stock")}
              />
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Auto
              </div>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-linear-to-br from-indigo-50/50 to-violet-50/50 rounded-xl p-6 border border-indigo-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-linear-to-br from-indigo-500 to-violet-600 rounded-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Lokasi Penyimpanan</h3>
              <p className="text-sm text-gray-600">Tentukan lokasi penyimpanan produk</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Select
                  label="Location"
                  required
                  datalist={locationOptions}
                  defValue={field.value || undefined}
                  onChange={field.onChange}
                  errorMsg={errors.location?.message}
                  placeholder="Pilih Location"
                  disabled={isLoadingLocation}
                />
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          {mode === "edit" && productId ? (
            <UpdateProductButton form={form} id={productId} onSuccess={onUpdateSuccess} />
          ) : (
            <CreateProductButton form={form} />
          )}
        </div>
      </form>
    );
  }
);

ProductForm.displayName = "ProductForm";

export default ProductForm;
