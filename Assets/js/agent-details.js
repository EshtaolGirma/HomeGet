// agent personal info variables
const agentNameLink = document.querySelector(".agent-name-link");
const agentName = document.querySelector(".agent-name");
const agentDescription = document.querySelector("#one-line-description");
const agentMobileNumber = document.querySelector("#agent-mobile-number");
const agentOfficeNumber = document.querySelector("#agent-office-number");
const agentEmail = document.querySelector("#agent-email");
const agentOfficeAddress = document.querySelector("#agent-office-address");
const agentProfilePhoto = document.querySelector(".agent-pic");
const ratingsNumber = document.querySelector("#ratings-number");
const facebookLink = document.querySelector(".fa-facebook-f");
const telegramLink = document.querySelector(".fa-telegram");

// agent listing and detail review info variables
const agentListingListHolder = document.querySelector(
  ".agent-listing-list-holder"
);

// agent rating info variables

for (let i = 0; i < 5; i++) {
  const listCard = document.createElement("div");
  listCard.className = "card m-md-5 p-4 m-2";
  // listCard.style.backgroundColor = "rgb(251, 251, 251)";
  listCard.style.boxShadow = "0 1rem 4rem rgb(0 0 0 / 20%)";
  const listCardHolder = document.createElement("div");
  listCardHolder.className = "row";
  const listCardPhotoHolder = document.createElement("div");
  listCardPhotoHolder.classList = "listing-property-pic col-md";
  const listCardPhoto = document.createElement("img");
  listCardPhoto.setAttribute("src", "./Assets/img/house 2.jpg");
  listCardPhoto.style.width = "100%";
  listCardPhoto.style.borderRadius = "5px";
  const listCardInfoHolder = document.createElement("div");
  listCardInfoHolder.classList = "listing-property-info col-md row";

  // property basic info
  const listCardName = document.createElement("h5");
  listCardName.classList = "col-12";
  listCardName.innerText = "House one";

  const listCardAddress = document.createElement("p");
  listCardAddress.classList = "col-12";
  listCardAddress.innerText = "289 Foxhall Ave, Kingston";

  var payment = 0;
  const listCardPayment = document.createElement("p");
  listCardPayment.classList = "col-12";
  listCardPayment.innerText = "$" + payment + " / month";
  // property basic features
  const basicFeaturesHolder = document.createElement("div");
  basicFeaturesHolder.classList = "row col-12";
  var bedroomsNumber = 0;
  var bathroomsNumber = 0;
  var landSize = 0;

  const listCardBedRoomsNumber = document.createElement("p");
  listCardBedRoomsNumber.classList = "col-md";
  listCardBedRoomsNumber.innerHTML =
    '<i class="fas fa-bed"></i> ' + bedroomsNumber;

  const listCardBathRoomsNumber = document.createElement("p");
  listCardBathRoomsNumber.classList = "col-md";
  listCardBathRoomsNumber.innerHTML =
    '<i class="fas fa-shower"></i>' + bathroomsNumber;

  const listCardLandSize = document.createElement("p");
  listCardLandSize.classList = "col-md";
  listCardLandSize.innerHTML =
    '<i class="fas fa-ruler-combined"></i>' + landSize;

  basicFeaturesHolder.appendChild(listCardBedRoomsNumber);
  basicFeaturesHolder.appendChild(listCardBathRoomsNumber);
  basicFeaturesHolder.appendChild(listCardLandSize);

  listCardPhotoHolder.appendChild(listCardPhoto);
  listCardHolder.appendChild(listCardPhotoHolder);

  listCardInfoHolder.appendChild(listCardName);
  listCardInfoHolder.appendChild(listCardAddress);
  listCardInfoHolder.appendChild(listCardPayment);
  listCardInfoHolder.appendChild(basicFeaturesHolder);
  listCardHolder.appendChild(listCardInfoHolder);
  listCard.appendChild(listCardHolder);
  agentListingListHolder.appendChild(listCard);
}

const ratingStarsList = document.querySelectorAll(".star-clickable");

for (let i = 0; i < ratingStarsList.length; i++) {
  ratingStarsList[i].onclick = function () {
    for (let j = 0; j < i + 1; j++) {
      ratingStarsList[j].className += " fa star-clicked";
    }
  };
}



// const urlParams = new URLSearchParams(window.location.search);
// const id = Number(urlParams.get("id"));

const IDa = location.search.substring(1);
console.log(IDa);
//DB
var DB;

// Add Event Listener [on Load]
document.addEventListener("DOMContentLoaded", () => {
  // create the database
  let HomeGet = indexedDB.open("HomeGetDB", 1);

  // if there's an error
  HomeGet.onerror = function () {
    console.log("There was an error");
  };
  // if everything is fine, assign the result to the instance
  HomeGet.onsuccess = function () {
    // console.log('Database Ready');

    // save the result
    DB = HomeGet.result;

    // display the Task
    displayAgent();
  };

  function displayAgent() {
    var transaction = DB.transaction(["Agents"]);
    var objectStore = transaction.objectStore("Agents");
    // var request = objectStore.get(AgentID);

    objectStore.openCursor().onsuccess = function (e) {
      // assign the current cursor
      let cursor = e.target.result;

      if (cursor) {
        if (cursor.value.AgentID == IDa) {
          agentNameLink.innerText = cursor.value.AgentName;
          agentName.firstElementChild.innerText = cursor.value.AgentName;
          agentDescription.innerText = cursor.value.oneLineDescription;
          agentMobileNumber.innerText = cursor.value.AgentMobileNUmber;
          agentOfficeNumber.innerText = cursor.value.AgentOfficePhoneNumber;
          agentEmail.innerText = cursor.value.AgentEmail;
          agentOfficeAddress.innerText = cursor.value.AgentOfficeAddress;

          if (cursor.value.Rating1 == undefined) {
            ratingsNumber.innerText = 0;
          } else {
            ratingsNumber.innerText =
              parseInt(cursor.value.Rating5) +
              parseInt(cursor.value.Rating4) +
              parseInt(cursor.value.Rating3) +
              parseInt(cursor.value.Rating2) +
              parseInt(cursor.value.Rating1);

            let TotalRating =
              5 * parseInt(cursor.value.Rating5) +
              4 * parseInt(cursor.value.Rating4) +
              3 * parseInt(cursor.value.Rating3) +
              2 * parseInt(cursor.value.Rating2) +
              1 * parseInt(cursor.value.Rating1);

            let average = TotalRating / parseInt(ratingsNumber.innerText);
            const stars2 = document.querySelectorAll(".pro-star");
            console.log(stars2);
            for (let i = 0; i < average; i++) {
              stars2[i].className += " star-clicked"
              
            }
          }

          agentProfilePhoto.setAttribute("src", cursor.value.AgentProfilePhoto);

          facebookLink.onclick = function () {
            window.open(cursor.value.AgentFacebookLink);
          };
          telegramLink.onclick = function () {
            window.open(cursor.value.AgentTelegramLink);
          };
        }
        cursor.continue();
      }
    };

    // request.onerror = function (event) {
    //   console.log("Transaction failed");
    // };
  }
});
