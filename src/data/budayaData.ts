// Data Budaya Nusantara untuk Aplikasi Jelajah Budaya Nusantara

export interface SukuBudaya {
  id: string;
  nama: string;
  provinsi: string;
  pulau: 'Jawa' | 'Sumatera' | 'Sulawesi' | 'Nusa Tenggara' | 'Maluku' | 'Kalimantan' | 'Bali' | 'Papua';
  warna: string;
  warnaBg: string;
  badgeColor: string;
  pakaian: string;
  pakaianDetail?: string;
  kuliner: string;
  kulinerDetail?: string;
  budaya: string;
  budayaDetail?: string;
  fakta: string;
  salam: string;
  ikon: string;
  alatMusik: string;
  rumahAdat: string;
}

export interface KuisItem {
  id: string;
  gambar: string; // nama objek budaya yang ditebak
  benar: string;  // deskripsi penjodohan yang benar
  kategori: 'Pakaian' | 'Kuliner' | 'Kesenian' | 'Tradisi' | 'Alat Musik' | 'Arsitektur';
  asalSuku: string;
  petunjuk: string;
}

export interface LencanaBudaya {
  id: string;
  judul: string;
  deskripsi: string;
  ikon: string;
  syarat: string;
}

export const DATA_SUKU: Record<string, SukuBudaya> = {
  "Betawi": {
    id: "betawi",
    nama: "Betawi",
    provinsi: "DKI Jakarta",
    pulau: "Jawa",
    warna: "#E53935",
    warnaBg: "#FFEBEE",
    badgeColor: "bg-red-500",
    pakaian: "Pria: Baju Sadariah\nWanita: Kebaya Encim",
    pakaianDetail: "Baju Sadariah biasanya dipadukan dengan celana komprang, peci hitam, dan kain cukin yang disampirkan di leher. Kebaya Encim berhias bordir warna cerah khas peranakan.",
    kuliner: "Kerak Telor\n(nasi ketan + telur + ebi)",
    kulinerDetail: "Dibuat dari beras ketan putih, telur bebek atau ayam, serundeng kelapa sangrai, ebi kering, dan bawang goreng gurih tanpa minyak!",
    budaya: "Ondel-ondel\n(boneka raksasa untuk pawai)",
    budayaDetail: "Seni pertunjukan boneka setinggi 2,5 meter yang terbuat dari anyaman bambu dengan hiasan kelapa di kepalanya dan diiringi musik tanjidor.",
    fakta: "Ondel-ondel dulu digunakan untuk mengusir roh jahat!",
    salam: "Halo Abang & Non!",
    ikon: "🎭",
    alatMusik: "Gambang Kromong & Tanjidor",
    rumahAdat: "Rumah Kebaya"
  },
  "Bugis/Makassar": {
    id: "bugis",
    nama: "Bugis/Makassar",
    provinsi: "Sulawesi Selatan",
    pulau: "Sulawesi",
    warna: "#F9A825",
    warnaBg: "#FFFDE7",
    badgeColor: "bg-amber-500",
    pakaian: "Wanita: Baju Bodo\nPria: Jas Tutu + Songkok Recca",
    pakaianDetail: "Baju Bodo berbentuk segi empat tanpa lengan bersiluet longgar dengan warna cerah yang dahulu mencerminkan usia dan strata sosial pemakainya.",
    kuliner: "Coto Makassar\n(sup daging + jeroan + kuah kacang)",
    kulinerDetail: "Sup berkuah kental dari rebusan daging dan jeroan sapi berpadu rempah-rempah serta kacang tanah giling, disajikan lezat bersama ketupat.",
    budaya: "Baju Bodo adalah salah satu pakaian adat tertua di Indonesia",
    budayaDetail: "Masyarakat Bugis juga terkenal dengan keahlian maritim membangun Kapal Pinisi yang mengarungi samudra dunia.",
    fakta: "Baju Bodo sudah ada sejak abad ke-9 dan diperkirakan terbuat dari kain muslin tertua di dunia!",
    salam: "Tabe' (Salam Hormat)!",
    ikon: "⛵",
    alatMusik: "Kecapi Bugis & Gandrang",
    rumahAdat: "Rumah Panggung Bugis (Balla)"
  },
  "Melayu Riau": {
    id: "melayu-riau",
    nama: "Melayu Riau",
    provinsi: "Riau",
    pulau: "Sumatera",
    warna: "#43A047",
    warnaBg: "#E8F5E9",
    badgeColor: "bg-emerald-600",
    pakaian: "Pria: Baju Kurung Cekak Musang\nWanita: Kebaya Laboh",
    pakaianDetail: "Baju Kurung memiliki kerah tegak berbutir kancing lima, dipadukan kain songket Melayu di pinggang dan peci hitam yang sopan.",
    kuliner: "Makanan khas Melayu (asam pedas, gulai)",
    kulinerDetail: "Gulai ikan patin asam pedas berkuah merah segar dengan bumbu belimbing wuluh dan rempah daun kesum yang wangi khas.",
    budaya: "Candi Muara Takus & Istana Siak",
    budayaDetail: "Seni berbalas pantun Melayu, Gurindam Dua Belas karya Raja Ali Haji, serta tarian Zapin bernuansa keagungan budi pekerti.",
    fakta: "Masyarakat Melayu sangat menjunjung tinggi adat resam (tata krama) dan bahasa Melayu Riau menjadi salah satu dasar Bahasa Indonesia!",
    salam: "Salam Hangat Melayu!",
    ikon: "📜",
    alatMusik: "Gambus & Kompang",
    rumahAdat: "Rumah Selaso Jatuh Kembar"
  },
  "Rote": {
    id: "rote",
    nama: "Rote",
    provinsi: "Nusa Tenggara Timur",
    pulau: "Nusa Tenggara",
    warna: "#8D6E63",
    warnaBg: "#EFEBE9",
    badgeColor: "bg-stone-600",
    pakaian: "Kain Tenun Ikat Rote\n+ Topi Ti'i Langga (dari daun lontar)",
    pakaianDetail: "Topi Ti'i Langga memiliki antena khas menyerupai topi pelaut Portugis kuno, dibuat dari anyaman daun lontar kering yang kokoh dan artistik.",
    kuliner: "Makanan khas NTT berbahan jagung & ubi",
    kulinerDetail: "Jagung bose (bubur jagung santan kacang merah) dan catemak jagung yang gurih bernutrisi tinggi sebagai makanan pokok tradisional.",
    budaya: "Alat musik Sasando\n(petik dari daun lontar)",
    budayaDetail: "Sasando adalah alat musik dawai petik yang dikelilingi wadah resonator berbentuk kipas dari anyaman daun pohon lontar yang anggun.",
    fakta: "Sasando hanya bisa dimainkan dengan baik setelah berlatih bertahun-tahun karena membutuhkan petikan dua tangan yang sangat lembut!",
    salam: "Mai Fali (Selamat Datang)!",
    ikon: "🎶",
    alatMusik: "Sasando Rote",
    rumahAdat: "Uma Kebubu"
  },
  "Ambon": {
    id: "ambon",
    nama: "Ambon",
    provinsi: "Maluku",
    pulau: "Maluku",
    warna: "#1E88E5",
    warnaBg: "#E3F2FD",
    badgeColor: "bg-blue-600",
    pakaian: "Baju Cele\n(bermotif kotak-kotak cerah)",
    pakaianDetail: "Baju Cele bermotif garis kotak-kotak geometris merah atau hitam, dipadukan kain sarung tenun khas dan sanggul berhias kembang goyang emas.",
    kuliner: "Ikan bakar & papeda khas Maluku",
    kulinerDetail: "Ikan cakalang bakar dengan sambal colo-colo pedas segar asam limau, serta papeda sagu kenyal yang disantap bersama sayur kuah kuning.",
    budaya: "Alat musik Tifa & Tari Cakalele\n(tarian perang)",
    budayaDetail: "Tari Cakalele dibawakan dengan parang dan tameng salawaku oleh para ksatria gagah diiringi dentuman tifa yang bersemangat.",
    fakta: "Tifa sering dimainkan saat upacara adat dan pesta rakyat sebagai simbol persaudaraan 'Pela Gandong'!",
    salam: "Tabea (Salam Sejahtera)!",
    ikon: "🥁",
    alatMusik: "Tifa Totobuang & Tahuri (Terompet Kerang)",
    rumahAdat: "Baileo"
  },
  "Minangkabau": {
    id: "minang",
    nama: "Minangkabau",
    provinsi: "Sumatera Barat",
    pulau: "Sumatera",
    warna: "#D84315",
    warnaBg: "#FBE9E7",
    badgeColor: "bg-orange-600",
    pakaian: "Pria: Baju Penghulu & Deta\nWanita: Baju Batabue & Tikuluak Tanduk",
    pakaianDetail: "Penutup kepala wanita berbentuk melengkung runcing menyerupai tanduk kerbau (Tikuluak Tanduk) dipadukan kain songket Pandai Sikek bersulam benang emas.",
    kuliner: "Rendang Daging\n(dimasak lama dengan santan & rempah)",
    kulinerDetail: "Masakan daging sapi asli Minang yang dimasak perlahan berjam-jam hingga kering berwarna cokelat pekat kehitaman beraroma rempah sedap.",
    budaya: "Rumah Gadang & Tari Piring",
    budayaDetail: "Tari Piring dimainkan dengan memegang piring kaca di kedua telapak tangan lalu diayunkan lincah tanpa jatuh, bahkan melompat di atas pecahan piring!",
    fakta: "Rumah Gadang dirancang tahan gempa dengan sistem pasak kayu elastis tanpa menggunakan satu paku besi pun!",
    salam: "Salamaik Datang dunsanak!",
    ikon: "🏛️",
    alatMusik: "Saluang & Talempong",
    rumahAdat: "Rumah Gadang"
  },
  "Jawa": {
    id: "jawa",
    nama: "Jawa",
    provinsi: "Jawa Tengah & DI Yogyakarta",
    pulau: "Jawa",
    warna: "#6D4C41",
    warnaBg: "#EFEBE9",
    badgeColor: "bg-amber-800",
    pakaian: "Pria: Beskap, Jarik Batik & Blangkon\nWanita: Kebaya & Sanggul Ayu",
    pakaianDetail: "Blangkon adalah penutup kepala pria dengan tonjolan mondolan di belakang yang melambangkan kesantunan dan kemampuan menyimpan rahasia.",
    kuliner: "Gudeg Jogja\n(nangka muda manis legit dimasak santan)",
    kulinerDetail: "Nangka muda (gori) dimasak berjam-jam dengan gula kelapa, daun jati, dan santan gurih, disajikan dengan krecek pedas dan telur areh.",
    budaya: "Wayang Kulit & Gamelan Jawa",
    budayaDetail: "Pertunjukan teater boneka kulit yang dimainkan oleh Dalang semalam suntuk diiringi alunan gong, kendang, dan saron gamelan berlaras slendro-pelog.",
    fakta: "Wayang Kulit telah diakui oleh UNESCO sebagai Warisan Budaya Takbenda Dunia sejak tahun 2003!",
    salam: "Sugeng Rawuh!",
    ikon: "🪆",
    alatMusik: "Gamelan Ageng (Gong, Kendang, Saron)",
    rumahAdat: "Rumah Joglo"
  },
  "Bali": {
    id: "bali",
    nama: "Bali",
    provinsi: "Bali",
    pulau: "Bali",
    warna: "#00897B",
    warnaBg: "#E0F2F1",
    badgeColor: "bg-teal-600",
    pakaian: "Pria: Baju Safari, Kampuh & Udeng\nWanita: Kebaya Bali & Sabuk Prada",
    pakaianDetail: "Udeng diikatkan di kepala pria dengan simpul di depan dahi menghadap ke atas melambangkan pikiran yang suci dan terfokus pada Sang Pencipta.",
    kuliner: "Ayam Betutu & Sate Lilit Ikan",
    kulinerDetail: "Ayam utuh dibumbui rempah Base Genep lengkap lalu dibungkus pelepah pinang atau daun pisang, kemudian dipanggang pelan hingga empuk meresap.",
    budaya: "Tari Kecak, Tari Pendet & Upacara Ngaben",
    budayaDetail: "Tari Kecak dibawakan puluhan penari pria yang duduk melingkar menyerukan 'cak-cak-ke-cak' serempak mengitari kobaran api obor di tengah lingkaran.",
    fakta: "Tari Kecak tidak memakai instrumen gamelan sama sekali, melainkan suara paduan ratusan penari bersahut-sahutan!",
    salam: "Om Swastyastu!",
    ikon: "🌺",
    alatMusik: "Gamelan Gong Kebyar & Rindik Bambu",
    rumahAdat: "Gapura Candi Bentar"
  },
  "Dayak": {
    id: "dayak",
    nama: "Dayak",
    provinsi: "Kalimantan Barat & Tengah",
    pulau: "Kalimantan",
    warna: "#C2185B",
    warnaBg: "#FCE4EC",
    badgeColor: "bg-pink-700",
    pakaian: "Pria: King Baba (kulit kapuo)\nWanita: King Bibinge berhias manik-manik",
    pakaianDetail: "Pakaian tradisional dibuat dari kulit kayu alami yang ditempa halus, dihiasi sulaman manik manik warna-warni dan mahkota bulu burung enggang yang agung.",
    kuliner: "Juhu Singkah (rebung rotan muda gurih)",
    kulinerDetail: "Umbut rotan muda dimasak berkuah rempah bersama ikan baung atau ikan patin sungai, menghasilkan sensasi rasa gurih berpadu sedikit pahit nikmat.",
    budaya: "Alat musik petik Sape' & Tari Mandau",
    budayaDetail: "Alat musik petik dawai Sape' yang terukir indah melantunkan nada-nada syahdu penyejuk hutan tropis Kalimantan.",
    fakta: "Rumah Betang suku Dayak bisa dihuni oleh lebih dari 20 keluarga sekaligus dalam satu atap rumah panggung raksasa!",
    salam: "Adil Ka' Talino, Bacuramin Ka' Saruga!",
    ikon: "🪶",
    alatMusik: "Sape' (Sampe)",
    rumahAdat: "Rumah Betang (Rumah Panjang)"
  },
  "Asmat": {
    id: "asmat",
    nama: "Asmat",
    provinsi: "Papua Selatan",
    pulau: "Papua",
    warna: "#5D4037",
    warnaBg: "#EFEBE9",
    badgeColor: "bg-amber-950",
    pakaian: "Pria & Wanita: Rok rumbai daun sagu & hiasan bulu kasuari",
    pakaianDetail: "Terbuat dari serat daun pohon sagu yang dikeringkan, dihiasi kalung taring babi hutan, kerang, dan mahkota bulu burung kasuari.",
    kuliner: "Papeda dengan kuah ikan kuning asam segar",
    kulinerDetail: "Tepung sagu murni disiram air mendidih diaduk hingga menjadi bubur kenyal bening, dimakan menggunakan gata-gata bersama kuah kunyit ikan tongkol.",
    budaya: "Seni Ukir Tiang Bisj & Tari Tifa",
    budayaDetail: "Seni memahat kayu pohon bakau atau pala hutan menjadi patung leluhur bertingkat yang diakui dunia internasional karena keunikan estetika primitifnya.",
    fakta: "Pemahat Asmat mengukir kayu secara langsung tanpa membuat sketsa pensil terlebih dahulu!",
    salam: "Kao Kawa (Salam Persaudaraan)!",
    ikon: "🗿",
    alatMusik: "Tifa Papua",
    rumahAdat: "Rumah Jew (Rumah Bujang)"
  }
};

