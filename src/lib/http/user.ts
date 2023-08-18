import { cache } from 'react'

import { db } from '../db'

export const revalidate = 0

export const user = {
  total: cache(() => db.user.count()),
}
