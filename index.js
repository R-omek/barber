document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page");
    let touchStartY = 0;

    // Function to scroll to the next page
    function scrollToNextPage() {
        const currentPage = document.querySelector(".page.active");
        const nextPage = currentPage.nextElementSibling;

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

    // Add event listeners
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, false);
    document.addEventListener("keydown", handleInput);
    document.addEventListener("wheel", handleInput);

    // Set the initial active page
    pages[0].classList.add("active");
});