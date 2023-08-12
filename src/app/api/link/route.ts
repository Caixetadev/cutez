import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { LinkSchema } from '@/lib/validations/link'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    const json = await req.json()
    const body = LinkSchema.parse(json.data)

    const existingLink = await db.link.findUnique({
      where: {
        domain: body.domain,
      },
    })

    if (existingLink) {
      return new Response('Domain already exists', { status: 409 })
    }

    const link = await db.link.create({
      data: {
        url: body.url,
        domain: body.domain,
        description: body.description,
        creatorId: session.user.id,
      },
    })

    return new Response(JSON.stringify(link))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.errors), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
