import { db } from '@/server/database'
import { instansi_kategori } from '@/server/database/schema/instansi_kategori'

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    return await db.select().from(instansi_kategori)
  }
})
