<template>
  <div>
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div class="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-[#B3E5FC]">
        <h3 class="text-2xl font-bold text-[#1976D2] mb-4">Terima Kasih!</h3>
        <p class="mb-6 text-gray-700">
          Terima kasih <span class="font-semibold">{{ form.namaAnda }}</span> telah mengisi profile.<br />
          Sekarang silakan lanjut untuk mengisi surveynya.
        </p>
        <button
          class="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-3 rounded-xl shadow-lg font-bold text-lg tracking-wide transition flex items-center justify-center gap-2"
          @click="showModal = false; handleLanjut()"
        >
          <span class="i-lucide-arrow-right-circle w-6 h-6"></span> Lanjut Isi Survei
        </button>
      </div>
    </div>
    <div class="max-w-4xl mx-auto mt-6 mb-8 bg-white/80 rounded-2xl shadow p-6 border border-[#B3E5FC]">
      <div class="text-xl font-bold text-[#1976D2] mb-2 text-center">
        Evaluasi Pasca Pelatihan Nasional - Atasan/Rekan Kerja/Bawahan
        <span class="text-base font-normal">(Draf)</span>
      </div>
      <div class="text-gray-700 text-base leading-relaxed mb-2">
        Sebagai bagian dari upaya peningkatan mutu pelatihan, Direktorat Penjaminan Mutu Pengembangan Kapasitas Lembaga Administrasi Negara menyelenggarakan Evaluasi Pascapelatihan Nasional untuk mengidentifikasi hasil pelatihan, khususnya pada level perilaku (behaviour) dan dampak yang ditimbulkan dari pelaksanaan pelatihan.
        <br /><br />
        Formulir ini ditujukan bagi Alumni Pelatihan Tahun 2021-2024 pada:
        <ol class="list-decimal list-inside ml-4 my-2">
          <li>Pelatihan Kepemimpinan Nasional Tingkat I</li>
          <li>Pelatihan Kepemimpinan Nasional Tingkat II</li>
          <li>Pelatihan Kepemimpinan Administrator</li>
          <li>Pelatihan Kepemimpinan Pengawas</li>
          <li>Pelatihan Dasar CPNS</li>
        </ol>
        Kami mohon kesediaan Bapak/Ibu untuk mengisi formulir ini secara objektif. Masukan Anda sangat berharga dalam mendukung perbaikan berkelanjutan pelatihan ASN. Data dan informasi pribadi yang Bapak/Ibu sampaikan akan dijaga kerahasiaannya, digunakan hanya untuk keperluan evaluasi, dan tidak akan disebarluaskan tanpa izin.
        <br /><br />
        <span class="font-semibold">Waktu pengisian membutuhkan 3 - 5 menit.</span>
        <br />
        <span class="italic text-sm">
          Catatan: Jika Anda pernah mengikuti lebih dari satu pelatihan, silahkan gunakan informasi Pelatihan terakhir Anda
        </span>
      </div>
    </div>
    <form
      class="max-w-4xl mx-auto bg-gradient-to-br from-[#E3F2FD] to-[#F8FAFB] rounded-2xl shadow-2xl p-4 md:p-10 space-y-8 border border-[#B3E5FC]"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-2xl md:text-3xl font-extrabold text-[#1976D2] mb-2 text-center tracking-wide drop-shadow">
        Informasi Profil Penilai Alumni
      </h2>
      <div class="space-y-4 md:space-y-6">
        <!-- Nama Lengkap -->
        <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <label class="font-semibold text-left md:text-right w-full md:w-64 text-[#1976D2] mb-1 md:mb-0">
            Nama Lengkap <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaAnda"
            v-model="form.namaAnda"
            required
            class="w-full border border-[#90CAF9] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C2E7F6] bg-white shadow-sm transition"
            placeholder="Masukkan nama lengkap Anda"
          />
        </div>
        <!-- Jenis Instansi -->
        <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <label class="font-semibold text-left md:text-right w-full md:w-64 text-[#1976D2] mb-1 md:mb-0">
            Jenis Instansi <span class="text-red-500">*</span>
          </label>
          <select
            name="jenisInstansi"
            v-model="form.jenisInstansi"
            required
            class="w-full border border-[#90CAF9] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6]"
          >
            <option value="" disabled>Pilih Jenis Instansi</option>
            <option v-for="item in jenisInstansiList" :key="item.id" :value="item.name">{{ item.name }}</option>
          </select>
        </div>
        <!-- Instansi -->
        <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <label class="font-semibold text-left md:text-right w-full md:w-64 text-[#1976D2] mb-1 md:mb-0">
            Instansi <span class="text-red-500">*</span>
          </label>
          <div class="w-full">
            <select
              name="instansi"
              v-model="form.instansi"
              required
              class="w-full border border-[#90CAF9] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6]"
              :disabled="!form.jenisInstansi"
            >
              <option value="" disabled>Pilih Instansi</option>
              <option v-for="item in instansiList" :key="item.id" :value="item.agency_name">{{ item.agency_name }}</option>
            </select>
          </div>
        </div>
        <!-- Jabatan Anda -->
        <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <label class="font-semibold text-left md:text-right w-full md:w-64 text-[#1976D2] mb-1 md:mb-0">
            Jabatan Anda <span class="text-red-500">*</span>
          </label>
          <select
            name="jabatanAnda"
            v-model="form.jabatanAnda"
            required
            class="w-full border border-[#90CAF9] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6]"
          >
            <option value="" disabled>Pilih Jabatan Anda</option>
            <option v-for="item in jabatanList" :key="item.id" :value="item.nama">{{ item.nama }}</option>
          </select>
        </div>
        <!-- Nama Alumni -->
        <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <label class="font-semibold text-left md:text-right w-full md:w-64 text-[#1976D2] mb-1 md:mb-0">
            Nama Alumni <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="namaAlumni"
            v-model="form.namaAlumni"
            required
            class="w-full border border-[#90CAF9] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C2E7F6] bg-white shadow-sm transition"
            placeholder="Masukkan nama alumni"
          />
        </div>
        <!-- Hubungan dengan Alumni -->
        <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <label class="font-semibold text-left md:text-right w-full md:w-64 text-[#1976D2] mb-1 md:mb-0">
            Hubungan dengan Alumni <span class="text-red-500">*</span>
          </label>
          <select
            name="hubungan"
            v-model="form.hubungan"
            required
            class="w-full border border-[#90CAF9] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6]"
          >
            <option value="" disabled>Pilih Hubungan</option>
            <option>Atasan</option>
            <option>Rekan Kerja</option>
            <option>Bawahan</option>
          </select>
        </div>
        <!-- Jabatan Alumni Saat Ini -->
        <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <label class="font-semibold text-left md:text-right w-full md:w-64 text-[#1976D2] mb-1 md:mb-0">
            Jabatan Alumni Saat Ini <span class="text-red-500">*</span>
          </label>
          <select
            name="jabatanAlumni"
            v-model="form.jabatanAlumni"
            required
            class="w-full border border-[#90CAF9] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6]"
          >
            <option value="" disabled>Pilih Jabatan Alumni</option>
            <option v-for="item in jabatanList" :key="item.id" :value="item.nama">{{ item.nama }}</option>
          </select>
        </div>
        <!-- Pelatihan yang diikuti Alumni -->
        <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <label class="font-semibold text-left md:text-right w-full md:w-64 text-[#1976D2] mb-1 md:mb-0">
            Pelatihan yang diikuti Alumni <span class="text-red-500">*</span>
          </label>
          <select
            name="pelatihan"
            v-model="form.pelatihan"
            required
            class="w-full border border-[#90CAF9] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6]"
          >
            <option value="" disabled>Pilih Pelatihan</option>
            <option v-for="item in pelatihanList" :key="item.id" :value="item.id">{{ item.nama }}</option>
          </select>
        </div>
      </div>
      <div class="text-center pt-2">
        <button
          type="submit"
          :disabled="loading"
          class="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-10 py-3 rounded-xl shadow-lg hover:from-[#1976D2] hover:to-[#2196F3] font-bold text-lg tracking-wide transition flex items-center justify-center gap-2"
        >
          <span class="i-lucide-check-circle w-6 h-6"></span>
          {{ loading ? 'Menyimpan...' : 'Simpan' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
declare const alert: (message?: any) => void;
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileFormStore } from '@/stores/alumni_profile'

const showModal = ref(false)
const loading = ref(false)
const jenisInstansiList = ref<{ id: number; name: string }[]>([])
const jabatanList = ref<{ id: string; nama: string }[]>([])
const instansiList = ref<{ id: string; agency_name: string }[]>([])
const pelatihanList = ref<{ id: number; nama: string }[]>([])
const router = useRouter()
const form = ref(useProfileFormStore().form)
const setForm = useProfileFormStore().setForm

watch(() => form.value.jenisInstansi, async (newJenis: string | undefined) => {
  if (newJenis) {
    const jenis = jenisInstansiList.value.find((j: { id: number; name: string }) => j.name === newJenis)
    if (jenis) {
      try {
        const res = await fetch(`/api/instansi/${jenis.id}`)
        instansiList.value = await res.json()
      } catch {
        instansiList.value = []
      }
    } else {
      instansiList.value = []
    }
    setForm({ instansi: '' })
  } else {
    instansiList.value = []
    setForm({ instansi: '' })
  }
})

onMounted(async () => {
  try {
    const jabatanRes = await fetch('/api/jabatan')
    jabatanList.value = await jabatanRes.json()
    const pelatihanRes = await fetch('/api/pelatihan')
    pelatihanList.value = await pelatihanRes.json()
    const jenisRes = await fetch('/api/jenis_instansi')
    jenisInstansiList.value = await jenisRes.json()
  } catch {
    jabatanList.value = []
    pelatihanList.value = []
    jenisInstansiList.value = []
  }
})

const handleSubmit = async () => {
  loading.value = true
  // Temukan id dari jenisInstansi dan instansi
  const jenis = jenisInstansiList.value.find((j: { id: number; name: string }) => j.name === form.value.jenisInstansi)
  const instansi = instansiList.value.find((i: { id: string; agency_name: string }) => i.agency_name === form.value.instansi)
  const jabatanAnda = jabatanList.value.find((j: { id: string; nama: string }) => j.nama === form.value.jabatanAnda)

  if (!form.value.namaAlumni || !jenis?.id || !instansi?.id || !jabatanAnda?.id || !form.value.pelatihan || !form.value.hubungan || !form.value.jabatanAlumni || !form.value.namaAnda) {
    alert('Semua field wajib diisi!')
    loading.value = false
    return
  }

  try {
    const payload = {
      id: form.value.id,
      name: form.value.namaAnda,
      instansiKategoriId: jenis?.id || null,
      instansiId: instansi?.id || null,
      jabatanId: jabatanAnda?.id || null,
      namaAlumni: form.value.namaAlumni,
      hubungan: form.value.hubungan,
      jabatan_alumni: form.value.jabatanAlumni,
      pelatihanId: form.value.pelatihan ? Number(form.value.pelatihan) : null,
      nipNrpNik: '',
      domisiliId: null,
      tahunPelatihanId: null,
      lemdik: '',
      handphone: ''
    }
    const res = await fetch('/api/peer_review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const rawResponse = await res.text()
    if (res.ok) {
      try {
        const json = JSON.parse(rawResponse)
        if (json.id) {
          setForm({ id: json.id })
        }
      } catch {}
      showModal.value = true
    } else {
      alert('Gagal menyimpan data. Silakan cek kembali isian Anda.\n' + rawResponse)
    }
  } catch (err) {
    alert('Terjadi kesalahan. Silakan coba lagi.\n' + err)
  } finally {
    loading.value = false
  }
}

function handleLanjut() {
  router.push('/review/evaluasi')
}
</script>
