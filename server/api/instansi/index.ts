import { db } from '@/server/database'
import { instansi } from '@/server/database/schema/instansi'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(instansi)
  }
})
