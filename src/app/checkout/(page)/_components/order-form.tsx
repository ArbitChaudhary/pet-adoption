"use client";

import { sendOrder } from "@/app/api/order/order";
import ControlledInput from "@/components/reusables/controlled-input";
import ControlledPhoneInput from "@/components/reusables/controlled-phone-input";
import ControlledTextarea from "@/components/reusables/controlled-textarea";
import ButtonLoading from "@/components/ui/buttons/loading-button";
import { useAppSelector } from "@/hooks/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const orderSchema = z.object({
  userName: z
    .string({ error: "Name is required" })
    .min(2, "Must be at least 2 characters"),
  userEmail: z
    .string({ error: "Email is required" })
    .email("Invalid email address"),
  userPhone: z.string({ error: "Phone number is required" }),
  userAddress: z.string({ error: "Address is required" }).min(5),
  message: z.string().optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;

const OrderForm = () => {
  const { user } = useAppSelector((state) => state.global);
  const { cart } = useAppSelector((state) => state.cart);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      userName: user?.name,
      userEmail: user?.email,
      userPhone: user?.phone || undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof orderSchema>) => {
    try {
      const orderData = {
        ...data,
        userId: user?._id,
        orderItems: cart,
        totalAmount: cart.reduce((total, item) => total + item?.price, 0),
      };
      await sendOrder(orderData);

      toast.success("Order submitted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit order. Please try again.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ControlledInput
          control={control}
          name="userName"
          errors={errors}
          label="Full Name"
          disabled
        />
        <ControlledInput
          control={control}
          name="userEmail"
          errors={errors}
          label="Email"
          type="email"
          disabled
        />
        <ControlledPhoneInput
          control={control}
          name="userPhone"
          errors={errors}
          label="Phone Number"
        />
        <ControlledInput
          control={control}
          name="userAddress"
          errors={errors}
          label="Address"
        />
        <div className="col-span-2">
          <ControlledTextarea
            control={control}
            name="message"
            errors={errors}
            label="Message (Optional)"
          />
        </div>
        <ButtonLoading type="submit" buttonText="Submit" />
      </div>
    </form>
  );
};

export default OrderForm;
