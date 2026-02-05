export interface IOrderItem {
  petId: string;
  breed: string;
  name?: string;
  price: number;
  category: string;
  gender?: string;
  age?: number;
  dimension?: string;
  image?: string;
}

export interface IOrder extends Document {
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  status: string;
  totalAmount: number;
  orderItems: IOrderItem[];
  message?: string;
  paymentMethod: string;
  paymentStatus: string;
}
