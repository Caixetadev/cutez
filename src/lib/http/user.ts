import { cache } from 'react'

import { db } from '../db'

export const dynamic = 'force-dynamic'

export const user = {
  total: cache(() => db.user.count()),
}
