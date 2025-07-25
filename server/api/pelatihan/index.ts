import { db } from '@/server/database'
import { pelatihan } from '@/server/database/schema/pelatihan'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(pelatihan)
  }
})
