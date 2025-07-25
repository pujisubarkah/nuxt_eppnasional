
import { db } from '@/server/database'
import { questions, question_options } from '@/server/database/schema/pertanyaan'
import { sub_pertanyaan } from '@/server/database/schema/sub_pertanyaan'
import { eq } from 'drizzle-orm'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const idParam = event.context.params?.id
  const id = Number(idParam)

  if (isNaN(id)) {
    return { error: 'Invalid id' }
  }

  const question = await db
    .select()
    .from(questions)
    .where(eq(questions.id, id))
    .limit(1)

  if (!question.length) {
    return { error: 'Not found' }
  }

  const options = await db
    .select()
    .from(question_options)
    .where(eq(question_options.question_id, id))
    .orderBy(question_options.ordering)

  // Loop untuk ambil sub_pertanyaan per option
  const optionsWithSub = await Promise.all(
    options.map(async (option) => {
      const subs = await db
        .select()
        .from(sub_pertanyaan)
        .where(eq(sub_pertanyaan.questionOptionId, option.id))
      return {
        ...option,
        sub_pertanyaan: subs,
      }
    })
  )

  return {
    ...question[0],
    options: optionsWithSub,
  }
})
