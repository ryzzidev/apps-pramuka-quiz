/* =========================================================
   1. SECURITY GUARDS & PROTECTIONS
   ========================================================= */
function triggerSecurityAlert() {
    document.getElementById('securityModal').classList.remove('hidden');
}

function closeSecurityModal() {
    document.getElementById('securityModal').classList.add('hidden');
}

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    triggerSecurityAlert();
});

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 123) {
        e.preventDefault();
        triggerSecurityAlert();
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        triggerSecurityAlert();
    }
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        triggerSecurityAlert();
    }
});

/* =========================================================
   2. SPLASH SCREEN & ONBOARDING TIMING (DURASI: 1,5 MENIT / 90 DETIK)
   ========================================================= */
window.addEventListener('DOMContentLoaded', () => {
    let progress = 0;
    const progressBar = document.getElementById('progressBar');
    const loadingPercent = document.getElementById('loadingPercent');
    const splashScreen = document.getElementById('splashScreen');
    const introModal = document.getElementById('introModal');
    const mainApp = document.getElementById('mainApp');

    // Total durasi 90.000 ms (90 detik = 1,5 menit)
    const totalDuration = 90000; 
    const updateInterval = 100; // Update progress setiap 100 milidetik
    const increment = 100 / (totalDuration / updateInterval);

    const interval = setInterval(() => {
        progress += increment;
        if (progress > 100) progress = 100;
        
        const currentPercent = Math.floor(progress);
        progressBar.style.width = currentPercent + '%';
        loadingPercent.innerText = currentPercent + '%';

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                splashScreen.classList.add('transition-opacity', 'duration-500', 'opacity-0');
                setTimeout(() => {
                    splashScreen.style.display = 'none';
                    mainApp.classList.remove('opacity-0');
                    introModal.classList.remove('hidden');
                }, 500);
            }, 300);
        }
    }, updateInterval);

    renderSandiContent();
});

function closeIntroModal() {
    document.getElementById('introModal').classList.add('hidden');
}

/* =========================================================
   3. NAVIGATION & DRAWER SYSTEM
   ========================================================= */
function toggleDrawer() {
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('drawerOverlay');
    
    if (drawer.classList.contains('-translate-x-full')) {
        drawer.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
    } else {
        drawer.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }
}

