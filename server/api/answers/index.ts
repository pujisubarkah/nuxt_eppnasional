
import { db } from '@/server/database'
import { answers } from '@/server/database/schema/answers'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    try {
      const result = await db.select().from(answers)
      return { status: 'success', data: result }
    } catch {
      return { error: 'Failed to fetch answers' }
    }
  }

  if (event.method === 'POST') {
    try {
      const body = await readBody(event)
      const { question_id, user_id, answer } = body || {}

      if (!question_id || !user_id || !answer) {
        return { error: 'Missing fields' }
      }

      const result = await db
        .insert(answers)
        .values({
          question_id,
          user_id,
          answer,
          created_at: new Date(),
        })
        .returning()

      return { status: 'success', data: result[0] }
    } catch {
      return { error: 'Failed to save answer' }
    }
  }
})