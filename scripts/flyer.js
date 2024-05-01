const flyer = document.querySelector('.flyer-container');
flyer.style.opacity = '0'; 
flyer.style.visibility = 'hidden';
flyer.style.transition = 'opacity 0.5s ease-in-out'; 
let isFlyerVisible = false;
let hideTimer = null;

function handleScroll() {
    clearTimeout(hideTimer);

    if (!isFlyerVisible) {
        flyer.style.visibility = 'visible';
        flyer.style.opacity = '1';
        isFlyerVisible = true;
    }

    hideTimer = setTimeout(() => {
        flyer.style.opacity = '0';
     
        setTimeout(() => {
            flyer.style.visibility = 'hidden';
            isFlyerVisible = false;
        }, 500); 
    }, 1000);
}

window.addEventListener('scroll', handleScroll);
