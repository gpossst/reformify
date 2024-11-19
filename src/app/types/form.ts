import { ObjectId } from "mongodb";
import { Entry } from "./entry";

export type Form = {
  _id: ObjectId;
  email: string;
  apiKey: string;
  createdAt: Date;
  title: string;
  description: string;
  entryCount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elements: { name: string; type: string; required: boolean }[];
  entries: Entry[];
};
