import { defineStore } from 'pinia'

export interface AlumniProfileForm {
  id?: number
  namaAnda: string
  jenisInstansi: string
  instansi: string
  jabatanAnda: string
  namaAlumni: string
  hubungan: string
  jabatanAlumni: string
  pelatihan: string | number
}

export const useProfileFormStore = defineStore('alumni_profile', {
  state: (): { form: AlumniProfileForm } => ({
    form: {
      id: undefined,
      namaAnda: '',
      jenisInstansi: '',
      instansi: '',
      jabatanAnda: '',
      namaAlumni: '',
      hubungan: '',
      jabatanAlumni: '',
      pelatihan: ''
    }
  }),
  actions: {
    setForm(payload: Partial<AlumniProfileForm>) {
      this.form = { ...this.form, ...payload }
    },
    resetForm() {
      this.form = {
        id: undefined,
        namaAnda: '',
        jenisInstansi: '',
        instansi: '',
        jabatanAnda: '',
        namaAlumni: '',
        hubungan: '',
        jabatanAlumni: '',
        pelatihan: ''
      }
    }
  }
})
