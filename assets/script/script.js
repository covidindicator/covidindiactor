window.onload = function () {
  var rawData;
  function getDataFromApi() {
    var apiCall = 'https://api.covid19india.org/raw_data.json';
    //Ajax Request.
    var request = new XMLHttpRequest();
    request.open('GET', apiCall, true);
    request.send();

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        rawData = JSON.parse(request.responseText);

        document.querySelector('.conformed').innerHTML = rawData.raw_data.length;
        getTotalCount('Recovered', '.recovered');
        getTotalCount('Deceased', '.death');

        document.querySelector('.active').innerHTML = rawData.raw_data.length - parseInt(document.querySelector('.recovered').innerHTML) - parseInt(document.querySelector('.death').innerHTML);
      }
    }
  }

  // Function to get count
  function getTotalCount(value, className) {
    let count = 0;
    for (var i = 0; i < rawData.raw_data.length; i++) {
      if (rawData.raw_data[i].currentstatus.toLowerCase() == value.toLowerCase()) {
        count += 1;
      }
    }
    document.querySelector(className).innerHTML = count;
  }
  
  function searchDataRelatedToDistrict() {
    if (document.querySelector('.search-district').value == '') {
      alert('Please Insert District Name In Search-box');
    } else {
      let conformed = 0
      let recovered = 0;
      let death = 0;

      var parent = document.querySelector('.result-container');
      document.querySelector('.city-name').innerHTML = document.querySelector('.search-district').value + ' COVID-19 INDICATOR';

      getTotalCount('Recovered', '.recovered');
      getTotalCount('Deceased', '.death');

      document.querySelector('.active').innerHTML = rawData.raw_data.length - parseInt(document.querySelector('.recovered').innerHTML) - parseInt(document.querySelector('.death').innerHTML);
      // remove code
      var child = parent.lastElementChild;
      while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
      }

      for (var i = 0; i < rawData.raw_data.length; i++) {
        if (rawData.raw_data[i].detecteddistrict.toLowerCase() == document.querySelector('.search-district').value.toLowerCase()) {

          conformed += 1;
          var card = document.createElement("li");

          if (rawData.raw_data[i].currentstatus.toLowerCase() == 'Recovered'.toLowerCase()) {
            recovered += 1;
          }

          if (rawData.raw_data[i].currentstatus.toLowerCase() == 'Deceased'.toLowerCase()) {
            death += 1;
          }

          // For Age.
          var span = document.createElement("span");
          var textnode = document.createTextNode('Age');
          span.appendChild(textnode);
          card.appendChild(span);
          // Age value.
          var span = document.createElement("span");
          var textnode = document.createTextNode(rawData.raw_data[i].agebracket);
          span.appendChild(textnode);
          card.appendChild(span);

          // For Gender.
          var span = document.createElement("span");
          var textnode = document.createTextNode('Gender');
          span.appendChild(textnode);
          card.appendChild(span);
          // Gender value.
          var span = document.createElement("span");
          var textnode = document.createTextNode(rawData.raw_data[i].gender);
          span.appendChild(textnode);
          card.appendChild(span);

          // For Status.
          var span = document.createElement("span");
          var textnode = document.createTextNode('Status');
          span.appendChild(textnode);
          card.appendChild(span);
          // Status value.
          var span = document.createElement("span");
          var textnode = document.createTextNode(rawData.raw_data[i].currentstatus);
          span.appendChild(textnode);
          card.appendChild(span);

          // For Announced.
          var span = document.createElement("span");
          var textnode = document.createTextNode('Announced');
          span.appendChild(textnode);
          card.appendChild(span);
          // Status Announced.
          var span = document.createElement("span");
          var textnode = document.createTextNode(rawData.raw_data[i].dateannounced);
          span.appendChild(textnode);
          card.appendChild(span);

          // For nationality.
          var span = document.createElement("span");
          var textnode = document.createTextNode('Nationality');
          span.appendChild(textnode);
          card.appendChild(span);
          // Status nationality.
          var span = document.createElement("span");
          var textnode = document.createTextNode(rawData.raw_data[i].nationality);
          span.appendChild(textnode);
          card.appendChild(span);

          // For Notes.
          var span = document.createElement("span");
          var textnode = document.createTextNode('Notes');
          span.appendChild(textnode);
          card.appendChild(span);
          // Status Notes.
          var span = document.createElement("span");
          var textnode = document.createTextNode(rawData.raw_data[i].backupnotes);
          span.appendChild(textnode);
          card.appendChild(span);
          
          parent.appendChild(card);
        }
      }

      if(conformed >= 1) {
        document.querySelector('.conformed').innerHTML = conformed;
      } else {
        document.querySelector('.conformed').innerHTML = 'NA';

        // If no data Exist.
        var p = document.createElement("p");
        var textnode = document.createTextNode('Great! No record found or else May be your District name is incorrect.');
        p.appendChild(textnode);
        parent.appendChild(p);
      }

      if(recovered >= 1) {
        document.querySelector('.recovered').innerHTML = recovered;
      } else {
        document.querySelector('.recovered').innerHTML = 'NA';
      }

      if(death >= 1) {
        document.querySelector('.death').innerHTML = death;
      } else {
        document.querySelector('.death').innerHTML = 'NA';
      }

      document.querySelector('.active').innerHTML = conformed - recovered - death;

      var viewSection = document.querySelector('.count');
      viewSection.scrollIntoView(); 
    }
  }

  //Function to scroll to top.
  function scrollToTOP() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      document.querySelector(".btn-top").style.display = "block";
    } else {
      document.querySelector(".btn-top").style.display = "none";
    }
  }

  //When document Scroll function.
  window.onscroll = function () {
    // When the user scrolls down 200px from the top of the document, show the button
    scrollToTOP();
  }

  getDataFromApi();

  // Get the input field
  var searchDistrictInput = document.querySelector('.search-district');
  // Execute a function when the user releases a key on the keyboard
  searchDistrictInput.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.querySelector('.btn-search').click();
    }
  });
  
  //Add click listener to back to top button.
  let backToTopbutton = document.querySelector('.btn-top');
  backToTopbutton.addEventListener('click', () => { window.scroll({ top: 0, left: 0, behavior: 'smooth' }) });

  document.querySelector('.btn-search').addEventListener('click', searchDataRelatedToDistrict);

}
