const searchBox = document.querySelector('.search-box')
const matchList = document.querySelector('.match-list')

searchBox.addEventListener('input', (event) => {
  const matches = findMatches(searchBox.value)
  console.log(matches)
  displayMatches(matches)
})

function findMatches(searchString) {
  if (searchString === '') {
    return []
  }
  const regexp = new RegExp(searchString, 'i')
  const matches = []
  for (const city of cities) {
    if (city.city.match(regexp) || city.state.match(regexp)) {
      matches.push(city)
    }
  }
  return matches
}

function displayMatches(matches) {
  matchList.innerHTML = ''
  for (const city of matches) {
    const li = document.createElement('li')
    li.innerText = city.city + ', ' + city.state
    matchList.appendChild(li)
  }
}

const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const cities = []
fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((json) => {
    cities.push(...json)
  })
