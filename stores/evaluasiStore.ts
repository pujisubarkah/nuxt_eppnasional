import { defineStore } from 'pinia'

export const useEvaluasiStore = defineStore('evaluasi', {
  state: () => ({
    relevan: [] as string[],
    tidakRelevan: [] as string[],
  }),
  actions: {
    setRelevan(val: string[]) {
      this.relevan = val
    },
    setTidakRelevan(val: string[]) {
      this.tidakRelevan = val
    },
    reset() {
      this.relevan = []
      this.tidakRelevan = []
    }
  }
})
