import { db } from '@/server/database'
import { answers } from '@/server/database/schema/answers'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(answers)
  }
})
