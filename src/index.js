import './css/styles.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectBreedsEl = document.querySelector('select.breed-select');
const loaderEl = document.querySelector('.loader');
const catInfoEl = document.querySelector('.cat-info');

selectBreedsEl.addEventListener('change', onChangeSelect);

function onChangeSelect() {
  loaderEl.classList.remove('is-hidden');
  catInfoEl.innerHTML = '';
  fetchCatByBreed(selectBreedsEl.value)
    .then(breed => {
      catInfoEl.innerHTML = `${createDescriptionBreeds(breed, breed.breeds)}`;
    })
    .catch(error => {
      renderErr();
      console.log(error);
    })
    .finally(() => {
      removeLoader();
    });
}

fetchBreeds()
  .then(cat => {
    selectBreedsEl.insertAdjacentHTML('beforeend', createBreeds(cat));
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(() => {
    renderErr();
  })
  .finally(() => {
    removeLoader();
  });

function removeLoader() {
  loaderEl.classList.add('is-hidden');
}

function renderErr() {
  Notify.info('Oops! Something went wrong! Try reloading the page!');
}
function createDescriptionBreeds(breed) {
  return breed
    .map(
      cat =>
        `<img class="img-block" src=${cat.url} alt="" widht="300px" height="300px"></img>
        <div class="info-wrapper">
        <h1 class="cats-title">${cat.breeds[0].name}</h1>
      <p class="cats-description">${cat.breeds[0].description}</p>
      <p class="cats-temperament">Temperament: <span class="span-temp">${cat.breeds[0].temperament}.</span></p></div>`
    )
    .join('');
}

function createBreeds(breed) {
  let placeHolder =
    '<option data-placeholder="true"> Choose a breed of cat </option>';
  return (
    placeHolder +
    breed.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')
  );
}