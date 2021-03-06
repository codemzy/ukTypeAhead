const endpoint = 'https://gist.githubusercontent.com/codemzy/be813a7a82bc1d0e13c9422418ce257c/raw/8665700764e62e4ae0e9135b483b7725821dc86a/uk-cities-towns-populations.json';

// store towns json
const towns = [];
fetch(endpoint)
  .then(function(blob) {
    return blob.json();
  })
  .then(function(data) {
    towns.push(...data);
  });

// find matches
let findMatches = function(word, towns) {
  return towns.filter((place) => {
    // does the town match the search
    const regex = new RegExp(word, 'gi');
    return place.location.match(regex);
  });
};

// show matches
let displayMatches = function() {
  if (this.value.length >= 2) { // if something in search at least two letters
    const matchArray = findMatches(this.value, towns);
    const html = matchArray.map(function(place) {
      // highlight matching element
      const regex = new RegExp(this.value, 'gi');
      const locationName = place.location.replace(regex, `<span class="hl">${this.value}</span>`);
      // return item
      return `<li>
        <span class="name">${locationName}</span>
        <span class="population">${place.population}</span>
      </li>`;
    }.bind(this));
    suggestions.innerHTML = html.join(''); // return the html array as a string
  } else { // nothing in search
    suggestions.innerHTML = '<li>Filter for a city</li><li>or a town</li>';
  }
};

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// add change event listener to search input
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);