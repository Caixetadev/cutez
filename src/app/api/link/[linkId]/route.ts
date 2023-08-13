import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { linkPatchSchema } from '@/lib/validations/link'
import { url } from 'inspector'

import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
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
        id: params.linkId,
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

export async function PATCH(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    const { params } = routeContextSchema.parse(context)

    const json = await req.json()
    const body = linkPatchSchema.parse(json.data)

    await db.link.update({
      where: {
        id: params.linkId,
        creatorId: session.user.id,
      },
      data: {
        url: body.url,
        description: body.description,
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

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const data = await db.link.findFirst({
      where: {
        domain: {
          equals: params.linkId,
        },
      },
      select: {
        url: true,
      },
    })

    if (!data) {
      return new Response(null, { status: 404 })
    }

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.errors), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
