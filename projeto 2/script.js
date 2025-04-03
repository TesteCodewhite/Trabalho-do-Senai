document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.overlay');

    // Toggle do menu e overlay ao clicar no menu-toggle
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Fechar o menu e overlay ao clicar no overlay
    overlay.addEventListener('click', function() {
        menu.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Fechar o menu e overlay ao redimensionar a janela para mais de 768px
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menu.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});