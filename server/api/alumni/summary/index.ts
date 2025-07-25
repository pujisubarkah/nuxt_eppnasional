import { db } from '@/server/database'
import { alumni } from '@/server/database/schema/profile_alumni'
import { pelatihan } from '@/server/database/schema/pelatihan'
import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const result = await db.execute(
      sql`
        SELECT p.id, p.nama AS pelatihan, COUNT(a.id) AS total_alumni
        FROM ${pelatihan} p
        LEFT JOIN ${alumni} a ON a.pelatihan_id = p.id
        GROUP BY p.id, p.nama
        ORDER BY total_alumni DESC
      `
    );
    return result.rows;
  } catch (error) {
    return {
      error: 'Gagal mengambil data',
      detail: String(error),
    };
  }
});