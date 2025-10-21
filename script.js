/* Nav mobile */
const menuBar = document.querySelector('#menuMobile');
const menuContainer = document.querySelector('#menuContainer');
let isOpen = false;

/* Funcionalidade menu mobile */
menuBar.addEventListener('click', () => {
    if (menuBar.classList.contains('fa-bars') && isOpen == false) {
        menuBar.classList.remove('fa-bars');
        menuBar.classList.add('fa-xmark');
        menuContainer.classList.toggle('hidden')
        isOpen = true;
    } else if (menuBar.classList.contains('fa-xmark') && isOpen == true) {
        menuBar.classList.remove('fa-xmark');
        menuBar.classList.add('fa-bars');
        menuContainer.classList.toggle('hidden')
        isOpen = false;
    }
})

/* Contador dos dados */
const counters = [
    { el: document.getElementById('counter1'), target: 2.5, suffix: 'k+' },
    { el: document.getElementById('counter2'), target: 1.8, suffix: 'k+' },
    { el: document.getElementById('counter3'), target: 95, suffix: '%' }
];

const totalSteps = 50;
const interval = 20;
let animated = false;

const updateCounters = () => {
    counters.forEach(counter => counter.current = 0);
    let stepCount = 0;

    const step = () => {
        stepCount++;
        counters.forEach(counter => {
            const increment = counter.target / totalSteps;
            counter.current += increment;

            if (counter.suffix.includes('k')) {
                counter.el.innerText = counter.current.toFixed(1) + counter.suffix;
            } else {
                counter.el.innerText = Math.floor(counter.current) + counter.suffix;
            }
        });

        if (stepCount < totalSteps) {
            setTimeout(step, interval);
        } else {
            counters.forEach(counter => counter.el.innerText = counter.target + counter.suffix);
        }
    }

    step();
}

const checkScroll = () => {
    const section = document.getElementById('dados');
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (!animated && sectionTop < windowHeight - 50) {
        animated = true;
        updateCounters();
    }
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

const telefoneInput = document.getElementById("telefone");

/* Formata em número brasileiro */
telefoneInput.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");

    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length <= 10) {
        valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
        valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    e.target.value = valor;
});

/* Depoimentos com avaliações */
const depoimentos = [
    {
        texto: "Doei meu notebook antigo e em 2 dias já tinha alguém interessado! Ver a felicidade do estudante que recebeu não tem preço! 😊",
        estrelas: 5,
        nome: "Lucas R."
    },
    {
        texto: "Adquiri uma impressora que estava disponível na plataforma, chegou super rápido e em ótimo estado!",
        estrelas: 4,
        nome: "Maria S."
    },
    {
        texto: "O processo de doação é simples e transparente. Recomendo a todos que queiram ajudar.",
        estrelas: 5,
        nome: "Carlos T."
    },
    {
        texto: "Fiquei impressionada com a rapidez do contato e a facilidade de receber produtos doados.",
        estrelas: 4,
        nome: "Ana P."
    }
];

const galeria = document.getElementById("depoimentosGaleria");

/* Renderiza os depoimentos */
const criarDepoimento = (dep) => {
    const div = document.createElement("div");
    div.className = "flex flex-col items-center bg-white p-6 rounded-xl shadow-md min-w-[300px]";

    let estrelasHTML = "";
    for (let i = 0; i < 5; i++) {
        estrelasHTML += `<i class="fa-solid fa-star ${i < dep.estrelas ? 'text-yellow-500' : 'text-gray-300'}"></i>`;
    }

    div.innerHTML = `
    <div class="flex gap-1 mb-3">
    <i class="fa-solid fa-user text-3xl text-green-700"></i>
    </div>
    <div class="flex gap-1 mb-3">${estrelasHTML}</div>
    <p class="text-center mb-2 text-black">"${dep.texto}"</p>
    <span class="font-semibold text-green-500">${dep.nome}</span>
`;

    return div;
}

