import gallery from "./gallery-items.js";

// RENDER GALLERY

let htmlGallery = gallery.reduce(
  (htmlGallery, gall) =>
    htmlGallery +
    `<li class="gallery__item"><a class="gallery__link" href="${gall.original}"
><img class="gallery__image"
src="${gall.preview}" data-source="${gall.original}" alt="${gall.description}"/>
</a></li>`,
  ""
);

const galleryList = document.querySelector(".gallery");
galleryList.insertAdjacentHTML("afterbegin", htmlGallery);

// MODAL OPEN
const modal = document.querySelector(".lightbox");
const imageLightbox = document.querySelector(".lightbox__image");
galleryList.addEventListener("click", (event) => {
  event.preventDefault();
  const image = event.target;
  if (image.matches("img")) {
    modal.classList.add("is-open");
    imageLightbox.setAttribute("src", image.dataset.source);
  }
});



// MODAL CLOSE

const btnClose = document.querySelector('button[data-action="close-lightbox"]');
btnClose.addEventListener("click", () => {
  modal.classList.remove("is-open");
  imageLightbox.setAttribute("src", "");
});


