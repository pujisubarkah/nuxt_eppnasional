<template>
  <div class="max-w-4xl mx-auto mt-32 mb-8 bg-white rounded-2xl shadow p-6 border border-[#B3E5FC]">
    <div class="text-xl font-bold text-[#1976D2] mb-2 text-center">
      Evaluasi Pascapelatihan Nasional - Alumni
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
      <br /><span class="italic text-sm">Catatan: Jika Anda pernah mengikuti lebih dari satu pelatihan, silahkan gunakan informasi Pelatihan terakhir Anda</span>
    </div>
  </div>
  <form class="max-w-4xl mx-auto bg-gradient-to-br from-[#E3F2FD] to-[#F8FAFB] rounded-2xl shadow-2xl p-4 md:p-10 space-y-8 border border-[#B3E5FC]" @submit.prevent="handleSubmit">
    <h2 class="text-2xl md:text-3xl font-extrabold text-[#1976D2] mb-2 text-center tracking-wide drop-shadow">Profil Responden</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6">
      <!-- Nama Lengkap -->
      <div class="flex items-center md:justify-end">
        <label class="font-semibold text-left md:text-right w-full md:w-44 text-[#1976D2]">Nama Lengkap</label>
      </div>
      <div class="w-full">
        <input type="text" name="nama" v-model="form.nama" class="w-full border border-[#90CAF9] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C2E7F6] bg-white shadow-sm transition" placeholder="Masukkan nama lengkap" required />
      </div>
      <!-- NIP/NRP/NIK -->
      <div class="flex items-center md:justify-end">
        <label class="font-semibold text-left md:text-right w-full md:w-44 text-[#1976D2]">NIP/NRP/NIK</label>
      </div>
      <div class="w-full">
        <input type="text" name="nip" v-model="form.nip" class="w-full border border-[#90CAF9] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C2E7F6] bg-white shadow-sm transition" placeholder="Masukkan NIP/NRP/NIK" required />
      </div>
      <!-- Jenis Instansi -->
      <div class="flex items-center md:justify-end">
        <label class="font-semibold text-left md:text-right w-full md:w-44 text-[#1976D2]">Jenis Instansi</label>
      </div>
      <div class="w-full">
        <select v-model="form.jenisInstansi" class="w-full border border-[#90CAF9] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6]" required>
          <option value="" disabled>Pilih Jenis Instansi</option>
          <option v-for="item in jenisInstansiList" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
      </div>
      <!-- Instansi -->
      <div class="flex items-center md:justify-end">
        <label class="font-semibold text-left md:text-right w-full md:w-44 text-[#1976D2]">Instansi</label>
      </div>
      <div class="w-full">
        <select v-model="form.instansi" :disabled="!form.jenisInstansi" class="w-full border border-[#90CAF9] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6]" required>
          <option value="" disabled>Pilih Instansi</option>
          <option v-for="item in filteredInstansiList" :key="item.id" :value="item.id">{{ item.agency_name }}</option>
        </select>
      </div>
      <!-- Jabatan -->
      <div class="flex items-center md:justify-end">
        <label class="font-semibold text-left md:text-right w-full md:w-44 text-[#1976D2]">Jabatan</label>
      </div>
      <div class="w-full">
        <select v-model="form.jabatan" class="w-full border border-[#90CAF9] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6]" required>
          <option value="" disabled>Pilih Jabatan</option>
          <option v-for="item in jabatanList" :key="item.id" :value="item.id">{{ item.nama }}</option>
        </select>
      </div>
      <!-- Nama Pelatihan -->
      <div class="flex items-center md:justify-end">
        <label class="font-semibold text-left md:text-right w-full md:w-44 text-[#1976D2]">Nama Pelatihan</label>
      </div>
      <div class="w-full">
        <select v-model="form.pelatihan" class="w-full border border-[#90CAF9] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6]" required>
          <option value="" disabled>Pilih Nama Pelatihan</option>
          <option v-for="item in pelatihanList" :key="item.id" :value="item.id">{{ item.nama }}</option>
        </select>
      </div>
      <!-- Tahun Pelatihan -->
      <div class="flex items-center md:justify-end">
        <label class="font-semibold text-left md:text-right w-full md:w-44 text-[#1976D2]">Tahun Pelatihan</label>
      </div>
      <div class="w-full">
        <select v-model="form.tahunPelatihan" class="w-full border border-[#90CAF9] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6]" required>
          <option value="" disabled>Pilih Tahun Pelatihan</option>
          <option v-for="item in tahunPelatihanList" :key="item.id" :value="item.id">{{ item.tahun }}</option>
        </select>
      </div>
      <!-- Instansi Lembaga Penyelenggara -->
      <div class="flex items-center md:justify-end">
        <label class="font-semibold text-left md:text-right w-full md:w-44 text-[#1976D2]">Instansi Lembaga Penyelenggara</label>
      </div>
      <div class="w-full">
        <select v-model="form.lembagaPenyelenggara" class="w-full border border-[#90CAF9] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6]" required>
          <option value="" disabled>Pilih Instansi Lembaga Penyelenggara</option>
          <option v-for="item in filteredLemdikList" :key="item.id" :value="item.namaLemdik">{{ item.namaLemdik }}</option>
        </select>
      </div>
      <!-- Domisili Instansi Lembaga Penyelenggara -->
      <div class="flex items-center md:justify-end">
        <label class="font-semibold text-left md:text-right w-full md:w-44 text-[#1976D2]">Domisili Instansi Lembaga Penyelenggara</label>
      </div>
      <div class="w-full">
        <select v-model="form.domisiliLembagaPenyelenggara" class="w-full border border-[#90CAF9] rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#C2E7F6]" required>
          <option value="" disabled>Pilih Domisili Instansi Lembaga Penyelenggara</option>
          <option v-for="item in filteredDomisiliList" :key="item.id" :value="item.id">{{ item.nama }}</option>
        </select>
      </div>
      <!-- Nomor HP -->
      <div class="flex items-center md:justify-end">
        <label class="font-semibold text-left md:text-right w-full md:w-44 text-[#1976D2]">Nomor HP</label>
      </div>
      <div class="w-full">
        <input type="tel" name="handphone" v-model="form.handphone" class="w-full border border-[#90CAF9] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C2E7F6] bg-white shadow-sm transition" placeholder="Masukkan nomor HP" required />
      </div>
    </div>
    <div class="text-center pt-2">
      <button v-if="!saved" type="submit" class="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-10 py-3 rounded-xl shadow-lg hover:from-[#1976D2] hover:to-[#2196F3] font-bold text-lg tracking-wide transition">Simpan</button>
      <button v-else type="button" @click="goToEvaluasi" class="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-10 py-3 rounded-xl shadow-lg hover:from-[#1976D2] hover:to-[#2196F3] font-bold text-lg tracking-wide transition flex items-center gap-2">Lanjut</button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const jenisInstansiList = ref([])
