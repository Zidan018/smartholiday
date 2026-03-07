const fs = require('fs');

const slugify = text => text.toLowerCase()
    .replace(/[^a-z0-9 ]+/g, '')
    .replace(/ +/g, '-')
    .replace(/(^-|-$)+/g, '');


// ====================================================
// HELPER: Rundown Timeline (Collapsible)
// ====================================================
function getRundownHtml(rundown) {
    const items = rundown.map(r => `
        <div class="timeline-item reveal">
            <div class="time">${r.time}</div>
            <div class="content"><h4>${r.activity}</h4><p>${r.desc}</p></div>
        </div>`).join('');
    return `
    <section class="section" style="padding-top:0;">
        <div class="container">
            <details class="rundown-toggle">
                <summary class="rundown-summary">
                    <span>🗺️ Lihat Rundown Kegiatan</span>
                    <span class="rundown-arrow">▼</span>
                </summary>
                <div class="rundown-body">
                    <p style="text-align:center;color:var(--text-light);margin-bottom:32px;">Estimasi jadwal kegiatan selama perjalanan Anda.</p>
                    <div class="timeline">${items}</div>
                </div>
            </details>
        </div>
    </section>`;
}


// ====================================================
// HELPER: Pricing
// ====================================================
function getPricingHtml(startPrice) {
    return `
    <section id="pricing" class="section bg-light">
        <div class="container">
            <div class="section-header text-center fade-in-up">
                <h2 class="section-title">💰 Harga Paket</h2>
                <p>Pilih paket tour yang sesuai kebutuhan Anda</p>
            </div>
            <div class="pricing-container">
                <div class="pricing-card main-price zoom-in">
                    <div class="badge-popular">Paling Laris</div>
                    <h3>Private Tour</h3>
                    <div class="price">
                        <span class="currency">Mulai dari</span>
                        <span class="amount">${startPrice}</span>
                        <span class="period">/pax</span>
                    </div>
                    <div class="price-list">
                        <h4>Harga Weekday:</h4>
                        <ul>
                            <li><span>2 Orang</span><strong>Hubungi Admin</strong></li>
                            <li><span>3 Orang</span><strong>Hubungi Admin</strong></li>
                            <li><span>4 Orang</span><strong>Hubungi Admin</strong></li>
                            <li class="notice">Diskusikan harga terbaik dengan admin kami!</li>
                        </ul>
                    </div>
                    <div class="price-addons"><p><strong>Weekend/Hari Libur:</strong> Ada biaya tambahan</p></div>
                    <a href="https://wa.me/6281252909674" class="btn-primary full-width mt-4">Pesan Sekarang</a>
                </div>
                <div class="inclusions-card slide-in-right">
                    <div class="inc-box glassmorphism" style="border:1px solid #eee;">
                        <h4><span class="icon">✅</span> Sudah Termasuk</h4>
                        <ul>
                            <li>Transportasi Privat ber-AC</li>
                            <li>Tiket Masuk Objek Wisata</li>
                            <li>Guide berpengalaman</li>
                            <li>Air Mineral selama perjalanan</li>
                            <li>Penjemputan & Pengantaran</li>
                        </ul>
                    </div>
                    <div class="inc-box glassmorphism mt-4" style="border:1px solid #eee;">
                        <h4><span class="icon">❌</span> Belum Termasuk</h4>
                        <ul>
                            <li>Pengeluaran & makan pribadi</li>
                            <li>Wahana tambahan / ojek lokal</li>
                            <li>Tips sukarela untuk guide</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

// ====================================================
// HELPER: Base HTML template
// ====================================================
const baseHtml = (title, mainTitle, subtitle, backLink, backLabel, bodyContent) => `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} | SmartTour</title>
    <meta name="description" content="Paket Tour ${title} - SmartTour." />
    <link rel="stylesheet" href="./style.css" />
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="./" class="logo logo-img-link">
                <img src="./aset/logo.png" alt="Smart Holiday" class="logo-img">
            </a>
            <div class="nav-links">
                <a href="./">Home</a>
                <a href="/#packages">Paket Tour</a>
                <a href="#pricing">Harga</a>
            </div>
            <a href="https://wa.me/6281252909674" class="btn-primary btn-nav">Pesan Sekarang</a>
            <button class="mobile-menu-toggle" aria-label="Toggle menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <header class="hero" style="min-height:55vh;height:55vh;">
        <img class="hero-bg" src="/foto-ini.jpg" alt="${title}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:-2;animation:bgScale 20s infinite alternate;">
        <div class="hero-overlay" style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(160deg,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.35) 100%);z-index:-1;"></div>
        <div class="hero-content" style="z-index:10;color:#fff;text-align:center;padding:0 20px;margin-top:60px;">
            ${backLink ? `<p style="margin-bottom:12px;font-size:0.9rem;opacity:0.8;">◀ <a href="${backLink}" style="color:#f29f05;font-weight:600;">${backLabel}</a></p>` : ''}
            <h1 class="fade-in-up">${mainTitle}</h1>
            <p class="fade-in-up delay-1" style="margin-top:10px;opacity:0.9;">${subtitle}</p>
        </div>
    </header>

    ${bodyContent}

    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <h3>Smart<span>Tour</span></h3>
                    <p>Melayani berbagai paket wisata domestik dan internasional dengan layanan profesional.</p>
                </div>
                <div class="footer-links">
                    <h4>Navigasi</h4>
                    <ul>
                        <li><a href="./">Home</a></li>
                        <li><a href="./domestic.html">Paket Domestik</a></li>
                        <li><a href="./international.html">Paket Internasional</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>Hubungi Kami</h4>
                    <p>📍 Jl. Demo Raya No. 1, Surabaya</p>
                    <p>📞 +62 812-5290-9674</p>
                </div>
            </div>
            <div class="footer-bottom"><p>&copy; 2026 SmartTour. All rights reserved.</p></div>
        </div>
    </footer>
    <script type="module" src="./main.js"></script>
