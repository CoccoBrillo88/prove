function setTheme(themeName) {
    const root = document.documentElement;

    if (themeName === 'granaio') {
        // Tema Default: Oro e Grano
        root.style.setProperty('--primary-color', '#E6B800');
        root.style.setProperty('--secondary-color', '#333333');
        root.style.setProperty('--bg-color', '#ffffff');
        root.style.setProperty('--bg-alt', '#f9f9f9');
        root.style.setProperty('--text-color', '#333333');
        root.style.setProperty('--navbar-bg', 'rgba(255, 255, 255, 0.95)');
    } 
    else if (themeName === 'notte') {
        // Tema Notte: Scuro ed Elegante
        root.style.setProperty('--primary-color', '#00d2ff'); /* Cyan neon */
        root.style.setProperty('--secondary-color', '#ffffff');
        root.style.setProperty('--bg-color', '#1a1a1a');
        root.style.setProperty('--bg-alt', '#2d2d2d');
        root.style.setProperty('--text-color', '#f0f0f0');
        root.style.setProperty('--navbar-bg', 'rgba(26, 26, 26, 0.95)');
    } 
    else if (themeName === 'ulivo') {
        // Tema Ulivo: Verde e Terra
        root.style.setProperty('--primary-color', '#556B2F'); /* Verde oliva */
        root.style.setProperty('--secondary-color', '#3e2723');
        root.style.setProperty('--bg-color', '#f4f1ea'); /* Carta antica */
        root.style.setProperty('--bg-alt', '#e8e4d9');
        root.style.setProperty('--text-color', '#3e2723');
        root.style.setProperty('--navbar-bg', 'rgba(244, 241, 234, 0.95)');
    }
}