// Data Kuis Menjodohkan (berisi item asli dari script python + item tambahan yang selaras)
export const DATA_KUIS: KuisItem[] = [
  {
    id: "q1",
    gambar: "Ondel-ondel",
    benar: "Boneka raksasa khas Betawi",
    kategori: "Kesenian",
    asalSuku: "Betawi",
    petunjuk: "Boneka berhias kembang kelapa setinggi 2,5 meter"
  },
  {
    id: "q2",
    gambar: "Baju Bodo",
    benar: "Pakaian adat wanita Bugis yang longgar",
    kategori: "Pakaian",
    asalSuku: "Bugis/Makassar",
    petunjuk: "Pakaian berbentuk segi empat tanpa lengan bersiluet longgar"
  },
  {
    id: "q3",
    gambar: "Topi Ti'i Langga",
    benar: "Topi dari daun lontar khas Rote",
    kategori: "Pakaian",
    asalSuku: "Rote",
    petunjuk: "Topi unik menyerupai pelaut Portugis berantena dari NTT"
  },
  {
    id: "q4",
    gambar: "Coto Makassar",
    benar: "Sup daging khas Makassar",
    kategori: "Kuliner",
    asalSuku: "Bugis/Makassar",
    petunjuk: "Sup daging sapi berkuah kacang tanah kental lezat"
  },
  {
    id: "q5",
    gambar: "Sasando",
    benar: "Alat musik petik dari daun lontar khas Rote",
    kategori: "Alat Musik",
    asalSuku: "Rote",
    petunjuk: "Alat musik dawai berdinding anyaman daun lontar melengkung"
  },
  {
    id: "q6",
    gambar: "Baju Cele",
    benar: "Pakaian adat bermotif kotak khas Ambon",
    kategori: "Pakaian",
    asalSuku: "Ambon",
    petunjuk: "Kain cerah bermotif garis kotak-kotak merah dari Maluku"
  },
  {
    id: "q7",
    gambar: "Kerak Telor",
    benar: "Makanan dari ketan dan telur khas Betawi",
    kategori: "Kuliner",
    asalSuku: "Betawi",
    petunjuk: "Nasi ketan berpadu telur bebek dan serundeng gurih"
  },
  {
    id: "q8",
    gambar: "Tari Cakalele",
    benar: "Tarian perang khas Maluku",
    kategori: "Kesenian",
    asalSuku: "Ambon",
    petunjuk: "Tarian penuh semangat dengan pedang parang dan tameng salawaku"
  },
  {
    id: "q9",
    gambar: "Rumah Gadang",
    benar: "Rumah adat Minangkabau beratap tanduk kerbau",
    kategori: "Arsitektur",
    asalSuku: "Minangkabau",
    petunjuk: "Rumah kayu beratap melengkung runcing gonjong tahan gempa"
  },
  {
    id: "q10",
    gambar: "Wayang Kulit",
    benar: "Seni pertunjukan bayangan kulit khas Jawa",
    kategori: "Kesenian",
    asalSuku: "Jawa",
    petunjuk: "Warisan budaya UNESCO dimainkan oleh dalang dengan iringan gamelan"
  },
  {
    id: "q11",
    gambar: "Tari Kecak",
    benar: "Tarian sakral Bali dengan irama seruan puluhan penari",
    kategori: "Kesenian",
    asalSuku: "Bali",
    petunjuk: "Penari duduk melingkar mengitari api menyerukan cak-cak-cak"
  },
  {
    id: "q12",
    gambar: "Alat Musik Sape'",
    benar: "Alat musik petik indah dari kayu khas suku Dayak",
    kategori: "Alat Musik",
    asalSuku: "Dayak",
    petunjuk: "Alat musik berdawai dari kayu berukir khas pedalaman Kalimantan"
  },
  {
    id: "q13",
    gambar: "Rendang Daging",
    benar: "Masakan daging sapi kaya rempah khas Minangkabau",
    kategori: "Kuliner",
    asalSuku: "Minangkabau",
    petunjuk: "Dimasak berjam-jam hingga kering pekat bumbu kelapa"
  },
  {
    id: "q14",
    gambar: "Patung Tiang Bisj",
    benar: "Seni pahatan kayu leluhur bernilai tinggi khas suku Asmat",
    kategori: "Kesenian",
    asalSuku: "Asmat",
    petunjuk: "Ukiran kayu bertingkat lambang keberanian dari Papua"
  }
];

