import { db } from '@/server/database'
import { users } from '@/server/database/schema/users'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(users)
  }
})
