import { db } from '@/server/database'
import { pelatihanAgenda } from '@/server/database/schema/pelatihan_agenda'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(pelatihanAgenda)
  }

  if (event.req.method === 'POST') {
    const body = await readBody(event)
    const { pelatihan_id, agenda_id } = body
    if (!pelatihan_id || !agenda_id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Field wajib: pelatihan_id, agenda_id',
      })
    }
    const inserted = await db
      .insert(pelatihanAgenda)
      .values({ pelatihan_id, agenda_id })
      .returning()
    return inserted[0]
  }
})
