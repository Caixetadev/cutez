import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    linkId: z.string(),
  }),
})

export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    const { params } = routeContextSchema.parse(context)

    await db.link.delete({
      where: {
        id: Number(params.linkId),
        creatorId: session.user.id,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.errors), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
