// Script principal para a Loja de Carros Elétricos

document.addEventListener('DOMContentLoaded', function() {
    // Ativar menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', function() {
            navUl.classList.toggle('active');
        });
    }

    // Slideshow na página inicial
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    let currentSlide = 0;
    let slideInterval;

    // Função para inicializar o slideshow
    function initSlideshow() {
        if (slides.length === 0) return; // Sai da função se não houver slides
        
        // Configurar os backgrounds dos slides
        slides[0].style.backgroundImage = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../src/assets/img/slide1.jpg')";
        slides[1].style.backgroundImage = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../src/assets/img/slide2.jpg')";
        slides[2].style.backgroundImage = "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../src/assets/img/slide3.jpg')";
        
        // Iniciar o slideshow automático
        startSlideshow();
        
        // Adicionar eventos de clique aos dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlideshow();
                resetInterval();
            });
        });
    }

    // Função para avançar para o próximo slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlideshow();
    }

    // Função para atualizar a exibição do slideshow
    function updateSlideshow() {
        // Remover classe active de todos os slides e dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adicionar classe active ao slide e dot atuais
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Função para iniciar o slideshow automático
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000); // Muda de slide a cada 5 segundos
    }