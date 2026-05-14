import { z } from 'zod'

export const enquirySchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name').min(2, 'Name must be at least 2 characters').max(100, 'Name must be 100 characters or fewer'),
  company: z.string().trim().max(100, 'Company must be 100 characters or fewer').optional(),
  email: z.string().trim().min(1, 'Please enter your email address').email('Please enter a valid email address').max(254, 'Email must be 254 characters or fewer'),
  message: z.string().trim().min(1, 'Please enter a message').min(10, 'Message must be at least 10 characters').max(5000, 'Message must be 5000 characters or fewer'),
})

export type EnquiryFormValues = z.infer<typeof enquirySchema>
