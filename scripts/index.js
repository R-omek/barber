document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page");
    const checkbox = document.querySelector('#burger-checkbox')
    const burgerIcon = document.querySelector('.burger__icon')
    const burgerLines = document.querySelectorAll('.burger__line')
    let touchStartY = 0;

    // Function to scroll to the next page
    function scrollToNextPage() {
        const currentPage = document.querySelector(".page.active");
        const nextPage = currentPage.nextElementSibling;

        if (nextPage === pages[2]) {
            changeBurgerIcon(true)
        } else {
            changeBurgerIcon(false)
        }

        if (nextPage) {
            currentPage.classList.remove("active");
            nextPage.classList.add("active");
            nextPage.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Function to scroll to the previous page
    function scrollToPreviousPage() {
        const currentPage = document.querySelector(".page.active");
        const previousPage = currentPage.previousElementSibling;

        if (previousPage === pages[2]) {
            changeBurgerIcon(true)
        } else {
            changeBurgerIcon(false)
        }

        if (previousPage) {
            currentPage.classList.remove("active");
            previousPage.classList.add("active");
            previousPage.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Function to handle touch events for mobile
    function handleTouchStart(event) {
        touchStartY = event.touches[0].clientY;
    }

    function handleTouchMove(event) {
        event.preventDefault(); // Prevent default touchmove behavior
    }

    function handleTouchEnd(event) {
        const touchEndY = event.changedTouches[0].clientY;

        if (touchEndY < touchStartY) {
            scrollToNextPage(); // Swipe up
        } else if (touchEndY > touchStartY) {
            scrollToPreviousPage(); // Swipe down
        }
    }

    // Function to handle keyboard input and mouse scroll events
    function handleInput(event) {
        if (event.key === "ArrowDown" || event.deltaY > 0) {
            scrollToNextPage();
        } else if (event.key === "ArrowUp" || event.deltaY < 0) {
            scrollToPreviousPage();
        }
    }

    function changeBurgerIcon(isWhite) {
        if (isWhite) {
            burgerIcon.style.border = '2px solid #000'
            burgerLines.forEach(line => line.style.backgroundColor = '#000')
        } else {
            burgerIcon.style.border = '2px solid #FFF'
            burgerLines.forEach(line => line.style.backgroundColor = '#FFF')
        }
    }

    // Add event listeners
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, false);
    document.addEventListener("keydown", handleInput);
    document.addEventListener("wheel", handleInput);

    // Set the initial active page
    pages[0].classList.add("active");

    // Anchor navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
    
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
    
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                pages.forEach((el) => el.classList.remove('active'))
                targetSection.classList.add("active")
            }
        });
    });

    checkbox.addEventListener('change', () => {
        const currentPage = document.querySelector(".page.active");
        if (checkbox.checked) {
            burgerIcon.style.border = '2px solid #FFF'
            burgerLines.forEach(line => line.style.backgroundColor = '#FFF')
        } else if (currentPage === pages[2]) {
            burgerIcon.style.border = '2px solid #000'
            burgerLines.forEach(line => line.style.backgroundColor = '#000')
        }
    })
});

// Handle hide burger if link clicked

const menuLinks = document.querySelectorAll('.burger__menu a');
const burgerCheckbox = document.querySelector('#burger-checkbox');

menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        burgerCheckbox.checked = false;
    });
});
