import { useForm, Controller, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/forms/input";
import { InputNumber } from "@/components/ui/forms/input-number";
import { InputCurrency } from "@/components/ui/forms/input-currency";
import { Select } from "@/components/ui/forms/select-field";

import Textarea from "@/components/ui/forms/textarea";
import { barangKeluarCreateSchema, type BarangKeluarFormData, type BarangKeluar } from "../../types/main";
import { useEffect, useImperativeHandle, forwardRef, useMemo } from "react";
import { Package, MapPin, Info } from "lucide-react";
import { useNota } from "@/modules/master-data/nota/api/get-all-nota";
import { useCustomer } from "@/modules/master-data/customer/api/get-all-customer";
import { useProduct } from "@/modules/product/api/get-all-product";
import { useAuthStore } from "@/stores/auth-store";
import { DatePickerComponent } from "@/components/ui/forms/date-picker";
import CreateBarangKeluarButton from "../action/button-create-barang-keluar";
import UpdateBarangKeluarButton from "../action/button-update-barang-keluar";
import { parseDateString } from "@/utils/format-date";

type BarangKeluarFormProps = {
  mode?: "create" | "edit";
  initialData?: BarangKeluar;
  onSubmit?: (data: BarangKeluarFormData) => void;
  barangKeluarId?: string;
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

const BarangKeluarForm = forwardRef<UseFormReturn<BarangKeluarFormData>, BarangKeluarFormProps>(
  ({ mode = "create", initialData, onSubmit, barangKeluarId, onUpdateSuccess }, ref) => {
    const user = useAuthStore((state) => state.user);

    // Fetch data from APIs
    const { data: notaResponse, isLoading: isLoadingNota } = useNota();
    const { data: customerResponse, isLoading: isLoadingCustomer } = useCustomer();
    const { data: productResponse, isLoading: isLoadingProduct } = useProduct();

    // Transform data to options format
    const notaOptions = useMemo(() => {
      const notasData = notaResponse?.data || [];
      return notasData.map((nota) => ({
        label: nota.name,
        value: nota._id || nota.id,
      }));
    }, [notaResponse?.data]);

    const customerOptions = useMemo(() => {
      const customersData = customerResponse?.data || [];
      return customersData.map((customer) => ({
        label: customer.name,
        value: customer._id || customer.id,
      }));
    }, [customerResponse?.data]);

    const productOptions = useMemo(() => {
      const productsData = Array.isArray(productResponse?.data)
        ? productResponse.data
        : productResponse?.data?.products || [];
      return productsData.map((product) => ({
        label: product.product_name,
        value: product._id || product.id,
      }));
    }, [productResponse?.data]);

    // Watch product to auto-fill product_name_snapshot, hpp_snapshot, unit_snapshot
    const getProductDetails = (productId: string) => {
      const productsData = Array.isArray(productResponse?.data)
        ? productResponse.data
        : productResponse?.data?.products || [];
      const product = productsData.find((p) => (p._id || p.id) === productId);
      if (!product) return null;
      const hppValue = product.hpp_per_piece && typeof product.hpp_per_piece === 'object'
        ? parseFloat(product.hpp_per_piece.$numberDecimal || '0')
        : (product.hpp_per_piece as any) || 0;
      return {
        product_name_snapshot: product.product_name,
        hpp_snapshot: hppValue,
        unit_snapshot: product.unit || "",
      };
    };

    const getDefaultValues = (): Partial<BarangKeluarFormData> => {
      if (mode === "edit" && initialData) {
        const noteTypeId = typeof initialData.note_type_id === 'object' ? initialData.note_type_id?._id : initialData.note_type_id || "";
        const customerId = typeof initialData.customer_id === 'object' ? initialData.customer_id?._id : initialData.customer_id || "";
        const productId = typeof initialData.product_id === 'object' ? (initialData.product_id?._id || initialData.product_id?.id) : initialData.product_id || "";
        const handledById = typeof initialData.handled_by === 'object' ? initialData.handled_by?._id : initialData.handled_by || "";

        return {
          date: initialData.date ? parseDateString(initialData.date) : undefined,
          note_type_id: noteTypeId,
          customer_id: customerId,
          note_number: initialData.note_number || "",
          additional_info: initialData.additional_info || "",
          product_id: productId,
          product_name_snapshot: initialData.product_name_snapshot || "",
          hpp_snapshot: initialData.hpp_snapshot || 0,
          qty_out: initialData.qty_out || 0,
          unit_snapshot: initialData.unit_snapshot || "",
          handled_by: handledById || user?.userId || "",
          location: initialData.location || "",
          total_hpp: initialData.total_hpp || 0,
        };
      }
      return {
        handled_by: user?.userId || "",
      };
    };

    const form = useForm<BarangKeluarFormData>({
      resolver: zodResolver(barangKeluarCreateSchema),
      defaultValues: getDefaultValues(),
    });

    const {
      register,
      handleSubmit,
      control,
      watch,
      formState: { errors },
      setValue,
      reset,
    } = form;

    useImperativeHandle(ref, () => form, [form]);

    // Watch product_id to auto-fill product details
    const watchedProductId = watch("product_id");
    useEffect(() => {
      if (watchedProductId && mode === "create") {
        const productDetails = getProductDetails(watchedProductId);
        if (productDetails) {
          setValue("product_name_snapshot", productDetails.product_name_snapshot);
          setValue("hpp_snapshot", productDetails.hpp_snapshot);
          setValue("unit_snapshot", productDetails.unit_snapshot);
        }
      }
    }, [watchedProductId, setValue, mode]);

    // Watch qty_out and hpp_snapshot to calculate total_hpp
    const watchedQtyOut = watch("qty_out");
    const watchedHppSnapshot = watch("hpp_snapshot");
    useEffect(() => {
      if (watchedQtyOut && watchedHppSnapshot) {
        const total = watchedQtyOut * watchedHppSnapshot;
        setValue("total_hpp", total);
      }
    }, [watchedQtyOut, watchedHppSnapshot, setValue]);

    // Set handled_by from auth store
    useEffect(() => {
      if (user?.userId) {
        setValue("handled_by", user.userId);
      }
    }, [user, setValue]);

    // Reset form when initialData changes in edit mode
    useEffect(() => {
      if (initialData && mode === "edit") {
        const noteTypeId = typeof initialData.note_type_id === 'object' ? initialData.note_type_id?._id : initialData.note_type_id || "";
        const customerId = typeof initialData.customer_id === 'object' ? initialData.customer_id?._id : initialData.customer_id || "";
        const productId = typeof initialData.product_id === 'object' ? (initialData.product_id?._id || initialData.product_id?.id) : initialData.product_id || "";
        const handledById = typeof initialData.handled_by === 'object' ? initialData.handled_by?._id : initialData.handled_by || "";

        reset({
          date: initialData.date ? parseDateString(initialData.date) : undefined,
          note_type_id: noteTypeId,
          customer_id: customerId,
          note_number: initialData.note_number || "",
          additional_info: initialData.additional_info || "",
          product_id: productId,
          product_name_snapshot: initialData.product_name_snapshot || "",
          hpp_snapshot: initialData.hpp_snapshot || 0,
          qty_out: initialData.qty_out || 0,
          unit_snapshot: initialData.unit_snapshot || "",
          handled_by: handledById || user?.userId || "",
          location: initialData.location || "",
          total_hpp: initialData.total_hpp || 0,
        });
      }
    }, [initialData, mode, reset, user]);

    return (
      <form onSubmit={onSubmit ? handleSubmit(onSubmit) : (e) => e.preventDefault()} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-linear-to-br from-blue-500/25 to-purple-50/50 rounded-xl p-6 border border-blue-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Informasi Dasar</h3>
              <p className="text-sm text-gray-600">Detail informasi barang keluar</p>
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
              name="note_type_id"
              control={control}
              render={({ field }) => (
                <Select
                  label="Note Type"
                  required
                  datalist={notaOptions}
                  defValue={field.value || undefined}
                  onChange={field.onChange}
                  errorMsg={errors.note_type_id?.message}
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

            {/* Customer */}
            <Controller
              name="customer_id"
              control={control}
              render={({ field }) => (
                <Select
                  label="Customer"
                  required
                  datalist={customerOptions}
                  defValue={field.value || undefined}
                  onChange={field.onChange}
                  errorMsg={errors.customer_id?.message}
                  placeholder="Pilih Customer"
                  disabled={isLoadingCustomer}
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
              <p className="text-sm text-gray-600">Detail produk yang keluar</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product */}
            <Controller
              name="product_id"
              control={control}
              render={({ field }) => (
                <Select
                  label="Product"
                  required
                  datalist={productOptions}
                  defValue={field.value || undefined}
                  onChange={field.onChange}
                  errorMsg={errors.product_id?.message}
                  placeholder="Pilih Product"
                  disabled={isLoadingProduct}
                />
              )}
            />

            {/* Product Name Snapshot */}
            <Input
              label="Product Name Snapshot"
              required
              disabled={mode === "create"}
              error={errors.product_name_snapshot?.message}
              {...register("product_name_snapshot")}
            />

            {/* Qty Out */}
            <Controller
              name="qty_out"
              control={control}
              render={({ field }) => (
                <InputNumber
                  label="Qty Out"
                  required
                  min={1}
                  error={errors.qty_out?.message}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                />
              )}
            />

            {/* Unit Snapshot */}
            <Controller
              name="unit_snapshot"
              control={control}
              render={({ field }) => (
                <Select
                  label="Unit Snapshot"
                  required
                  datalist={unitOptions}
                  defValue={field.value || undefined}
                  onChange={field.onChange}
                  errorMsg={errors.unit_snapshot?.message}
                  placeholder="Pilih Unit"
                  disabled={mode === "create"}
                />
              )}
            />

            {/* HPP Snapshot */}
            <Controller
              name="hpp_snapshot"
              control={control}
              render={({ field }) => (
                <InputCurrency
                  label="HPP Snapshot"
                  required
                  error={errors.hpp_snapshot?.message}
                  value={field.value}
                  onChange={(value) => field.onChange(value || 0)}
                  disabled={mode === "create"}
                />
              )}
            />

            {/* Total HPP */}
            <Controller
              name="total_hpp"
              control={control}
              render={({ field }) => (
                <InputCurrency
                  label="Total HPP"
                  required
                  error={errors.total_hpp?.message}
                  value={field.value}
                  onChange={(value) => field.onChange(value || 0)}
                  disabled
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
              <p className="text-sm text-gray-600">Informasi lokasi dan catatan tambahan</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <Input
              label="Location"
              required
              error={errors.location?.message}
              {...register("location")}
            />

            {/* Handled By (hidden, auto-filled) */}
            <Input
              label="Handled By"
              required
              disabled
              value={user?.fullname || ""}
              {...register("handled_by")}
            />
          </div>

          {/* Additional Info */}
          <div className="mt-6">
            <Controller
              name="additional_info"
              control={control}
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  isShowCharCount
                  maxLength={500}
                  label="Additional Info"
                  placeholder="Input some text"
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          {mode === "edit" && barangKeluarId ? (
            <UpdateBarangKeluarButton form={form} id={barangKeluarId} onSuccess={onUpdateSuccess} />
          ) : (
            <CreateBarangKeluarButton form={form} />
          )}
        </div>
      </form>
    );
  }
);

BarangKeluarForm.displayName = "BarangKeluarForm";

export default BarangKeluarForm;

