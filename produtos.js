async function carregarProdutos() {
    const res = await fetch("produtos.json")
    const data = await res.json()
    const galeria = document.getElementById("galeria")

    Object.keys(data).forEach((categoria, index) => {
        const secao = document.createElement("div")
        secao.className = "w-full"

        const titulo = document.createElement("h2")
        titulo.className = "text-3xl font-semibold mb-6 text-center capitalize text-white"
        titulo.textContent = categoria

        const swiperContainer = document.createElement("div")
        swiperContainer.className = `swiper mySwiper-${index} px-6`

        const wrapper = document.createElement("div")
        wrapper.className = "swiper-wrapper"

        data[categoria].forEach(produto => {
            const slide = document.createElement("div")
            slide.className = "swiper-slide flex justify-center"

            slide.innerHTML = `
        <div class="bg-white rounded-2xl shadow-lg p-5 w-[250px] flex flex-col items-center hover:scale-105 transition">
          <img 
            src="${produto.imagem}" 
            alt="${produto.alt || produto.titulo}" 
            title="${produto.title || produto.titulo}" 
            class="w-full h-40 object-cover rounded-xl mb-3"
          >
          <h3 class="text-xl text-black font-bold">${produto.titulo}</h3>
          <p class="text-gray-600 text-center mb-4">${produto.descricao}</p>
          ${produto.link ? `
            <a 
              href="${produto.link}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              Solicitar
            </a>`
                    : ""}
        </div>
      `
            wrapper.appendChild(slide)
        })

        const next = document.createElement("div")
        next.className = `swiper-button-next text-green-700`
        const prev = document.createElement("div")
        prev.className = `swiper-button-prev text-green-700`

        swiperContainer.appendChild(wrapper)
        swiperContainer.appendChild(next)
        swiperContainer.appendChild(prev)

        secao.appendChild(titulo)
        secao.appendChild(swiperContainer)
        galeria.appendChild(secao)

        new Swiper(`.mySwiper-${index}`, {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: `.mySwiper-${index} .swiper-button-next`,
                prevEl: `.mySwiper-${index} .swiper-button-prev`,
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        })
    })
}

carregarProdutos()