function switchTab(tabId) {
    document.getElementById('pageHome').classList.add('hidden');
    document.getElementById('pageSejarah').classList.add('hidden');
    document.getElementById('pageSandi').classList.add('hidden');
    document.getElementById('pageSku').classList.add('hidden');
    document.getElementById('pageQuiz').classList.add('hidden');

    if (tabId === 'home') document.getElementById('pageHome').classList.remove('hidden');
    if (tabId === 'sejarah') document.getElementById('pageSejarah').classList.remove('hidden');
    if (tabId === 'sandi') document.getElementById('pageSandi').classList.remove('hidden');
    if (tabId === 'sku') document.getElementById('pageSku').classList.remove('hidden');
    if (tabId === 'quiz') document.getElementById('pageQuiz').classList.remove('hidden');

    const drawer = document.getElementById('drawer');
    if (!drawer.classList.contains('-translate-x-full')) {
        toggleDrawer();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* =========================================================
   4. 15 SANDI PRAMUKA LENGKAP & DETAIL CARA PENGGUNAANNYA
   ========================================================= */
const sandiData = [
    {
        title: "1. Sandi Morse",
        concept: "Sandi sistem representasi alfabet, angka, dan tanda baca menggunakan kombinasi titik (.) pendek dan garis (-) panjang. Diciptakan oleh Samuel F.B. Morse.",
        usage: "Digunakan dalam komunikasi jarak jauh menggunakan bendera morse, peluit (tiupan pendek/panjang), cermin (pantulan cahaya), atau telegraf.",
        howTo: [
            "<strong>Cara Mengirim:</strong> Konversikan setiap huruf pesan ke dalam kode Morse. Berikan jarak antar-huruf (misal garis miring '/') dan jarak antar-kata (dua garis miring '//').",
            "<strong>Cara Menerima/Pecah:</strong> Catat urutan titik dan garis secara teliti, lalu gunakan tabel Morse untuk mencocokkan kembali ke bentuk abjad."
        ],
        example: "Kata 'PRAMUKA' → P (.--.) / R (.-.) / A (.-) / M (--)/ U (..-) / K (-.-) / A (.-)",
        img1: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka-6_169.png",
        img2: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka-5.png?w=395"
    },
    {
        title: "2. Sandi Ular",
        concept: "Sandi yang dituliskan secara zigzag bergelombang membentuk pola alur lekukan tubuh ular dari atas ke bawah dan sebaliknya.",
        usage: "Sangat efektif untuk menyamarkan berita tertulis saat navigasi lapangan agar tidak langsung terbaca oleh orang awam.",
        howTo: [
            "<strong>Cara Mengirim:</strong> Buat beberapa kolom vertikal. Tuliskan huruf pertama di kolom 1 baris 1, huruf kedua di bawahnya (baris 2), setelah mencapai batas bawah, belokkan arah tulisan meliuk naik ke kolom sebelahnya.",
            "<strong>Cara Membaca:</strong> Ikuti arah alur zigzag ular dari huruf awal hingga huruf akhir."
        ],
        example: "Pesan 'SIAP SIAGA' ditulis meliuk 2 baris:<br>Baris 1: S - A - S - A<br>Baris 2: I - P - I - G (Membaca mengular: S->I->P->A->S->I->A->G)",
        img1: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka-3.jpeg?w=1920",
        img2: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka-4.jpeg?w=1920"
    },
    {
        title: "3. Sandi Koordinat / Merah Putih",
        concept: "Sandi berbasis matriks tabel 5x5 dengan baris berlabel M-E-R-A-H dan kolom berlabel P-U-T-I-H.",
        usage: "Setiap huruf diwakili oleh 2 huruf pengganti, yaitu gabungan antara huruf baris dan huruf kolom koordinatnya.",
        howTo: [
            "<strong>Cara Mengirim:</strong> Cari posisi huruf di tabel matriks. Catat huruf barisnya (M, E, R, A, H) diikuti huruf kolomnya (P, U, T, I, H).",
            "<strong>Cara Membaca:</strong> Ambil 2 huruf secara berpasangan. Huruf pertama menentukan Baris, huruf kedua menentukan Kolom."
        ],
        example: "Huruf 'A' terletak di Baris M Kolom P → Ditulis 'MP'. Huruf 'B' di Baris M Kolom U → Ditulis 'MU'.",
        img1: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka.png?w=686"
    },
    {
        title: "4. Sandi Angka",
        concept: "Sandi yang menggantikan posisi abjad A sampai Z dengan deretan angka matematika.",
        usage: "Digunakan untuk menyampaikan berita singkat secara numerik.",
        howTo: [
            "<strong>Cara Mengirim:</strong> Tetapkan patokan konversi. Patokan standar: A=0, B=1, C=2, D=3 ... Z=25 (atau A=1 s/d Z=26). Pisahkan antar huruf dengan tanda hubung (-).",
            "<strong>Cara Membaca:</strong> Cocokkan angka kembali dengan urutan abjad sesuai kuncinya."
        ],
        example: "Kata 'PR' dengan kunci A=0 → P=15, R=17 → Ditulis: '15-17'.",
        img1: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka-9.png?w=564"
    },
    {
        title: "5. Sandi Rumput",
        concept: "Sandi visual turunan Morse yang digambarkan menyerupai gumpalan rumput.",
        usage: "Ditulis di atas kertas atau diukir di tanah/batang pohon sebagai penanda jejak perkemahan.",
        howTo: [
            "<strong>Cara Mengirim:</strong> Terjemahkan huruf ke Morse dulu. Titik (.) Morse diubah menjadi rumput pendek (v), sedangkan garis (-) diubah menjadi rumput tinggi (V). Hubungkan semua rumput tanpa putus.",
            "<strong>Cara Membaca:</strong> Hitung lekukan rumput pendek dan tinggi, ubah ke titik/garis Morse, lalu baca abjadnya."
        ],
        example: "Huruf 'A' (.-) → Rumput pendek disusul rumput tinggi (vV). Huruf 'N' (-.) → Rumput tinggi disusul pendek (Vv).",
        img1: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka-2.jpeg?w=4128"
    },
    {
        title: "6. Sandi Kotak (Kotak I, II, III)",
        concept: "Sandi bentuk geometri menggunakan struktur garis silang (#, X) dan kotak berulang.",
        usage: "Mengubah abjad menjadi simbol bentuk garis kotak. Jika ada 2 atau 3 huruf dalam satu kotak, huruf kedua dan ketiga dibedakan dengan tanda titik (.) atau (..).",
        howTo: [
            "<strong>Cara Mengirim:</strong> Gambarkan bentuk garis bingkai tempat huruf tersebut berada. Tambahkan titik jika huruf berada di urutan kedua/ketiga.",
            "<strong>Cara Membaca:</strong> Perhatikan bentuk garis bingkai beserta ada/tidaknya titik di dalamnya."
        ],
        example: "Sandi Kotak I: Huruf A (kotak siku tanpa titik), Huruf B (kotak siku dengan 1 titik).",
        img1: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka.jpeg?w=4128"
    },
    {
        title: "7. Sandi Napoleon",
        concept: "Sandi yang mengadopsi taktik pergerakan pasukan militer Napoleon Bonaparte dengan pola penulisan bolak-balik.",
        usage: "Menyembunyikan susunan kata asli agar tidak bisa dibaca langsung secara horizontal.",
        howTo: [
            "<strong>Cara Mengirim:</strong> Bagi pesan menjadi beberapa kelompok baris dengan jumlah huruf sama. Baris 1 ditulis Kiri ke Kanan. Baris 2 ditulis Kanan ke Kiri. Baris 3 ditulis Kiri ke Kanan lagi.",
            "<strong>Cara Membaca:</strong> BACA baris pertama dari kiri ke kanan, baris kedua dari kanan ke kiri, dan seterusnya."
        ],
        example: "Pesan 'SELAMAT DATANG' (3 baris x 4 huruf):<br>Baris 1: S E L A (Kiri->Kanan)<br>Baris 2: G N A T (Kanan->Kiri, dibaca TANG)<br>Baris 3: M A T X (Kiri->Kanan)",
        img1: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka-1.jpeg?w=1920"
    },
    {
        title: "8. Sandi Abjad Internasional (Phonetic Alphabet)",
        concept: "Sandi ejaan standar internasional NATO yang mengganti abjad dengan kata fonetik yang mudah didengar jelas.",
        usage: "Mencegah kesalahan komunikasi radio/HT saat cuaca buruk atau sinyal lemah.",
        howTo: [
            "<strong>Cara Mengirim:</strong> Ucapkan atau tuliskan kata fonetik mewakili tiap huruf. A=Alfa, B=Bravo, C=Charlie, D=Delta, E=Echo, F=Foxtrot, dst.",
            "<strong>Cara Membaca:</strong> Ambil huruf depan dari setiap kata fonetik yang diucapkan."
        ],
        example: "Kata 'SKANSA' diucapkan: Sierra - Kilo - Alfa - November - Sierra - Alfa.",
        img1: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka-10.png?w=652"
    },
    {
        title: "9. Sandi Kurung",
        concept: "Sandi yang menggunakan tanda kurung tunggal (), kurung ganda (()), dan angka romawi/posisi untuk mewakili huruf.",
        usage: "Membagi 26 abjad ke dalam kelompok-kelompok kurung.",
        howTo: [
            "<strong>Cara Mengirim:</strong> Tentukan kelompok kurung huruf tersebut (misal tanpa kurung = kelompok 1, kurung satu () = kelompok 2, kurung dua (()) = kelompok 3). Angka di dalam/samping menunjukkan urutan huruf di kelompok tersebut.",
            "<strong>Cara Membaca:</strong> Hitung jumlah tanda kurung untuk tahu kelompoknya, lalu lihat angkanya."
        ],
        example: "Huruf A = 1, Huruf B = 2, Huruf J = (1), Huruf K = (2). Kata 'B' ditulis '2'.",
        img1: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka-1.png?w=561"
    },
    {
        title: "10. Sandi Sisipan",
        concept: "Sandi dengan cara menyisipkan kata kunci rahasia (seperti 'AND', 'PRA', atau 'BAN') di antara setiap suku kata pesan asli.",
        usage: "Mengecoh orang awam yang mendengar atau membaca tulisan secara sekilas.",
        howTo: [
            "<strong>Cara Mengirim:</strong> Tentukan kata kunci sisipan, misal 'AND'. Sisipkan 'AND' di setiap tengah suku kata. Kalimat 'KAMI ADA' → K(AND)A - M(AND)I A(AND)D - A.",
            "<strong>Cara Membaca:</strong> Cari kata kunci sisipannya ('AND'), lalu hapus atau coret seluruh kata 'AND' tersebut hingga menyisakan huruf aslinya."
        ],
        example: "Sandi: 'PANDRA MUNDKA' → Coret 'AND' → Hasil: 'PRA MUKA'."
    },
    {
        title: "11. Sandi AN & Sandi Balik (AZ)",
        concept: "Sandi simetris. Sandi AN membagi abjad menjadi 2 baris (A-M di atas, N-Z di bawah). Sandi AZ membalik posisi A ke Z.",
        usage: "Sandi transposisi cepat tanpa butuh alat bantu rumit.",
        howTo: [
            "<strong>Sandi AN:</strong> A dikonversi ke N, B ke O, C ke P, dst (dan sebaliknya N ke A).",
            "<strong>Sandi AZ:</strong> A dikonversi ke Z, B ke Y, C ke X (dan sebaliknya Z ke A)."
        ],
        example: "Sandi AN: Kata 'PRAMUKA' → P diganti C, R diganti E, A diganti N, dst.",
        img1: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka-8.png?w=300"
    },
    {
        title: "12. Sandi Siput",
        concept: "Sandi yang susunan hurufnya ditulis melingkar spiral seperti cangkang hewan siput.",
        usage: "Pengirim menyembunyikan titik awal baca di tengah atau di ujung lingkaran.",
        howTo: [
            "<strong>Cara Mengirim:</strong> Tuliskan pesan melingkar diputar searah jarum jam dari titik pusat ke arah luar (atau dari luar ke pusat).",
            "<strong>Cara Membaca:</strong> Temukan petunjuk titik awal huruf (biasanya ada huruf kapital atau tanda titik), lalu ikuti alur spiralnya."
        ],
        example: "Pesan 'REGU ELANG' ditulis memutar dari tengah: R->E->G->U->E->L->A->N->G.",
        img1: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka-2.png?w=205"
    },
    {
        title: "13. Sandi Jepang / Kanji Pseudo",
        concept: "Sandi yang terinspirasi dari tata cara penulisan huruf Kanji/Kana tradisional di Jepang.",
        usage: "Menuliskan abjad biasa dari atas ke bawah dan dimulai dari kolom paling kanan menuju ke kiri.",
        howTo: [
            "<strong>Cara Mengirim:</strong> Susun pesan per kolom vertikal dari atas ke bawah. Mulai kolom pertama dari sisi kanan.",
            "<strong>Cara Membaca:</strong> Baca dari pojok kanan atas ke bawah, lalu pindah ke kolom sebelah kirinya."
        ],
        example: "Teks 'PRA MUK A' disusun 3 kolom vertikal dari kanan ke kiri.",
        img1: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka-11.png?w=319"
    },
    {
        title: "14. Sandi Sungai",
        concept: "Sandi dengan matriks 8 kolom yang melambangkan aliran sungai yaitu huruf S-U-N-G-A-I-O-P.",
        usage: "Setiap huruf yang berseberangan dalam susunan baris matriks sungai akan saling menggantikan.",
        howTo: [
            "<strong>Cara Mengirim:</strong> Buat 8 kolom. Susun huruf A-Z berputar di dalam tabel tersebut. Tukar huruf pesan dengan huruf yang berada tepat di seberangnya.",
            "<strong>Cara Membaca:</strong> Cari huruf sandi pada tabel sungai, lalu ambil huruf lawannya di posisi seberang."
        ],
        example: "Jika huruf P berseberangan dengan V di matriks sungai, maka kata dengan huruf 'P' diganti menjadi 'V'."
    },
    {
        title: "15. Sandi Semaphore",
        concept: "Sandi berbasis isyarat visual bergerak menggunakan 2 buah bendera berukuran 45x45 cm berwarna merah-kuning.",
        usage: "Penyampaian berita jarak jauh antar bukit/pos komunikasi.",
        howTo: [
            "<strong>Cara Mengirim:</strong> Petugas memegang kedua bendera dan membentuk sudut derajat tertentu mewakili huruf A sampai Z.",
            "<strong>Cara Membaca:</strong> Penerima melihat arah jarum jam/posisi sudut kedua bendera penerbang."
        ],
        example: "Huruf 'A' = Tangan kanan turun 45 derajat, tangan kiri lurus ke bawah. Huruf 'B' = Tangan kanan lurus horizontal 90 derajat.",
        img1: "https://awsimages.detik.net.id/community/media/visual/2022/11/04/sandi-pramuka-3.png?w=905"
    }
];

function renderSandiContent() {
    const container = document.getElementById('sandiAccordion');
    container.innerHTML = sandiData.map((s, idx) => `
        <div class="border border-pramuka-accent rounded-2xl overflow-hidden bg-white shadow-sm">
            <button onclick="toggleAccordion(${idx})" class="w-full text-left p-4 bg-pramuka-bg flex items-center justify-between font-bold text-pramuka-dark hover:bg-pramuka-accent/30 transition">
                <span class="text-sm sm:text-base text-pramuka-primary">${s.title}</span>
                <i id="accordionIcon-${idx}" class="fa-solid fa-chevron-down text-xs text-pramuka-primary transition-transform"></i>
            </button>
            <div id="accordionBody-${idx}" class="hidden p-5 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-pramuka-accent space-y-3">
                <div class="bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                    <p class="font-bold text-amber-900 mb-1"><i class="fa-solid fa-lightbulb text-pramuka-gold mr-1"></i> Konsep Dasar:</p>
                    <p>${s.concept}</p>
                </div>

                <div>
                    <p class="font-bold text-pramuka-dark mb-1"><i class="fa-solid fa-bullseye text-pramuka-primary mr-1"></i> Fungsi / Penggunaan:</p>
                    <p>${s.usage}</p>
                </div>

                <div class="bg-pramuka-bg p-3.5 rounded-xl border border-pramuka-accent space-y-1.5">
                    <p class="font-bold text-pramuka-dark mb-1"><i class="fa-solid fa-gears text-pramuka-primary mr-1"></i> Cara Menggunakan (Kirim & Baca):</p>
                    ${s.howTo.map(item => `<p class="pl-2 border-l-2 border-pramuka-primary">${item}</p>`).join('')}
                </div>

                ${s.example ? `
                    <div class="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                        <p class="font-bold text-emerald-900 mb-0.5"><i class="fa-solid fa-vial text-emerald-600 mr-1"></i> Contoh Latihan Pemecahan:</p>
                        <p class="font-mono text-emerald-800 text-xs">${s.example}</p>
                    </div>
                ` : ''}

                ${s.img1 ? `<div class="mt-3 text-center"><p class="text-[11px] font-bold text-gray-500 mb-1">Diagram Visual Sandi:</p><img src="${s.img1}" alt="${s.title}" class="w-full max-w-md rounded-xl border border-gray-300 shadow-sm object-contain mx-auto"></div>` : ''}
                ${s.img2 ? `<div class="mt-2 text-center"><img src="${s.img2}" alt="${s.title} 2" class="w-full max-w-md rounded-xl border border-gray-300 shadow-sm object-contain mx-auto"></div>` : ''}
            </div>
        </div>
    `).join('');
}

function toggleAccordion(idx) {
    const body = document.getElementById(`accordionBody-${idx}`);
    const icon = document.getElementById(`accordionIcon-${idx}`);
    if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        body.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

/* =========================================================
   5. QUIZ ENGINE & AUDIO SYNTHESIZER
   ========================================================= */
const masterBank = [
    { q: "Siapakah Pendiri Gerakan Kepanduan Dunia?", c: "Lord Robert Baden-Powell", w: "Soekarno" },
    { q: "Kapan Hari Pramuka Indonesia diperingati setiap tahunnya?", c: "14 Agustus", w: "10 November" },
    { q: "Sandi yang menggunakan sistem titik dan garis adalah...", c: "Sandi Morse", w: "Sandi Sungai" },
    { q: "Sandi Rumput merupakan turunan langsung dari sandi...", c: "Sandi Morse", w: "Sandi Kotak" },
    { q: "Simbol rumput pendek (v) pada Sandi Rumput melambangkan...", c: "Titik (.)", w: "Garis (-)" },
    { q: "Apa nama lagu kebangsaan yang sering dinyanyikan dalam upacara Pramuka?", c: "Indonesia Raya", w: "Maju Tak Gentar" },
    { q: "Tingkatan Pramuka untuk usia 16–20 tahun dinamakan...", c: "Pramuka Penegak", w: "Pramuka Siaga" },
    { q: "Tingkatan SKU Penegak yang pertama setelah dilantik adalah...", c: "Bantara", w: "Laksana" },
    { q: "Warna dasar bagan TKK bidang sosial dan kemanusiaan adalah...", c: "Biru", w: "Merah" },
    { q: "Bentuk Tanda Kecakapan Khusus (TKK) tingkat Purwa adalah...", c: "Lingkaran", w: "Segilima" },
    { q: "Sandi yang memanfaatkan tabel koordinat M-E-R-A-H dan P-U-T-I-H adalah...", c: "Sandi Merah Putih", w: "Sandi Jepang" },
    { q: "Sandi yang dibaca melingkar berputar dari luar ke dalam dinamakan...", c: "Sandi Siput", w: "Sandi Ular" },
    { q: "Penggunaan bendera dengan gerakan lengan untuk menyampaikan berita adalah...", c: "Semaphore", w: "Kompas" },
    { q: "Sandi yang menggunakan pasangan abjad baris atas (A-M) dan bawah (N-Z) adalah...", c: "Sandi AN", w: "Sandi Kurung" },
    { q: "Tahun berapakah Gerakan Pramuka diresmikan di Indonesia?", c: "1961", w: "1945" },
    { q: "Siapakah Bapak Pramuka Indonesia?", c: "Sri Sultan Hamengkubuwono IX", w: "Jenderal Soedirman" },
    { q: "Kode kehormatan Pramuka Penegak terdiri dari...", c: "Tri Satya & Dasa Darma", w: "Dwi Satya & Dwi Darma" },
    { q: "Sandi yang kelompok hurufnya dituliskan bergelombang zigzag adalah...", c: "Sandi Ular", w: "Sandi Angka" },
    { q: "Dalam Sandi Abjad Internasional (NATO), huruf 'A' dieja sebagai...", c: "Alfa", w: "Apple" },
    { q: "Dalam Sandi Abjad Internasional (NATO), huruf 'B' dieja sebagai...", c: "Bravo", w: "Banana" },
    { q: "Sandi yang ditulis tegak lurus dari atas ke bawah lalu dari kanan ke kiri adalah...", c: "Sandi Jepang", w: "Sandi Napoleon" },
    { q: "Tanda Kecakapan Khusus (TKK) tingkat Utama berbentuk...", c: "Segilima", w: "Persegi" },
    { q: "Dalam Sandi Angka konversi A=0, maka huruf C diwakili oleh angka...", c: "2", w: "3" },
    { q: "Berapa jumlah Dasa Darma Pramuka?", c: "10", w: "12" },
    { q: "Sebutan untuk satuan kelompok Pramuka Penegak adalah...", c: "Sangga", w: "Regu" },
    { q: "Sandi yang menyisipkan kata kunci di setiap suku kata dinamakan...", c: "Sandi Sisipan", w: "Sandi Kotak" },
    { q: "Sandi Balik (AZ) mengganti huruf 'A' menjadi huruf...", c: "Z", w: "M" },
    { q: "Sandi yang menggunakan struktur kotak garis silang dan sejajar adalah...", c: "Sandi Kotak", w: "Sandi Siput" },
    { q: "Simbol utama Pramuka Indonesia adalah...", c: "Tunas Kelapa", w: "Bintang" },
    { q: "Dasa Darma ke-1 berbunyi...", c: "Taqwa kepada Tuhan Yang Maha Esa", w: "Suci dalam pikiran, perkataan dan perbuatan" }
];

let activeQuestions = [];
let currentQIndex = 0;
let scoreCorrect = 0;
let scoreWrong = 0;
let userWrongAnswers = [];
let timerInterval = null;
let timeLeft = 15 * 60;

function playAudioEffect(type) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'win') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } else {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        }
    } catch (e) {}
}

