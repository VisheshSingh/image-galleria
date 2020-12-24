function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No gallery found!');
  }

  const images = document.querySelectorAll('img');
  [...images].forEach((img) => {
    img.addEventListener('click', (e) => showImage(e.currentTarget));
    img.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        showImage(e.currentTarget);
      }
    });
  });
  const modal = document.querySelector('.modal');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentImage;

  function showImage(el) {
    if (!el) {
      return;
    }
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  function openModal() {
    if (modal.matches('.open')) {
      console.info('Modal already open!');
      return;
    }
    modal.classList.add('open');
    window.addEventListener('keyup', handleKeyUp);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPreviousImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    window.removeEventListener('keyup', handleKeyUp);
    nextBtn.removeEventListener('click', showNextImage);
    prevBtn.removeEventListener('click', showPreviousImage);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowRight') return showNextImage();
    if (e.key === 'ArrowLeft') return showPreviousImage();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPreviousImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  modal.addEventListener('click', handleClickOutside);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
