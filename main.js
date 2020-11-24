const container = document.querySelector('.container')
const navbar = document.querySelector('#nav-top')
const navbottom = document.querySelector('#nav-bottom')
const shopButton = document.querySelector('#footer-shop-button')
const backpackButton = document.querySelector('#footer-backpack-button')
let armorType = null;
let selectedGear = null;
let selectedGearStats = null;
let currencyCount = 999999;
let previousPage = 'homePage'
let nextPage = 'homePage'
let confirmPurchase = document.getElementById('confirm-purchase')
const back = navbar.querySelector('.back-button')
let purchaseFlag = false;
let inventory = new Inventory();

confirmPurchase.addEventListener('click', purchaseGear)

shopButton.addEventListener('click', function(){
  backpackButton.classList.add("inactive-button")
  shopButton.classList.remove("inactive-button")
  previousPage = 'homePage';
  nextPage = 'shopCategories';
  createPage();
})
backpackButton.addEventListener('click', function () {
  shopButton.classList.add("inactive-button")
  backpackButton.classList.remove("inactive-button")
  nextPage = 'inventory'
  createPage();
})

window.addEventListener('DOMContentLoaded', function(){
  createPage();
  $(".loader").hide();
  $(".disable-buttons").hide();
  $(".currency-count").text(currencyCount)
})

back.addEventListener('click', function(){
  if(nextPage === 'shopCategories' || nextPage === 'inventory'){
    previousPage = 'homePage';
  }
  else if(nextPage === 'itemsList'){
    previousPage = 'shopCategories'
  }
  nextPage = previousPage;
  navbar.classList.add('d-none')
  navbottom.classList.add('d-none')
  createPage();
})

//  WEAPONS

function getWeapons(event){
  $(".loader").show();
  $(".disable-buttons").show();
  armorType = event.target.id;
  $.ajax({
    method: "GET",
    url: `https://mhw-db.com/weapons`,
    success: function (data) {
      // $(".loader").hide();
      // $(".disable-buttons").hide();
      console.log(data)
      createPage(data)
    },
    timeout: 8000,
    error: function (error) {
      $(".loader").hide();
      $(".disable-buttons").hide();
      console.error('REQUEST FAILED')
      console.error(error)
      $("#request-failed").modal('show')
      setTimeout(function () {
        $("#request-failed").modal('hide')
      }, 1500)
    }
  });
}

function renderGearChoice() {
  navbar.classList.remove('d-none')
  navbottom.classList.remove('d-none')
  $(".page-name").text('Shop')
  const row = document.createElement('div')
  const col = document.createElement('div')
  const weaponButton = document.createElement('button')
  const armorButton = document.createElement('button')


  weaponButton.textContent = 'Weapons';
  weaponButton.id = "weapons";
  armorButton.textContent = 'Armor';
  armorButton.id = "armors";

  row.classList.add('row', 'justify-content-center', 'categories', 'bottom-scroll-margin')
  col.classList.add('col-11', 'categories-column')

  // const allButtons = [helmsButton, chestsButton, armsButton, waistButton, legsButton]
  // for (let i = 0; i < allButtons.length; i++) {
  //   allButtons[i].classList.add('btn', 'shop-button', 'btn-lg', 'btn-block')
  // }
  // col.append(helmsButton, chestsButton, armsButton, waistButton, legsButton)
  // row.appendChild(col)

  col.addEventListener('click', function () {
    if (!event.target.id) {
      return
    }
    nextPage = 'itemsList'
    getData(event)
  })
  return row
}

// ^testing


function getData(event){
  $(".loader").show();
  $(".disable-buttons").show();
  armorType = event.target.id;
  $.ajax({
    method: "GET",
    url: `https://mhw-db.com/armor?q={"type":"${armorType}"}`,
    success: function (data){
      $(".loader").hide();
      $(".disable-buttons").hide();
      createPage(data)
    },
    timeout: 8000,
    error: function (error){
      $(".loader").hide();
      $(".disable-buttons").hide();
      console.error('REQUEST FAILED')
      console.error(error)
      $("#request-failed").modal('show')
      setTimeout(function () {
        $("#request-failed").modal('hide')
      }, 1500)
    }
  });
}

