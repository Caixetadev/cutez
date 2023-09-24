import { NextRequest } from 'next/server'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'
import { redis } from '@/lib/redis'
import { updateLinkClicks } from '@/lib/update-link-clicks'
import { linkPatchSchema } from '@/lib/validations/link'

import { ipAddress } from '@vercel/edge'

import { z } from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    linkId: z.string(),
  }),
})

export async function DELETE(
  _: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    const { params } = routeContextSchema.parse(context)

    const data = await db.link.delete({
      where: {
        id: params.linkId,
        creatorId: session.user.id,
      },
      select: {
        domain: true,
      },
    })

    await redis.del(`link:${data.domain}`)

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

    const data = await db.link.update({
      where: {
        id: params.linkId,
        creatorId: session.user.id,
      },
      data: {
        url: body.url,
        description: body.description,
      },
      select: {
        domain: true,
        url: true,
      },
    })

    await redis.set(`link:${data.domain}`, JSON.stringify({ url: data.url }))

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

    const ip = ipAddress(req) || '63.141.56.109'

    const { success } = await rateLimit(ip)

    if (!success) {
      return new Response('Rate Limit', { status: 429 })
    }

    const cachedData: any = await redis.get(`link:${params.linkId}`)

    if (cachedData) {
      updateLinkClicks(params.linkId)

      return new Response(JSON.stringify(cachedData) as any, {
        status: 200,
      })
    }

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

    const THIRTY_MINUTES = 30 * 60

    await redis.set(`link:${params.linkId}`, JSON.stringify(data), {
      nx: true,
      ex: THIRTY_MINUTES,
    })

    updateLinkClicks(params.linkId)

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.errors), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