function startQuiz(num) {
    activeQuestions = [];
    while (activeQuestions.length < num) {
        const shuffled = [...masterBank].sort(() => 0.5 - Math.random());
        activeQuestions.push(...shuffled);
    }
    activeQuestions = activeQuestions.slice(0, num);

    activeQuestions = activeQuestions.map(item => {
        const isCorrectFirst = Math.random() < 0.5;
        return {
            q: item.q,
            options: isCorrectFirst ? [item.c, item.w] : [item.w, item.c],
            correctIdx: isCorrectFirst ? 0 : 1,
            correctText: item.c
        };
    });

    currentQIndex = 0;
    scoreCorrect = 0;
    scoreWrong = 0;
    userWrongAnswers = [];
    timeLeft = 15 * 60;

    document.getElementById('quizSetupCard').classList.add('hidden');
    document.getElementById('quizResultCard').classList.add('hidden');
    document.getElementById('quizActiveCard').classList.remove('hidden');

    document.getElementById('totalQuestionNum').innerText = activeQuestions.length;

    startTimer();
    loadQuestion();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        document.getElementById('quizTimer').innerText = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishQuiz();
        }
    }, 1000);
}

function loadQuestion() {
    const data = activeQuestions[currentQIndex];
    document.getElementById('currentQuestionNum').innerText = currentQIndex + 1;
    document.getElementById('questionText').innerText = data.q;

    const progPercent = ((currentQIndex) / activeQuestions.length) * 100;
    document.getElementById('quizProgressBar').style.width = progPercent + '%';

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = data.options.map((optText, idx) => `
        <button onclick="submitAnswer(${idx})" class="w-full p-4 rounded-2xl border-2 border-pramuka-accent hover:border-pramuka-primary hover:bg-pramuka-bg transition text-left font-semibold text-pramuka-dark flex items-center justify-between group active:scale-[0.99]">
            <span>${optText}</span>
            <div class="w-6 h-6 rounded-full border-2 border-pramuka-accent group-hover:border-pramuka-primary flex items-center justify-center text-xs">
                <i class="fa-solid fa-check opacity-0 group-hover:opacity-100 text-pramuka-primary"></i>
            </div>
        </button>
    `).join('');
}

