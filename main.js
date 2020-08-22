const container = document.querySelector('.container')
const navbar = document.querySelector('.navbar')
let armorType = null;
let selectedGear = null;
let exchangeRate = 1;
let currentPage = 'homePage'
const home = navbar.querySelector('.home-button')
let inventory = new Inventory();

window.addEventListener('DOMContentLoaded', function(){

  let appId = '3c0071a1e8ba45adaf2ba951240a0f81';
  renderData();
  $(".loader").hide();
  $.ajax({
    method: "GET",
    url: `https://openexchangerates.org/api/latest.json?app_id=${appId}&symbols=JPY`,
    success: function (data) {
      exchangeRate = data.rates.JPY;
    }
  });
})



home.addEventListener('click', function(){
  currentPage = 'homePage'
  navbar.classList.add('d-none')
  renderData();
})
//let previousPage = '';
//back button
//const backButton = document.createElement('button')

function getData(event){
  $(".loader").show();
  armorType = event.target.id;
  $.ajax({
    method: "GET",
    url: `https://mhw-db.com/armor?q={"type":"${armorType}"}`,
    success: function (data){
      $(".loader").hide();
      renderData(data)
    },
    error: function (){
      console.log("error");
    }
  });
}

function removeData(){
  while(container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function renderData(data){
  removeData();
  switch(currentPage) {
    case 'homePage':
      renderHomePage()
      break;
    case 'shopCategories':
      renderShopCategories()
      break;
    case 'itemsList':
      renderItemsList(data)
      break;
    case 'inventory':
      inventory.renderInventory(container, navbar)
  }
}

function renderHomePage() {
  const contents = document.createElement('div')
  const contentCol = document.createElement('div')
  const titleRow = document.createElement('div')
  const title = document.createElement('h1')
  const buttonRow = document.createElement('div')
  const browseButton = document.createElement('button')
  const inventoryButton = document.createElement('button')

  contents.classList.add('row', 'justify-content-center')
  contentCol.classList.add('col-9', 'justify-content-center')
  titleRow.classList.add('row', 'justify-content-center')
  title.classList.add('app-title')
  title.textContent = "MONSTER HUNTER WORLD ARMORY";

  buttonRow.classList.add('row', 'button-row', 'justify-content-center')
  browseButton.classList.add('btn', 'landing-button', 'btn-lg', 'btn-block')
  browseButton.textContent = "Browse Shop"
  browseButton.id = 'browse-shop'

  inventoryButton.classList.add('btn', 'landing-button', 'btn-lg', 'btn-block')
  inventoryButton.textContent = "View Backpack"
  inventoryButton.id = 'view-inventory'

  titleRow.append(title)
  buttonRow.append(browseButton, inventoryButton)

  contentCol.append(titleRow, buttonRow)
  contents.append(contentCol)
  container.appendChild(contents)
  browseButton.addEventListener('click', function(){
    currentPage = 'shopCategories';
    renderData();
  })
  inventoryButton.addEventListener('click', function(){
    currentPage = 'inventory'
    renderData();
  })
}


function renderShopCategories() {
  navbar.classList.remove('d-none')
  let row = document.createElement('div')
  let col = document.createElement('div')
  const helmsButton = document.createElement('button')
  const chestsButton = document.createElement('button')
  const armsButton = document.createElement('button')
  const waistButton = document.createElement('button')
  const legsButton = document.createElement('button')

  helmsButton.textContent = 'Helmets';
  helmsButton.id = "head";
  chestsButton.textContent = 'Chests';
  chestsButton.id = "chest";
  armsButton.textContent = 'Arms';
  armsButton.id = "gloves";
  waistButton.textContent = 'Waist';
  waistButton.id = "waist";
  legsButton.textContent = 'Legs';
  legsButton.id = "legs";

  row.classList.add('row', 'justify-content-center', 'categories')
  col.classList.add('col-11', 'contents-column')

  col.append(helmsButton, chestsButton, armsButton, waistButton, legsButton)
  let allButtons = col.querySelectorAll('button')
  for(let i = 0; i < allButtons.length; i++){
    allButtons[i].classList.add('btn', 'shop-button', 'btn-lg', 'btn-block')
  }
  row.appendChild(col)
  container.appendChild(row)

  col.addEventListener('click', function(){
    currentPage = 'itemsList'
    getData(event)
  })
}

function renderItemsList(data) {
//ADD SEARCH FEATURE
console.log(data)
    let row = document.createElement('div')
    let col = document.createElement('div')
    row.classList.add('row', 'gear-list', 'justify-content-center')
    col.classList.add('col-11', 'contents-column')

    //SHOW GEAR STATS MODAL
    col.addEventListener('click', function () {
      $("#gearStats").modal('show')
     // $("#confirm-purchase").off();
      showGearStats(event, data[event.target.id]);
    })

  for (let i = 0; i < data.length; i++) {
    if (data[i].assets && (data[i].assets.imageMale !== "https://assets.mhw-db.com/armor/9067d30515d01c6739160f65c680f49c12bf0c06.d20ffa258ec987a3638a7f6bb4c63761.png")){
      const item = document.createElement('button')
      const buttonContents = document.createElement('div');
      const icon = document.createElement('img')
      const imgCol = document.createElement('div')
      const textCol = document.createElement('div')
      const gearName = document.createElement('p')
      const gearPrice = document.createElement('p')

      item.id = i;

      buttonContents.classList.add('row', 'vertical-align');
      imgCol.classList.add('col-3', 'img-container')
      textCol.classList.add('col', 'gear-text')

      item.classList.add('btn', 'gear-button', 'btn-lg', 'btn-block', 'container')
      icon.src = data[i].assets.imageMale;
      icon.classList.add('gear-list-image')
      icon.width = "67"
      gearName.textContent = data[i].name;
      gearPrice.textContent = "Price: " + calculatePrice(data[i]) + "g";

      imgCol.appendChild(icon);
      textCol.append(gearName, gearPrice)
      buttonContents.append(imgCol, textCol)
      item.append(buttonContents)
      col.appendChild(item)
      row.appendChild(col)
      container.appendChild(row)
    }
  }
}

function showGearStats(event, gearPiece){
  let confirmPurchase = document.getElementById('confirm-purchase')
  $("#stats-image").attr("src", gearPiece.assets.imageMale)
  $("#stats-name").text(gearPiece.name)
  $("#defense").text(gearPiece.defense.base)
  $("#fire-res").text(gearPiece.resistances.fire)
  $("#water-res").text(gearPiece.resistances.water)
  $("#thunder-res").text(gearPiece.resistances.thunder)
  $("#ice-res").text(gearPiece.resistances.ice)
  $("#dragon-res").text(gearPiece.resistances.dragon)
  $("#stats-price").text(calculatePrice(gearPiece) + "g")

  //clear slots
    $(`#gear-slot1`).text("0")
    $(`#gear-slot2`).text("0")
    $(`#gear-slot3`).text("0")
  //set slots
  for(let i = 0; i < gearPiece.slots.length; i++){
    $(`#gear-slot${i + 1}`).text(gearPiece.slots[i].rank)
  }

  //clear skills
  $("#skills-list").empty();
  $("#skills-list").text("Skills")
  //set skills
  for(let i = 0; i < gearPiece.skills.length; i++){
    let skillRow = document.createElement('div')
    let skillName = document.createElement('span')
    let skillLevel = document.createElement('span')

    skillName.classList.add('defense-stats')
    skillLevel.classList.add('defense-stats')

    skillRow.classList.add('skills-list')
    skillName.textContent = gearPiece.skills[i].skillName
    skillLevel.textContent = " Lv. " + gearPiece.skills[i].level;

    skillRow.append(skillName, skillLevel);
    $("#skills-list").append(skillRow)
  }

  selectedGear = document.getElementById(event.target.id)
  confirmPurchase.removeEventListener('click', purchaseGear)
  confirmPurchase.addEventListener('click', purchaseGear)
}

function purchaseGear(){
  let clonedGear = selectedGear.cloneNode(true);
  inventory.addGearPiece(clonedGear)
  $("#thank-you").modal('show')
  setTimeout(function(){
    $("#thank-you").modal('hide')
  }, 1000)

}

function calculatePrice(data) {
  let itemPrice = 0;
  for(let i = 0; i < data.crafting.materials.length; i++){
    itemPrice += data.crafting.materials[i].item.value;
  }
  return Math.round(itemPrice * exchangeRate / 500) * 10
}
