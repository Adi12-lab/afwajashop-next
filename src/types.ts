import { z } from "zod";
import { categorySchema } from "./schema";

export type Category = z.infer<typeof categorySchema>;

export type EditDeleteOperation<T> = {
  data?: T;
  operation?: "edit" | "delete";
};

export interface EditDeleteProps<T> {
  editDeleteOperation: EditDeleteOperation<T>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
