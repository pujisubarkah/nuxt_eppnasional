import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    nama: '',
    pelatihan_id: null as number | null,
    // Tambahkan properti lain sesuai kebutuhan
  }),
  actions: {
    setNama(nama: string) {
      this.nama = nama
    },
    setPelatihanId(id: number | null) {
      this.pelatihan_id = id
    },
    reset() {
      this.nama = ''
      this.pelatihan_id = null
    }
  }
})
