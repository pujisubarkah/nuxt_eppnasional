import { db } from '@/server/database'
import { sub_pertanyaan } from '@/server/database/schema/sub_pertanyaan'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(sub_pertanyaan)
  }
})