function removeData(){
  while(container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function createPage(gear){
  let pageData = null;
  removeData();
  switch(nextPage) {
    case 'homePage':
      pageData = renderHomePage()
      break;
    case 'shopCategories':
      pageData = renderShopCategories()
      break;
    case 'itemsList':
      pageData = renderItemsList(gear)
      break;
    case 'inventory':
      pageData = inventory.renderInventory(navbar, navbottom)
  }
  renderPage(pageData);
}

function renderPage(page){
  container.appendChild(page)
}

function renderHomePage() {
  const contents = document.createElement('div')
  const contentCol = document.createElement('div')
  const titleRow = document.createElement('div')
  const title = document.createElement('h1')
  const buttonRow = document.createElement('div')
  const browseButton = document.createElement('button')
  const inventoryButton = document.createElement('button')

  contents.classList.add('row', 'justify-content-center', 'home-page')
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
  browseButton.addEventListener('click', function(){
    backpackButton.classList.add("inactive-button")
    shopButton.classList.remove("inactive-button")
    previousPage = 'homePage';
    nextPage = 'shopCategories';
    createPage();
  })
  inventoryButton.addEventListener('click', function(){
    shopButton.classList.add("inactive-button")
    backpackButton.classList.remove("inactive-button")
    nextPage = 'inventory'
    createPage();
  })
  return contents
}


function renderShopCategories() {
  navbar.classList.remove('d-none')
  navbottom.classList.remove('d-none')
  $(".page-name").text('Shop')
  const row = document.createElement('div')
  const col = document.createElement('div')
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

  row.classList.add('row', 'justify-content-center', 'categories', 'bottom-scroll-margin')
  col.classList.add('col-11', 'categories-column')

  const allButtons = [helmsButton, chestsButton, armsButton, waistButton, legsButton]
  for(let i = 0; i < allButtons.length; i++){
    allButtons[i].classList.add('btn', 'shop-button', 'btn-lg', 'btn-block')
  }
  col.append(helmsButton, chestsButton, armsButton, waistButton, legsButton)
  row.appendChild(col)

  col.addEventListener('click', function(){
    if(!event.target.id){
      return
    }
    nextPage = 'itemsList'
    getData(event)
  })
  return row
}

function renderItemsList(gearData) {
  let row = document.createElement('div')
  let col = document.createElement('div')
  row.classList.add('row', 'gear-list', 'justify-content-center', 'categories-column', 'bottom-scroll-margin')

  row.addEventListener('click', function () {
    if (!event.target.id) {
      return
    }
    $("#gearStats").modal('show')
    $("#confirm-purchase").removeClass('d-none')
    showGearStats(event, gearData[event.target.id]);
  })

  for (let i = 0; i < gearData.length; i++) {
    if (gearData[i].assets && gearData[i].assets.imageMale !== null && (gearData[i].assets.imageMale !== "https://assets.mhw-db.com/armor/9067d30515d01c6739160f65c680f49c12bf0c06.d20ffa258ec987a3638a7f6bb4c63761.png")){
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
      textCol.classList.add('col', 'gear-text', 'gear-button-text')

      item.classList.add('btn', 'gear-button', 'btn-lg')
      icon.src = gearData[i].assets.imageMale;
      icon.classList.add('gear-list-image')
      gearName.textContent = gearData[i].name;
      gearPrice.textContent = "Price: " + calculatePrice(gearData[i]) + "g";

      imgCol.appendChild(icon);
      textCol.append(gearName, gearPrice)
      buttonContents.append(imgCol, textCol)
      item.appendChild(buttonContents)
      row.appendChild(item)
    }
  }
  return row;
}

function showGearStats(event, gearPiece){
  $("#stats-image").attr("src", gearPiece.assets.imageMale)
  $("#stats-name").text(gearPiece.name)
  $("#defense").text(gearPiece.defense.base)
  $("#fire-res").text(gearPiece.resistances.fire)
  $("#water-res").text(gearPiece.resistances.water)
  $("#thunder-res").text(gearPiece.resistances.thunder)
  $("#ice-res").text(gearPiece.resistances.ice)
  $("#dragon-res").text(gearPiece.resistances.dragon)
  $("#stats-price").text(calculatePrice(gearPiece) + "g")

    $(`#gear-slot1`).text("0")
    $(`#gear-slot2`).text("0")
    $(`#gear-slot3`).text("0")

  for(let i = 0; i < gearPiece.slots.length; i++){
    $(`#gear-slot${i + 1}`).text(gearPiece.slots[i].rank)
  }

  $("#skills-list").empty();
  $("#skills-list").text("Skills")
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
  selectedGearStats = gearPiece
}

function purchaseGear(){
  if(purchaseFlag){
    return
  }
  let clonedGear = selectedGear.cloneNode(true);
  inventory.addGearPiece(clonedGear, selectedGearStats)
  subtractCurrency(calculatePrice(selectedGearStats));
  $("#thank-you").modal('show')
  purchaseFlag = true;
  setTimeout(function(){
    $("#thank-you").modal('hide')
    purchaseFlag = false;
  }, 1000)
}

function subtractCurrency (amount){
  currencyCount -= amount
  $(".currency-count").text(currencyCount)
}

function calculatePrice(data) {
  let itemPrice = 0;
  for(let i = 0; i < data.crafting.materials.length; i++){
    itemPrice += data.crafting.materials[i].item.value;
  }
  return Math.round(itemPrice)
}
