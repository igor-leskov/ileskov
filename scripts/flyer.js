const flyer = document.querySelector('.flyer-container');

let hideTimer = null;

function handleScroll() {
 
    clearTimeout(hideTimer);

    flyer.style.opacity = '1';
    flyer.style.visibility = 'visible';

    hideTimer = setTimeout(() => {
        flyer.style.opacity = '0';
     
        setTimeout(() => {
            flyer.style.visibility = 'hidden';
        }, 100); 
    }, 1000);
}

window.addEventListener('scroll', handleScroll);
