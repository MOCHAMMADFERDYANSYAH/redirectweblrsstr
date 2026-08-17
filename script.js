let timeLeft = 5;
const timerElement = document.getElementById('timer');
const redirectUrl = "https://larispay.web.id";

// Fungsi Master untuk membersihkan cache browser secara agresif
function clearCacheAndRedirect() {
    // 1. Hapus LocalStorage
    if (window.localStorage) {
        localStorage.clear();
    }
    
    // 2. Hapus SessionStorage
    if (window.sessionStorage) {
        sessionStorage.clear();
    }
    
    // 3. Hapus semua Cookies di domain lama
    document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });

    // 4. Unregister Service Workers (Penting jika web lama menggunakan sistem PWA)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
                registration.unregister();
            }
        });
    }

    // 5. Tambahkan versi unik (cache buster) pada URL tujuan untuk menghindari cache DNS/ISP
    const cacheBusterUrl = redirectUrl + "?v=" + new Date().getTime();
    
    // 6. Gunakan 'replace' agar pengguna tidak bisa kembali (Back button) ke domain lama ini
    window.location.replace(cacheBusterUrl);
}

// Jalankan penghitung waktu
const countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(countdown);
        clearCacheAndRedirect(); // Panggil fungsi pembersih cache sebelum pindah
    }
}, 1000);
