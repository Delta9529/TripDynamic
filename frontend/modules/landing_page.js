import config from "../conf/index.js";

async function init() {
  console.log("From init()");
  console.log(config);
  // const city = fetchCities();
  // console.log(city);
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  try {
    const response = await fetch(config.backendEndpoint + "/cities");
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch (err) {
    console.log(err);
    // alert(err);
    return null;
  }
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cityCard = document.createElement("div");
  cityCard.className = "col-lg-3 col-sm-6 col-12 px-4 mb-4";
  cityCard.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}">
  <div class="tile">
    <img src=${image} alt=${city}>
    <div class="tile-text">
      <h5>${city}</h5>
      <p>${description}</p>
    </div>
  </div>
  </a>`
  document.getElementById("data").append(cityCard);

}

export { init, fetchCities, addCityToDOM };
