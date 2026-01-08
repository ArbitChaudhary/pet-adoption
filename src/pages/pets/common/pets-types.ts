export interface IPet {
  _id: string;
  breed: string;
  category: string;
  age: number;
  description: string;
  image: string;
  price: number;
  discount?: number;
  discountType?: "percentage" | "amount";
  isAvailable: boolean;
  gender: string;
  gallery?: string[];
  totalQuantity: number;
  dimension: string;
  createdAt: string;
  updatedAt: string;
}