</body>
</html>`;

// ====================================================
// ====================== DATA ========================
// EDIT PAKET DI SINI
// ====================================================

const domesticPackages = [
    // =====================================
    // FORMAT SETIAP PAKET:
    // id: nama file html (tanpa spasi)
    // name: nama tampil di kartu/judul
    // shortDesc: kalimat singkat untuk kartu listing
    // desc: deskripsi lengkap (bisa panjang)
    // price: harga mulai dari
    // schedules: jadwal keberangkatan
    //   { date: 'DD MMM YYYY', day: 'Hari', available: true/false }
    // rundown: timeline kegiatan
    //   { time: 'HH.MM', activity: 'Nama Kegiatan', desc: 'Deskripsi' }
    // =====================================
    {
        id: 'bromo',
        name: 'Gunung Bromo',
        shortDesc: 'Pemandangan lautan pasir dan sunrise spektakuler dari Jawa Timur.',
        desc: 'Gunung Bromo adalah salah satu destinasi wisata paling ikonik di Indonesia. Terletak di kawasan Taman Nasional Bromo Tengger Semeru, Gunung Bromo menawarkan keindahan alam yang tak tertandingi: lautan pasir yang luas, sunrise yang memukau dari Penanjakan, kawah aktif yang bisa didaki, hingga Bukit Teletubbies yang hijau dan asri.\n\nBersama SmartTour, perjalanan Anda ke Bromo akan menjadi pengalaman yang tak terlupakan. Kami menyediakan transportasi privat ber-AC, jeep 4WD untuk melintas lautan pasir, guide berpengalaman, dan layanan jemput-antar dari titik keberangkatan Anda.',
        price: 'Rp 400.000',
        schedules: [
            { date: '10 Mar 2026', day: 'Selasa', available: true },
            { date: '14 Mar 2026', day: 'Sabtu', available: false },
            { date: '17 Mar 2026', day: 'Selasa', available: true },
            { date: '21 Mar 2026', day: 'Sabtu', available: true },
            { date: '24 Mar 2026', day: 'Selasa', available: true },
        ],
        rundown: [
            { time: '23.00', activity: 'Penjemputan di Surabaya', desc: 'Dari Hotel/Stasiun/Bandara/Rumah area Surabaya.' },
            { time: '02.30', activity: 'Tiba di Basecamp Bromo', desc: 'Rest area, persiapan pakaian hangat, masuk jeep.' },
            { time: '03.30', activity: 'Berangkat ke Sunrise Point', desc: 'Perjalanan jeep ke Penanjakan atau Bukit Kingkong.' },
            { time: '04.30', activity: 'Menikmati Golden Sunrise', desc: 'Panorama matahari terbit yang spektakuler.' },
            { time: '06.00', activity: 'Lautan Pasir & Kawah', desc: 'Melintasi lautan pasir dan mendaki kawah Bromo.' },
            { time: '08.30', activity: 'Bukit Teletubbies', desc: 'Sesi foto di hamparan savana hijau Lembah Watangan.' },
            { time: '10.00', activity: 'Kembali ke Rest Area', desc: 'Istirahat dan sarapan di sekitar kawasan Bromo.' },
            { time: '11.00', activity: 'Kembali ke Surabaya', desc: 'Tiba di Surabaya sekitar pukul 14.00.' },
        ]
    },
    {
        id: 'bali',
        name: 'Pulau Bali',
        shortDesc: 'Pulau Dewata dengan pantai eksotis, pura bersejarah, dan budaya unik.',
        desc: 'Bali adalah destinasi wisata kelas dunia yang menawarkan perpaduan sempurna antara keindahan alam, kekayaan budaya, dan keragaman kuliner. Dari pantai berpasir putih di Kuta dan Sanur, terasering sawah di Ubud, pura megah di Uluwatu dan Tanah Lot, hingga kehidupan malam yang meriah di Seminyak – Bali memiliki segalanya.\n\nSmartTour menghadirkan paket wisata Bali yang lengkap dan fleksibel, disesuaikan dengan kebutuhan Anda: liburan keluarga, bulan madu, atau perjalanan solo.',
        price: 'Rp 1.200.000',
        schedules: [
            { date: '8 Mar 2026', day: 'Minggu', available: true },
            { date: '15 Mar 2026', day: 'Minggu', available: false },
            { date: '22 Mar 2026', day: 'Minggu', available: true },
            { date: '29 Mar 2026', day: 'Minggu', available: true },
        ],
        rundown: [
            { time: '06.00', activity: 'Terbang ke Bali', desc: 'Penerbangan dari Surabaya (±1 jam).' },
            { time: '09.00', activity: 'Ubud – Tegalalang', desc: 'Kunjungi sawah terasering Tegalalang dan Pasar Ubud.' },
            { time: '12.00', activity: 'Makan Siang', desc: 'Makan siang dengan pemandangan sawah di Ubud.' },
            { time: '15.00', activity: 'Tanah Lot', desc: 'Kunjungi pura suci di atas batu karang tepi pantai.' },
            { time: '17.30', activity: 'Sunset Tanah Lot', desc: 'Menikmati panorama matahari terbenam.' },
            { time: '19.00', activity: 'Check-in Hotel', desc: 'Istirahat di hotel pilihan Anda.' },
        ]
    },
    {
        id: 'jogja',
        name: 'Yogyakarta',
        shortDesc: 'Kota budaya dengan Borobudur, Prambanan, Malioboro, dan kuliner legendarisnya.',
        desc: 'Yogyakarta adalah kota istimewa yang memadukan kekayaan budaya, sejarah, dan alam. Anda bisa mengunjungi Candi Borobudur – keajaiban dunia yang megah, Candi Prambanan yang eksotis, berjalan di Jalan Malioboro, mencicip gudeg, hingga menikmati sunset di Pantai Parangtritis.\n\nSmartTour menyediakan paket Yogyakarta yang dikemas dengan nyaman: transportasi privat, guide lokal berpengalaman, dan itinerary yang dapat disesuaikan.',
        price: 'Rp 650.000',
        schedules: [
            { date: '7 Mar 2026', day: 'Sabtu', available: true },
            { date: '14 Mar 2026', day: 'Sabtu', available: true },
            { date: '21 Mar 2026', day: 'Sabtu', available: false },
            { date: '28 Mar 2026', day: 'Sabtu', available: true },
        ],
        rundown: [
            { time: '05.00', activity: 'Berangkat dari Surabaya', desc: 'Perjalanan menuju Yogyakarta (±5 jam).' },
            { time: '10.00', activity: 'Candi Borobudur', desc: 'Jelajah kemegahan candi Buddha terbesar di dunia.' },
            { time: '13.00', activity: 'Makan Siang', desc: 'Gudeg legendaris khas Yogyakarta.' },
            { time: '14.30', activity: 'Malioboro', desc: 'Belanja batik, kerajinan, dan souvenir khas Jogja.' },
            { time: '16.00', activity: 'Parangtritis', desc: 'Nikmati pantai dan gumuk pasir yang menakjubkan.' },
            { time: '18.00', activity: 'Kembali ke Surabaya', desc: 'Tiba di Surabaya malam hari.' },
        ]
    },
    {
        id: 'lombok',
        name: 'Pulau Lombok',
        shortDesc: 'Surga tersembunyi dengan Gili Island, Rinjani, dan pantai pasir putihnya.',
        desc: 'Lombok adalah destinasi wisata yang semakin populer dengan keindahan alam yang masih terjaga. Gili Trawangan, Gili Meno, dan Gili Air menawarkan snorkeling dan diving kelas dunia. Gunung Rinjani yang megah menjadi tantangan seru bagi para pendaki.\n\nWith SmartTour, nikmati Lombok dengan cara terbaik bersama guide lokal berpengalaman yang mengenal setiap sudut pulau.',
        price: 'Rp 900.000',
        schedules: [
            { date: '13 Mar 2026', day: 'Jumat', available: true },
            { date: '20 Mar 2026', day: 'Jumat', available: true },
            { date: '27 Mar 2026', day: 'Jumat', available: false },
        ],
        rundown: [
            { time: '07.00', activity: 'Terbang ke Lombok', desc: 'Penerbangan dari Surabaya ke Lombok.' },
            { time: '10.00', activity: 'Tiba & Transfer ke Gili', desc: 'Naik kapal cepat ke Gili Trawangan.' },
            { time: '11.00', activity: 'Snorkeling Gili', desc: 'Snorkeling di 3 spot terbaik sekitar Gili.' },
            { time: '14.00', activity: 'Makan Siang Seafood', desc: 'Seafood segar di tepi pantai Gili.' },
            { time: '16.00', activity: 'Sunset di Gili', desc: 'Menikmati matahari terbenam yang memukau.' },
            { time: '18.00', activity: 'Check-in Hotel', desc: 'Istirahat di penginapan pilihan.' },
        ]
    },
    {
        id: 'raja-ampat',
        name: 'Raja Ampat',
        shortDesc: 'Surga bawah laut terbaik di dunia dengan keanekaragaman hayati laut yang luar biasa.',
        desc: 'Raja Ampat adalah tujuan wisata bahari terbaik di dunia. Terletak di ujung barat Papua, kawasan ini menyimpan lebih dari 1.500 spesies ikan dan 75% spesies karang di dunia. Keindahan bawah lautnya tak tertandingi oleh destinasi manapun.\n\nSmartTour memberikan pengalaman eksklusif menyelami keindahan Raja Ampat dengan paket yang mencakup akomodasi, transportasi laut, dan dive guide berpengalaman.',
        price: 'Rp 3.500.000',
        schedules: [
            { date: '14 Mar 2026', day: 'Sabtu', available: true },
            { date: '28 Mar 2026', day: 'Sabtu', available: false },
            { date: '11 Apr 2026', day: 'Sabtu', available: true },
        ],
        rundown: [
            { time: '06.00', activity: 'Penerbangan ke Papua', desc: 'Terbang dari Surabaya via Jakarta.' },
            { time: '14.00', activity: 'Tiba di Sorong', desc: 'Transfer ke kapal menuju Raja Ampat.' },
            { time: '17.00', activity: 'Snorkeling Perdana', desc: 'Snorkeling di spot super jernih.' },
            { time: '19.00', activity: 'Makan Malam & Check-in', desc: 'Menikmati malam pertama di atas kapal/resort.' },
        ]
    },
];

const internationalPackages = [
    {
        id: 'jepang',
        name: 'Jepang',
        shortDesc: 'Negeri sakura dengan tradisi kuno, teknologi modern, dan kuliner autentik.',
        desc: 'Jepang adalah salah satu destinasi impian terpopuler di dunia. Dari hiruk-pikuk Tokyo yang modern, ketenangan Kyoto yang penuh kuil bersejarah, kecantikan Osaka yang terkenal dengan kulinernya, hingga panorama Gunung Fuji yang memukau – Jepang menawarkan pengalaman yang tak akan terlupakan.\n\nSmartTour menghadirkan paket Jepang yang telah dirancang dengan matang: visa, tiket, hotel, dan tour guide Indonesia berbahasa penuh. Anda hanya perlu membawa semangat dan kamera untuk mengabadikan momen!',
        price: 'Rp 18.500.000',
        schedules: [
            { date: '25 Mar 2026', day: 'Rabu', available: true },
            { date: '15 Apr 2026', day: 'Rabu', available: true },
            { date: '6 Mei 2026', day: 'Rabu', available: false },
        ],
        rundown: [
            { time: 'Hari 1', activity: 'Tiba di Tokyo', desc: 'Check-in hotel, malam di Shinjuku.' },
            { time: 'Hari 2', activity: 'Tokyo City Tour', desc: 'Asakusa, Shibuya Crossing, Harajuku, Akihabara.' },
            { time: 'Hari 3', activity: 'Tokyo – Hakone', desc: 'View Gunung Fuji, onsen tradisional.' },
            { time: 'Hari 4', activity: 'Kyoto', desc: 'Fushimi Inari, Kinkaku-ji (Paviliun Emas), Nishiki Market.' },
            { time: 'Hari 5', activity: 'Osaka', desc: 'Osaka Castle, Dotonbori, belanja oleh-oleh.' },
            { time: 'Hari 6', activity: 'Pulang ke Indonesia', desc: 'Penerbangan kembali ke Surabaya.' },
        ]
    },
    {
        id: 'korea',
        name: 'Korea Selatan',
        shortDesc: 'Negeri K-Pop dan K-Drama dengan budaya, kuliner, dan pemandangan memukau.',
        desc: 'Korea Selatan adalah destinasi yang tak pernah sepi penggemar. Nikmati keindahan Seoul yang modern namun kaya budaya, jelajahi Gyeongbokgung Palace yang megah, cicip kimchi dan bibimbap autentik, dan rasakan sensasi berada di kota yang jadi latar drama Korea favorit Anda.\n\nSmartTour menyediakan paket Korea lengkap: visa, penginapan di lokasi strategis, transportasi antar kota, dan guide yang fasih berbahasa Indonesia.',
        price: 'Rp 14.500.000',
        schedules: [
            { date: '20 Mar 2026', day: 'Jumat', available: true },
            { date: '17 Apr 2026', day: 'Jumat', available: false },
            { date: '8 Mei 2026', day: 'Jumat', available: true },
        ],
        rundown: [
            { time: 'Hari 1', activity: 'Tiba di Seoul', desc: 'Check-in hotel di Myeongdong, bebas eksplorasi malam.' },
            { time: 'Hari 2', activity: 'Seoul City Tour', desc: 'Gyeongbokgung, N Seoul Tower, Bukchon Hanok Village.' },
            { time: 'Hari 3', activity: 'Nami Island', desc: 'Pulau Nami yang memesona, lokasi syuting drama Korea.' },
            { time: 'Hari 4', activity: 'Belanja di Dongdaemun', desc: 'Berburu fashion lokal dan oleh-oleh khas Korea.' },
            { time: 'Hari 5', activity: 'Pulang', desc: 'Penerbangan kembali ke Surabaya.' },
        ]
    },
    {
        id: 'thailand',
        name: 'Thailand',
        shortDesc: 'Land of Smiles dengan kuil megah, pasar terapung, dan pantai tropis indah.',
        desc: 'Thailand menawarkan perpaduan yang sempurna antara wisata budaya, kuliner lezat, dan alam tropis yang menakjubkan. Bangkok yang ramai dengan kuil-kuil emas, Chiang Mai yang sejuk dengan tradisi lama, Phuket dan Krabi yang memiliki pantai luar biasa – semuanya bisa Anda nikmati dalam satu perjalanan.\n\nSmartTour menyajikan paket Thailand yang ekonomis namun premium, cocok untuk wisata keluarga maupun pasangan.',
        price: 'Rp 8.500.000',
        schedules: [
            { date: '14 Mar 2026', day: 'Sabtu', available: true },
            { date: '28 Mar 2026', day: 'Sabtu', available: true },
            { date: '11 Apr 2026', day: 'Sabtu', available: false },
        ],
        rundown: [
            { time: 'Hari 1', activity: 'Tiba di Bangkok', desc: 'Check-in, makan malam di Chatuchak.' },
            { time: 'Hari 2', activity: 'Bangkok City Tour', desc: 'Grand Palace, Wat Arun, Wat Pho, Pasar Terapung.' },
            { time: 'Hari 3', activity: 'Bangkok – Pattaya', desc: 'Coral Island, Sanctuary of Truth.' },
            { time: 'Hari 4', activity: 'Belanja & Pulang', desc: 'Shopping di Chatuchak sebelum terbang pulang.' },
        ]
    },
    {
        id: 'turki',
        name: 'Turki',
        shortDesc: 'Jembatan dua benua dengan Istanbul, Cappadocia, dan warisan peradaban dunia.',
        desc: 'Turki adalah negara yang menjadi jembatan antara Eropa dan Asia, menyimpan warisan peradaban ribuan tahun. Istanbul memukau dengan Hagia Sophia dan Grand Bazaar, Cappadocia menawan dengan balon udara dan gua-batu yang unik, sementara pantai Aegea memikat dengan warna biru lautnya yang memukau.\n\nSmartTour menghadirkan paket Turki eksklusif dengan pengalaman naik balon udara di Cappadocia yang sudah termasuk dalam paket!',
        price: 'Rp 22.000.000',
        schedules: [
            { date: '1 Apr 2026', day: 'Rabu', available: true },
            { date: '6 Mei 2026', day: 'Rabu', available: false },
            { date: '3 Jun 2026', day: 'Rabu', available: true },
        ],
        rundown: [
            { time: 'Hari 1', activity: 'Tiba di Istanbul', desc: 'Check-in hotel, menikmati evening cruise di Bosphorus.' },
            { time: 'Hari 2', activity: 'Istanbul City Tour', desc: 'Hagia Sophia, Blue Mosque, Grand Bazaar, Topkapi Palace.' },
            { time: 'Hari 3', activity: 'Istanbul – Cappadocia', desc: 'Penerbangan ke Cappadocia, jelajah lembah batu.' },
            { time: 'Hari 4', activity: 'Balon Udara Cappadocia', desc: 'Pengalaman naik balon udara saat sunrise yang tak terlupakan.' },
            { time: 'Hari 5', activity: 'Efesus', desc: 'Kunjungi reruntuhan kota kuno Efesus di pantai Aegea.' },
            { time: 'Hari 6', activity: 'Pulang', desc: 'Penerbangan kembali ke Indonesia.' },
        ]
    },
    {
        id: 'dubai',
        name: 'Dubai',
        shortDesc: 'Kota futuristik dengan Burj Khalifa, desert safari, dan belanja mewah.',
        desc: 'Dubai adalah kota impian yang menggabungkan kemewahan modern dengan kearifan budaya Arab. Lihat langsung Burj Khalifa – gedung tertinggi di dunia, rasakan petualangan desert safari di gurun pasir, nikmati belanja mewah di Dubai Mall, dan kagumi Palm Jumeirah yang terkenal dari udara.\n\nSmartTour menyediakan paket Dubai dengan hotel bintang 4+ di lokasi terbaik dan pengalaman desert safari yang tak terlupakan.',
        price: 'Rp 16.000.000',
        schedules: [
            { date: '20 Mar 2026', day: 'Jumat', available: true },
            { date: '10 Apr 2026', day: 'Jumat', available: true },
            { date: '1 Mei 2026', day: 'Jumat', available: false },
        ],
        rundown: [
            { time: 'Hari 1', activity: 'Tiba di Dubai', desc: 'Check-in hotel mewah, malam di Dubai Marina.' },
            { time: 'Hari 2', activity: 'Dubai City Tour', desc: 'Burj Khalifa, Dubai Mall, Gold Souk, Dubai Creek.' },
            { time: 'Hari 3', activity: 'Desert Safari', desc: 'Dune bashing, camel ride, BBQ dinner, belly dance show.' },
            { time: 'Hari 4', activity: 'Palm Jumeirah & Atlantis', desc: 'Monorail Palm Jumeirah, Aquaventure Waterpark.' },
            { time: 'Hari 5', activity: 'Belanja & Pulang', desc: 'Last-minute shopping di Mall of Emirates, terbang pulang.' },
        ]
    },
];

// ====================================================
// GENERATE LISTING PAGES (domestic.html & international.html)
// ====================================================
function generateListingPage(type, packages) {
    const isIntl = type === 'international';
    const title = isIntl ? 'Paket Wisata Internasional' : 'Paket Wisata Domestik';
    const subtitle = isIntl
        ? 'Wujudkan impian keliling dunia bersama SmartTour. Paket lengkap, harga terjangkau.'
        : 'Jelajahi keindahan nusantara dari Sabang sampai Merauke bersama SmartTour.';
    const badgeColor = isIntl ? '#3b82f6' : '#f29f05';
    const badgeLabel = isIntl ? '✈️ Internasional' : '🇮🇩 Domestik';
    const filename = isIntl ? 'international.html' : 'domestic.html';

    const cards = packages.map((pkg, i) => `
        <a href="/${pkg.id}.html" class="card destination-card zoom-in delay-${i % 4}" style="position:relative;">
            <img src="/foto-ini.jpg" alt="${pkg.name}" style="height:260px;object-fit:cover;">
            <div style="position:absolute;top:16px;left:16px;background:${badgeColor};color:#fff;padding:5px 14px;border-radius:50px;font-size:0.8rem;font-weight:700;">${badgeLabel}</div>
            <div class="card-content">
                <h3>${pkg.name}</h3>
                <p>${pkg.shortDesc}</p>
                <p style="margin-top:10px;color:${badgeColor};font-weight:700;font-size:1rem;">Mulai dari ${pkg.price}</p>
                <span style="display:inline-block;margin-top:10px;color:${badgeColor};font-weight:700;">Lihat Detail →</span>
            </div>
        </a>`).join('');

    const body = `
    <section class="section">
        <div class="container">
            <div class="section-header text-center fade-in-up">
                <h2 class="section-title">${title}</h2>
                <p>${subtitle}</p>
            </div>
            <div class="grid-cards" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:30px;">
                ${cards}
            </div>
        </div>
    </section>`;

    const html = baseHtml(title, title, subtitle, '/', 'Home', body);
    fs.writeFileSync(filename, html, 'utf8');
    console.log(`✅ Generated ${filename}`);
}

// ====================================================
// GENERATE INDIVIDUAL PACKAGE DETAIL PAGES
// ====================================================
function generatePackagePages(packages, listingFile, listingLabel) {
    packages.forEach(pkg => {
        const descParagraphs = pkg.desc.split('\n\n').map(p => `<p style="margin-bottom:16px;line-height:1.9;color:#555;">${p}</p>`).join('');
        const body = `
        <!-- Description Section -->
        <section class="section" style="padding-bottom:0; padding-top: 60px;">
            <div class="container">
                <div class="overview-grid" style="grid-template-columns:1fr 1fr;align-items:start;gap:50px;">
                    <div class="overview-text slide-in-left">
                        <h2 class="section-title" style="text-align:left;">${pkg.name}</h2>
                        <div style="margin-top:28px;font-size:1.05rem;line-height:1.9;color:#555;">
                            ${descParagraphs}
                        </div>
                    </div>
                    <div class="overview-images slide-in-right">
                        <img src="./foto-ini.jpg" alt="${pkg.name}" class="img-main" style="border-radius:20px;width:100%;height:420px;object-fit:cover;">
                    </div>
                </div>
            </div>
        </section>

        ${getRundownHtml(pkg.rundown)}
        ${getPricingHtml(pkg.price)}

        <!-- WhatsApp CTA after pricing -->
        <section class="section" style="padding-top:0;padding-bottom:60px;">
            <div class="container" style="text-align:center;">
                <a href="https://wa.me/6281252909674" class="btn-primary" style="display:inline-flex;align-items:center;gap:10px;font-size:1.1rem;padding:16px 40px;">
                    💬 Tanya &amp; Pesan via WhatsApp
                </a>
                <p style="margin-top:14px;color:#888;font-size:0.9rem;">Respon cepat · Konsultasi GRATIS · Booking mudah</p>
            </div>
        </section>
        `;


        const html = baseHtml(pkg.name, `Paket Tour ${pkg.name}`, pkg.shortDesc, `/${listingFile}`, listingLabel, body);
        fs.writeFileSync(`${pkg.id}.html`, html, 'utf8');
        console.log(`  ↳ Generated ${pkg.id}.html`);
    });
}

// ====================================================
// RUN GENERATOR
// ====================================================
console.log('\n🚀 Generating pages...\n');

generateListingPage('domestic', domesticPackages);
generatePackagePages(domesticPackages, 'domestic.html', 'Paket Domestik');

console.log('');
generateListingPage('international', internationalPackages);
generatePackagePages(internationalPackages, 'international.html', 'Paket Internasional');

console.log('\n✅ All pages generated successfully!\n');
