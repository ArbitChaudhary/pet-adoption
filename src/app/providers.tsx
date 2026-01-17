"use client";
import StoreProvider from "@/redux/store-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreProvider>{children}</StoreProvider>
    </>
  );
}
