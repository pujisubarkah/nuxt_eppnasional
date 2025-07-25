import { db } from '@/server/database'
import { questions } from '@/server/database/schema/pertanyaan'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(questions)
  }
})
