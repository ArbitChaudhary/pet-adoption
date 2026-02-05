"use client";

import ControlledInput from "@/components/reusables/controlled-input";
import ControlledPhoneInput from "@/components/reusables/controlled-phone-input";
import ControlledTextarea from "@/components/reusables/controlled-textarea";
import ButtonLoading from "@/components/ui/buttons/loading-button";
import { useAppSelector } from "@/hooks/redux";
import { useOrderCheckoutMutation } from "@/redux/actions/order-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { IOrder } from "../../common/checkout-types";
import { useRouter } from "next/navigation";
import ControlledRadio from "@/components/reusables/controlled-radio";
import creditCard from "@/assets/debit-card.png";
import stripeIcon from "@/assets/stripe-logo.png";
import cashIcon from "@/assets/cash.png";

export const orderSchema = z.object({
  userName: z
    .string({ error: "Name is required" })
    .min(2, "Must be at least 2 characters"),
  userEmail: z
    .string({ error: "Email is required" })
    .email("Invalid email address"),
  userPhone: z.string({ error: "Phone number is required" }),
  userAddress: z.string({ error: "Address is required" }),
  message: z.string().optional(),
  paymentMethod: z.string({ error: "Choose a payment method" }),
});

export type OrderInput = z.infer<typeof orderSchema>;

const radioOptions = [
  {
    label: "Cash on Delivery",
    value: "cash_on_delivery",
    icon: cashIcon,
  },
  {
    label: "Stripe",
    value: "stripe",
    icon: stripeIcon,
  },
  {
    label: "Credit Card",
    value: "credit_card",
    icon: creditCard,
  },
];

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
  const router = useRouter();

  const [orderCheckout, { isLoading }] = useOrderCheckoutMutation();
  const onSubmit = async (data: z.infer<typeof orderSchema>) => {
    try {
      const orderData = {
        ...data,
        userId: user!._id,
        message: data.message || "",
        orderItems: cart,
        status: "pending",
        totalAmount: cart.reduce((total, item) => total + item?.price, 0),
        paymentStatus: "pending",
      };

      const response = await orderCheckout(orderData as IOrder).unwrap();
      if (response.session?.url) {
        router.push(response.session.url);
      }
      toast.success("Checkout successful");
      // eslint-disable-next-line
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.message || error?.message || "Failed to checkout",
      );
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
        <div className="col-span-2">
          <ControlledRadio
            control={control}
            name="paymentMethod"
            radioOptions={radioOptions || []}
            label="Payment Method"
          />
        </div>
        <ButtonLoading
          type="submit"
          buttonText="Submit"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default OrderForm;