function submitAnswer(selectedIdx) {
    const data = activeQuestions[currentQIndex];
    const buttons = document.getElementById('optionsContainer').children;

    for (let btn of buttons) btn.onclick = null;

    // INDIKATOR WARNA JAWABAN QUIZ (HIJAU JIKA BENAR, MERAH JIKA SALAH)
    if (selectedIdx === data.correctIdx) {
        buttons[selectedIdx].classList.remove('border-pramuka-accent');
        buttons[selectedIdx].classList.add('bg-emerald-500', 'text-white', 'border-emerald-600');
        scoreCorrect++;
        playAudioEffect('win');
    } else {
        buttons[selectedIdx].classList.remove('border-pramuka-accent');
        buttons[selectedIdx].classList.add('bg-rose-500', 'text-white', 'border-rose-600', 'animate-shake');
        
        // Tampilkan jawaban benar dengan warna hijau
        buttons[data.correctIdx].classList.add('bg-emerald-500', 'border-emerald-600', 'text-white');
        
        scoreWrong++;
        userWrongAnswers.push({
            q: data.q,
            userAns: data.options[selectedIdx],
            correctAns: data.correctText
        });
        playAudioEffect('fail');
    }

    setTimeout(() => {
        currentQIndex++;
        if (currentQIndex < activeQuestions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    }, 1000);
}

function finishQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quizActiveCard').classList.add('hidden');
    document.getElementById('quizResultCard').classList.remove('hidden');

    const total = activeQuestions.length;
    const finalScore = Math.round((scoreCorrect / total) * 100);

    document.getElementById('countCorrect').innerText = scoreCorrect;
    document.getElementById('countWrong').innerText = scoreWrong;
    document.getElementById('countScore').innerText = finalScore;

    const iconBox = document.getElementById('resultIconBox');
    const resultTitle = document.getElementById('resultTitle');
    const resultMotivator = document.getElementById('resultMotivator');

    if (finalScore >= 80) {
        iconBox.className = "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-md bg-emerald-100 text-emerald-600 border-2 border-emerald-400";
        iconBox.innerHTML = '<i class="fa-solid fa-trophy"></i>';
        resultTitle.innerText = "Luar Biasa! Pemimpin Sejati!";
        resultMotivator.innerText = "Pujian setinggi-tingginya untukmu! Pengetahuan kepramukaanmu sangat matang. Pertahankan semangat juang Pramuka SKANSA!";
        
        if (typeof confetti === 'function') {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
    } else if (finalScore >= 50) {
        iconBox.className = "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-md bg-amber-100 text-amber-600 border-2 border-amber-400";
        iconBox.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>';
        resultTitle.innerText = "Cukup Bagus! Terus Tingkatkan!";
        resultMotivator.innerText = "Hasil yang baik! Sedikit lagi latihan pada modul Sejarah & Sandi, kamu pasti bisa meraih skor sempurna!";
    } else {
        iconBox.className = "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-md bg-rose-100 text-rose-600 border-2 border-rose-400";
        iconBox.innerHTML = '<i class="fa-solid fa-heart-crack"></i>';
        resultTitle.innerText = "Jangan Menyerah!";
        resultMotivator.innerText = "Kegagalan adalah awal dari keberhasilan! Pelajari kembali materi di Menu 1, 2, dan 3 lalu coba lagi ya kakak/adik!";
    }

    const reviewList = document.getElementById('reviewList');
    if (userWrongAnswers.length === 0) {
        reviewList.innerHTML = '<p class="text-emerald-600 font-semibold text-center">Sempurna! Tidak ada jawaban yang salah.</p>';
    } else {
        reviewList.innerHTML = userWrongAnswers.map((item, idx) => `
            <div class="bg-white p-3 rounded-xl border border-gray-200">
                <p class="font-bold text-gray-800">${idx + 1}. ${item.q}</p>
                <p class="text-rose-600 mt-1"><i class="fa-solid fa-xmark mr-1"></i> Jawabanmu: <span class="font-medium">${item.userAns}</span></p>
                <p class="text-emerald-600"><i class="fa-solid fa-check mr-1"></i> Jawaban Benar: <span class="font-medium">${item.correctAns}</span></p>
            </div>
        `).join('');
    }
}

function resetQuiz() {
    document.getElementById('quizResultCard').classList.add('hidden');
    document.getElementById('quizSetupCard').classList.remove('hidden');
}
