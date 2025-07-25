import { defineStore } from 'pinia'

export const useSaranMasukanStore = defineStore('saranmasukan', {
  state: () => ({
    materi: '',
    metode: '',
    waktu: '',
    pengajar: '',
  }),
  actions: {
    setMateri(val: string) {
      this.materi = val
    },
    setMetode(val: string) {
      this.metode = val
    },
    setWaktu(val: string) {
      this.waktu = val
    },
    setPengajar(val: string) {
      this.pengajar = val
    },
    reset() {
      this.materi = ''
      this.metode = ''
      this.waktu = ''
      this.pengajar = ''
    }
  }
})
