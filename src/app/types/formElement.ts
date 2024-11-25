export type FormElement = {
  name: string;
  type: "text" | "number" | "email" | "date" | "boolean";
  required: boolean;
};
