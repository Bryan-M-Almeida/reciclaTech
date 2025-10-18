const menuBar = document.querySelector('#menuMobile');
const menuContainer = document.querySelector('#menuContainer');
let isOpen = false;
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

const counters = [
    { el: document.getElementById('counter1'), target: 2.5, suffix: 'k+' },
    { el: document.getElementById('counter2'), target: 1.8, suffix: 'k+' },
    { el: document.getElementById('counter3'), target: 95, suffix: '%' }
];

const totalSteps = 50;
const interval = 20;
let animated = false;

function updateCounters() {
    counters.forEach(counter => counter.current = 0);
    let stepCount = 0;

    function step() {
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

function checkScroll() {
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

depoimentos.forEach(dep => {
    const depoimentoDiv = document.createElement("div");
    depoimentoDiv.className = "flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-full";

    let estrelasHTML = "";
    for (let i = 0; i < 5; i++) {
        estrelasHTML += `<i class="fa-solid fa-star ${i < dep.estrelas ? 'text-yellow-500' : 'text-gray-300'}"></i>`;
    }

    depoimentoDiv.innerHTML = `
    <div class="flex gap-1 mb-3">
    <i class="fa-solid fa-user text-3xl"></i>
    </div>
    <div class="flex gap-1 mb-3">${estrelasHTML}</div>
    <p class="text-center mb-2">"${dep.texto}"</p>
    <span class="font-semibold text-green-500">${dep.nome}</span>
`;

    galeria.appendChild(depoimentoDiv);
});

const btnDarkMode = document.querySelectorAll('.btnDarkMode');
const iconeDarkMode = document.querySelectorAll('.iconeDarkMode');

const toggleDark = () => {
    document.body.classList.toggle('darkMode');
    document.querySelector('#hero').classList.toggle('bg-gradient-to-r');
    iconeDarkMode.forEach((e) => {
        if (e.classList.contains('fa-moon')) {
            e.classList.remove('fa-moon');
            e.classList.add('fa-sun');
        } else if (e.classList.contains('fa-sun')) {
            e.classList.remove('fa-sun');
            e.classList.add('fa-moon');
        }
    })

}

btnDarkMode.forEach((e) => {
    e.addEventListener('click', () => toggleDark());
})
