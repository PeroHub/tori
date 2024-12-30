import * as z from "zod";

export const EventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.date().min(new Date(), "Event date must be in the future"),
  category: z.string().min(1, "Please select a category"),
  address: z.string().min(5, "Please enter a valid address"),
  image: z.any().refine((file) => file, "Please upload an image"),
});

export type EventFormValues = z.infer<typeof EventFormSchema>;
