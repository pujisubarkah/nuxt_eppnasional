import { defineStore } from 'pinia'

export const useSikapPrilakuStore = defineStore('sikapprilaku', {
  state: () => ({
    sikap: [] as string[],
    kinerja: [] as string[],
    ekonomi: '',
    dampak: [] as string[],
    dampakLain: '',
    // Tambahkan properti lain jika diperlukan
  }),
  actions: {
    setSikap(val: string[]) {
      this.sikap = val
    },
    setKinerja(val: string[]) {
      this.kinerja = val
    },
    setEkonomi(val: string) {
      this.ekonomi = val
    },
    setDampak(val: string[]) {
      this.dampak = val
    },
    setDampakLain(val: string) {
      this.dampakLain = val
    },
    reset() {
      this.sikap = []
      this.kinerja = []
      this.ekonomi = ''
      this.dampak = []
      this.dampakLain = ''
    }
  }
})
