import { cache } from 'react'

import { db } from '../db'

export const revalidate = 0

export const link = {
  total: cache(() => db.link.count()),

  clicks: cache(() =>
    db.link.aggregate({
      _sum: { clicks: true },
    })
  ),

  avgClicks: cache(() =>
    db.link.aggregate({
      _avg: { clicks: true },
    })
  ),
}
