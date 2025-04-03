document.addEventListener('DOMContentLoaded', function(){
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');


menuToggle.addEventListener('click', function(){
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    });
overlay.addEventListener('click', function(){
    menu.classList.remove('active');
    overlay.classList.remove('active');
    });
window.addEventListener('resize', function(){
    if(this.window.innerWidth > 768){
        menu.classList.remove("active");
        overlay.classList.remove("active");

    }
    });
    
});