// export function fetchCountries(name) {
//   return fetch(`https://restcountries.com/v2/name/${name}?field=capital,population,flags.svg,languages`)
//     .then((response) => response.json())
//     .then((data) => data);

// }


export const fetchCountries = function (name) {
    return fetch(`https://restcountries.com/v2/name/${name}?field=capital,population,flags.svg,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
    })
}