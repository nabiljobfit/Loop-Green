// Tunggu sampai seluruh elemen HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NAVBAR SCROLL EFFECT (FIXED) ---
    const navbar = document.querySelector('.main-header-wrapper'); 

    if (navbar) { // Cek apakah navbar ada untuk mencegah Error
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 4px 25px rgba(0,0,0,0.4)";
                navbar.style.padding = "5px 0 10px 0"; // Sedikit mengecil saat scroll
                navbar.style.transition = "0.3s";
            } else {
                navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                navbar.style.padding = "20px 0 15px 0"; // Kembali normal
            }
        });
    }

    // --- 2. FLASH SALE COUNTDOWN ---
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        let duration = 60 * 60 * 2; // 2 Jam
        
        setInterval(function () {
            let hours = parseInt(duration / 3600, 10);
            let minutes = parseInt((duration % 3600) / 60, 10);
            let seconds = parseInt(duration % 60, 10);

            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            countdownElement.textContent = hours + " : " + minutes + " : " + seconds;

            if (--duration < 0) {
                duration = 60 * 60 * 2; // Reset loop
            }
        }, 1000);
    }

    // --- LOAD SAVED PREFERENCES (Agar settingan tidak hilang saat refresh) ---
    loadPreferences();
});

// --- FUNGSI GLOBAL (Ditaruh di luar DOMContentLoaded agar bisa dipanggil HTML onclick) ---

// 3. FITUR BAHASA (REAL)
function toggleLanguage(element) {
    const textSpan = element.querySelector('.current-lang');
    let currentLang = textSpan.innerText;

    if (currentLang === 'ID') {
        textSpan.innerText = 'EN';
        localStorage.setItem('loopia_lang', 'EN'); // Simpan ke browser
        alert("Language switched to English (Simulation)");
    } else {
        textSpan.innerText = 'ID';
        localStorage.setItem('loopia_lang', 'ID'); // Simpan ke browser
        alert("Bahasa diganti ke Indonesia (Simulasi)");
    }
}

// 4. FITUR DARK MODE (REAL)
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    // Toggle class
    body.classList.toggle('dark-mode');

    // Cek status sekarang
    if (body.classList.contains('dark-mode')) {
        // Ubah Icon ke Matahari
        if(icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
        // Simpan preferensi 'dark'
        localStorage.setItem('loopia_theme', 'dark');
    } else {
        // Ubah Icon ke Bulan
        if(icon) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        // Simpan preferensi 'light'
        localStorage.setItem('loopia_theme', 'light');
    }
}

