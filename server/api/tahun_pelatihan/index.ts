import { db } from '@/server/database'
import { tahun_pelatihan } from '@/server/database/schema/tahun_pelatihan'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(tahun_pelatihan)
  }
})
