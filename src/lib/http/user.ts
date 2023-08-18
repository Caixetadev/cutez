import { cache } from 'react'
import { db } from '../db'

export const user = {
  total: cache(() => db.user.count()),
}
