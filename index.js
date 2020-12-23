import gallery from "./gallery-items.js";
//REFS
const galleryList = document.querySelector('.gallery')
const modal = document.querySelector('.lightbox')
const imageLightbox = document.querySelector('.lightbox__image')
const btnClose = document.querySelector('button[data-action="close-lightbox"]');

galleryList.addEventListener('click', handleOpenImage)
btnClose.addEventListener('click', handleCloseModal)

//RENDER GALLERY
const htmlGallery = gallery.reduce(
  (htmlGallery, gall) =>
    htmlGallery +
    `<li class="gallery__item"><a class="gallery__link" href="${gall.original}"
><img class="gallery__image"
src="${gall.preview}" data-source="${gall.original}" alt="${gall.description}"/>
</a></li>`,
  ""
);
galleryList.insertAdjacentHTML('afterbegin', htmlGallery)

// MODAL OPEN

function handleOpenImage(e) {
  e.preventDefault()
  const image = e.target
  if (image.matches("img")) {
    modal.classList.add("is-open");
    imageLightbox.setAttribute("src", image.dataset.source);
  }
}
// MODAL CLOSE
function handleCloseModal() {
  modal.classList.remove('is-open')
  imageLightbox.setAttribute('src', '')
}