export const DAFTAR_LENCANA: LencanaBudaya[] = [
  {
    id: "lencana-mulai",
    judul: "Penjelajah Pemula",
    deskripsi: "Memulai langkah petualangan pertama di Jelajah Budaya Nusantara",
    ikon: "🚀",
    syarat: "Buka menu utama atau jelajahi 1 suku"
  },
  {
    id: "lencana-sahabat",
    judul: "Sahabat Nusantara",
    deskripsi: "Mempelajari dan menandai 5 kebudayaan suku di Indonesia",
    ikon: "🌟",
    syarat: "Pelajari 5 suku budaya"
  },
  {
    id: "lencana-bhinneka",
    judul: "Duta Bhinneka Tunggal Ika",
    deskripsi: "Menuntaskan penjelajahan seluruh suku budaya di Nusantara!",
    ikon: "👑",
    syarat: "Pelajari seluruh 10 suku budaya"
  },
  {
    id: "lencana-kuis-bintang",
    judul: "Bintang Cerdas Kuis",
    deskripsi: "Menyelesaikan Kuis Menjodohkan Budaya dengan nilai memuaskan",
    ikon: "⭐",
    syarat: "Dapatkan skor minimal 70% di Kuis Menjodohkan"
  },
  {
    id: "lencana-pakar-kuliner",
    judul: "Pakar Kuliner & Busana",
    deskripsi: "Menjawab kuis kategori kuliner dan busana adat dengan tepat",
    ikon: "🍲",
    syarat: "Selesaikan kuis dengan akurasi tinggi"
  }
];
