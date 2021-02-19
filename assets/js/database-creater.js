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
      AgentProfilePhoto: "profile photo uri",
      AgentPassword: "login password",
      listingNumber: "3",
      oneLineDescription: "Broker",
      Rating5: "5",
      Rating4: "5",
      Rating3: "5",
      Rating2: "5",
      Rating1: "5",
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
      AgentName: "name",
    };

    let newCustomer = {
      CustomerName: "Customer 1",
      CustomerEmail: "Customer email",
      // CustomerUserName: "customer user name",
      CustomerPhoneNumber: "customer phone number",
      CustomerNIDNumber: "customer id number",
      CustomerAddress: "customer address",
      watchListPropertyID: "Home ID separated by @",
    };
    let newCustomerContact = {
      CustomerName: "contact info name",
      CustomerEmail: "contact info email",
      customerMessage: "contact info message",
    };
    let newCurrentUser = {
      userRealId: "loged in user",
      userType: "agent/customer",
    };

    let transaction = DB.transaction(["Agents"], "readwrite");
    let objectStore = transaction.objectStore("Agents");
    let request = objectStore.add(newAgent);

    let transaction2 = DB.transaction(["Property"], "readwrite");
    let objectStore2 = transaction2.objectStore("Property");
    let request2 = objectStore2.add(newProperty);

    let transaction3 = DB.transaction(["Customer"], "readwrite");
    let objectStore3 = transaction3.objectStore("Customer");
    let request3 = objectStore3.add(newCustomer);

    let transaction4 = DB.transaction(["CustomerContact"], "readwrite");
    let objectStore4 = transaction4.objectStore("CustomerContact");
    let request4 = objectStore4.add(newCustomerContact);

    let transaction5 = DB.transaction(["CurrentUser"], "readwrite");
    let objectStore5 = transaction5.objectStore("CurrentUser");
    let request5 = objectStore5.add(newCurrentUser);

    request.onsuccess = () => {
      console.log("all done");
    };
    transaction.oncomplete = () => {
      console.log("Agent added");
      // displayTaskList();
    };
    transaction.onerror = () => {
      console.log("There was an error, try again!");
    };
    request2.onsuccess = () => {
      console.log("Property added");
    };
    request3.onsuccess = () => {
      console.log("Customer added");
    };
    request4.onsuccess = () => {
      console.log("Customer contact added");
    };
    request5.onsuccess = () => {
      console.log("Current User added");
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
    objectStore.createIndex("AgentName", "AgentName", { unique: true });
    objectStore.createIndex("AgentEmail", "agentEmail", { unique: true });

    console.log("Database ready and fields created!");

    let listingStore = db.createObjectStore("Property", {
      keyPath: "PropertyID",
      autoIncrement: true,
    });

    listingStore.createIndex("HomeAddress", "HomeAddress", { unique: true });
    listingStore.createIndex("AgentName", "AgentName", { unique: true });
    console.log("second table!");

    let customerStore = db.createObjectStore("Customer", {
      keyPath: "CustomerID",
      autoIncrement: true,
    });
    customerStore.createIndex("CustomerName", "CustomerName", { unique: true });
    customerStore.createIndex("CustomerEmail", "CustomerEmail", {
      unique: true,
    });

    let CustomerContactStore = db.createObjectStore("CustomerContact", {
      keyPath: "ReviewID",
      autoIncrement: true,
    });

    CustomerContactStore.createIndex("CustomerEmail", "CustomerEmail", {
      unique: true,
    });

    let CurrentUserStore = db.createObjectStore("CurrentUser", {
      keyPath: "UserID",
      autoIncrement: true,
    });
    CurrentUserStore.createIndex("userRealId", "userRealId", { unique: true });
  };
});
