import { z } from 'zod'

export const enquirySchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type EnquiryFormValues = z.infer<typeof enquirySchema>