const instansiList = ref([])
const filteredInstansiList = ref([])
const domisiliList = ref([])
const filteredDomisiliList = ref([])
const pelatihanList = ref([])
const jabatanList = ref([])
const tahunPelatihanList = ref([])
const lemdikList = ref([])
const filteredLemdikList = ref([])

const form = reactive({
  nama: '',
  nip: '',
  instansi: '',
  jenisInstansi: '',
  domisili: '',
  jabatan: '',
  pelatihan: '',
  tahunPelatihan: '',
  jenisLembagaPenyelenggara: '',
  lembagaPenyelenggara: '',
  domisiliLembagaPenyelenggara: '',
  handphone: '',
})
const saved = ref(false)

function goToEvaluasi() {
  router.push('/alumni/evaluasi')
}

onMounted(async () => {
  // Fetch dropdown data
  jenisInstansiList.value = await (await fetch('/api/jenis_instansi')).json()
  pelatihanList.value = await (await fetch('/api/pelatihan')).json()
  const provRes = await fetch('/api/provinsi')
  const domisiliData = await provRes.json()
  domisiliList.value = domisiliData.sort((a, b) => a.nama.localeCompare(b.nama))
  filteredDomisiliList.value = domisiliList.value
  jabatanList.value = await (await fetch('/api/jabatan')).json()
  tahunPelatihanList.value = await (await fetch('/api/tahun_pelatihan')).json()
  lemdikList.value = await (await fetch('/api/lembaga_penyelenggara')).json()
  filteredLemdikList.value = lemdikList.value
})

watch(() => form.jenisInstansi, async (val) => {
  if (val) {
    const res = await fetch(`/api/instansi/${val}`)
    const data = await res.json()
    instansiList.value = data.sort((a, b) => a.agency_name.localeCompare(b.agency_name))
    filteredInstansiList.value = instansiList.value
    form.instansi = ''
  } else {
    instansiList.value = []
    filteredInstansiList.value = []
    form.instansi = ''
  }
})

function handleSubmit() {
  if (!form.domisiliLembagaPenyelenggara) {
    alert('Mohon pilih domisili instansi lembaga penyelenggara!')
    return
  }
  const payload = {
    namaAlumni: form.nama,
    nipNrpNik: form.nip,
    instansiKategoriId: Number(form.jenisInstansi),
    instansiId: Number(form.instansi),
    domisiliId: Number(form.domisiliLembagaPenyelenggara),
    jabatanId: Number(form.jabatan),
    pelatihanId: Number(form.pelatihan),
    tahunPelatihanId: Number(form.tahunPelatihan),
    lemdik: form.lembagaPenyelenggara,
    handphone: form.handphone,
  }
  fetch('/api/profile_alumni', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(res => res.json())
    .then(result => {
      if (result.status === 'success') {
        saved.value = true
      } else {
        alert('Gagal menyimpan data: ' + (result.message || 'Unknown error'))
      }
    })
    .catch(() => {
      alert('Terjadi error saat menyimpan data!')
    })
}
</script>

