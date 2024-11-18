import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  email: string;
  name?: string;
  image?: string;
  plan: "small" | "medium" | "large" | "enterprise";
  customerId?: string;
  priceId?: string;
  formCount: number;
  entryCount: number;
  forms: ObjectId[];
  createdAt: Date;
}
