import { ObjectId } from "mongodb";

export type Entry = {
  _id: ObjectId;
  formId: ObjectId;
  email: string;
  formName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entry: any;
  date: Date;
};
