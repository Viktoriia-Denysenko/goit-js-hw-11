import './css/styles.css';
import Notiflix from 'notiflix';
import PictureApiService from './js/apiService.js';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtnRef = document.querySelector('.load-more');

const pictureApiService = new PictureApiService();

let lightbox;
let totalPage = 0;

formRef.addEventListener('submit', onFormSubmit);
loadMoreBtnRef.addEventListener('click', onLoadMoreButtonClick);

loadMoreBtnRef.classList.add('is-hidden');

function onFormSubmit(evt) {
  evt.preventDefault();

  pictureApiService.query = evt.currentTarget.elements.searchQuery.value;

  if (pictureApiService.query === '') {
    return;
  }

  pictureApiService.resetPage();
  clearGallery();
  pictureApiService.fetchPicture().then(onFetchRequest).catch(onFetchError);
}

function onFetchRequest(pictures) {
  const pictureArray = pictures.hits;
  const totalPicture = `${pictures.totalHits}`;
  const pageSize = 40;
  totalPage = totalPicture / pageSize;

  if (pictures.total === 0) {
    throw new Error(res.status);
  } else if (pictureApiService.pageNumber === 1) {
    Notiflix.Notify.success(`Hooray! We found ${totalPicture} images.`);
  }

  const markup = pictureArray
    .map(picture => {
      return `
    <div class="photo-card">
     <a href="${picture.webformatURL}"><img src="${picture.largeImageURL}" alt="${picture.tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>
        <span class="card-description">Likes </span>
        ${picture.likes}
        </b>
      </p>
      <p class="info-item">
        <b><span class="card-description">Views </span> ${picture.views}</b>
      </p>
      <p class="info-item">
        <b><span class="card-description">Comments </span> ${picture.comments}</b>
      </p>
      <p class="info-item">
        <b><span class="card-description">Downloads </span> ${picture.downloads}</b>
      </p>
    </div>
  </div>
    `;
    })
    .join('');

  galleryRef.insertAdjacentHTML('beforeend', markup);
  // galleryRef.innerHTML = markup;

  lightbox = new SimpleLightbox('.gallery a');

  loadMoreBtnRef.classList.remove('is-hidden');

  galleryScroll();
}

function onFetchError() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
  );
}

function onLoadMoreButtonClick() {
  if (pictureApiService.pageNumber >= totalPage) {
    Notiflix.Notify.warning('We are sorry, but you have reached the end of search results.');
    loadMoreBtnRef.classList.add('is-hidden');
  }
  pictureApiService.pageIncrement();
  pictureApiService.fetchPicture().then(onFetchRequest).catch(onFetchError);

  loadMoreBtnRef.classList.add('is-hidden');
  lightbox.refresh();
}

function clearGallery() {
  galleryRef.innerHTML = '';
}

function galleryScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
