import * as z from 'zod'

export const LinkSchema = z.object({
  url: z.string().url(),
  domain: z.string(),
  description: z.string().optional(),
})

export const linkPatchSchema = z.object({
  url: z.string().url(),
  description: z.string(),
})

export type LinkForm = z.infer<typeof LinkSchema>
