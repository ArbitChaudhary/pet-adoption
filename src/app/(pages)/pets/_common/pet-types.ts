export interface IPet {
  _id: string;
  name: string;
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
  dimension: string;
  disabled?: boolean;
  disability?: string;
  enableDiscount?: boolean;
  createdAt: string;
  updatedAt: string;
}
