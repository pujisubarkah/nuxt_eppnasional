

import { db } from '@/server/database'
import { users } from '@/server/database/schema/users'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { username, password } = body || {}

    if (!username || !password) {
      return { error: 'Username dan password wajib diisi' }
    }

    // Ambil user dari database
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1)

    const user = result[0]

    if (!user) {
      return { error: 'User tidak ditemukan' }
    }

    // Cek kecocokan password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return { error: 'Password salah' }
    }

    // Kalau cocok, kembalikan user info
    return {
      message: 'Login berhasil!',
      user: {
        id: user.id,
        username: user.username,
        nama: user.nama, // pastikan field ini ada di tabel users
        roleId: user.roleId
      }
    }

  } catch (err) {
    console.error('Login error:', err)
    return { error: 'Terjadi kesalahan saat login' }
  }
})