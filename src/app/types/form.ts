import { ObjectId } from "mongodb";
import { Entry } from "./entry";

export type Form = {
  _id: ObjectId;
  userEmail: string;
  apiKey: string;
  createdAt: Date;
  title: string;
  description: string;
  emailSettings: {
    requireEmail: boolean;
    confirmationEmail: string;
    notifyOnEntry: boolean;
    sendConfirmation: boolean;
  };
  entryCount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elements: { name: string; type: string; required: boolean }[];
  entries: Entry[];
};
