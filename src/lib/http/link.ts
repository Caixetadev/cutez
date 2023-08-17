import { db } from '../db'

export const link = {
  total: db.link.count(),

  clicks: db.link.aggregate({
    _sum: { clicks: true },
  }),

  avgClicks: db.link.aggregate({
    _avg: { clicks: true },
  }),
}
