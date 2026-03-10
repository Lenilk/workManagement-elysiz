import { z } from "zod";

export const filenameSchema = z
  .string()
  .min(1)
  // 1. ห้ามมี .. (Path Traversal)
  .refine((val) => !val.includes(".."), {
    message: "Invalid filename: '..' is not allowed",
  })
  // 2. ห้ามมี / หรือ \ (ป้องกันการเข้าถึง sub-folder ที่ไม่ได้รับอนุญาต)
  .refine((val) => !/[\\/]/.test(val), {
    message: "Invalid filename: Slashes are not allowed",
  });
