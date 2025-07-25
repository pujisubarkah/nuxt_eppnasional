import { defineStore } from 'pinia'

export const useSesuaiWaktuStore = defineStore('sesuaiwaktu', {
  state: () => ({
    jawaban: '' as string,
  }),
  actions: {
    setJawaban(val: string) {
      this.jawaban = val
    },
    reset() {
      this.jawaban = ''
    }
  }
})