/* Duplica para efeito infinito */
depoimentos.forEach(dep => galeria.appendChild(criarDepoimento(dep)));
depoimentos.forEach(dep => galeria.appendChild(criarDepoimento(dep)));



/* Variáveis DarkMode */
const btnDarkMode = document.querySelectorAll('.btnDarkMode');
const iconeDarkMode = document.querySelectorAll('.iconeDarkMode');
const color2 = document.querySelectorAll('.color-2');
const body = document.body;
const header = document.querySelector('#header');

/* Função principal */
const toggleDark = (save = true) => {
    const isDark = body.classList.contains('bg-gray-900');

    if (isDark) {
        // 🌞 Voltar pro modo claro
        body.classList.remove('bg-gray-900');
        header.classList.remove('bg-gray-900/50');
        color2.forEach(cor => {
            cor.classList.remove('bg-gray-800');
            cor.classList.add('bg-green-900');
        });
        body.classList.add('bg-[radial-gradient(circle,_#064e3b,_#065f46)]');
        header.classList.add('bg-green-900/50');
        iconeDarkMode.forEach(icon => {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        });
        if (save) localStorage.setItem('darkMode', 'off');
    } else {
        // 🌙 Ativar modo escuro
        body.classList.remove('bg-[radial-gradient(circle,_#064e3b,_#065f46)]');
        header.classList.remove('bg-green-900/50');
        color2.forEach(cor => {
            cor.classList.remove('bg-green-900');
            cor.classList.add('bg-gray-800');
        });
        body.classList.add('bg-gray-900');
        header.classList.add('bg-gray-900/50');
        iconeDarkMode.forEach(icon => {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        });
        if (save) localStorage.setItem('darkMode', 'on');
    }
};

/* Evento de clique */
btnDarkMode.forEach(btn => {
    btn.addEventListener('click', () => toggleDark());
});

/* Mantém o modo salvo ao carregar */
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'on') {
        toggleDark(false);
    }
});


/* Variáveis cookies */
const cookieBanner = document.getElementById('cookie-banner');
const cookieModal = document.getElementById('cookie-modal');
const acceptBtn = document.getElementById('acceptCookies');
const configBtn = document.getElementById('configCookies');
const cancelBtn = document.getElementById('cancelConfig');
const saveBtn = document.getElementById('saveConfig');
const closeBtn = document.getElementById('closeModal');

/* Verifica memória do navegador */
if (localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'none';
}

/* Animações e funções do modal */
acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.add('opacity-0', 'translate-y-5');
    setTimeout(() => cookieBanner.style.display = 'none', 500);
});

configBtn.addEventListener('click', () => {
    cookieModal.classList.remove('hidden');
});

cancelBtn.addEventListener('click', () => {
    cookieModal.classList.add('hidden');
});

closeBtn.addEventListener('click', () => {
    cookieModal.classList.add('hidden');
});

saveBtn.addEventListener('click', () => {
    const analiticos = document.getElementById('analiticos').checked;
    const marketing = document.getElementById('marketing').checked;
    const prefs = { analiticos, marketing };

    localStorage.setItem('cookiePrefs', JSON.stringify(prefs));
    localStorage.setItem('cookiesAccepted', 'true');

    cookieModal.classList.add('hidden');
    cookieBanner.classList.add('opacity-0', 'translate-y-5');
    setTimeout(() => cookieBanner.style.display = 'none', 500);
});

/* Variáveis política de cookies */
const politicaPopup = document.getElementById('politica-cookies');
const politicaLinks = document.querySelectorAll('a[href="#cookies"]');
const closePolitica = document.getElementById('closePolitica');

/* Funções da política de cookies */
politicaLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        politicaPopup.classList.remove('hidden');
    });
});

closePolitica.addEventListener('click', () => {
    politicaPopup.classList.add('hidden');
});

