import { db } from '@/server/database'
import { question_options } from '@/server/database/schema/question_options'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(question_options)
  }
})
