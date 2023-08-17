import { db } from './db'

export async function updateLinkClicks(linkId: string) {
  try {
    await db.link.update({
      where: {
        domain: linkId,
      },
      data: { clicks: { increment: 1 } },
    })
  } catch (error) {
    return error
  }
}
