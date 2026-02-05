"use server";

export const sendOrder = async (orderData: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/create-checkout-session`,
    {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  return data;
};
