import { db } from '@/server/database'
import { jabatan } from '@/server/database/schema/jabatan'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(jabatan)
  }
})
