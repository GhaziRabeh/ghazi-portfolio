// Shadcn UI use-toast.ts
// This file is required by the toast component

import { useToast as useToastOriginal } from "@/hooks/use-toast";

export const useToast = useToastOriginal;

export {
  toast,
  type Toast,
  type ToasterToast,
} from "@/hooks/use-toast";