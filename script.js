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