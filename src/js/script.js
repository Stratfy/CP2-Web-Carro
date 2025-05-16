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

    // Função para resetar o intervalo do slideshow
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideshow();
    }

    // Inicializar o slideshow se estiver na página inicial
    if (document.querySelector('.hero-section')) {
        initSlideshow();
    }

    // Configurar imagens dos carros na página inicial
    const carImages = document.querySelectorAll('.car-image');
    if (carImages.length > 0) {
        // Verificar se estamos na página inicial ou na página de carros
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
        const basePath = isHomePage ? 'src/assets/img/' : '../src/assets/img/';
        
        // Configurar imagens dos carros
        document.querySelectorAll('#car-image-1').forEach(img => {
            img.style.backgroundImage = `url('${basePath}car1.jpg')`;
        });
        
        document.querySelectorAll('#car-image-2').forEach(img => {
            img.style.backgroundImage = `url('${basePath}car2.jpg')`;
        });
        
        document.querySelectorAll('#car-image-3').forEach(img => {
            img.style.backgroundImage = `url('${basePath}car3.jpg')`;
        });
        
        document.querySelectorAll('#car-image-4').forEach(img => {
            img.style.backgroundImage = `url('${basePath}car4.jpg')`;
        });
    }

    // Configurar imagens da página Sobre
    const aboutImages = document.querySelectorAll('.about-image');
    if (aboutImages.length > 0) {
        document.querySelector('#about-image-1').style.backgroundImage = "url('../src/assets/img/about1.jpg')";
        document.querySelector('#about-image-2').style.backgroundImage = "url('../src/assets/img/about2.jpg')";
        document.querySelector('#about-image-3').style.backgroundImage = "url('../src/assets/img/about3.jpg')";
    }

    // Inicializar o Quiz se estiver na página de quiz
    if (document.querySelector('#quiz-container')) {
        initQuiz();
    }
});

// Função para inicializar o Quiz
function initQuiz() {
    const quizIntro = document.getElementById('quiz-intro');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizControls = document.getElementById('quiz-controls');
    const quizResult = document.getElementById('quiz-result');
    const quizProgressBar = document.getElementById('quiz-progress-bar');
    
    const startQuizBtn = document.getElementById('start-quiz');
    const prevQuestionBtn = document.getElementById('prev-question');
    const nextQuestionBtn = document.getElementById('next-question');
    const restartQuizBtn = document.getElementById('restart-quiz');
    
    const questions = document.querySelectorAll('.quiz-question');
    let currentQuestion = 0;
    const answers = {};

    // Mostrar alerta de boas-vindas ao carregar a página
    alert('Seja bem-vindo ao questionário da EcoMotors! Responda às perguntas para descobrir o carro elétrico ideal para você.');

    // Esconder todas as questões inicialmente
    questions.forEach(question => {
        question.style.display = 'none';
    });
    
    // Esconder controles e resultado inicialmente
    quizControls.style.display = 'none';
    quizResult.style.display = 'none';
    quizProgressBar.style.width = '0%';

    // Função para iniciar o quiz
    startQuizBtn.addEventListener('click', function() {
        quizIntro.style.display = 'none';
        quizQuestions.style.display = 'block';
        quizControls.style.display = 'flex';
        showQuestion(0);
        updateProgressBar();
    });

    // Função para mostrar uma questão específica
    function showQuestion(index) {
        questions.forEach(question => {
            question.style.display = 'none';
        });
        questions[index].style.display = 'block';
        currentQuestion = index;
        
        // Atualizar estado dos botões
        prevQuestionBtn.disabled = currentQuestion === 0;
        nextQuestionBtn.textContent = currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima';
        
        // Marcar opção selecionada anteriormente, se houver
        const questionId = `question-${currentQuestion + 1}`;
        if (answers[questionId]) {
            const options = questions[currentQuestion].querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.classList.remove('selected');
                if (option.getAttribute('data-value') === answers[questionId]) {
                    option.classList.add('selected');
                }
            });
        }
    }

    // Adicionar evento de clique às opções
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remover seleção anterior
            const parent = this.parentElement;
            parent.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Adicionar seleção atual
            this.classList.add('selected');
            
            // Salvar resposta
            const questionId = this.closest('.quiz-question').id;
            answers[questionId] = this.getAttribute('data-value');
        });
    });