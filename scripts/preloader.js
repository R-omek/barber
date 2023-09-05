const preloader = document.getElementById('preloader');
const container = document.querySelector('.container')
window.onload = function () {
    setTimeout(() => {
        preloader.style.display = 'none';
        container.style.display = 'block';
    }, 3000)
}