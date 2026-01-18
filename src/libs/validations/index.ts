import z from "zod";

export const teacherSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long!" }).max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.string().min(1, { message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z
    .union([
      z.string().url({ message: "Invalid image URL" }), // Untuk URL dari database
      z.any(), // Untuk FileList dari client
    ])
    .refine(
      (value) => {
        // Jika string (URL), sudah valid
        if (typeof value === "string") return true;

        // Jika FileList, validasi file
        if (typeof window !== "undefined" && value instanceof FileList) {
          if (value.length !== 1) return false;
          if (value[0].size > 5000000) return false;
          const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
          return validTypes.includes(value[0].type);
        }

        return false;
      },
      {
        message: "Image is required! Max 5MB. Formats: jpg, jpeg, png, webp",
      }
    )
    .optional(),
});

export type teacherInput = z.infer<typeof teacherSchema>;
