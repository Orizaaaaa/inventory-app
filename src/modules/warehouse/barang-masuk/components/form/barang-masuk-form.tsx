import { useForm, Controller, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/forms/input";
import { InputNumber } from "@/components/ui/forms/input-number";
import { InputCurrency } from "@/components/ui/forms/input-currency";
import { Select } from "@/components/ui/forms/select-field";

import Textarea from "@/components/ui/forms/textarea";
import { barangMasukCreateSchema, type BarangMasukFormData, type BarangMasukCreate } from "../../types/main";
import { useEffect, forwardRef, useMemo } from "react";
import { Package, MapPin } from "lucide-react";
import { useNota } from "@/modules/master-data/nota/api/get-all-nota";
import { useSupplier } from "@/modules/master-data/supplier/api/get-all-supplier";
import { useLocation } from "@/modules/master-data/location/api/get-all-location";
import { useProduct } from "@/modules/product/api/get-all-product";
import { useAuthStore } from "@/stores/auth-store";
import { DatePickerComponent } from "@/components/ui/forms/date-picker";
import CreateProductMasukButton from "../action/button-create-barang-masuk";

type BarangMasukFormProps = {
  onSubmit?: (data: BarangMasukCreate) => void;
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

const BarangMasukForm = forwardRef<UseFormReturn<BarangMasukFormData>, BarangMasukFormProps>(
  () => {
    const user = useAuthStore((state) => state.user);

    // Fetch data from APIs
    const { data: notaResponse, isLoading: isLoadingNota } = useNota();
    const { data: supplierResponse, isLoading: isLoadingSupplier } = useSupplier();
    const { data: locationResponse, isLoading: isLoadingLocation } = useLocation();
    const { data: productResponse, isLoading: isLoadingProduct } = useProduct();
    // Transform data to options format
    const notaOptions = useMemo(() => {
      const notasData = notaResponse?.data || [];
      return notasData.map((nota) => ({
        label: nota.name,
        value: nota._id || nota.id,
      }));
    }, [notaResponse?.data]);

    const supplierOptions = useMemo(() => {
      const suppliersData = supplierResponse?.data || [];
      return suppliersData.map((supplier) => ({
        label: supplier.name,
        value: supplier._id || supplier.id,
      }));
    }, [supplierResponse?.data]);

    const locationOptions = useMemo(() => {
      const locationsData = locationResponse?.data || [];
      return locationsData.map((location) => ({
        label: location.name,
        value: location._id || location.id,
      }));
    }, [locationResponse?.data]);

    const productOptions = useMemo(() => {
      const productsData = productResponse?.data || [];
      return productsData.map((product) => ({
        label: product.product_name,
        value: product._id || product.id,
      }));
    }, [productResponse?.data]);

    const form = useForm<BarangMasukFormData>({
      resolver: zodResolver(barangMasukCreateSchema),
      defaultValues: {
        entered_by: user?.userId || "",
      },
    });

    const {
      register,
      control,
      formState: { errors },
      setValue,
    } = form;


    // Set entered_by from auth store
    useEffect(() => {
      if (user?.userId) {
        setValue("entered_by", user.userId);
      }
    }, [user, setValue]);
    return (
      <form className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-linear-to-br from-blue-500/25 to-purple-50/50 rounded-xl p-6 border border-blue-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">

            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Informasi Dasar</h3>
              <p className="text-sm text-gray-600">Detail informasi barang masuk</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePickerComponent
                  label="Date"
                  required
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  error={errors.date?.message}
                  dateFormat="dd/MM/yyyy"
                />
              )}
            />

            {/* Note Type */}
            <Controller
              name="note_type"
              control={control}
              render={({ field }) => (
                <Select
                  label="Note Type"
                  required
                  datalist={notaOptions}
                  defValue={field.value || undefined}
                  onChange={field.onChange}
                  errorMsg={errors.note_type?.message}
                  placeholder="Pilih Note Type"
                  disabled={isLoadingNota}
                />
              )}
            />

            {/* Note Number */}
            <Input
              label="Note Number"
              required
              error={errors.note_number?.message}
              {...register("note_number")}
            />

            {/* Supplier */}
            <Controller
              name="supplier"
              control={control}
              render={({ field }) => (
                <Select
                  label="Supplier"
                  required
                  datalist={supplierOptions}
                  defValue={field.value || undefined}
                  onChange={field.onChange}
                  errorMsg={errors.supplier?.message}
                  placeholder="Pilih Supplier"
                  disabled={isLoadingSupplier}
                />
              )}
            />
          </div>
        </div>

        {/* Product Information Section */}
        <div className="bg-linear-to-br from-green-50/50 to-emerald-50/50 rounded-xl p-6 border border-green-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Informasi Produk</h3>
              <p className="text-sm text-gray-600">Detail produk yang masuk</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product */}
            <Controller
              name="product"
              control={control}
              render={({ field }) => (
                <Select
                  label="Product"
                  required
                  datalist={productOptions}
                  defValue={field.value || undefined}
                  onChange={field.onChange}
                  errorMsg={errors.product?.message}
                  placeholder="Pilih Product"
                  disabled={isLoadingProduct}
                />
              )}
            />

            {/* Qty In */}
            <Controller
              name="qty_in"
              control={control}
              render={({ field }) => (
                <InputNumber
                  label="Qty In"
                  required
                  min={1}
                  error={errors.qty_in?.message}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
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

            {/* HPP */}
            <Controller
              name="hpp"
              control={control}
              render={({ field }) => (
                <InputCurrency
                  label="HPP"
                  required
                  error={errors.hpp?.message}
                  value={field.value}
                  onChange={(value) => field.onChange(value || 0)}
                />
              )}
            />
          </div>
        </div>

        {/* Location & Additional Info Section */}
        <div className="bg-linear-to-br from-indigo-50/50 to-violet-50/50 rounded-xl p-6 border border-indigo-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-linear-to-br from-indigo-500 to-violet-600 rounded-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Lokasi & Catatan</h3>
              <p className="text-sm text-gray-600">Informasi lokasi penyimpanan dan catatan tambahan</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Storage Location */}
            <Controller
              name="storage_location"
              control={control}
              render={({ field }) => (
                <Select
                  label="Storage Location"
                  required
                  datalist={locationOptions}
                  defValue={field.value || undefined}
                  onChange={field.onChange}
                  errorMsg={errors.storage_location?.message}
                  placeholder="Pilih Storage Location"
                  disabled={isLoadingLocation}
                />
              )}
            />

            {/* Entered By (hidden, auto-filled) */}
            <Input
              label="Entered By"
              required
              disabled
              value={user?.fullname || ""}
              {...register("entered_by")}
            />
          </div>

          {/* Additional Notes */}
          <div className="mt-6">
            <Controller
              name="additional_notes"
              control={control}
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  isShowCharCount
                  maxLength={500}
                  label="Additional Notes"
                  placeholder="Input some text"
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <CreateProductMasukButton form={form} />
        </div>
      </form>
    );
  }
);

export default BarangMasukForm;

