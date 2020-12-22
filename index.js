import galleryImeges from "./gallery-items.js";

const refs = {
  $gallery: document.querySelector(".gallery.js__gallery"),
  $lightbox: document.querySelector(".lightbox.js__lightbox"),
  $lightboxImg: document.querySelector(".lightbox__image"),
  $lightboxCloseBtn: document.querySelector('button[data-action="close__lightbox"]'),
};

const { $gallery, $lightbox, $lightboxCloseBtn, $lightboxImg } = refs;

$gallery.addEventListener('click', handelClickGallery)
$lightboxCloseBtn.addEventListener('click', handelClickCloseBtn)

let currentImgIdx = null

function handelClickGallery(e) {
    e.preventDefault()

    const { dataset, alt, nodeName} = e.target

    if (nodeName === 'IMG') {
        const { source, id } = dataset
        handelOpenModal(source, alt, +id)
    }
}

function handelOpenModal(src, alt, id) {
    $lightbox.classList.add('is-open')
    $lightboxImg.src = src
    $lightboxImg.alt = alt
    currentImgIdx = id
    window.addEventListener('keydown', handleKeypress)
}

function handleKeypress({ code }) {
    code === 'Escape' && handleCloseModal()
    code === 'ArrowRight' && handleNextImg()
    code === 'ArrowLeft' && handlePrevImg()

}

function handelClickCloseBtn() {
    handleCloseModal()
}

function handleCloseModal() {
    $lightbox.classList.remove('is-open')
    $lightboxImg.src = ''
    $lightboxImg.alt = ''
    currentImgIdx = null
}

function handleNextImg() {
currentImgIdx = galleryImeges.length - 1 === currentImgIdx ? 0 : currentImgIdx + 1
const { original, description } = galleryImeges[currentImgIdx]
$lightboxImg.src = original
$lightboxImg.alt = description
}

function handlePrevImg() {
    currentImgIdx = currentImgIdx === 0 ? galleryImeges.length - 1 : currentImgIdx - 1
    const { original, description } = galleryImeges[currentImgIdx]
    $lightboxImg.src = original
    $lightboxImg.alt = description
}

function createGalleryElementMarkup({ preview, original, description }, i) {
  return `<li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
    >
    <img
    data-id="${i}"
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    />
    </a>
    </li>
    `
}

function createGalleryMarkup(items) {
    return items.map(createGalleryElementMarkup).join('')
}

function renderGallery(markup) {
$gallery.insertAdjacentHTML('beforeend', markup)
}

renderGallery(createGalleryElementMarkup(galleryImeges))