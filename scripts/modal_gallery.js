var images = ["images/image1.webp", "images/image2.webp", "images/image3.webp", "images/image4.webp", "images/image5.webp", "images/image7.webp", "images/image8.webp", "images/image9.webp", "images/image6.webp"];
var currentImageIndex = 0;
var currentAudioPlayer = null;
function openModal(imageSrc) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImg");
    modal.style.display = "flex";
    modalImg.src = imageSrc;
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    document.body.classList.remove("modal-open");
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateModalImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateModalImage();
}

function updateModalImage() {
    var modalImg = document.getElementById("modalImg");
    modalImg.src = images[currentImageIndex];
}

document.getElementById("modalImg").addEventListener("click", function() {
    nextImage();
});

function closeModalOnClick(event) {
    var modal = document.getElementById("myModal");
    if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        document.body.classList.remove("modal-open");
    }
}

document.body.addEventListener("click", closeModalOnClick);
