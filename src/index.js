import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries.js';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
let dataInbox;

const countryListRef = document.querySelector('.country-list');
const searchBoxRef = document.querySelector('input#search-box');
const countryInfoRef = document.querySelector('.country-info');

searchBoxRef.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

function onSearchBoxInput() {
  dataInbox = searchBoxRef.value.trim();

  if (dataInbox != '') {
    fetchCountries(dataInbox).then(onFetchRequest).catch(onFetchError);
  }
}

function onFetchRequest(countries) {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';

  if ((countries.length > 1) & (countries.length <= 10)) {
    const markupNames = countries
      .map(country => {
        return `
     <li>
      <img src="${country.flags.svg}" alt="flag">
      <p>${country.name.official}</p>
    </li>
    `;
      })
      .join('');

    countryListRef.insertAdjacentHTML('beforeend', markupNames);
  } else if (countries.length === 1) {
    const markupNames = countries
      .map(country => {
        return `
      <li>
      <img style = 'width:22px' src="${country.flags.svg}" alt="flag">
      <p style = 'font-size:30px;font-weight:700'>${country.name.official}</p>
      </li>
    `;
      })
      .join('');

    const markupInfo = countries
      .map(country => {
        return `
              <p><span>Capital</span>: ${country.capital}</p>
              <p><span>Population</span>: ${country.population}</p>
              <p><span>Languages</span>: ${Object.values(country.languages)}</p>
              `;
      })
      .join('');

    countryListRef.insertAdjacentHTML('beforeend', markupNames);
    countryInfoRef.insertAdjacentHTML('beforeend', markupInfo);
  } else {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
