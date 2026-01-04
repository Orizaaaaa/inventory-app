import { useForm, Controller, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/forms/input";
import { InputCurrency } from "@/components/ui/forms/input-currency";
import { PreOrderSchema, type PreOrderFormData } from "../../schema";
import { useEffect, useImperativeHandle, forwardRef, useMemo } from "react";
import CreatePreOrderButton from "../action/create-pre-order-button";
import UpdatePreOrderButton from "../action/update-pre-order-button";
import type { PreOrderType } from "../../types/type";
import SelectDropdown from "@/components/ui/select/select-dropdown";
import { ShoppingCart, User, Calendar, DollarSign } from "lucide-react";
import { DatePickerComponent } from "@/components/ui/forms/date-picker";
import { parseDateString } from "@/utils/format-date";

const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Processing", value: "processing" },
    { label: "Ready", value: "ready" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
];

type PreOrderFormProps = {
    mode?: "create" | "edit";
    initialData?: PreOrderType;
    onSubmit?: (data: PreOrderFormData) => void;
    preOrderId?: string;
    onUpdateSuccess?: () => void;
};


const PreOrderForm = forwardRef<UseFormReturn<PreOrderFormData>, PreOrderFormProps>(
    ({ mode = "create", initialData, onSubmit, preOrderId, onUpdateSuccess }, ref) => {

        const getDefaultValues = (): Partial<PreOrderFormData> => {
            if (mode === "edit" && initialData) {
                return {
                    orderNumber: initialData.orderNumber || "",
                    customerName: initialData.customerName || "",
                    customerEmail: initialData.customerEmail || "",
                    customerPhone: initialData.customerPhone || "",
                    orderDate: initialData.orderDate ? parseDateString(initialData.orderDate) : new Date(),
                    deliveryDate: initialData.deliveryDate ? parseDateString(initialData.deliveryDate) : undefined,
                    status: initialData.status || "pending",
                    totalAmount: initialData.totalAmount || 0,
                    notes: initialData.notes || "",
                };
            }
            return {
                orderNumber: "",
                customerName: "",
                customerEmail: "",
                customerPhone: "",
                orderDate: new Date(),
                deliveryDate: undefined,
                status: "pending",
                totalAmount: 0,
                notes: "",
            };
        };

        const form = useForm<PreOrderFormData>({
            resolver: zodResolver(PreOrderSchema),
            defaultValues: getDefaultValues(),
            mode: "onChange",
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

        useEffect(() => {
            if (initialData && mode === "edit") {
                reset({
                    orderNumber: initialData.orderNumber || "",
                    customerName: initialData.customerName || "",
                    customerEmail: initialData.customerEmail || "",
                    customerPhone: initialData.customerPhone || "",
                    orderDate: initialData.orderDate ? parseDateString(initialData.orderDate) : new Date(),
                    deliveryDate: initialData.deliveryDate ? parseDateString(initialData.deliveryDate) : undefined,
                    status: initialData.status || "pending",
                    totalAmount: initialData.totalAmount || 0,
                    notes: initialData.notes || "",
                });
            }
        }, [initialData, mode, reset]);

        const watchedValues = watch();

        return (
            <form onSubmit={onSubmit ? handleSubmit(onSubmit) : (e) => e.preventDefault()} className="space-y-6">
                {/* Order Information Section */}
                <div className="bg-linear-to-br from-yellow-500/25 to-yellow-50/50 rounded-xl p-6 border border-yellow-100/50">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-[linear-gradient(90deg,#ffb300,#ffdd32)] rounded-lg">
                            <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Informasi Pre-Order</h3>
                            <p className="text-sm text-gray-600">Detail informasi pre-order</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Order Number */}
                        <Input
                            label="Order Number"
                            required
                            error={errors.orderNumber?.message}
                            {...register("orderNumber")}
                            placeholder="Input order number"
                        />

                        {/* Status */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Status <sup className="text-red-500">*</sup>
                            </label>
                            <SelectDropdown
                                options={statusOptions}
                                value={watchedValues.status}
                                onChange={(value) => setValue("status", value, { shouldValidate: true })}
                                placeholder="Select status"
                                className="w-full"
                                minWidth={200}
                                maxWidth={500}
                            />
                            {errors.status && (
                                <p className="text-sm text-red-500">{errors.status.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Customer Information Section */}
                <div className="bg-linear-to-br from-blue-50/50 to-cyan-50/50 rounded-xl p-6 border border-blue-100/50">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-linear-to-br from-blue-500 to-cyan-600 rounded-lg">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Informasi Pelanggan</h3>
                            <p className="text-sm text-gray-600">Detail informasi pelanggan</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Customer Name */}
                        <Input
                            label="Customer Name"
                            required
                            error={errors.customerName?.message}
                            {...register("customerName")}
                            placeholder="Input customer name"
                        />

                        {/* Customer Email */}
                        <Input
                            label="Customer Email"
                            type="email"
                            error={errors.customerEmail?.message}
                            {...register("customerEmail")}
                            placeholder="Input customer email"
                        />

                        {/* Customer Phone */}
                        <Input
                            label="Customer Phone"
                            error={errors.customerPhone?.message}
                            {...register("customerPhone")}
                            placeholder="Input customer phone"
                        />
                    </div>
                </div>

                {/* Date Information Section */}
                <div className="bg-linear-to-br from-green-50/50 to-emerald-50/50 rounded-xl p-6 border border-green-100/50">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Tanggal Order</h3>
                            <p className="text-sm text-gray-600">Informasi tanggal order dan pengiriman</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Order Date */}
                        <Controller
                            name="orderDate"
                            control={control}
                            render={({ field }) => (
                                <DatePickerComponent
                                    label="Order Date"
                                    required
                                    value={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    error={errors.orderDate?.message}
                                    dateFormat="dd/MM/yyyy"
                                />
                            )}
                        />

                        {/* Delivery Date */}
                        <Controller
                            name="deliveryDate"
                            control={control}
                            render={({ field }) => (
                                <DatePickerComponent
                                    label="Delivery Date"
                                    value={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    error={errors.deliveryDate?.message}
                                    dateFormat="dd/MM/yyyy"
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Amount & Notes Section */}
                <div className="bg-linear-to-br from-orange-50/50 to-amber-50/50 rounded-xl p-6 border border-orange-100/50">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-linear-to-br from-orange-500 to-amber-600 rounded-lg">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Total Amount & Notes</h3>
                            <p className="text-sm text-gray-600">Informasi total amount dan catatan</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Total Amount */}
                        <Controller
                            name="totalAmount"
                            control={control}
                            render={({ field }) => (
                                <InputCurrency
                                    label="Total Amount"
                                    required
                                    error={errors.totalAmount?.message}
                                    value={field.value}
                                    onChange={(value) => field.onChange(value || 0)}
                                />
                            )}
                        />

                        {/* Notes */}
                        <Input
                            label="Notes"
                            error={errors.notes?.message}
                            {...register("notes")}
                            placeholder="Input notes"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                    {mode === "edit" && preOrderId ? (
                        <UpdatePreOrderButton form={form} id={preOrderId} onSuccess={onUpdateSuccess} />
                    ) : (
                        <CreatePreOrderButton form={form} onSuccess={onUpdateSuccess} />
                    )}
                </div>
            </form>
        );
    }
);

PreOrderForm.displayName = "PreOrderForm";

export default PreOrderForm;

