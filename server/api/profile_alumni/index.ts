import { db } from '@/server/database'
import { alumni } from '@/server/database/schema/profile_alumni'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(alumni)
  }
})
