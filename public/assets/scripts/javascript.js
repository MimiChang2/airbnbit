/* global $*/
$(document).ready(function() {
    console.log("js");


    //To POST a listing_________________________________________POST listing______
    // Get the listing data from the form on host.html
    var name;
    var email;
    var streetAddr;
    var city;
    var state;
    var zipcode;
    var phone;
    var taxId;
    var photoLink;
    var description;
    var listData = [];
    $("#hostButton").on("click", function(event) {
        event.preventDefault();
        console.log("Host");
        // Save the data
        name = $("#name").val().trim();
        email = $("#email").val().trim();
        streetAddr = $("#streetAddr").val().trim();
        city = $("#city").val().trim();
        state = $("#state").val().trim();
        zipcode = $("#zipcode").val().trim();
        phone = $("#phone").val().trim();
        taxId = $("#taxId").val().trim();
        photoLink = $("#photoLink");
        description = $("#description");
        listData = [
            name,
            email,
            streetAddr,
            city,
            state,
            zipcode,
            phone,
            taxId,
            photoLink,
            description
        ];
        console.log(listData);
        listIt();
    });



    // Post to the database
    var rate = $("#rate");

    function listIt() {
        var HomeListing = {
            "listName": name,
            "listEmail": email,
            "listAddress": streetAddr,
            "listCity": city,
            "listState": state,
            "listZip": zipcode,
            "listPhone": phone,
            "listTax": taxId,
            "listPhotoLink": photoLink,
            "listDescription": description
        };
        $.post("/api/homeListings", function(req, res) {
            HomeListing;
            console.log(HomeListing)
        });
    }

    // To handle a reservation request___________________Reservation Request______
    // Function to use if there is booking availability
    function bookItDano() {
        var Booking = {
            "listId": reqListId,
            "arriveDAte": reqArriveDate,
            "leaveDate": reqLeaveDate
        };
        $.post("/api/bookings", function(req, res) {
            Booking;
        });
        alert("Success! Your requested dates are available.");
    }

    // To check a requested booking against the current bookings
    var listId;
    var arriveDate;
    var leaveDate;

    function checkBookings() {
        // Need forEach to loop through returned results NEED TO COMPLETE

        // if there are no bookings - done
        if (!listId) {
            bookItDano();
        }
        else {
            if (reqArriveDate > leaveDate || reqLeaveDate < arriveDate) {
                bookItDano();
            }
            else {
                alert("Dates not available, please try another listing or another time.");
            } // End of else that gives alert   
        } // End of else containing second if-else
    } // End of checkBookings

    // Get the requested booking data from the form on guest.html
    var reqListId;
    var reqArriveDate;
    var reqLeaveDate;
    $("#guestBtn").on("click", function(event) {
        event.preventDefault();
        // Save the data - name and email come from user id found by email.
        reqListId = $("#listId").val().trim();
        reqArriveDate = $("#arriveDate");
        reqLeaveDate = $("#leaveDate");
        checkBookings();
    });


}); // End of document ready.
/*
      // Load onto a page for review
      var listDiv = $("#reviewCenterBody");
      // Loops through the entries 
        for (var i = 0; i < listData.length; i++) {
      // Create a new div for each entry.
      var newEntryDiv = $("<div>" + listData[i] + "</div>");
      // Add this new div to the centerBody div.
      listDiv.append(newEntryDiv);
      console.log(listData[i]);
    }
    */
