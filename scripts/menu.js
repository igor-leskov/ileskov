document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('header nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
    });

    function closeMenuOnClick(event) {
        if (!nav.contains(event.target) && event.target !== menuToggle) {
            nav.classList.remove('open');
        }
    }

    document.body.addEventListener("click", closeMenuOnClick);
});
