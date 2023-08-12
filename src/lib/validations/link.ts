import * as z from 'zod'

export const LinkSchema = z.object({
  url: z.string().url(),
  domain: z.string(),
  description: z.string().optional(),
})

export type LinkForm = z.infer<typeof LinkSchema>
