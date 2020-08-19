const categories = document.querySelector('.categories-column');
let armorType = null;
categories.addEventListener('click', getData)

function getData(event){
  armorType = event.target.id;

  $.ajax({
    method: "GET",
    url: `https://mhw-db.com/armor?q={"type":"${armorType}"}`,
    success: renderData
  });
}

function renderData(data){
  // only iterating 10 times, to save load time
  for(let i = 0; i < 10; i++){
    console.log(data[i].assets.imageMale);
    console.log(data[i].name);
  }
}






/* // currency exchange
$.ajax({
  method: "GET",
  url: "https://pro.exchangerate-api.com/v6/104a51bc3a4c28af0ed4662b/pair/EUR/GBP/100",
  success: function (data) {
    console.log(data)
  }
});

//3c0071a1e8ba45adaf2ba951240a0f81
$.ajax({
  method: "GET",
  url: "https://openexchangerates.org/api/latest.json?app_id=3c0071a1e8ba45adaf2ba951240a0f81&symbols=GBR",
  success: function (data) {
    console.log(data)
  }
});
*/
