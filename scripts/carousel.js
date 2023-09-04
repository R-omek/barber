const arrPrev = document.getElementById('prev');
const arrNext = document.getElementById('next');
const carousel = document.querySelector('.masters__card-wrapper');
const imageCarousel = document.querySelector('.masters__carousel-wrapper');
let currentIndex = 0;
imageCarousel.children[0].classList.add('remove-gray')

arrNext.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= carousel.children.length) {
        currentIndex = 0;
    }
    updateCarousel();
});

arrPrev.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = carousel.children.length - 1;
    }
    updateCarousel();
});

function updateCarousel() {
    const cardWidth = carousel.children[0].offsetWidth;
    const imageWidth = imageCarousel.children[0].offsetWidth;
    const offset = -currentIndex * (cardWidth + 30);
    const imageOffset = -currentIndex * (imageWidth + 40);
    carousel.style.transform = `translateX(${offset}px)`;
    imageCarousel.style.transform = `translateX(${imageOffset}px)`;

    // Remove the "active" class from all images
    const images = imageCarousel.querySelectorAll('img');
    images.forEach((img) => {
        img.classList.remove('remove-gray');
    });

    // Add the "active" class to the currently shown image
    const currentlyShownImage = images[currentIndex];
    currentlyShownImage.classList.add('remove-gray');
}