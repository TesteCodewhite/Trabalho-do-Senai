document.addEventListener('DOMContentLoaded', function() {
    // Tela de Loading
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 3000);

    // Menu responsivo
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    menuToggle.addEventListener('click', () => menu.classList.toggle('active'));

    // Animações de rolagem
    const fadeIns = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.2 });
    fadeIns.forEach(element => observer.observe(element));

    // Mapa interativo com Leaflet
    const mapContainer = document.getElementById('map-container');
    const closeMapBtn = document.querySelector('.close-map-btn');
    let mapInitialized = false;
    let map;

    window.openMap = function() {
        mapContainer.classList.toggle('active');
        if (!mapInitialized) {
            map = L.map('map').setView([-28.5, -51.5], 7);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 18
            }).addTo(map);

            const customIcon = L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                shadowSize: [41, 41]
            });

            const highlightedIcon = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                shadowSize: [41, 41]
            });

            const pontos = [
                { name: 'São Leopoldo (RS)', lat: -29.7603, lng: -51.1472, info: '<h3>São Leopoldo (RS)</h3><p>Primeiro ponto de colonização alemã em 1824, marcando o início da imigração europeia na região.</p>', highlighted: false },
                { name: 'Caxias do Sul (RS)', lat: -29.1681, lng: -51.1794, info: '<h3>Caxias do Sul (RS)</h3><p>Fundada por imigrantes italianos em 1875, tornou-se um polo industrial e cultural.</p>', highlighted: false },
                { name: 'Blumenau (SC)', lat: -26.9194, lng: -49.0661, info: '<h3>Blumenau (SC)</h3><p>Colonizada por alemães em 1850, conhecida pela Oktoberfest e desenvolvimento cultural.</p>', highlighted: false },
                { name: 'Joinville (SC)', lat: -26.3044, lng: -48.8487, info: '<h3>Joinville (SC)</h3><p>Maior cidade de Santa Catarina, com forte industrialização desde o século XX.</p>', highlighted: false },
                { name: 'Lages (SC)', lat: -27.8161, lng: -50.3264, info: '<h3>Lages (SC)</h3><p>Importante centro agropecuário, com crescimento no setor madeireiro e turístico.</p>', highlighted: false },
                { name: 'Pelotas (RS)', lat: -31.7719, lng: -52.3423, info: '<h3>Pelotas (RS)</h3><p>Conhecida pelo desenvolvimento cultural e econômico, com destaque para a produção de doces e a arquitetura histórica.</p>', highlighted: false },
                { name: 'Curitiba (PR)', lat: -25.4284, lng: -49.2731, info: '<h3>Curitiba (PR)</h3><p>Capital do Paraná, destaque em sustentabilidade e inovação urbana desde o século XX.</p>', highlighted: true },
                { name: 'Florianópolis (SC)', lat: -27.5954, lng: -48.5480, info: '<h3>Florianópolis (SC)</h3><p>Centro tecnológico e turístico, conhecido como o "Vale do Silício Brasileiro".</p>', highlighted: true },
                { name: 'Porto Alegre (RS)', lat: -30.0346, lng: -51.2177, info: '<h3>Porto Alegre (RS)</h3><p>Capital do Rio Grande do Sul, polo econômico e cultural com forte influência imigrante.</p>', highlighted: true }
            ];

            const markers = pontos.map(ponto => {
                const marker = L.marker([ponto.lat, ponto.lng], { icon: ponto.highlighted ? highlightedIcon : customIcon }).addTo(map);
                marker.bindPopup(ponto.info);
                return marker;
            });

            mapInitialized = true;

            // Interatividade da Sidebar
            const locationItems = document.querySelectorAll('.location-item');
            locationItems.forEach(item => {
                item.addEventListener('click', () => {
                    const location = item.getAttribute('data-location');
                    const ponto = pontos.find(p => p.name.toLowerCase().includes(location));
                    if (ponto) {
                        map.flyTo([ponto.lat, ponto.lng], 10, { duration: 1 });
                        const marker = markers.find(m => m.getLatLng().lat === ponto.lat && m.getLatLng().lng === ponto.lng);
                        marker.openPopup();
                    }
                });
            });
        }
    };

    closeMapBtn.addEventListener('click', () => {
        mapContainer.classList.remove('active');
    });

    // Retractable Button
    const retractableBtn = document.getElementById('retractable-btn');
    retractableBtn.addEventListener('click', () => {
        retractableBtn.classList.toggle('active');
    });

    // Dark Mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    window.toggleDarkMode = function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        retractableBtn.classList.remove('active');
    };

    // Links "Saiba Mais" (futuro modal ou página)
    const saibaMaisLinks = document.querySelectorAll('.library-item-content a, .stats-item-content a');
    saibaMaisLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Funcionalidade em desenvolvimento: clique para saber mais!');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
});

// Hyper link Street Fighter 2
function playDoom() {
    window.open('https://gam.onl/arcade/super-street-fighter-2.html#super-street-fighter-2', '_blank');
}