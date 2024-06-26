let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');

let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.list');
let thumbnail = document.querySelector('.thumbnail');
let thumbnailItems = thumbnail.querySelectorAll('.item');

// Agregar el primer ítem del thumbnail al final
thumbnail.appendChild(thumbnailItems[0]);

// Tiempo en milisegundos entre cambios automáticos
let timeAutoNext = 5000; // Cambia este valor según tus necesidades

// Función para avanzar al siguiente ítem
nextBtn.onclick = function() {
    moveSlider('next');
};

// Función para retroceder al ítem anterior
prevBtn.onclick = function() {
    moveSlider('prev');
};

// Función para mover el slider
function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item');
    let thumbnailItems = document.querySelectorAll('.thumbnail .item');
    
    if (direction === 'next') {
        sliderList.appendChild(sliderItems[0]);
        thumbnail.appendChild(thumbnailItems[0]);
        slider.classList.add('next');
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1]);
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
        slider.classList.add('prev');
    }

    // Escuchar el evento 'animationend' para remover la clase de animación después
    slider.addEventListener('animationend', function() {
        if (direction === 'next') {
            slider.classList.remove('next');
        } else {
            slider.classList.remove('prev');
        }
    }, { once: true }); // Remover el event listener después de que se active una vez
}

// Función para cambiar automáticamente las imágenes
function autoChangeSlider() {
    let runNextAuto = setTimeout(() => {
        nextBtn.click(); // Simular clic en el botón de siguiente
    }, timeAutoNext);

    // Reiniciar el temporizador cada vez que se hace clic en los botones
    nextBtn.addEventListener('click', () => {
        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextBtn.click();
        }, timeAutoNext);
    });

    prevBtn.addEventListener('click', () => {
        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextBtn.click();
        }, timeAutoNext);
    });
}

// Iniciar el cambio automático de imágenes al cargar la página
autoChangeSlider();
