
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const param = new URLSearchParams(search);
  const city = param.get("city");
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const response = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    );
    const cityData = await response.json();
    return cityData;
  } catch (err) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adventure) => {
    const adventureCard = document.createElement("div");
    adventureCard.className = "col-6 col-md-3 mb-2";
    adventureCard.innerHTML = ` 
    <a href = "detail/?adventure=${adventure.id}" id=${adventure.id}>
    <div class = "activity-card">
      <img class = "img-reponsive" src = ${adventure.image} alt = ""/>
      <div class = "category-banner">${adventure.category}</div>
        <div class = "card-text w-100">
          <div class = "line-1 d-flex justify-content-between">
            <h4>${adventure.name}</h4>
            <p><span>&#8377</span>${adventure.costPerHead}</p>
          </div>
          <div class = "line-2 d-flex justify-content-between">
            <p>Duration</p>
            <p>${adventure.duration} hours</p>
          </div>
        </div>
    </div>      
    </a>`;
    document.getElementById("data").append(adventureCard);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // let filterData = list.filter((adventure) => {
  //   adventure.duration > low && adventure.duration <= high;
  // });
  // return filterData;
  return list.filter(adventure => adventure.duration>low && adventure.duration<=high)

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // const CategoryData = list.filter((adventure) => {
  //     adventure.map(adventure => adventure.category == categoryList)
  // });
  // return CategoryData;
  // return list.filter(adventure => adventure.category.includes(categoryList))
  const filteredList = list.filter((adventure) => {
    return categoryList.includes(adventure.category)
  })
  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  let filteredList = list;
  
  if(filters.duration){
    let low = filters.duration.split("-")[0];
    let high = filters.duration.split("-")[1];
    filteredList = filterByDuration(list,parseInt(low),parseInt(high))
  }
  if(filters.category.length !== 0){
    filteredList = filterByCategory(filteredList,filters.category)
  }
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const objData = JSON.parse(localStorage.getItem("filters"))
  // Place holder for functionality to work in the Stubs
  return objData;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryElem = document.getElementById("category-list");
  filters.category.forEach(adventure => {
    const pill = document.createElement("div");
    pill.className = "category-filter";
    pill.innerHTML = `<div>${adventure}</div>`
    categoryElem.append(pill);
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