// Fungsi bantu untuk memuat settingan saat website dibuka
function loadPreferences() {
    // Load Theme
    const savedTheme = localStorage.getItem('loopia_theme');
    const icon = document.getElementById('theme-icon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if(icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Load Language
    const savedLang = localStorage.getItem('loopia_lang');
    const langSpan = document.querySelector('.current-lang');
    if (savedLang && langSpan) {
        langSpan.innerText = savedLang;
    }
}
// --- FITUR HORIZONTAL SCROLL NAVIGATION ---
// --- FITUR SCROLL NAVIGATION: REKOMENDASI ---

document.addEventListener('DOMContentLoaded', () => {
    const recContainer = document.getElementById('recScroll');
    const recPrev = document.getElementById('recPrev');
    const recNext = document.getElementById('recNext');

    if(recContainer && recPrev && recNext) {
        
        const updateRecBtns = () => {
            const sl = recContainer.scrollLeft;
            const sw = recContainer.scrollWidth;
            const cw = recContainer.clientWidth;

            // Logika Tombol Kiri
            if(sl <= 10) recPrev.classList.remove('show');
            else recPrev.classList.add('show');

            // Logika Tombol Kanan
            if(sl + cw >= sw - 5) recNext.classList.remove('show');
            else recNext.classList.add('show');
        };

        // Listeners
        recContainer.addEventListener('scroll', updateRecBtns);
        
        recNext.addEventListener('click', () => {
            recContainer.scrollBy({ left: 350, behavior: 'smooth' });
        });

        recPrev.addEventListener('click', () => {
            recContainer.scrollBy({ left: -350, behavior: 'smooth' });
        });

        // Init
        updateRecBtns();
        window.addEventListener('resize', updateRecBtns);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.getElementById('featureScroll');
    const prevBtn = document.getElementById('navPrev');
    const nextBtn = document.getElementById('navNext');

    if (scrollContainer && prevBtn && nextBtn) {
        
        // Fungsi Update Visibilitas Tombol
        const updateButtons = () => {
            const scrollLeft = scrollContainer.scrollLeft;
            const scrollWidth = scrollContainer.scrollWidth;
            const clientWidth = scrollContainer.clientWidth;

            // Logika Tombol Kiri (Jika di awal, sembunyikan)
            if (scrollLeft <= 10) {
                prevBtn.classList.remove('show');
            } else {
                prevBtn.classList.add('show');
            }

            // Logika Tombol Kanan (Jika di akhir, sembunyikan)
            // Toleransi 5px untuk perbedaan rounding browser
            if (scrollLeft + clientWidth >= scrollWidth - 5) {
                nextBtn.classList.remove('show');
            } else {
                nextBtn.classList.add('show');
            }
        };

        // Event Listener saat Scroll Manual
        scrollContainer.addEventListener('scroll', updateButtons);

        // Event Click Tombol Next
        nextBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });

        // Event Click Tombol Prev
        prevBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // Cek awal (Initialize)
        updateButtons();
        
        // Cek ulang saat window resize (responsif)
        window.addEventListener('resize', updateButtons);
    }
});
// --- FITUR SCROLL NAVIGATION: KATEGORI PILIHAN ---
// --- LOGIKA FLASH SALE (TIMER & NAVIGASI) ---
// --- LOGIKA SCROLL FLASH SALE MAKANAN ---
// --- LOGIKA FLASH SALE BUAH & SAYUR ---
// --- LOGIKA SARAPAN (BREAKFAST) ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const bfContainer = document.getElementById('breakfastScroll');
    const bfPrev = document.getElementById('breakfastPrev');
    const bfNext = document.getElementById('breakfastNext');

    if(bfContainer && bfPrev && bfNext) {
        
        // 2. Logic Button Visibility
        const updateBfButtons = () => {
            const sl = bfContainer.scrollLeft;
            const sw = bfContainer.scrollWidth;
            const cw = bfContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                bfPrev.classList.remove('show');
            } else {
                bfPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                bfNext.classList.remove('show');
            } else {
                bfNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        bfContainer.addEventListener('scroll', updateBfButtons);
        
        bfNext.addEventListener('click', () => {
            bfContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        bfPrev.addEventListener('click', () => {
            bfContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateBfButtons();
        window.addEventListener('resize', updateBfButtons);
    }
});
// --- LOGIKA MAKAN SIANG (LUNCH) ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const lunchContainer = document.getElementById('lunchScroll');
    const lunchPrev = document.getElementById('lunchPrev');
    const lunchNext = document.getElementById('lunchNext');

    if(lunchContainer && lunchPrev && lunchNext) {
        
        // 2. Logic Button Visibility
        const updateLunchButtons = () => {
            const sl = lunchContainer.scrollLeft;
            const sw = lunchContainer.scrollWidth;
            const cw = lunchContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                lunchPrev.classList.remove('show');
            } else {
                lunchPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                lunchNext.classList.remove('show');
            } else {
                lunchNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        lunchContainer.addEventListener('scroll', updateLunchButtons);
        
        lunchNext.addEventListener('click', () => {
            lunchContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        lunchPrev.addEventListener('click', () => {
            lunchContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateLunchButtons();
        window.addEventListener('resize', updateLunchButtons);
    }
});
// --- LOGIKA MAKAN MALAM (DINNER) ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const dinnerContainer = document.getElementById('dinnerScroll');
    const dinnerPrev = document.getElementById('dinnerPrev');
    const dinnerNext = document.getElementById('dinnerNext');

    if(dinnerContainer && dinnerPrev && dinnerNext) {
        
        // 2. Logic Button Visibility
        const updateDinnerButtons = () => {
            const sl = dinnerContainer.scrollLeft;
            const sw = dinnerContainer.scrollWidth;
            const cw = dinnerContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                dinnerPrev.classList.remove('show');
            } else {
                dinnerPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                dinnerNext.classList.remove('show');
            } else {
                dinnerNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        dinnerContainer.addEventListener('scroll', updateDinnerButtons);
        
        dinnerNext.addEventListener('click', () => {
            dinnerContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        dinnerPrev.addEventListener('click', () => {
            dinnerContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateDinnerButtons();
        window.addEventListener('resize', updateDinnerButtons);
    }
});
// --- LOGIKA MAKAN SAHUR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const sahurContainer = document.getElementById('sahurScroll');
    const sahurPrev = document.getElementById('sahurPrev');
    const sahurNext = document.getElementById('sahurNext');

    if(sahurContainer && sahurPrev && sahurNext) {
        
        // 2. Logic Button Visibility
        const updateSahurButtons = () => {
            const sl = sahurContainer.scrollLeft;
            const sw = sahurContainer.scrollWidth;
            const cw = sahurContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                sahurPrev.classList.remove('show');
            } else {
                sahurPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                sahurNext.classList.remove('show');
            } else {
                sahurNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        sahurContainer.addEventListener('scroll', updateSahurButtons);
        
        sahurNext.addEventListener('click', () => {
            sahurContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        sahurPrev.addEventListener('click', () => {
            sahurContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateSahurButtons();
        window.addEventListener('resize', updateSahurButtons);
    }
});
// --- LOGIKA MAKANAN TRADISIONAL ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const tradContainer = document.getElementById('tradScroll');
    const tradPrev = document.getElementById('tradPrev');
    const tradNext = document.getElementById('tradNext');

    if(tradContainer && tradPrev && tradNext) {
        
        // 2. Logic Button Visibility
        const updateTradButtons = () => {
            const sl = tradContainer.scrollLeft;
            const sw = tradContainer.scrollWidth;
            const cw = tradContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                tradPrev.classList.remove('show');
            } else {
                tradPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                tradNext.classList.remove('show');
            } else {
                tradNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        tradContainer.addEventListener('scroll', updateTradButtons);
        
        tradNext.addEventListener('click', () => {
            tradContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        tradPrev.addEventListener('click', () => {
            tradContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateTradButtons();
        window.addEventListener('resize', updateTradButtons);
    }
});
// --- LOGIKA MAKANAN ARABIAN ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const arabContainer = document.getElementById('arabScroll');
    const arabPrev = document.getElementById('arabPrev');
    const arabNext = document.getElementById('arabNext');

    if(arabContainer && arabPrev && arabNext) {
        
        // 2. Logic Button Visibility
        const updateArabButtons = () => {
            const sl = arabContainer.scrollLeft;
            const sw = arabContainer.scrollWidth;
            const cw = arabContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                arabPrev.classList.remove('show');
            } else {
                arabPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                arabNext.classList.remove('show');
            } else {
                arabNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        arabContainer.addEventListener('scroll', updateArabButtons);
        
        arabNext.addEventListener('click', () => {
            arabContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        arabPrev.addEventListener('click', () => {
            arabContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateArabButtons();
        window.addEventListener('resize', updateArabButtons);
    }
});
// --- LOGIKA MAKANAN EUROPE ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const euroContainer = document.getElementById('euroScroll');
    const euroPrev = document.getElementById('euroPrev');
    const euroNext = document.getElementById('euroNext');

    if(euroContainer && euroPrev && euroNext) {
        
        // 2. Logic Button Visibility
        const updateEuroButtons = () => {
            const sl = euroContainer.scrollLeft;
            const sw = euroContainer.scrollWidth;
            const cw = euroContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                euroPrev.classList.remove('show');
            } else {
                euroPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                euroNext.classList.remove('show');
            } else {
                euroNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        euroContainer.addEventListener('scroll', updateEuroButtons);
        
        euroNext.addEventListener('click', () => {
            euroContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        euroPrev.addEventListener('click', () => {
            euroContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateEuroButtons();
        window.addEventListener('resize', updateEuroButtons);
    }
});
// --- LOGIKA MAKANAN ASIA ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const asiaContainer = document.getElementById('asiaScroll');
    const asiaPrev = document.getElementById('asiaPrev');
    const asiaNext = document.getElementById('asiaNext');

    if(asiaContainer && asiaPrev && asiaNext) {
        
        // 2. Logic Button Visibility
        const updateAsiaButtons = () => {
            const sl = asiaContainer.scrollLeft;
            const sw = asiaContainer.scrollWidth;
            const cw = asiaContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                asiaPrev.classList.remove('show');
            } else {
                asiaPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                asiaNext.classList.remove('show');
            } else {
                asiaNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        asiaContainer.addEventListener('scroll', updateAsiaButtons);
        
        asiaNext.addEventListener('click', () => {
            asiaContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        asiaPrev.addEventListener('click', () => {
            asiaContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateAsiaButtons();
        window.addEventListener('resize', updateAsiaButtons);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const freshContainer = document.getElementById('freshScroll');
    const freshPrev = document.getElementById('freshPrev');
    const freshNext = document.getElementById('freshNext');

    if(freshContainer && freshPrev && freshNext) {
        
        // 2. Logic Button Visibility
        const updateFreshButtons = () => {
            const sl = freshContainer.scrollLeft;
            const sw = freshContainer.scrollWidth;
            const cw = freshContainer.clientWidth;

            // Kiri: Hilang di awal
            if(sl <= 10) {
                freshPrev.classList.remove('show');
            } else {
                freshPrev.classList.add('show');
            }

            // Kanan: Hilang di akhir
            if(sl + cw >= sw - 5) {
                freshNext.classList.remove('show');
            } else {
                freshNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        freshContainer.addEventListener('scroll', updateFreshButtons);
        
        freshNext.addEventListener('click', () => {
            freshContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        freshPrev.addEventListener('click', () => {
            freshContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Initial Check
        updateFreshButtons();
        window.addEventListener('resize', updateFreshButtons);

        // 5. Timer (Fresh)
        const fh = document.getElementById('fr-h');
        const fm = document.getElementById('fr-m');
        const fs = document.getElementById('fr-s');
        if(fh) {
            let frt = 5400; // detik (1.5 jam)
            setInterval(() => {
                let h = Math.floor(frt/3600);
                let m = Math.floor((frt%3600)/60);
                let s = frt%60;
                fh.innerText = h<10?'0'+h:h;
                fm.innerText = m<10?'0'+m:m;
                fs.innerText = s<10?'0'+s:s;
                if(frt>0) frt--; else frt=5400;
            }, 1000);
        }
    }
});
// --- LOGIKA FLASH SALE DAGING (PROTEIN) ---
// --- LOGIKA MAKANAN AMERIKA ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const usaContainer = document.getElementById('usaScroll');
    const usaPrev = document.getElementById('usaPrev');
    const usaNext = document.getElementById('usaNext');

    if(usaContainer && usaPrev && usaNext) {
        
        // 2. Logic Button Visibility
        const updateUsaButtons = () => {
            const sl = usaContainer.scrollLeft;
            const sw = usaContainer.scrollWidth;
            const cw = usaContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                usaPrev.classList.remove('show');
            } else {
                usaPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                usaNext.classList.remove('show');
            } else {
                usaNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        usaContainer.addEventListener('scroll', updateUsaButtons);
        
        usaNext.addEventListener('click', () => {
            usaContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        usaPrev.addEventListener('click', () => {
            usaContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateUsaButtons();
        window.addEventListener('resize', updateUsaButtons);
    }
});
// --- LOGIKA MAKANAN AFRIKA ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const africaContainer = document.getElementById('africaScroll');
    const africaPrev = document.getElementById('africaPrev');
    const africaNext = document.getElementById('africaNext');

    if(africaContainer && africaPrev && africaNext) {
        
        // 2. Logic Button Visibility
        const updateAfricaButtons = () => {
            const sl = africaContainer.scrollLeft;
            const sw = africaContainer.scrollWidth;
            const cw = africaContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                africaPrev.classList.remove('show');
            } else {
                africaPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                africaNext.classList.remove('show');
            } else {
                africaNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        africaContainer.addEventListener('scroll', updateAfricaButtons);
        
        africaNext.addEventListener('click', () => {
            africaContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        africaPrev.addEventListener('click', () => {
            africaContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateAfricaButtons();
        window.addEventListener('resize', updateAfricaButtons);
    }
});
// --- LOGIKA MAKANAN TERLARIS (BEST SELLER) ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const bestContainer = document.getElementById('bestScroll');
    const bestPrev = document.getElementById('bestPrev');
    const bestNext = document.getElementById('bestNext');

    if(bestContainer && bestPrev && bestNext) {
        
        // 2. Logic Button Visibility
        const updateBestButtons = () => {
            const sl = bestContainer.scrollLeft;
            const sw = bestContainer.scrollWidth;
            const cw = bestContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                bestPrev.classList.remove('show');
            } else {
                bestPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                bestNext.classList.remove('show');
            } else {
                bestNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        bestContainer.addEventListener('scroll', updateBestButtons);
        
        bestNext.addEventListener('click', () => {
            bestContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        bestPrev.addEventListener('click', () => {
            bestContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateBestButtons();
        window.addEventListener('resize', updateBestButtons);
    }
});
// --- LOGIKA MAKANAN BINTANG 5 ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const star5Container = document.getElementById('star5Scroll');
    const star5Prev = document.getElementById('star5Prev');
    const star5Next = document.getElementById('star5Next');

    if(star5Container && star5Prev && star5Next) {
        
        // 2. Logic Button Visibility
        const updateStar5Buttons = () => {
            const sl = star5Container.scrollLeft;
            const sw = star5Container.scrollWidth;
            const cw = star5Container.clientWidth;

            // Kiri
            if(sl <= 10) {
                star5Prev.classList.remove('show');
            } else {
                star5Prev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                star5Next.classList.remove('show');
            } else {
                star5Next.classList.add('show');
            }
        };

        // 3. Event Listeners
        star5Container.addEventListener('scroll', updateStar5Buttons);
        
        star5Next.addEventListener('click', () => {
            star5Container.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        star5Prev.addEventListener('click', () => {
            star5Container.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateStar5Buttons();
        window.addEventListener('resize', updateStar5Buttons);
    }
});
// --- LOGIKA FASHION TERLARIS ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const fbContainer = document.getElementById('fbScroll');
    const fbPrev = document.getElementById('fbPrev');
    const fbNext = document.getElementById('fbNext');

    if(fbContainer && fbPrev && fbNext) {
        
        // 2. Logic Button Visibility
        const updateFbButtons = () => {
            const sl = fbContainer.scrollLeft;
            const sw = fbContainer.scrollWidth;
            const cw = fbContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                fbPrev.classList.remove('show');
            } else {
                fbPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                fbNext.classList.remove('show');
            } else {
                fbNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        fbContainer.addEventListener('scroll', updateFbButtons);
        
        fbNext.addEventListener('click', () => {
            fbContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        fbPrev.addEventListener('click', () => {
            fbContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateFbButtons();
        window.addEventListener('resize', updateFbButtons);
    }
});
// --- LOGIKA BAJU LEBARAN ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const lebContainer = document.getElementById('lebScroll');
    const lebPrev = document.getElementById('lebPrev');
    const lebNext = document.getElementById('lebNext');

    if(lebContainer && lebPrev && lebNext) {
        
        // 2. Logic Button Visibility
        const updateLebButtons = () => {
            const sl = lebContainer.scrollLeft;
            const sw = lebContainer.scrollWidth;
            const cw = lebContainer.clientWidth;

            // Kiri: Hilang jika di awal (scrollLeft dekat 0)
            if(sl <= 10) {
                lebPrev.classList.remove('show');
            } else {
                lebPrev.classList.add('show');
            }

            // Kanan: Hilang jika di akhir
            if(sl + cw >= sw - 5) {
                lebNext.classList.remove('show');
            } else {
                lebNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        lebContainer.addEventListener('scroll', updateLebButtons);
        
        lebNext.addEventListener('click', () => {
            lebContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        lebPrev.addEventListener('click', () => {
            lebContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateLebButtons();
        window.addEventListener('resize', updateLebButtons);
    }
});
// --- LOGIKA BAJU NATAL ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const natalContainer = document.getElementById('natalScroll');
    const natalPrev = document.getElementById('natalPrev');
    const natalNext = document.getElementById('natalNext');

    if(natalContainer && natalPrev && natalNext) {
        
        // 2. Logic Button Visibility
        const updateNatalButtons = () => {
            const sl = natalContainer.scrollLeft;
            const sw = natalContainer.scrollWidth;
            const cw = natalContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                natalPrev.classList.remove('show');
            } else {
                natalPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                natalNext.classList.remove('show');
            } else {
                natalNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        natalContainer.addEventListener('scroll', updateNatalButtons);
        
        natalNext.addEventListener('click', () => {
            natalContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        natalPrev.addEventListener('click', () => {
            natalContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateNatalButtons();
        window.addEventListener('resize', updateNatalButtons);
    }
});
// --- LOGIKA FASHION LAKI-LAKI ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const menContainer = document.getElementById('menScroll');
    const menPrev = document.getElementById('menPrev');
    const menNext = document.getElementById('menNext');

    if(menContainer && menPrev && menNext) {
        
        // 2. Logic Button Visibility
        const updateMenButtons = () => {
            const sl = menContainer.scrollLeft;
            const sw = menContainer.scrollWidth;
            const cw = menContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                menPrev.classList.remove('show');
            } else {
                menPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                menNext.classList.remove('show');
            } else {
                menNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        menContainer.addEventListener('scroll', updateMenButtons);
        
        menNext.addEventListener('click', () => {
            menContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        menPrev.addEventListener('click', () => {
            menContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateMenButtons();
        window.addEventListener('resize', updateMenButtons);
    }
});
// --- LOGIKA FASHION WANITA ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const womenContainer = document.getElementById('womenScroll');
    const womenPrev = document.getElementById('womenPrev');
    const womenNext = document.getElementById('womenNext');

    if(womenContainer && womenPrev && womenNext) {
        
        // 2. Logic Button Visibility
        const updateWomenButtons = () => {
            const sl = womenContainer.scrollLeft;
            const sw = womenContainer.scrollWidth;
            const cw = womenContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                womenPrev.classList.remove('show');
            } else {
                womenPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                womenNext.classList.remove('show');
            } else {
                womenNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        womenContainer.addEventListener('scroll', updateWomenButtons);
        
        womenNext.addEventListener('click', () => {
            womenContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        womenPrev.addEventListener('click', () => {
            womenContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateWomenButtons();
        window.addEventListener('resize', updateWomenButtons);
    }
});
// --- LOGIKA FASHION ANAK-ANAK ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const kidsContainer = document.getElementById('kidsScroll');
    const kidsPrev = document.getElementById('kidsPrev');
    const kidsNext = document.getElementById('kidsNext');

    if(kidsContainer && kidsPrev && kidsNext) {
        
        // 2. Logic Button Visibility
        const updateKidsButtons = () => {
            const sl = kidsContainer.scrollLeft;
            const sw = kidsContainer.scrollWidth;
            const cw = kidsContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                kidsPrev.classList.remove('show');
            } else {
                kidsPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                kidsNext.classList.remove('show');
            } else {
                kidsNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        kidsContainer.addEventListener('scroll', updateKidsButtons);
        
        kidsNext.addEventListener('click', () => {
            kidsContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        kidsPrev.addEventListener('click', () => {
            kidsContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateKidsButtons();
        window.addEventListener('resize', updateKidsButtons);
    }
});
// --- LOGIKA FASHION OLAHRAGA ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const sportContainer = document.getElementById('sportScroll');
    const sportPrev = document.getElementById('sportPrev');
    const sportNext = document.getElementById('sportNext');

    if(sportContainer && sportPrev && sportNext) {
        
        // 2. Logic Button Visibility
        const updateSportButtons = () => {
            const sl = sportContainer.scrollLeft;
            const sw = sportContainer.scrollWidth;
            const cw = sportContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                sportPrev.classList.remove('show');
            } else {
                sportPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                sportNext.classList.remove('show');
            } else {
                sportNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        sportContainer.addEventListener('scroll', updateSportButtons);
        
        sportNext.addEventListener('click', () => {
            sportContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        sportPrev.addEventListener('click', () => {
            sportContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateSportButtons();
        window.addEventListener('resize', updateSportButtons);
    }
});
// --- LOGIKA FASHION PETUALANGAN ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const advContainer = document.getElementById('advScroll');
    const advPrev = document.getElementById('advPrev');
    const advNext = document.getElementById('advNext');

    if(advContainer && advPrev && advNext) {
        
        // 2. Logic Button Visibility
        const updateAdvButtons = () => {
            const sl = advContainer.scrollLeft;
            const sw = advContainer.scrollWidth;
            const cw = advContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                advPrev.classList.remove('show');
            } else {
                advPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                advNext.classList.remove('show');
            } else {
                advNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        advContainer.addEventListener('scroll', updateAdvButtons);
        
        advNext.addEventListener('click', () => {
            advContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        advPrev.addEventListener('click', () => {
            advContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateAdvButtons();
        window.addEventListener('resize', updateAdvButtons);
    }
});
// --- LOGIKA FASHION FORMAL ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const formalContainer = document.getElementById('formalScroll');
    const formalPrev = document.getElementById('formalPrev');
    const formalNext = document.getElementById('formalNext');

    if(formalContainer && formalPrev && formalNext) {
        
        // 2. Logic Button Visibility
        const updateFormalButtons = () => {
            const sl = formalContainer.scrollLeft;
            const sw = formalContainer.scrollWidth;
            const cw = formalContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                formalPrev.classList.remove('show');
            } else {
                formalPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                formalNext.classList.remove('show');
            } else {
                formalNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        formalContainer.addEventListener('scroll', updateFormalButtons);
        
        formalNext.addEventListener('click', () => {
            formalContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        formalPrev.addEventListener('click', () => {
            formalContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateFormalButtons();
        window.addEventListener('resize', updateFormalButtons);
    }
});
// --- LOGIKA DAGING AYAM SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const chkContainer = document.getElementById('chkScroll');
    const chkPrev = document.getElementById('chkPrev');
    const chkNext = document.getElementById('chkNext');

    if(chkContainer && chkPrev && chkNext) {
        
        // 2. Logic Button Visibility
        const updateChkButtons = () => {
            const sl = chkContainer.scrollLeft;
            const sw = chkContainer.scrollWidth;
            const cw = chkContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                chkPrev.classList.remove('show');
            } else {
                chkPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                chkNext.classList.remove('show');
            } else {
                chkNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        chkContainer.addEventListener('scroll', updateChkButtons);
        
        chkNext.addEventListener('click', () => {
            chkContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        chkPrev.addEventListener('click', () => {
            chkContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateChkButtons();
        window.addEventListener('resize', updateChkButtons);
    }
});
// --- LOGIKA DAGING SAPI SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const beefContainer = document.getElementById('beefScroll');
    const beefPrev = document.getElementById('beefPrev');
    const beefNext = document.getElementById('beefNext');

    if(beefContainer && beefPrev && beefNext) {
        
        // 2. Logic Button Visibility
        const updateBeefButtons = () => {
            const sl = beefContainer.scrollLeft;
            const sw = beefContainer.scrollWidth;
            const cw = beefContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                beefPrev.classList.remove('show');
            } else {
                beefPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                beefNext.classList.remove('show');
            } else {
                beefNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        beefContainer.addEventListener('scroll', updateBeefButtons);
        
        beefNext.addEventListener('click', () => {
            beefContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        beefPrev.addEventListener('click', () => {
            beefContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateBeefButtons();
        window.addEventListener('resize', updateBeefButtons);
    }
});
// --- LOGIKA DAGING KAMBING SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const goatContainer = document.getElementById('goatScroll');
    const goatPrev = document.getElementById('goatPrev');
    const goatNext = document.getElementById('goatNext');

    if(goatContainer && goatPrev && goatNext) {
        
        // 2. Logic Button Visibility
        const updateGoatButtons = () => {
            const sl = goatContainer.scrollLeft;
            const sw = goatContainer.scrollWidth;
            const cw = goatContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                goatPrev.classList.remove('show');
            } else {
                goatPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                goatNext.classList.remove('show');
            } else {
                goatNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        goatContainer.addEventListener('scroll', updateGoatButtons);
        
        goatNext.addEventListener('click', () => {
            goatContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        goatPrev.addEventListener('click', () => {
            goatContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateGoatButtons();
        window.addEventListener('resize', updateGoatButtons);
    }
});
// --- LOGIKA DAGING BEBEK SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const duckContainer = document.getElementById('duckScroll');
    const duckPrev = document.getElementById('duckPrev');
    const duckNext = document.getElementById('duckNext');

    if(duckContainer && duckPrev && duckNext) {
        
        // 2. Logic Button Visibility
        const updateDuckButtons = () => {
            const sl = duckContainer.scrollLeft;
            const sw = duckContainer.scrollWidth;
            const cw = duckContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                duckPrev.classList.remove('show');
            } else {
                duckPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                duckNext.classList.remove('show');
            } else {
                duckNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        duckContainer.addEventListener('scroll', updateDuckButtons);
        
        duckNext.addEventListener('click', () => {
            duckContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        duckPrev.addEventListener('click', () => {
            duckContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateDuckButtons();
        window.addEventListener('resize', updateDuckButtons);
    }
});
// --- LOGIKA DAGING KERBAU SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const buffContainer = document.getElementById('buffScroll');
    const buffPrev = document.getElementById('buffPrev');
    const buffNext = document.getElementById('buffNext');

    if(buffContainer && buffPrev && buffNext) {
        
        // 2. Logic Button Visibility
        const updateBuffButtons = () => {
            const sl = buffContainer.scrollLeft;
            const sw = buffContainer.scrollWidth;
            const cw = buffContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                buffPrev.classList.remove('show');
            } else {
                buffPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                buffNext.classList.remove('show');
            } else {
                buffNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        buffContainer.addEventListener('scroll', updateBuffButtons);
        
        buffNext.addEventListener('click', () => {
            buffContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        buffPrev.addEventListener('click', () => {
            buffContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateBuffButtons();
        window.addEventListener('resize', updateBuffButtons);
    }
});
// --- LOGIKA DAGING IKAN SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const fishContainer = document.getElementById('fishScroll');
    const fishPrev = document.getElementById('fishPrev');
    const fishNext = document.getElementById('fishNext');

    if(fishContainer && fishPrev && fishNext) {
        
        // 2. Logic Button Visibility
        const updateFishButtons = () => {
            const sl = fishContainer.scrollLeft;
            const sw = fishContainer.scrollWidth;
            const cw = fishContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                fishPrev.classList.remove('show');
            } else {
                fishPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                fishNext.classList.remove('show');
            } else {
                fishNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        fishContainer.addEventListener('scroll', updateFishButtons);
        
        fishNext.addEventListener('click', () => {
            fishContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        fishPrev.addEventListener('click', () => {
            fishContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateFishButtons();
        window.addEventListener('resize', updateFishButtons);
    }
});
// --- LOGIKA DAGING SEAFOOD SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const seaContainer = document.getElementById('seaScroll');
    const seaPrev = document.getElementById('seaPrev');
    const seaNext = document.getElementById('seaNext');

    if(seaContainer && seaPrev && seaNext) {
        
        // 2. Logic Button Visibility
        const updateSeaButtons = () => {
            const sl = seaContainer.scrollLeft;
            const sw = seaContainer.scrollWidth;
            const cw = seaContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                seaPrev.classList.remove('show');
            } else {
                seaPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                seaNext.classList.remove('show');
            } else {
                seaNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        seaContainer.addEventListener('scroll', updateSeaButtons);
        
        seaNext.addEventListener('click', () => {
            seaContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        seaPrev.addEventListener('click', () => {
            seaContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateSeaButtons();
        window.addEventListener('resize', updateSeaButtons);
    }
});
// --- LOGIKA DAGING OLAHAN SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const deliContainer = document.getElementById('deliScroll');
    const deliPrev = document.getElementById('deliPrev');
    const deliNext = document.getElementById('deliNext');

    if(deliContainer && deliPrev && deliNext) {
        
        // 2. Logic Button Visibility
        const updateDeliButtons = () => {
            const sl = deliContainer.scrollLeft;
            const sw = deliContainer.scrollWidth;
            const cw = deliContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                deliPrev.classList.remove('show');
            } else {
                deliPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                deliNext.classList.remove('show');
            } else {
                deliNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        deliContainer.addEventListener('scroll', updateDeliButtons);
        
        deliNext.addEventListener('click', () => {
            deliContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        deliPrev.addEventListener('click', () => {
            deliContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateDeliButtons();
        window.addEventListener('resize', updateDeliButtons);
    }
});
// --- LOGIKA DAGING FROZEN SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const fzContainer = document.getElementById('fzScroll');
    const fzPrev = document.getElementById('fzPrev');
    const fzNext = document.getElementById('fzNext');

    if(fzContainer && fzPrev && fzNext) {
        
        // 2. Logic Button Visibility
        const updateFzButtons = () => {
            const sl = fzContainer.scrollLeft;
            const sw = fzContainer.scrollWidth;
            const cw = fzContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                fzPrev.classList.remove('show');
            } else {
                fzPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                fzNext.classList.remove('show');
            } else {
                fzNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        fzContainer.addEventListener('scroll', updateFzButtons);
        
        fzNext.addEventListener('click', () => {
            fzContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        fzPrev.addEventListener('click', () => {
            fzContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateFzButtons();
        window.addEventListener('resize', updateFzButtons);
    }
});
// --- LOGIKA BUAH APEL SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const appleContainer = document.getElementById('appleScroll');
    const applePrev = document.getElementById('applePrev');
    const appleNext = document.getElementById('appleNext');

    if(appleContainer && applePrev && appleNext) {
        
        // 2. Logic Button Visibility
        const updateAppleButtons = () => {
            const sl = appleContainer.scrollLeft;
            const sw = appleContainer.scrollWidth;
            const cw = appleContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                applePrev.classList.remove('show');
            } else {
                applePrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                appleNext.classList.remove('show');
            } else {
                appleNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        appleContainer.addEventListener('scroll', updateAppleButtons);
        
        appleNext.addEventListener('click', () => {
            appleContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        applePrev.addEventListener('click', () => {
            appleContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateAppleButtons();
        window.addEventListener('resize', updateAppleButtons);
    }
});
// --- LOGIKA BUAH JERUK SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const orgContainer = document.getElementById('orgScroll');
    const orgPrev = document.getElementById('orgPrev');
    const orgNext = document.getElementById('orgNext');

    if(orgContainer && orgPrev && orgNext) {
        
        // 2. Logic Button Visibility
        const updateOrgButtons = () => {
            const sl = orgContainer.scrollLeft;
            const sw = orgContainer.scrollWidth;
            const cw = orgContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                orgPrev.classList.remove('show');
            } else {
                orgPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                orgNext.classList.remove('show');
            } else {
                orgNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        orgContainer.addEventListener('scroll', updateOrgButtons);
        
        orgNext.addEventListener('click', () => {
            orgContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        orgPrev.addEventListener('click', () => {
            orgContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateOrgButtons();
        window.addEventListener('resize', updateOrgButtons);
    }
});
// --- LOGIKA BUAH PISANG SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const banContainer = document.getElementById('banScroll');
    const banPrev = document.getElementById('banPrev');
    const banNext = document.getElementById('banNext');

    if(banContainer && banPrev && banNext) {
        
        // 2. Logic Button Visibility
        const updateBanButtons = () => {
            const sl = banContainer.scrollLeft;
            const sw = banContainer.scrollWidth;
            const cw = banContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                banPrev.classList.remove('show');
            } else {
                banPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                banNext.classList.remove('show');
            } else {
                banNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        banContainer.addEventListener('scroll', updateBanButtons);
        
        banNext.addEventListener('click', () => {
            banContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        banPrev.addEventListener('click', () => {
            banContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateBanButtons();
        window.addEventListener('resize', updateBanButtons);
    }
});
// --- LOGIKA BUAH ANGGUR SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const grpContainer = document.getElementById('grpScroll');
    const grpPrev = document.getElementById('grpPrev');
    const grpNext = document.getElementById('grpNext');

    if(grpContainer && grpPrev && grpNext) {
        
        // 2. Logic Button Visibility
        const updateGrpButtons = () => {
            const sl = grpContainer.scrollLeft;
            const sw = grpContainer.scrollWidth;
            const cw = grpContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                grpPrev.classList.remove('show');
            } else {
                grpPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                grpNext.classList.remove('show');
            } else {
                grpNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        grpContainer.addEventListener('scroll', updateGrpButtons);
        
        grpNext.addEventListener('click', () => {
            grpContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        grpPrev.addEventListener('click', () => {
            grpContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateGrpButtons();
        window.addEventListener('resize', updateGrpButtons);
    }
});
// --- LOGIKA BUAH MANGGA SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const mgoContainer = document.getElementById('mgoScroll');
    const mgoPrev = document.getElementById('mgoPrev');
    const mgoNext = document.getElementById('mgoNext');

    if(mgoContainer && mgoPrev && mgoNext) {
        
        // 2. Logic Button Visibility
        const updateMgoButtons = () => {
            const sl = mgoContainer.scrollLeft;
            const sw = mgoContainer.scrollWidth;
            const cw = mgoContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                mgoPrev.classList.remove('show');
            } else {
                mgoPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                mgoNext.classList.remove('show');
            } else {
                mgoNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        mgoContainer.addEventListener('scroll', updateMgoButtons);
        
        mgoNext.addEventListener('click', () => {
            mgoContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        mgoPrev.addEventListener('click', () => {
            mgoContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateMgoButtons();
        window.addEventListener('resize', updateMgoButtons);
    }
});
// --- LOGIKA BUAH ALPUKAT SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const avoContainer = document.getElementById('avoScroll');
    const avoPrev = document.getElementById('avoPrev');
    const avoNext = document.getElementById('avoNext');

    if(avoContainer && avoPrev && avoNext) {
        
        // 2. Logic Button Visibility
        const updateAvoButtons = () => {
            const sl = avoContainer.scrollLeft;
            const sw = avoContainer.scrollWidth;
            const cw = avoContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                avoPrev.classList.remove('show');
            } else {
                avoPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                avoNext.classList.remove('show');
            } else {
                avoNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        avoContainer.addEventListener('scroll', updateAvoButtons);
        
        avoNext.addEventListener('click', () => {
            avoContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        avoPrev.addEventListener('click', () => {
            avoContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateAvoButtons();
        window.addEventListener('resize', updateAvoButtons);
    }
});
// --- LOGIKA SAYURAN DAUN SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const leafContainer = document.getElementById('leafScroll');
    const leafPrev = document.getElementById('leafPrev');
    const leafNext = document.getElementById('leafNext');

    if(leafContainer && leafPrev && leafNext) {
        
        // 2. Logic Button Visibility
        const updateLeafButtons = () => {
            const sl = leafContainer.scrollLeft;
            const sw = leafContainer.scrollWidth;
            const cw = leafContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                leafPrev.classList.remove('show');
            } else {
                leafPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                leafNext.classList.remove('show');
            } else {
                leafNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        leafContainer.addEventListener('scroll', updateLeafButtons);
        
        leafNext.addEventListener('click', () => {
            leafContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        leafPrev.addEventListener('click', () => {
            leafContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateLeafButtons();
        window.addEventListener('resize', updateLeafButtons);
    }
});
// --- LOGIKA SAYURAN AKAR SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const rootContainer = document.getElementById('rootScroll');
    const rootPrev = document.getElementById('rootPrev');
    const rootNext = document.getElementById('rootNext');

    if(rootContainer && rootPrev && rootNext) {
        
        // 2. Logic Button Visibility
        const updateRootButtons = () => {
            const sl = rootContainer.scrollLeft;
            const sw = rootContainer.scrollWidth;
            const cw = rootContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                rootPrev.classList.remove('show');
            } else {
                rootPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                rootNext.classList.remove('show');
            } else {
                rootNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        rootContainer.addEventListener('scroll', updateRootButtons);
        
        rootNext.addEventListener('click', () => {
            rootContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        rootPrev.addEventListener('click', () => {
            rootContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateRootButtons();
        window.addEventListener('resize', updateRootButtons);
    }
});
// --- LOGIKA SAYURAN ORGANIK SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const orgContainer = document.getElementById('orgScroll');
    const orgPrev = document.getElementById('orgPrev');
    const orgNext = document.getElementById('orgNext');

    if(orgContainer && orgPrev && orgNext) {
        
        // 2. Logic Button Visibility
        const updateOrgButtons = () => {
            const sl = orgContainer.scrollLeft;
            const sw = orgContainer.scrollWidth;
            const cw = orgContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                orgPrev.classList.remove('show');
            } else {
                orgPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                orgNext.classList.remove('show');
            } else {
                orgNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        orgContainer.addEventListener('scroll', updateOrgButtons);
        
        orgNext.addEventListener('click', () => {
            orgContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        orgPrev.addEventListener('click', () => {
            orgContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateOrgButtons();
        window.addEventListener('resize', updateOrgButtons);
    }
});
// --- LOGIKA SAYURAN SEGAR LOKAL ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const locContainer = document.getElementById('locScroll');
    const locPrev = document.getElementById('locPrev');
    const locNext = document.getElementById('locNext');

    if(locContainer && locPrev && locNext) {
        
        // 2. Logic Button Visibility
        const updateLocButtons = () => {
            const sl = locContainer.scrollLeft;
            const sw = locContainer.scrollWidth;
            const cw = locContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                locPrev.classList.remove('show');
            } else {
                locPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                locNext.classList.remove('show');
            } else {
                locNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        locContainer.addEventListener('scroll', updateLocButtons);
        
        locNext.addEventListener('click', () => {
            locContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        locPrev.addEventListener('click', () => {
            locContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateLocButtons();
        window.addEventListener('resize', updateLocButtons);
    }
});
// --- LOGIKA SAYURAN SIAP MASAK ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const prepContainer = document.getElementById('prepScroll');
    const prepPrev = document.getElementById('prepPrev');
    const prepNext = document.getElementById('prepNext');

    if(prepContainer && prepPrev && prepNext) {
        
        // 2. Logic Button Visibility
        const updatePrepButtons = () => {
            const sl = prepContainer.scrollLeft;
            const sw = prepContainer.scrollWidth;
            const cw = prepContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                prepPrev.classList.remove('show');
            } else {
                prepPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                prepNext.classList.remove('show');
            } else {
                prepNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        prepContainer.addEventListener('scroll', updatePrepButtons);
        
        prepNext.addEventListener('click', () => {
            prepContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        prepPrev.addEventListener('click', () => {
            prepContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updatePrepButtons();
        window.addEventListener('resize', updatePrepButtons);
    }
});
// --- LOGIKA BUAH TROPIS SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const tropContainer = document.getElementById('tropScroll');
    const tropPrev = document.getElementById('tropPrev');
    const tropNext = document.getElementById('tropNext');

    if(tropContainer && tropPrev && tropNext) {
        
        // 2. Logic Button Visibility
        const updateTropButtons = () => {
            const sl = tropContainer.scrollLeft;
            const sw = tropContainer.scrollWidth;
            const cw = tropContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                tropPrev.classList.remove('show');
            } else {
                tropPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                tropNext.classList.remove('show');
            } else {
                tropNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        tropContainer.addEventListener('scroll', updateTropButtons);
        
        tropNext.addEventListener('click', () => {
            tropContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        tropPrev.addEventListener('click', () => {
            tropContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateTropButtons();
        window.addEventListener('resize', updateTropButtons);
    }
});
// --- LOGIKA BUAH & SAYUR PAKET HEMAT ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const bdlContainer = document.getElementById('bdlScroll');
    const bdlPrev = document.getElementById('bdlPrev');
    const bdlNext = document.getElementById('bdlNext');

    if(bdlContainer && bdlPrev && bdlNext) {
        
        // 2. Logic Button Visibility
        const updateBdlButtons = () => {
            const sl = bdlContainer.scrollLeft;
            const sw = bdlContainer.scrollWidth;
            const cw = bdlContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                bdlPrev.classList.remove('show');
            } else {
                bdlPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                bdlNext.classList.remove('show');
            } else {
                bdlNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        bdlContainer.addEventListener('scroll', updateBdlButtons);
        
        bdlNext.addEventListener('click', () => {
            bdlContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        bdlPrev.addEventListener('click', () => {
            bdlContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateBdlButtons();
        window.addEventListener('resize', updateBdlButtons);
    }
});
// --- LOGIKA BUAH KERING PREMIUM ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const dryContainer = document.getElementById('dryScroll');
    const dryPrev = document.getElementById('dryPrev');
    const dryNext = document.getElementById('dryNext');

    if(dryContainer && dryPrev && dryNext) {
        
        // 2. Logic Button Visibility
        const updateDryButtons = () => {
            const sl = dryContainer.scrollLeft;
            const sw = dryContainer.scrollWidth;
            const cw = dryContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                dryPrev.classList.remove('show');
            } else {
                dryPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                dryNext.classList.remove('show');
            } else {
                dryNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        dryContainer.addEventListener('scroll', updateDryButtons);
        
        dryNext.addEventListener('click', () => {
            dryContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        dryPrev.addEventListener('click', () => {
            dryContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateDryButtons();
        window.addEventListener('resize', updateDryButtons);
    }
});
// --- LOGIKA SAYURAN REMPAH SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const spcContainer = document.getElementById('spcScroll');
    const spcPrev = document.getElementById('spcPrev');
    const spcNext = document.getElementById('spcNext');

    if(spcContainer && spcPrev && spcNext) {
        
        // 2. Logic Button Visibility
        const updateSpcButtons = () => {
            const sl = spcContainer.scrollLeft;
            const sw = spcContainer.scrollWidth;
            const cw = spcContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                spcPrev.classList.remove('show');
            } else {
                spcPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                spcNext.classList.remove('show');
            } else {
                spcNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        spcContainer.addEventListener('scroll', updateSpcButtons);
        
        spcNext.addEventListener('click', () => {
            spcContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        spcPrev.addEventListener('click', () => {
            spcContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateSpcButtons();
        window.addEventListener('resize', updateSpcButtons);
    }
});

// --- LOGIKA PERLENGKAPAN SEKOLAH ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const schContainer = document.getElementById('schScroll');
    const schPrev = document.getElementById('schPrev');
    const schNext = document.getElementById('schNext');

    if(schContainer && schPrev && schNext) {
        
        // 2. Logic Button Visibility
        const updateSchButtons = () => {
            const sl = schContainer.scrollLeft;
            const sw = schContainer.scrollWidth;
            const cw = schContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                schPrev.classList.remove('show');
            } else {
                schPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                schNext.classList.remove('show');
            } else {
                schNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        schContainer.addEventListener('scroll', updateSchButtons);
        
        schNext.addEventListener('click', () => {
            schContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        schPrev.addEventListener('click', () => {
            schContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateSchButtons();
        window.addEventListener('resize', updateSchButtons);
    }
});
// --- LOGIKA PERLENGKAPAN KULIAH ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const colContainer = document.getElementById('colScroll');
    const colPrev = document.getElementById('colPrev');
    const colNext = document.getElementById('colNext');

    if(colContainer && colPrev && colNext) {
        
        // 2. Logic Button Visibility
        const updateColButtons = () => {
            const sl = colContainer.scrollLeft;
            const sw = colContainer.scrollWidth;
            const cw = colContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                colPrev.classList.remove('show');
            } else {
                colPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                colNext.classList.remove('show');
            } else {
                colNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        colContainer.addEventListener('scroll', updateColButtons);
        
        colNext.addEventListener('click', () => {
            colContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        colPrev.addEventListener('click', () => {
            colContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateColButtons();
        window.addEventListener('resize', updateColButtons);
    }
});
// --- LOGIKA PERLENGKAPAN KANTOR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const offContainer = document.getElementById('offScroll');
    const offPrev = document.getElementById('offPrev');
    const offNext = document.getElementById('offNext');

    if(offContainer && offPrev && offNext) {
        
        // 2. Logic Button Visibility
        const updateOffButtons = () => {
            const sl = offContainer.scrollLeft;
            const sw = offContainer.scrollWidth;
            const cw = offContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                offPrev.classList.remove('show');
            } else {
                offPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                offNext.classList.remove('show');
            } else {
                offNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        offContainer.addEventListener('scroll', updateOffButtons);
        
        offNext.addEventListener('click', () => {
            offContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        offPrev.addEventListener('click', () => {
            offContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateOffButtons();
        window.addEventListener('resize', updateOffButtons);
    }
});
// --- LOGIKA PERLENGKAPAN RUMAH SEGAR ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const homeContainer = document.getElementById('homeScroll');
    const homePrev = document.getElementById('homePrev');
    const homeNext = document.getElementById('homeNext');

    if(homeContainer && homePrev && homeNext) {
        
        // 2. Logic Button Visibility
        const updateHomeButtons = () => {
            const sl = homeContainer.scrollLeft;
            const sw = homeContainer.scrollWidth;
            const cw = homeContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                homePrev.classList.remove('show');
            } else {
                homePrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                homeNext.classList.remove('show');
            } else {
                homeNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        homeContainer.addEventListener('scroll', updateHomeButtons);
        
        homeNext.addEventListener('click', () => {
            homeContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        homePrev.addEventListener('click', () => {
            homeContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateHomeButtons();
        window.addEventListener('resize', updateHomeButtons);
    }
});
// --- LOGIKA PERLENGKAPAN GAMING ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const gameContainer = document.getElementById('gameScroll');
    const gamePrev = document.getElementById('gamePrev');
    const gameNext = document.getElementById('gameNext');

    if(gameContainer && gamePrev && gameNext) {
        
        // 2. Logic Button Visibility
        const updateGameButtons = () => {
            const sl = gameContainer.scrollLeft;
            const sw = gameContainer.scrollWidth;
            const cw = gameContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                gamePrev.classList.remove('show');
            } else {
                gamePrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                gameNext.classList.remove('show');
            } else {
                gameNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        gameContainer.addEventListener('scroll', updateGameButtons);
        
        gameNext.addEventListener('click', () => {
            gameContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        gamePrev.addEventListener('click', () => {
            gameContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateGameButtons();
        window.addEventListener('resize', updateGameButtons);
    }
});
// --- LOGIKA PERLENGKAPAN OLAHRAGA ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const sportContainer = document.getElementById('sportScroll');
    const sportPrev = document.getElementById('sportPrev');
    const sportNext = document.getElementById('sportNext');

    if(sportContainer && sportPrev && sportNext) {
        
        // 2. Logic Button Visibility
        const updateSportButtons = () => {
            const sl = sportContainer.scrollLeft;
            const sw = sportContainer.scrollWidth;
            const cw = sportContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                sportPrev.classList.remove('show');
            } else {
                sportPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                sportNext.classList.remove('show');
            } else {
                sportNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        sportContainer.addEventListener('scroll', updateSportButtons);
        
        sportNext.addEventListener('click', () => {
            sportContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        sportPrev.addEventListener('click', () => {
            sportContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateSportButtons();
        window.addEventListener('resize', updateSportButtons);
    }
});
// --- LOGIKA PERLENGKAPAN PETUALANGAN ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const advContainer = document.getElementById('advScroll');
    const advPrev = document.getElementById('advPrev');
    const advNext = document.getElementById('advNext');

    if(advContainer && advPrev && advNext) {
        
        // 2. Logic Button Visibility
        const updateAdvButtons = () => {
            const sl = advContainer.scrollLeft;
            const sw = advContainer.scrollWidth;
            const cw = advContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                advPrev.classList.remove('show');
            } else {
                advPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                advNext.classList.remove('show');
            } else {
                advNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        advContainer.addEventListener('scroll', updateAdvButtons);
        
        advNext.addEventListener('click', () => {
            advContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        advPrev.addEventListener('click', () => {
            advContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateAdvButtons();
        window.addEventListener('resize', updateAdvButtons);
    }
});
// --- LOGIKA BARANG ELEKTRONIK ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const elecContainer = document.getElementById('elecScroll');
    const elecPrev = document.getElementById('elecPrev');
    const elecNext = document.getElementById('elecNext');

    if(elecContainer && elecPrev && elecNext) {
        
        // 2. Logic Button Visibility
        const updateElecButtons = () => {
            const sl = elecContainer.scrollLeft;
            const sw = elecContainer.scrollWidth;
            const cw = elecContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                elecPrev.classList.remove('show');
            } else {
                elecPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                elecNext.classList.remove('show');
            } else {
                elecNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        elecContainer.addEventListener('scroll', updateElecButtons);
        
        elecNext.addEventListener('click', () => {
            elecContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        elecPrev.addEventListener('click', () => {
            elecContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateElecButtons();
        window.addEventListener('resize', updateElecButtons);
    }
});
// --- LOGIKA MOTOR SHOWROOM ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const motoContainer = document.getElementById('motoScroll');
    const motoPrev = document.getElementById('motoPrev');
    const motoNext = document.getElementById('motoNext');

    if(motoContainer && motoPrev && motoNext) {
        
        // 2. Logic Button Visibility
        const updateMotoButtons = () => {
            const sl = motoContainer.scrollLeft;
            const sw = motoContainer.scrollWidth;
            const cw = motoContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                motoPrev.classList.remove('show');
            } else {
                motoPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                motoNext.classList.remove('show');
            } else {
                motoNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        motoContainer.addEventListener('scroll', updateMotoButtons);
        
        motoNext.addEventListener('click', () => {
            motoContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        motoPrev.addEventListener('click', () => {
            motoContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateMotoButtons();
        window.addEventListener('resize', updateMotoButtons);
    }
});
// --- LOGIKA MOBIL SHOWROOM ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const carContainer = document.getElementById('carScroll');
    const carPrev = document.getElementById('carPrev');
    const carNext = document.getElementById('carNext');

    if(carContainer && carPrev && carNext) {
        
        // 2. Logic Button Visibility
        const updateCarButtons = () => {
            const sl = carContainer.scrollLeft;
            const sw = carContainer.scrollWidth;
            const cw = carContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                carPrev.classList.remove('show');
            } else {
                carPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                carNext.classList.remove('show');
            } else {
                carNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        carContainer.addEventListener('scroll', updateCarButtons);
        
        carNext.addEventListener('click', () => {
            carContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        carPrev.addEventListener('click', () => {
            carContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateCarButtons();
        window.addEventListener('resize', updateCarButtons);
    }
});
// --- LOGIKA SEPEDA SHOWROOM ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const bikeContainer = document.getElementById('bikeScroll');
    const bikePrev = document.getElementById('bikePrev');
    const bikeNext = document.getElementById('bikeNext');

    if(bikeContainer && bikePrev && bikeNext) {
        
        // 2. Logic Button Visibility
        const updateBikeButtons = () => {
            const sl = bikeContainer.scrollLeft;
            const sw = bikeContainer.scrollWidth;
            const cw = bikeContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                bikePrev.classList.remove('show');
            } else {
                bikePrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                bikeNext.classList.remove('show');
            } else {
                bikeNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        bikeContainer.addEventListener('scroll', updateBikeButtons);
        
        bikeNext.addEventListener('click', () => {
            bikeContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        bikePrev.addEventListener('click', () => {
            bikeContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateBikeButtons();
        window.addEventListener('resize', updateBikeButtons);
    }
});
// --- LOGIKA SAVE FOOD SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const sfContainer = document.getElementById('sfScroll');
    const sfPrev = document.getElementById('sfPrev');
    const sfNext = document.getElementById('sfNext');

    if(sfContainer && sfPrev && sfNext) {
        
        // 2. Logic Button Visibility
        const updateSfButtons = () => {
            const sl = sfContainer.scrollLeft;
            const sw = sfContainer.scrollWidth;
            const cw = sfContainer.clientWidth;

            // Kiri: Sesuai request, sebelum scroll ke kanan (posisi 0), navigasi kiri (biasanya prev) disembunyikan
            // Logika standar: Jika di paling kiri, sembunyikan Prev.
            if(sl <= 10) {
                sfPrev.classList.remove('show');
            } else {
                sfPrev.classList.add('show');
            }

            // Kanan: Jika di paling kanan, sembunyikan Next.
            if(sl + cw >= sw - 5) {
                sfNext.classList.remove('show');
            } else {
                sfNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        sfContainer.addEventListener('scroll', updateSfButtons);
        
        sfNext.addEventListener('click', () => {
            sfContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        sfPrev.addEventListener('click', () => {
            sfContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateSfButtons();
        window.addEventListener('resize', updateSfButtons);
    }
});
// --- LOGIKA QUICK MART ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const qmContainer = document.getElementById('qmScroll');
    const qmPrev = document.getElementById('qmPrev');
    const qmNext = document.getElementById('qmNext');

    if(qmContainer && qmPrev && qmNext) {
        
        // 2. Logic Button Visibility
        const updateQmButtons = () => {
            const sl = qmContainer.scrollLeft;
            const sw = qmContainer.scrollWidth;
            const cw = qmContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                qmPrev.classList.remove('show');
            } else {
                qmPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                qmNext.classList.remove('show');
            } else {
                qmNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        qmContainer.addEventListener('scroll', updateQmButtons);
        
        qmNext.addEventListener('click', () => {
            qmContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        qmPrev.addEventListener('click', () => {
            qmContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateQmButtons();
        window.addEventListener('resize', updateQmButtons);
    }
});
// --- LOGIKA RETAIL PARTNER SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const retContainer = document.getElementById('retScroll');
    const retPrev = document.getElementById('retPrev');
    const retNext = document.getElementById('retNext');

    if(retContainer && retPrev && retNext) {
        
        // 2. Logic Button Visibility
        const updateRetButtons = () => {
            const sl = retContainer.scrollLeft;
            const sw = retContainer.scrollWidth;
            const cw = retContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                retPrev.classList.remove('show');
            } else {
                retPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                retNext.classList.remove('show');
            } else {
                retNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        retContainer.addEventListener('scroll', updateRetButtons);
        
        retNext.addEventListener('click', () => {
            retContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        retPrev.addEventListener('click', () => {
            retContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateRetButtons();
        window.addEventListener('resize', updateRetButtons);
    }
});
// --- LOGIKA LOOP MALL SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const mallContainer = document.getElementById('mallScroll');
    const mallPrev = document.getElementById('mallPrev');
    const mallNext = document.getElementById('mallNext');

    if(mallContainer && mallPrev && mallNext) {
        
        // 2. Logic Button Visibility
        const updateMallButtons = () => {
            const sl = mallContainer.scrollLeft;
            const sw = mallContainer.scrollWidth;
            const cw = mallContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                mallPrev.classList.remove('show');
            } else {
                mallPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                mallNext.classList.remove('show');
            } else {
                mallNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        mallContainer.addEventListener('scroll', updateMallButtons);
        
        mallNext.addEventListener('click', () => {
            mallContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        mallPrev.addEventListener('click', () => {
            mallContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateMallButtons();
        window.addEventListener('resize', updateMallButtons);
    }
});
// --- LOGIKA LOOP MART SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const lmContainer = document.getElementById('lmScroll');
    const lmPrev = document.getElementById('lmPrev');
    const lmNext = document.getElementById('lmNext');

    if(lmContainer && lmPrev && lmNext) {
        
        // 2. Logic Button Visibility
        const updateLmButtons = () => {
            const sl = lmContainer.scrollLeft;
            const sw = lmContainer.scrollWidth;
            const cw = lmContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                lmPrev.classList.remove('show');
            } else {
                lmPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                lmNext.classList.remove('show');
            } else {
                lmNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        lmContainer.addEventListener('scroll', updateLmButtons);
        
        lmNext.addEventListener('click', () => {
            lmContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        lmPrev.addEventListener('click', () => {
            lmContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateLmButtons();
        window.addEventListener('resize', updateLmButtons);
    }
});
// --- LOGIKA LIVE SHOPPING SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const liveContainer = document.getElementById('liveScroll');
    const livePrev = document.getElementById('livePrev');
    const liveNext = document.getElementById('liveNext');

    if(liveContainer && livePrev && liveNext) {
        
        // 2. Logic Button Visibility
        const updateLiveButtons = () => {
            const sl = liveContainer.scrollLeft;
            const sw = liveContainer.scrollWidth;
            const cw = liveContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                livePrev.classList.remove('show');
            } else {
                livePrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                liveNext.classList.remove('show');
            } else {
                liveNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        liveContainer.addEventListener('scroll', updateLiveButtons);
        
        liveNext.addEventListener('click', () => {
            liveContainer.scrollBy({ left: 200, behavior: 'smooth' }); // Scroll width lebih kecil karena kartu ramping
        });
        
        livePrev.addEventListener('click', () => {
            liveContainer.scrollBy({ left: -200, behavior: 'smooth' });
        });

        // 4. Init Check
        updateLiveButtons();
        window.addEventListener('resize', updateLiveButtons);
    }
});
// --- LOGIKA LAYANAN PENDUKUNG (SUPPORT SERVICES) ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const supContainer = document.getElementById('supScroll');
    const supPrev = document.getElementById('supPrev');
    const supNext = document.getElementById('supNext');

    if(supContainer && supPrev && supNext) {
        
        // 2. Logic Button Visibility
        const updateSupButtons = () => {
            const sl = supContainer.scrollLeft;
            const sw = supContainer.scrollWidth;
            const cw = supContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                supPrev.classList.remove('show');
            } else {
                supPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                supNext.classList.remove('show');
            } else {
                supNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        supContainer.addEventListener('scroll', updateSupButtons);
        
        supNext.addEventListener('click', () => {
            supContainer.scrollBy({ left: 250, behavior: 'smooth' }); // Scroll width
        });
        
        supPrev.addEventListener('click', () => {
            supContainer.scrollBy({ left: -250, behavior: 'smooth' });
        });

        // 4. Init Check
        updateSupButtons();
        window.addEventListener('resize', updateSupButtons);
    }
});
// --- LOGIKA LAYANAN SOSIAL SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const socContainer = document.getElementById('socScroll');
    const socPrev = document.getElementById('socPrev');
    const socNext = document.getElementById('socNext');

    if(socContainer && socPrev && socNext) {
        
        // 2. Logic Button Visibility
        const updateSocButtons = () => {
            const sl = socContainer.scrollLeft;
            const sw = socContainer.scrollWidth;
            const cw = socContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                socPrev.classList.remove('show');
            } else {
                socPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                socNext.classList.remove('show');
            } else {
                socNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        socContainer.addEventListener('scroll', updateSocButtons);
        
        socNext.addEventListener('click', () => {
            socContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        socPrev.addEventListener('click', () => {
            socContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateSocButtons();
        window.addEventListener('resize', updateSocButtons);
    }
});
// --- LOGIKA DIGITAL PRODUCT SERVICES ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const digiContainer = document.getElementById('digiScroll');
    const digiPrev = document.getElementById('digiPrev');
    const digiNext = document.getElementById('digiNext');

    if(digiContainer && digiPrev && digiNext) {
        
        // 2. Logic Button Visibility
        const updateDigiButtons = () => {
            const sl = digiContainer.scrollLeft;
            const sw = digiContainer.scrollWidth;
            const cw = digiContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                digiPrev.classList.remove('show');
            } else {
                digiPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                digiNext.classList.remove('show');
            } else {
                digiNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        digiContainer.addEventListener('scroll', updateDigiButtons);
        
        digiNext.addEventListener('click', () => {
            digiContainer.scrollBy({ left: 250, behavior: 'smooth' }); // Scroll width
        });
        
        digiPrev.addEventListener('click', () => {
            digiContainer.scrollBy({ left: -250, behavior: 'smooth' });
        });

        // 4. Init Check
        updateDigiButtons();
        window.addEventListener('resize', updateDigiButtons);
    }
});
// --- LOGIKA PRODUK TAMBAHAN SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const addContainer = document.getElementById('addScroll');
    const addPrev = document.getElementById('addPrev');
    const addNext = document.getElementById('addNext');

    if(addContainer && addPrev && addNext) {
        
        // 2. Logic Button Visibility
        const updateAddButtons = () => {
            const sl = addContainer.scrollLeft;
            const sw = addContainer.scrollWidth;
            const cw = addContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                addPrev.classList.remove('show');
            } else {
                addPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                addNext.classList.remove('show');
            } else {
                addNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        addContainer.addEventListener('scroll', updateAddButtons);
        
        addNext.addEventListener('click', () => {
            addContainer.scrollBy({ left: 260, behavior: 'smooth' }); // Scroll width
        });
        
        addPrev.addEventListener('click', () => {
            addContainer.scrollBy({ left: -260, behavior: 'smooth' });
        });

        // 4. Init Check
        updateAddButtons();
        window.addEventListener('resize', updateAddButtons);
    }
});

// --- LOGIKA FAVORITE RESTAURANT ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const restoContainer = document.getElementById('restoScroll');
    const restoPrev = document.getElementById('restoPrev');
    const restoNext = document.getElementById('restoNext');

    if(restoContainer && restoPrev && restoNext) {
        
        // 2. Logic Button Visibility
        const updateRestoButtons = () => {
            const sl = restoContainer.scrollLeft;
            const sw = restoContainer.scrollWidth;
            const cw = restoContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                restoPrev.classList.remove('show');
            } else {
                restoPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                restoNext.classList.remove('show');
            } else {
                restoNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        restoContainer.addEventListener('scroll', updateRestoButtons);
        
        restoNext.addEventListener('click', () => {
            restoContainer.scrollBy({ left: 320, behavior: 'smooth' });
        });
        
        restoPrev.addEventListener('click', () => {
            restoContainer.scrollBy({ left: -320, behavior: 'smooth' });
        });

        // 4. Init Check
        updateRestoButtons();
        window.addEventListener('resize', updateRestoButtons);
    }
});
// --- LOGIKA FAVORITE FASHION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const fshContainer = document.getElementById('fashionScroll');
    const fshPrev = document.getElementById('fashionPrev');
    const fshNext = document.getElementById('fashionNext');

    if(fshContainer && fshPrev && fshNext) {
        
        // 2. Logic Button Visibility
        const updateFshButtons = () => {
            const sl = fshContainer.scrollLeft;
            const sw = fshContainer.scrollWidth;
            const cw = fshContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                fshPrev.classList.remove('show');
            } else {
                fshPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                fshNext.classList.remove('show');
            } else {
                fshNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        fshContainer.addEventListener('scroll', updateFshButtons);
        
        fshNext.addEventListener('click', () => {
            fshContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        fshPrev.addEventListener('click', () => {
            fshContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateFshButtons();
        window.addEventListener('resize', updateFshButtons);
    }
});
// --- LOGIKA FAVORITE SNACK ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const snackContainer = document.getElementById('snackScroll');
    const snackPrev = document.getElementById('snackPrev');
    const snackNext = document.getElementById('snackNext');

    if(snackContainer && snackPrev && snackNext) {
        
        // 2. Logic Button Visibility
        const updateSnackButtons = () => {
            const sl = snackContainer.scrollLeft;
            const sw = snackContainer.scrollWidth;
            const cw = snackContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                snackPrev.classList.remove('show');
            } else {
                snackPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                snackNext.classList.remove('show');
            } else {
                snackNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        snackContainer.addEventListener('scroll', updateSnackButtons);
        
        snackNext.addEventListener('click', () => {
            snackContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        snackPrev.addEventListener('click', () => {
            snackContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateSnackButtons();
        window.addEventListener('resize', updateSnackButtons);
    }
});
// --- LOGIKA FAVORITE DRINK ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const drinkContainer = document.getElementById('drinkScroll');
    const drinkPrev = document.getElementById('drinkPrev');
    const drinkNext = document.getElementById('drinkNext');

    if(drinkContainer && drinkPrev && drinkNext) {
        
        // 2. Logic Button Visibility
        const updateDrinkButtons = () => {
            const sl = drinkContainer.scrollLeft;
            const sw = drinkContainer.scrollWidth;
            const cw = drinkContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                drinkPrev.classList.remove('show');
            } else {
                drinkPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                drinkNext.classList.remove('show');
            } else {
                drinkNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        drinkContainer.addEventListener('scroll', updateDrinkButtons);
        
        drinkNext.addEventListener('click', () => {
            drinkContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        drinkPrev.addEventListener('click', () => {
            drinkContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateDrinkButtons();
        window.addEventListener('resize', updateDrinkButtons);
    }
});
// --- LOGIKA FAVORITE FRUIT ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const fruitContainer = document.getElementById('fruitScroll');
    const fruitPrev = document.getElementById('fruitPrev');
    const fruitNext = document.getElementById('fruitNext');

    if(fruitContainer && fruitPrev && fruitNext) {
        
        // 2. Logic Button Visibility
        const updateFruitButtons = () => {
            const sl = fruitContainer.scrollLeft;
            const sw = fruitContainer.scrollWidth;
            const cw = fruitContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                fruitPrev.classList.remove('show');
            } else {
                fruitPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                fruitNext.classList.remove('show');
            } else {
                fruitNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        fruitContainer.addEventListener('scroll', updateFruitButtons);
        
        fruitNext.addEventListener('click', () => {
            fruitContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        fruitPrev.addEventListener('click', () => {
            fruitContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateFruitButtons();
        window.addEventListener('resize', updateFruitButtons);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const meatContainer = document.getElementById('meatScroll');
    const meatPrev = document.getElementById('meatPrev');
    const meatNext = document.getElementById('meatNext');

    if(meatContainer && meatPrev && meatNext) {
        
        // 2. Logic Button Visibility
        const updateMeatButtons = () => {
            const sl = meatContainer.scrollLeft;
            const sw = meatContainer.scrollWidth;
            const cw = meatContainer.clientWidth;

            // Kiri: Hilang di awal
            if(sl <= 10) {
                meatPrev.classList.remove('show');
            } else {
                meatPrev.classList.add('show');
            }

            // Kanan: Hilang di akhir
            if(sl + cw >= sw - 5) {
                meatNext.classList.remove('show');
            } else {
                meatNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        meatContainer.addEventListener('scroll', updateMeatButtons);
        
        meatNext.addEventListener('click', () => {
            meatContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        meatPrev.addEventListener('click', () => {
            meatContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateMeatButtons();
        window.addEventListener('resize', updateMeatButtons);

        // 5. Timer (Meat)
        const mh = document.getElementById('mt-h');
        const mm = document.getElementById('mt-m');
        const ms = document.getElementById('mt-s');
        if(mh) {
            let mt = 11700; // detik (3.25 jam)
            setInterval(() => {
                let h = Math.floor(mt/3600);
                let m = Math.floor((mt%3600)/60);
                let s = mt%60;
                mh.innerText = h<10?'0'+h:h;
                mm.innerText = m<10?'0'+m:m;
                ms.innerText = s<10?'0'+s:s;
                if(mt>0) mt--; else mt=11700;
            }, 1000);
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selector
    const foodContainer = document.getElementById('foodScroll');
    const foodPrev = document.getElementById('foodPrev');
    const foodNext = document.getElementById('foodNext');

    if(foodContainer && foodPrev && foodNext) {
        
        // 2. Fungsi Update Tombol
        const updateFoodButtons = () => {
            const sl = foodContainer.scrollLeft;
            const sw = foodContainer.scrollWidth;
            const cw = foodContainer.clientWidth;

            // Kiri: Hilang jika di posisi 0 (awal)
            if(sl <= 10) {
                foodPrev.classList.remove('show');
            } else {
                foodPrev.classList.add('show');
            }

            // Kanan: Hilang jika di posisi max (akhir)
            if(sl + cw >= sw - 5) {
                foodNext.classList.remove('show');
            } else {
                foodNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        foodContainer.addEventListener('scroll', updateFoodButtons);
        
        foodNext.addEventListener('click', () => {
            foodContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        foodPrev.addEventListener('click', () => {
            foodContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateFoodButtons();
        window.addEventListener('resize', updateFoodButtons);

        // 5. Timer Mundur (Opsional - Simulasi)
        const fh = document.getElementById('food-h');
        const fm = document.getElementById('food-m');
        const fs = document.getElementById('food-s');
        if(fh) {
            let ft = 9900; // detik
            setInterval(() => {
                let h = Math.floor(ft/3600);
                let m = Math.floor((ft%3600)/60);
                let s = ft%60;
                fh.innerText = h<10?'0'+h:h;
                fm.innerText = m<10?'0'+m:m;
                fs.innerText = s<10?'0'+s:s;
                if(ft>0) ft--; else ft=9900;
            }, 1000);
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. COUNTDOWN TIMER
    const h = document.getElementById('fs-hours');
    const m = document.getElementById('fs-minutes');
    const s = document.getElementById('fs-seconds');
    
    if(h && m && s) {
        let time = 10800; // 3 Jam dalam detik
        setInterval(() => {
            let hours = Math.floor(time / 3600);
            let mins = Math.floor((time % 3600) / 60);
            let secs = time % 60;
            
            h.innerText = hours < 10 ? '0' + hours : hours;
            m.innerText = mins < 10 ? '0' + mins : mins;
            s.innerText = secs < 10 ? '0' + secs : secs;
            
            if(time > 0) time--;
            else time = 10800;
        }, 1000);
    }

    // 2. NAVIGASI SCROLL (Sama dengan fitur lainnya)
    const fsContainer = document.getElementById('flashScroll');
    const fsPrev = document.getElementById('flashPrev');
    const fsNext = document.getElementById('flashNext');

    if(fsContainer && fsPrev && fsNext) {
        const updateFsBtns = () => {
            const sl = fsContainer.scrollLeft;
            const sw = fsContainer.scrollWidth;
            const cw = fsContainer.clientWidth;

            if(sl <= 10) fsPrev.classList.remove('show');
            else fsPrev.classList.add('show');

            if(sl + cw >= sw - 5) fsNext.classList.remove('show');
            else fsNext.classList.add('show');
        };

        fsContainer.addEventListener('scroll', updateFsBtns);
        fsNext.addEventListener('click', () => fsContainer.scrollBy({ left: 300, behavior: 'smooth' }));
        fsPrev.addEventListener('click', () => fsContainer.scrollBy({ left: -300, behavior: 'smooth' }));
        updateFsBtns();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const catScrollContainer = document.getElementById('categoryScroll');
    const catPrevBtn = document.getElementById('catPrev');
    const catNextBtn = document.getElementById('catNext');

    if (catScrollContainer && catPrevBtn && catNextBtn) {
        
        // Fungsi Update Tombol Kategori
        const updateCatButtons = () => {
            const scrollLeft = catScrollContainer.scrollLeft;
            const scrollWidth = catScrollContainer.scrollWidth;
            const clientWidth = catScrollContainer.clientWidth;

            // Tombol Kiri
            if (scrollLeft <= 10) {
                catPrevBtn.classList.remove('show');
            } else {
                catPrevBtn.classList.add('show');
            }

            // Tombol Kanan (Toleransi 5px)
            if (scrollLeft + clientWidth >= scrollWidth - 5) {
                catNextBtn.classList.remove('show');
            } else {
                catNextBtn.classList.add('show');
            }
        };

        // Event Scroll
        catScrollContainer.addEventListener('scroll', updateCatButtons);

        // Event Click Next
        catNextBtn.addEventListener('click', () => {
            catScrollContainer.scrollBy({ left: 350, behavior: 'smooth' });
        });

        // Event Click Prev
        catPrevBtn.addEventListener('click', () => {
            catScrollContainer.scrollBy({ left: -350, behavior: 'smooth' });
        });

        // Init
        updateCatButtons();
        window.addEventListener('resize', updateCatButtons);
    }
});



// --- LOGIKA LAYANAN AI SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const aiContainer = document.getElementById('aiScroll');
    const aiPrev = document.getElementById('aiPrev');
    const aiNext = document.getElementById('aiNext');

    if(aiContainer && aiPrev && aiNext) {
        
        // 2. Logic Button Visibility
        const updateAiButtons = () => {
            const sl = aiContainer.scrollLeft;
            const sw = aiContainer.scrollWidth;
            const cw = aiContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                aiPrev.classList.remove('show');
            } else {
                aiPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                aiNext.classList.remove('show');
            } else {
                aiNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        aiContainer.addEventListener('scroll', updateAiButtons);
        
        aiNext.addEventListener('click', () => {
            aiContainer.scrollBy({ left: 250, behavior: 'smooth' }); // Scroll width
        });
        
        aiPrev.addEventListener('click', () => {
            aiContainer.scrollBy({ left: -250, behavior: 'smooth' });
        });

        // 4. Init Check
        updateAiButtons();
        window.addEventListener('resize', updateAiButtons);
    }
});
// --- LOGIKA FACTORY TO CUSTOMER SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const f2cContainer = document.getElementById('f2cScroll');
    const f2cPrev = document.getElementById('f2cPrev');
    const f2cNext = document.getElementById('f2cNext');

    if(f2cContainer && f2cPrev && f2cNext) {
        
        // 2. Logic Button Visibility
        const updateF2cButtons = () => {
            const sl = f2cContainer.scrollLeft;
            const sw = f2cContainer.scrollWidth;
            const cw = f2cContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                f2cPrev.classList.remove('show');
            } else {
                f2cPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 5) {
                f2cNext.classList.remove('show');
            } else {
                f2cNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        f2cContainer.addEventListener('scroll', updateF2cButtons);
        
        f2cNext.addEventListener('click', () => {
            f2cContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        f2cPrev.addEventListener('click', () => {
            f2cContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        // 4. Init Check
        updateF2cButtons();
        window.addEventListener('resize', updateF2cButtons);
    }
});
// --- LOGIKA FOOD BANNER AD SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const fbContainer = document.getElementById('fbScroll');
    const fbPrev = document.getElementById('fbPrev');
    const fbNext = document.getElementById('fbNext');

    if(fbContainer && fbPrev && fbNext) {
        
        // 2. Logic Button Visibility
        const updateFbButtons = () => {
            const sl = fbContainer.scrollLeft;
            const sw = fbContainer.scrollWidth;
            const cw = fbContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                fbPrev.classList.remove('show');
            } else {
                fbPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 10) {
                fbNext.classList.remove('show');
            } else {
                fbNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        fbContainer.addEventListener('scroll', updateFbButtons);
        
        // Scroll per item (600px width + gap)
        fbNext.addEventListener('click', () => {
            fbContainer.scrollBy({ left: 620, behavior: 'smooth' }); 
        });
        
        fbPrev.addEventListener('click', () => {
            fbContainer.scrollBy({ left: -620, behavior: 'smooth' });
        });

        // 4. Init Check
        updateFbButtons();
        window.addEventListener('resize', updateFbButtons);
    }
});
// --- LOGIKA FRESH MARKET BANNER SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const freshContainer = document.getElementById('freshScroll');
    const freshPrev = document.getElementById('freshPrev');
    const freshNext = document.getElementById('freshNext');

    if(freshContainer && freshPrev && freshNext) {
        
        // 2. Logic Button Visibility
        const updateFreshButtons = () => {
            const sl = freshContainer.scrollLeft;
            const sw = freshContainer.scrollWidth;
            const cw = freshContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                freshPrev.classList.remove('show');
            } else {
                freshPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 10) {
                freshNext.classList.remove('show');
            } else {
                freshNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        freshContainer.addEventListener('scroll', updateFreshButtons);
        
        // Scroll per item (580px width + gap)
        freshNext.addEventListener('click', () => {
            freshContainer.scrollBy({ left: 600, behavior: 'smooth' }); 
        });
        
        freshPrev.addEventListener('click', () => {
            freshContainer.scrollBy({ left: -600, behavior: 'smooth' });
        });

        // 4. Init Check
        updateFreshButtons();
        window.addEventListener('resize', updateFreshButtons);
    }
});
// --- LOGIKA MEAT BANNER SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const meatContainer = document.getElementById('meatScroll');
    const meatPrev = document.getElementById('meatPrev');
    const meatNext = document.getElementById('meatNext');

    if(meatContainer && meatPrev && meatNext) {
        
        // 2. Logic Button Visibility
        const updateMeatButtons = () => {
            const sl = meatContainer.scrollLeft;
            const sw = meatContainer.scrollWidth;
            const cw = meatContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                meatPrev.classList.remove('show');
            } else {
                meatPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 10) {
                meatNext.classList.remove('show');
            } else {
                meatNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        meatContainer.addEventListener('scroll', updateMeatButtons);
        
        // Scroll per item (580px width + gap)
        meatNext.addEventListener('click', () => {
            meatContainer.scrollBy({ left: 600, behavior: 'smooth' }); 
        });
        
        meatPrev.addEventListener('click', () => {
            meatContainer.scrollBy({ left: -600, behavior: 'smooth' });
        });

        // 4. Init Check
        updateMeatButtons();
        window.addEventListener('resize', updateMeatButtons);
    }
});
// --- LOGIKA FASHION BANNER SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const fashContainer = document.getElementById('fashScroll');
    const fashPrev = document.getElementById('fashPrev');
    const fashNext = document.getElementById('fashNext');

    if(fashContainer && fashPrev && fashNext) {
        
        // 2. Logic Button Visibility
        const updateFashButtons = () => {
            const sl = fashContainer.scrollLeft;
            const sw = fashContainer.scrollWidth;
            const cw = fashContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                fashPrev.classList.remove('show');
            } else {
                fashPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 10) {
                fashNext.classList.remove('show');
            } else {
                fashNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        fashContainer.addEventListener('scroll', updateFashButtons);
        
        // Scroll per item (600px width + gap)
        fashNext.addEventListener('click', () => {
            fashContainer.scrollBy({ left: 620, behavior: 'smooth' }); 
        });
        
        fashPrev.addEventListener('click', () => {
            fashContainer.scrollBy({ left: -620, behavior: 'smooth' });
        });

        // 4. Init Check
        updateFashButtons();
        window.addEventListener('resize', updateFashButtons);
    }
});
// --- LOGIKA ELECTRONICS BANNER SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const ebContainer = document.getElementById('ebScroll');
    const ebPrev = document.getElementById('ebPrev');
    const ebNext = document.getElementById('ebNext');

    if(ebContainer && ebPrev && ebNext) {
        
        // 2. Logic Button Visibility
        const updateEbButtons = () => {
            const sl = ebContainer.scrollLeft;
            const sw = ebContainer.scrollWidth;
            const cw = ebContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                ebPrev.classList.remove('show');
            } else {
                ebPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 10) {
                ebNext.classList.remove('show');
            } else {
                ebNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        ebContainer.addEventListener('scroll', updateEbButtons);
        
        // Scroll per item (620px width + gap)
        ebNext.addEventListener('click', () => {
            ebContainer.scrollBy({ left: 640, behavior: 'smooth' }); 
        });
        
        ebPrev.addEventListener('click', () => {
            ebContainer.scrollBy({ left: -640, behavior: 'smooth' });
        });

        // 4. Init Check
        updateEbButtons();
        window.addEventListener('resize', updateEbButtons);
    }
});
// --- LOGIKA HARI RAYA BANNER SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const rayaContainer = document.getElementById('rayaScroll');
    const rayaPrev = document.getElementById('rayaPrev');
    const rayaNext = document.getElementById('rayaNext');

    if(rayaContainer && rayaPrev && rayaNext) {
        
        // 2. Logic Button Visibility
        const updateRayaButtons = () => {
            const sl = rayaContainer.scrollLeft;
            const sw = rayaContainer.scrollWidth;
            const cw = rayaContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                rayaPrev.classList.remove('show');
            } else {
                rayaPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 10) {
                rayaNext.classList.remove('show');
            } else {
                rayaNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        rayaContainer.addEventListener('scroll', updateRayaButtons);
        
        // Scroll per item (600px width + gap)
        rayaNext.addEventListener('click', () => {
            rayaContainer.scrollBy({ left: 620, behavior: 'smooth' }); 
        });
        
        rayaPrev.addEventListener('click', () => {
            rayaContainer.scrollBy({ left: -620, behavior: 'smooth' });
        });

        // 4. Init Check
        updateRayaButtons();
        window.addEventListener('resize', updateRayaButtons);
    }
});
// --- LOGIKA GAMING BANNER SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const gameContainer = document.getElementById('gameScroll');
    const gamePrev = document.getElementById('gamePrev');
    const gameNext = document.getElementById('gameNext');

    if(gameContainer && gamePrev && gameNext) {
        
        // 2. Logic Button Visibility
        const updateGameButtons = () => {
            const sl = gameContainer.scrollLeft;
            const sw = gameContainer.scrollWidth;
            const cw = gameContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                gamePrev.classList.remove('show');
            } else {
                gamePrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 10) {
                gameNext.classList.remove('show');
            } else {
                gameNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        gameContainer.addEventListener('scroll', updateGameButtons);
        
        // Scroll per item (620px width + gap)
        gameNext.addEventListener('click', () => {
            gameContainer.scrollBy({ left: 640, behavior: 'smooth' }); 
        });
        
        gamePrev.addEventListener('click', () => {
            gameContainer.scrollBy({ left: -640, behavior: 'smooth' });
        });

        // 4. Init Check
        updateGameButtons();
        window.addEventListener('resize', updateGameButtons);
    }
});
// --- LOGIKA AUTOMOTIVE BANNER SECTION ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Selectors
    const autoContainer = document.getElementById('autoScroll');
    const autoPrev = document.getElementById('autoPrev');
    const autoNext = document.getElementById('autoNext');

    if(autoContainer && autoPrev && autoNext) {
        
        // 2. Logic Button Visibility
        const updateAutoButtons = () => {
            const sl = autoContainer.scrollLeft;
            const sw = autoContainer.scrollWidth;
            const cw = autoContainer.clientWidth;

            // Kiri
            if(sl <= 10) {
                autoPrev.classList.remove('show');
            } else {
                autoPrev.classList.add('show');
            }

            // Kanan
            if(sl + cw >= sw - 10) {
                autoNext.classList.remove('show');
            } else {
                autoNext.classList.add('show');
            }
        };

        // 3. Event Listeners
        autoContainer.addEventListener('scroll', updateAutoButtons);
        
        // Scroll per item (650px width + gap)
        autoNext.addEventListener('click', () => {
            autoContainer.scrollBy({ left: 670, behavior: 'smooth' }); 
        });
        
        autoPrev.addEventListener('click', () => {
            autoContainer.scrollBy({ left: -670, behavior: 'smooth' });
        });

        // 4. Init Check
        updateAutoButtons();
        window.addEventListener('resize', updateAutoButtons);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const createInputs = document.querySelectorAll('.create-pin');
    const confirmInputs = document.querySelectorAll('.confirm-pin');
    const strengthWrapper = document.querySelector('.pin-strength-wrapper');
    const strengthText = document.getElementById('strength-text');
    const createAlert = document.getElementById('create-alert');
    const confirmAlert = document.getElementById('confirm-alert');
    const stepCreate = document.getElementById('step-create');
    const stepConfirm = document.getElementById('step-confirm');
    const btnFinal = document.getElementById('btn-final-submit');

    let createdPin = '';

    // --- UTILITY: Handle Input Navigation ---
    function setupInputs(inputs, isCreationMode) {
        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                const val = e.target.value;
                
                // Hanya izinkan angka
                if (!/^\d$/.test(val)) {
                    e.target.value = '';
                    return;
                }

                e.target.classList.add('filled');

                // Pindah ke kotak berikutnya
                if (val && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }

                // Jika semua terisi di mode Creation, cek Strength
                if (isCreationMode) {
                    checkStrength();
                } else {
                    // Jika mode konfirmasi, cek kecocokan saat penuh
                    checkMatch();
                }
            });

            input.addEventListener('keydown', (e) => {
                // Handle Backspace
                if (e.key === 'Backspace') {
                    if (!e.target.value && index > 0) {
                        inputs[index - 1].focus();
                        inputs[index - 1].classList.remove('filled');
                    } else {
                        e.target.classList.remove('filled');
                    }
                    if(isCreationMode) resetStrengthUI();
                }
            });
        });
    }

    // --- LOGIC: Cek Kekuatan PIN ---
    function checkStrength() {
        let pin = '';
        let isFull = true;
        createInputs.forEach(input => {
            if (!input.value) isFull = false;
            pin += input.value;
        });

        if (!isFull) return; // Tunggu sampai 5 digit

        // Cek Sequential (Naik/Turun) atau Repetitive
        const isSequentialAsc = "01234567890".includes(pin);
        const isSequentialDesc = "09876543210".includes(pin);
        const isRepetitive = /^(\d)\1+$/.test(pin); // Cek 11111, 22222, dll

        strengthWrapper.className = 'pin-strength-wrapper'; // Reset class

        if (isSequentialAsc || isSequentialDesc || isRepetitive) {
            // LEMAH
            strengthWrapper.classList.add('weak');
            strengthText.textContent = "PIN Lemah (Mudah Ditebak)";
            createAlert.style.color = "var(--red-danger)";
            // Shake effect visual
            createInputs.forEach(input => input.style.borderColor = "var(--red-danger)");
        } else {
            // Cek Medium (Misal: 12121 - pola sederhana tapi tidak berurutan total)
            // Disini kita anggap kalau tidak berurutan & tidak kembar = KUAT (Sesuai request)
            
            // KUAT -> Pindah Halaman Otomatis
            strengthWrapper.classList.add('strong');
            strengthText.textContent = "PIN Kuat";
            createInputs.forEach(input => input.style.borderColor = "var(--green-success)");
            
            createdPin = pin;
            
            // Delay sedikit biar user lihat status "Kuat" dulu
            setTimeout(() => {
                goToConfirmStep();
            }, 800);
        }
    }

    function resetStrengthUI() {
        strengthWrapper.className = 'pin-strength-wrapper';
        strengthText.textContent = "Menunggu input...";
        createInputs.forEach(input => input.style.borderColor = "#e0e0e0");
    }

    // --- TRANSISI STEP ---
    function goToConfirmStep() {
        stepCreate.classList.remove('active');
        stepCreate.style.display = 'none';
        
        stepConfirm.style.display = 'block';
        setTimeout(() => {
            stepConfirm.classList.add('active');
            confirmInputs[0].focus();
        }, 100);
    }

    // --- LOGIC: Cek Konfirmasi ---
    function checkMatch() {
        let pinConfirm = '';
        let isFull = true;
        confirmInputs.forEach(input => {
            if (!input.value) isFull = false;
            pinConfirm += input.value;
        });

        if (!isFull) {
            btnFinal.disabled = true;
            return;
        }

        if (pinConfirm === createdPin) {
            confirmAlert.style.display = 'none';
            confirmInputs.forEach(input => input.style.borderColor = "var(--green-success)");
            btnFinal.disabled = false;
            btnFinal.click(); // Auto click atau biarkan user klik
        } else {
            confirmAlert.style.display = 'flex';
            confirmInputs.forEach(input => input.style.borderColor = "var(--red-danger)");
            btnFinal.disabled = true;
        }
    }

    // Fungsi Reset Global (Tombol Ulangi)
    window.resetProcess = function() {
        createdPin = '';
        createInputs.forEach(input => { input.value = ''; input.classList.remove('filled'); input.style.borderColor = '#e0e0e0'; });
        confirmInputs.forEach(input => { input.value = ''; input.classList.remove('filled'); input.style.borderColor = '#e0e0e0'; });
        
        resetStrengthUI();
        
        stepConfirm.classList.remove('active');
        stepConfirm.style.display = 'none';
        
        stepCreate.style.display = 'block';
        setTimeout(() => stepCreate.classList.add('active'), 50);
        
        createInputs[0].focus();
    };

    // Tombol Final Submit
    btnFinal.addEventListener('click', () => {
        alert("PIN Berhasil Dibuat! Mengarahkan ke Dashboard...");
        // Logika redirect ke halaman selanjutnya ada disini
    });

    // Inisialisasi
    setupInputs(createInputs, true);
    setupInputs(confirmInputs, false);
});