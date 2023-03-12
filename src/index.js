import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
input: document.querySelector("#search-box"),
countryList: document.querySelector(".country-list"),
countryInfo: document.querySelector(".country-info"),
}

refs.input.addEventListener("input", debounce(handleSearch, DEBOUNCE_DELAY));


function handleSearch(e) {
//   e.preventDefault();
    const countrySearch = e.target.value.trim();
    
  if (countrySearch === '') {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
    return;
  }
    if (countrySearch !== '')
    {
        fetchCountries(countrySearch)
    .then(response => {
      if (response.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      } else if (response.length > 1 && response.length <= 10) {
               refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
            renderCountryList(response, refs.countryList);
            return;
      } else
              refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
        renderCountryInfo(response, refs.countryInfo);
    }).catch(error => {
        refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};}
 


function renderCountryList(response) {

    const listItemHTML = response.map(country => `
        <li class="added_list"><img src="${country.flag}" alt="Flag of ${country.name}" class="flag_small">${country.name}</li>`).join('');
        
    refs.countryList.insertAdjacentHTML('beforeend', listItemHTML);

};


function renderCountryInfo(response) {
    const countryHTML = response.map(country => `<div class="name_flag">   
    <img src="${country.flag}" alt="Flag of ${country.name}" class="flag"> 
    <h2>${country.name}</h2>
    </div>
    <ul class="list_options">
    <li><span>Population:</span>${country.population.toLocaleString()}</li>
    <li><span>Capital:</span>${country.capital}</li> 
    <li><span>Languages:</span>${country.languages.map((language) => language.name).join(", ")}</li> 
    </ul>
  `).join('');
  refs.countryInfo.insertAdjacentHTML('beforeend', countryHTML);
};

