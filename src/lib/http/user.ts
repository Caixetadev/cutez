import { db } from '../db'

export const user = {
  total: db.user.count(),
}
