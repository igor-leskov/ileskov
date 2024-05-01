const flyer = document.querySelector('.flyer-container');
flyer.style.opacity = '0';
flyer.style.visibility = 'hidden';

let isFlyerVisible = false;
let hideTimer = null;

function handleScroll() {
    clearTimeout(hideTimer);

    if (!isFlyerVisible) {
        flyer.style.opacity = '1';
        flyer.style.visibility = 'visible';
        isFlyerVisible = true;
    }

    hideTimer = setTimeout(() => {
        flyer.style.opacity = '0';
     
        setTimeout(() => {
            flyer.style.visibility = 'hidden';
            isFlyerVisible = false;
        }, 100); 
    }, 1000);
}

window.addEventListener('scroll', handleScroll);