/* Parcerias */
const parcerias = [
    { nome: "EcoPlanet", img: "https://images.vexels.com/media/users/3/156289/isolated/preview/f3a1ffeb227d106046b96497a747b596-icone-de-reciclagem.png" },
    { nome: "Amigos do bem", img: "https://www.amigosdobem.org/wp-content/uploads/2021/03/Novo-LOGO-01.png" },
    { nome: "Criança esperança", img: "https://images.seeklogo.com/logo-png/50/2/crianca-esperanca-logo-png_seeklogo-503160.png" },
    { nome: "Google", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png" },
    { nome: "Mercado Livre", img: "https://upload.wikimedia.org/wikipedia/pt/0/04/Logotipo_MercadoLivre.png" },
    { nome: "SpaceX", img: "https://upload.wikimedia.org/wikipedia/commons/9/96/SpaceX_Logo_Black.png" },
    { nome: "TerraLimpa", img: "https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg" },
    { nome: "Amazon", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png" },
    { nome: "Samsung", img: "https://upload.wikimedia.org/wikipedia/commons/6/61/Samsung_old_logo_before_year_2015.svg" },
    { nome: "Playstation", img: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Playstation_logo_colour_and_wordmark.png" },
    { nome: "Xbox", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/XBOX_logo_2012.svg/2560px-XBOX_logo_2012.svg.png" },
    { nome: "Nintendo", img: "https://www.pngall.com/wp-content/uploads/13/Nintendo-Logo-PNG-Image-HD.png" },
];

/* Renderiza as parcerias */
const criarLogo = (parceria) => {
    const div = document.createElement("div");
    div.className = "flex-shrink-0 flex flex-col items-center justify-center";
    div.innerHTML = `
    <img src="${parceria.img}" alt="${parceria.nome}" title="${parceria.nome}" class="h-20 w-auto object-contain grayscale hover:grayscale-0 transition duration-300">
    <p class="text-white text-xl mt-2 font-bold">${parceria.nome}</p>
`;
    return div;
}

const linha1 = document.getElementById("logosLinha1");
const linha2 = document.getElementById("logosLinha2");

/* Duplica para efeito infinito */
parcerias.forEach(p => linha1.appendChild(criarLogo(p)));
parcerias.forEach(p => linha1.appendChild(criarLogo(p)));
parcerias.forEach(p => linha2.appendChild(criarLogo(p)));
parcerias.forEach(p => linha2.appendChild(criarLogo(p)));

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const icon = btn.querySelector('i');

        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.classList.remove('rotate-180');
        } else {
            // Fecha todos os outros
            document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
            document.querySelectorAll('.faq-question i').forEach(i => i.classList.remove('rotate-180'));

            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.classList.add('rotate-180');
        }
    });
});

const linkTermos = document.getElementById('linkTermos');
const linkPrivacidade = document.getElementById('linkPrivacidade');
const modalTermos = document.getElementById('modalTermos');
const modalPrivacidade = document.getElementById('modalPrivacidade');
const closeTermos = document.getElementById('closeTermos');
const closePrivacidade = document.getElementById('closePrivacidade');

// Abrir modais
linkTermos.addEventListener('click', e => {
    e.preventDefault();
    modalTermos.classList.remove('hidden');
});

linkPrivacidade.addEventListener('click', e => {
    e.preventDefault();
    modalPrivacidade.classList.remove('hidden');
});

// Fechar modais
closeTermos.addEventListener('click', () => modalTermos.classList.add('hidden'));
closePrivacidade.addEventListener('click', () => modalPrivacidade.classList.add('hidden'));

// Fechar clicando fora do modal
window.addEventListener('click', e => {
    if (e.target === modalTermos) modalTermos.classList.add('hidden');
    if (e.target === modalPrivacidade) modalPrivacidade.classList.add('hidden');
    if (e.target === cookieModal) cookieModal.classList.add('hidden');
    if (e.target === politicaPopup) politicaPopup.classList.add('hidden');
});

localStorage.clear();