const logoAnimate = document.querySelector('#logoAnimate');
logoAnimate.addEventListener('click', () => {
    logoAnimate.classList.toggle('rotate-180');
})

const menuBar = document.querySelector('#menuMobile');
const menuContainer = document.querySelector('#menuContainer');
let isOpen = false;
menuBar.addEventListener('click', () => {
    if (menuBar.classList.contains('fa-bars') && isOpen == false) {
        menuBar.classList.remove('fa-bars');
        menuBar.classList.add('fa-remove');
        menuContainer.classList.toggle('hidden')
        isOpen = true;
    } else if (menuBar.classList.contains('fa-remove') && isOpen == true) {
        menuBar.classList.remove('fa-remove');
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
