import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const response = await fetch(config.backendEndpoint + `/reservations`);
    const data = await response.json();
    return data
  }catch(e){
    return null
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  if(reservations.length > 0){
    document.getElementById('no-reservation-banner').style.display = 'none'
    document.getElementById('reservation-table-parent').style.display = 'block'
  }else{
    document.getElementById('no-reservation-banner').style.display = 'block'
    document.getElementById('reservation-table-parent').style.display = 'none'
  }

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  reservations.forEach((booking) => {
    let row = document.createElement('tr');
    const bookingDate = new Date(booking.date).toLocaleDateString("en-IN")
    const bookingTime = new Date(booking.time)
    const dateOptions = {
      year : "numeric",
      month : "long",
      day : "numeric"
    }
    const timeOptions = {
      hour : "numeric",
      minute : "numeric",
      second : "numeric"
    }
    const dateString = bookingTime.toLocaleDateString("en-IN", dateOptions);
    const timeString = bookingTime.toLocaleTimeString("en-IN",timeOptions);
    const bookingPeriod = `${dateString}, ${timeString}`
    const Button = `<div class="reservation-visit-button" id=${booking.id}>
    <a href="../detail/?adventure=${booking.adventure}">Visit Adventure</a>
    </div>`
    row.innerHTML = `
    <th>${booking.id}</th>
    <td>${booking.name}</td>
    <td>${booking.adventureName}</td>
    <td>${booking.person}</td>
    <td>${bookingDate}</td>
    <td>${booking.price}</td>
    <td>${bookingPeriod}</td>
    <td>${Button}</td>
    `
    document.getElementById("reservation-table").append(row)
  });

}

export { fetchReservations, addReservationToTable };
