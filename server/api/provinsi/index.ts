import { db } from '@/server/database'
import { provinsi } from '@/server/database/schema/provinsi'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(provinsi)
  }
})
