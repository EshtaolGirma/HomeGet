const houseNameTitle = document.getElementById("rentHeader");
const houseName = document.querySelector(".house-name");
const houseDescription = document.querySelector(".house-description");
const houseNumber = document.querySelector(".house-number");
const houseStreetNumber = document.querySelector(".house-street-number");
const houseSubCity = document.querySelector(".house-sub-city");
const houseAreaSpecialName = document.querySelector(".house-area-special-name");

const houseType = document.querySelector(".house-type");
const BuildingSize = document.querySelector(".house-building-size");
const PropertyLandSize = document.querySelector(".house-land-size");

const bedRooms = document.querySelector(".house-bed-room");
const bathRooms = document.querySelector(".house-bath-room");
const garages = document.querySelector(".house-garages");
const extraRoom = document.querySelector(".house-extra-rooms");

const fee = document.querySelector(".house-fee");
const featureList = document.querySelector(".featureList");

const Image1 = document.querySelector(".img1");
const Image2 = document.querySelector(".img2");
const Image3 = document.querySelector(".img3");

const Ids = location.search.substring(1);

var DB;

document.addEventListener("DOMContentLoaded", () => {
  let HomeGet = indexedDB.open("HomeGetDB", 1);
  HomeGet.onerror = function () {
    console.log("database inaccessible");
  };
  HomeGet.onsuccess = function () {
    DB = HomeGet.result;
    displayDetails();
  };

  function displayDetails() {
    var transaction = DB.transaction(["Property"]);
    var objectStore = transaction.objectStore("Property");

    objectStore.openCursor().onsuccess = function (e) {
      let cursor = e.target.result;
      if (cursor) {
          console.log(Ids);
        if (cursor.value.HomeAddress == Ids) {
          houseNameTitle.innerText = cursor.value.PropertyName;
          houseName.innerText = cursor.value.PropertyName;
          houseDescription.innerText = cursor.value.PropertyDescription;
          houseNumber.innerText = cursor.value.HomeAddress;
          houseStreetNumber.innerText = cursor.value.PropertyStreetNumber;
          houseSubCity.innerText = cursor.value.PropertySubCity;
          houseAreaSpecialName.innerText = cursor.value.PropertyAreaSpecialName;
          houseType.innerText = cursor.value.PropertyType;
          BuildingSize.innerText = cursor.value.PropertySize;
          PropertyLandSize.innerText = cursor.value.PropertyLandSize;
          bedRooms.innerText = cursor.value.BedRooms;
          bathRooms.innerText = cursor.value.Bathrooms;
          garages.innerText = cursor.value.Garages;
          extraRoom.innerText = cursor.value.ExtraRooms;
          fee.innerText = cursor.value.PropertyFee;

          let features = cursor.value.SpacialFeatures;
          let feature1 = "";
          let fe = "";
          for (let i = 0; i < features.length; i++) {
            if (features[i] == "@") {
              fe = feature1;
              const li = document.createElement("li");
              li.innerText = fe;
              featureList.appendChild(li);
              feature1 = "";
            } else {
              feature1 += features[i];
            }
          }

          let imgs = cursor.value.InternalRoomsImg;
          let img1 = "";
          let imgFinal = [];
          for (let i = 0; i < imgs.length; i++) {
            if (imgs[i] == "~") {
              imgFinal.push(img1);
              img1 = "";
            } else {
              img1 += imgs[i];
            }
          }
          Image1.setAttribute("src", imgFinal[0]);
          Image2.setAttribute("src", imgFinal[1]);
          Image3.setAttribute("src", imgFinal[2]);
        }
      }
    };
  }
});
var slides = document.querySelector('.slider-items').children;
        var nextSlide = document.querySelector(".right-slide");
        var prevSlide = document.querySelector(".left-slide");
        var totalSlides = slides.length;
        var index = 0;

        nextSlide.onclick = function () {
            next("next");
        }
        prevSlide.onclick = function () {
            next("prev");
        }

        function next(direction) {

            if (direction == "next") {
                index++;
                if (index == totalSlides) {
                    index = 0;
                }
            }
            else {
                if (index == 0) {
                    index = totalSlides - 1;
                }
                else {
                    index--;
                }
            }

            for (i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active");
            }
            slides[index].classList.add("active");

        }