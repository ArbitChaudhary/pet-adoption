export interface IOderItem {
  petId: string;
  name?: string;
  breed: string;
  category: string;
  price: number;
  gender?: string;
  age?: number;
  dimension?: string;
}

export interface IOrder {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderItems: IOderItem[];
  createdAt: string;
  updatedAt: string;
}
