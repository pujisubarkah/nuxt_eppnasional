// /server/api/agenda/index.ts

import { db } from '@/server/database'
import { agenda } from '@/server/database/schema/agenda'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    try {
      const data = await db
        .select()
        .from(agenda)
        .orderBy(desc(agenda.id))

      return data
    } catch (error) {
      console.error('Error fetching agenda:', error)
      return createError({
        statusCode: 500,
        statusMessage: 'Gagal mengambil data agenda',
      })
    }
  }

  if (event.req.method === 'POST') {
    try {
      const body = await readBody(event)
      const { name } = body
      if (!name) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Field wajib: name',
        })
      }
      const inserted = await db
        .insert(agenda)
        .values({ name })
        .returning()
      return inserted[0]
    } catch (error) {
      console.error('Error inserting agenda:', error)
      return createError({
        statusCode: 500,
        statusMessage: 'Gagal menyimpan agenda',
      })
    }
  }
})