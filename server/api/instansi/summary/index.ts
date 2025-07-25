// app/api/instansi/summary/route.ts


import { db } from '@/server/database'
import { alumni } from '@/server/database/schema/profile_alumni'
import { instansi } from '@/server/database/schema/instansi'
import { instansi_kategori } from '@/server/database/schema/instansi_kategori'
import { eq, count } from 'drizzle-orm';


export default defineEventHandler(async (event) => {
  try {
    const result = await db
      .select({
        kategoriId: instansi_kategori.id,
        kategoriNama: instansi_kategori.name,
        instansiId: instansi.id,
        instansiNama: instansi.agency_name,
        jumlahAlumni: count(alumni.id).as('jumlahAlumni'),
      })
      .from(alumni)
      .leftJoin(instansi, eq(alumni.instansiId, instansi.id))
      .leftJoin(instansi_kategori, eq(instansi.agency_category_id, instansi_kategori.id))
      .groupBy(instansi_kategori.id, instansi_kategori.name, instansi.id, instansi.agency_name)
      .orderBy(instansi_kategori.name, instansi.agency_name);

    return result;
  } catch (error) {
    console.error(error);
    return {
      error: 'Gagal mengambil data instansi',
      detail: String(error)
    };
  }
});
