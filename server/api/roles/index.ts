import { db } from '@/server/database'
import { roles } from '@/server/database/schema/roles'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(roles)
  }
})
