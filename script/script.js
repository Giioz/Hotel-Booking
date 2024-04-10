let rooms = document.getElementById('roomclasses')
let rightBtn = document.getElementById('right')
let lefttBtn = document.getElementById('left')
let roomclasses = document.getElementById('roomclasses')
let form = document.querySelector('form')

var menulist = document.getElementById('menulist');
    menulist.style.maxHeight = "0px";

    function menutoggle() {
      if (menulist.style.maxHeight == "0px") {
        menulist.style.maxHeight = "100vh";
      } else {
        menulist.style.maxHeight = "0px";
      }
    }
fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll").then(data => data.json()).then(res => showres(res))


rightBtn.addEventListener('click', function(){
  roomclasses.style.transform += 'translateX(-350px)'
  
})
lefttBtn.addEventListener('click', function(){
  roomclasses.style.transform += 'translateX(350px)'
  
})


function showres(hotelList){
  console.log(hotelList);
  hotelList.forEach(hotel => {
    rooms.innerHTML += `<div class="items">
    <div class="image" style="width:400px;">
      <img src="${hotel.images[0].source}" alt="" class="imghotel">
    </div>
    <div class="text">
      <h2>${hotel.name}</h2>
      <div class="rate flex">
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
        <i class="fa fa-star"></i>
      </div>
      <p>Lorem ipsum dolor sit amet constur adipisicing elit sed do eiusmtem por incid.
      </p>
      <div class="button flex">
        <button class="primary-btn">BOOK NOW</button>
        <h3>$${hotel.pricePerNight} <span> <br> Per Night </span> </h3>
      </div>
    </div>
  </div>`
    
  })
  
};


function data(e){
  e.preventDefault()

  let formData = new FormData(form)
  let finalData = Object.fromEntries(formData)

  console.log(finalData);
  fetch('https://hotelbooking.stepprojects.ge/api/Booking', {
    method: "POST",
    headers: {
      "accept" : "*/*",
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(finalData)
  }).then(res => {if(res.status == 400){
    Swal.fire({
      title: "Error",
      text: "Room is not avaliable",
      icon: "error"
    }); 
  }
else if(res.status == 200){
  Swal.fire({
    title: "Booked",
    text: `You Successfuly booked Room Id:${finalData.roomID}`,
    icon: "success"
  });
}}).then(data)
  Swal.fire({
    title: "Good job!",
    text: "You clicked the button!",
    icon: "success"
  });
  
}
