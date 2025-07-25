import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { agenda } from './schema/agenda'

import { answers } from './schema/answers'
import { instansi_kategori } from './schema/instansi_kategori'
import { instansi } from './schema/instansi'
import { jabatan } from './schema/jabatan'
import { pelatihanAgenda } from './schema/pelatihan_agenda'
import { pelatihan } from './schema/pelatihan'
import { questions } from './schema/pertanyaan'
import { alumni } from './schema/profile_alumni'
import { provinsi } from './schema/provinsi'
import { question_options } from './schema/question_options'
import { roles } from './schema/roles'
import { subAgenda } from './schema/sub_agenda'
import { sub_pertanyaan } from './schema/sub_pertanyaan'
import { tahun_pelatihan } from './schema/tahun_pelatihan'
import { users } from './schema/users'

// Pool PostgreSQL
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
})

// Instance drizzle ORM
export const db = drizzle(pool)

// Contoh: import { db } from '@/server/database' lalu gunakan db.select(...)
// Jangan jalankan koneksi di top-level, biarkan pool dan db digunakan di handler/server

