import { db } from '@/server/database'
import { subAgenda } from '@/server/database/schema/sub_agenda'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(subAgenda)
  }
})
