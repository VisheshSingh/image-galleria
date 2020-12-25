function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No gallery found!');
  }

  this.gallery = gallery;

  // bind the functions to the function constructor
  this.handleClickOutside = this.handleClickOutside.bind(this);
  this.showNextImage = this.showNextImage.bind(this);
  this.showPreviousImage = this.showPreviousImage.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);

  this.images = document.querySelectorAll('img');
  [...this.images].forEach((img) => {
    img.addEventListener('click', (e) => this.showImage(e.currentTarget));
    img.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.showImage(e.currentTarget);
      }
    });
  });

  this.modal = document.querySelector('.modal');
  this.prevBtn = this.modal.querySelector('.prev');
  this.nextBtn = this.modal.querySelector('.next');

  this.modal.addEventListener('click', this.handleClickOutside);
}

Gallery.prototype.showImage = function (el) {
  if (!el) {
    return;
  }
  this.modal.querySelector('img').src = el.src;
  this.modal.querySelector('h2').textContent = el.title;
  this.modal.querySelector('figure p').textContent = el.dataset.description;
  this.currentImage = el;
  this.openModal();
};

Gallery.prototype.openModal = function () {
  if (this.modal.matches('.open')) {
    console.info('Modal already open!');
    return;
  }
  this.modal.classList.add('open');
  window.addEventListener('keyup', this.handleKeyUp);
  this.nextBtn.addEventListener('click', this.showNextImage);
  this.prevBtn.addEventListener('click', this.showPreviousImage);
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');
  window.removeEventListener('keyup', this.handleKeyUp);
  this.nextBtn.removeEventListener('click', this.showNextImage);
  this.prevBtn.removeEventListener('click', this.showPreviousImage);
};

Gallery.prototype.handleClickOutside = function (e) {
  if (e.target === e.currentTarget) {
    this.closeModal();
  }
};

Gallery.prototype.handleKeyUp = function (e) {
  if (e.key === 'Escape') return this.closeModal();
  if (e.key === 'ArrowRight') return this.showNextImage();
  if (e.key === 'ArrowLeft') return this.showPreviousImage();
};

Gallery.prototype.showNextImage = function () {
  console.log(this);
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild
  );
};

Gallery.prototype.showPreviousImage = function () {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild
  );
};

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1, gallery2);
