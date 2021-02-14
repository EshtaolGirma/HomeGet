let DB;

document.addEventListener("DOMContentLoaded", () => {
  //all code will reside here
  let HomeGetDB = indexedDB.open("HomeGetDB", 1);

  HomeGetDB.onsuccess = function (event) {
    //code here
    console.log("database create successfully");
    DB = HomeGetDB.result;

    // Add to DB
    let newAgent = {
      AgentName: "name",
      AgentEmail: "Email",
      AgentMobileNUmber: "Mobile Number",
      AgentOfficeAddress: "office",
      AgentOfficePhoneNumber: "Phone Number",
      AgentFacebookLink: "facebook uri",
      AgentTelegramLink: "Telegram uri",
      SubscriptionType: "Free",
      AgentReviewPoints: "total points",
      AgentReviewerNumber: "total reviewer customer number",
      AgentProfilePhoto: "profile photo uri",
      AgentPassword: "login password",
    };
    let newProperty = {
      PropertyName: "home short description",
      HomeAddress: "home number",
      PropertySubCity: "home SubCity",
      PropertyStreetNumber: "Street number",
      PropertyAreaSpecialName: "Area Special Name",
      PropertyType: "home type",
      PropertyFee: "birr/month",
      PropertySize: "squareMater",
      PropertyLandSize: "land squareMater",
      Garages: "parking size number",
      Bathrooms: "bathrooms number",
      BedRooms: "bedrooms number",
      ExtraRooms: "Additional rooms number",
      SpacialFeatures: "list features separated by @",
      CustomerReview:
        "Customer Review separated by ~ from customer name and use | to separate it from others review. ",
      PropertyReviewPoints: "total point",
      PropertyReviewersNUmber: "total reviewer customer number",
    };

    let transaction = DB.transaction(["Agents"], "readwrite");
    let objectStore = transaction.objectStore("Agents");
    let request = objectStore.add(newAgent);

    let transaction2 = DB.transaction(["Property"], "readwrite");
    let objectStore2 = transaction2.objectStore("Property");
    let request2 = objectStore2.add(newProperty);
    request.onsuccess = () => {
      console.log("all done");
    };
    transaction.oncomplete = () => {
      console.log("New appointment added");
      // displayTaskList();
    };
    transaction.onerror = () => {
      console.log("There was an error, try again!");
    };
    request2.onsuccess = () => {
      console.log("Property added");
    };
  };
  HomeGetDB.onerror = function (event) {
    // code here
    console.log("Error occurred");
  };

  // This method runs once (great for creating the schema)
  HomeGetDB.onupgradeneeded = function (e) {
    // the event will be the database
    let db = e.target.result;

    // create an object store,
    // keypath is going to be the Indexes
    let objectStore = db.createObjectStore("Agents", {
      keyPath: "AgentID",
      autoIncrement: true,
    });

    // createindex: 1) field name 2) keypath 3) options
    objectStore.createIndex("AgentName", "AgentName", { unique: false });

    console.log("Database ready and fields created!");

    let listingStore = db.createObjectStore("Property", {
      keyPath: "PropertyID",
      autoIncrement: true,
    });

    listingStore.createIndex("HomeAddress", "HomeAddress", { unique: true });
    console.log("second table!");
  };
});
