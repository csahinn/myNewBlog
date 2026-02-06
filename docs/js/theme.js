// Tema değişimi işlevselliği
const body = document.body;
let themeToggle = null;

// Sayfa tamamen yüklenince çalışacak fonksiyon
function initializeTheme() {
    themeToggle = document.getElementById('theme-toggle');
    
    // Önceki tema tercihini geri yükle
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    updateThemeToggleIcon();
    
    // Tema toggle butonuna tıklanınca
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// Tema değişimi fonksiyonu
function toggleTheme() {
    body.classList.toggle('dark-mode');
    
    // Tema tercihini kaydet
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    
    updateThemeToggleIcon();
}

// İkonu güncelle
function updateThemeToggleIcon() {
    const isDark = body.classList.contains('dark-mode');
    if (themeToggle) {
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        themeToggle.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
}

// Sayfası yüklendiğinde çalıştır
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
    // Script sona doğru yükleniyorsa DOM zaten hazırlanmış demektir
    initializeTheme();
}
