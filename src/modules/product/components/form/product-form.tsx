import { useForm, Controller, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/forms/input";
import { InputNumber } from "@/components/ui/forms/input-number";
import { InputCurrency } from "@/components/ui/forms/input-currency";
import { Select } from "@/components/ui/forms/select-field";
import { productCreateSchema, type ProductFormData, type Product } from "../../types/main";
import { useEffect, useImperativeHandle, forwardRef } from "react";

type ProductFormProps = {
  mode?: "create" | "edit";
  initialData?: Product;
  onSubmit?: (data: ProductFormData) => void;
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

const categoryOptions = [
  { label: "Minuman", value: "Minuman" },
  { label: "Makanan", value: "Makanan" },
  { label: "Snack", value: "Snack" },
  { label: "Bahan Baku", value: "Bahan Baku" },
  { label: "Lainnya", value: "Lainnya" },
];

const ProductForm = forwardRef<UseFormReturn<ProductFormData>, ProductFormProps>(
  ({ mode = "create", initialData, onSubmit }, ref) => {
    const form = useForm<ProductFormData>({
      resolver: zodResolver(productCreateSchema),
      defaultValues: initialData
        ? {
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
          }
        : {
            hpp_per_piece: 0,
            product_name: "",
            category: "",
            code: "",
            name: "",
            variation: "",
            unit: "",
            stock_in: 0,
            stock_out: 0,
            total_stock: 0,
            location: "",
          },
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
      <form onSubmit={onSubmit ? handleSubmit(onSubmit) : (e) => e.preventDefault()} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Product Name */}
          <Input
            label="Product Name"
            required
            error={errors.product_name?.message}
            {...register("product_name")}
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
              />
            )}
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
          <InputNumber
            label="Total Stock"
            required
            disabled
            value={watch("total_stock")}
          />

          {/* Location */}
          <Input
            label="Location"
            required
            error={errors.location?.message}
            {...register("location")}
            className="md:col-span-2"
          />
        </div>
      </form>
    );
  }
);

ProductForm.displayName = "ProductForm";

export default ProductForm;
