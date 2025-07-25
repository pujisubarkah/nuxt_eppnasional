import { db } from '@/server/database'
import { provinsi } from '@/server/database/schema/provinsi'
import { alumni } from '@/server/database/schema/profile_alumni';
import { eq, count } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const result = await db
      .select({
        provinsiId: provinsi.id,
        provinsiNama: provinsi.nama,
        svgPath: provinsi.svg_path,
        jumlahAlumni: count(alumni.id).as('jumlahAlumni'),
      })
      .from(provinsi)
      .leftJoin(alumni, eq(provinsi.id, alumni.domisiliId))
      .groupBy(provinsi.id, provinsi.nama, provinsi.svg_path)
      .orderBy(provinsi.nama);
    return result;
  } catch (error) {
    console.error(error);
    event.node.res.statusCode = 500;
    return { error: 'Terjadi kesalahan saat mengambil data' };
  }
})
