const container = document.querySelector('.container')
let armorType = null;
let currentPage = 'homePage'
//let previousPage = '';
//back button
//const backButton = document.createElement('button')


function getData(event){
  armorType = event.target.id;
  $.ajax({
    method: "GET",
    url: `https://mhw-db.com/armor?q={"type":"${armorType}"}`,
    success: renderData,
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
  title.textContent = "Monster Hunter World Armory";

  buttonRow.classList.add('row', 'button-row', 'justify-content-center')
  browseButton.classList.add('btn', 'landing-button', 'btn-lg', 'btn-block')
  browseButton.textContent = "Browse Shop"
  browseButton.id = 'browse-shop'

  inventoryButton.classList.add('btn', 'landing-button', 'btn-lg', 'btn-block')
  inventoryButton.textContent = "View Inventory"
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
    //todo
    console.log("to do")
  })
}


function renderShopCategories() {
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

    let row = document.createElement('div')
    let col = document.createElement('div')
    row.classList.add('row', 'gear-list', 'justify-content-center')
    col.classList.add('col-11', 'contents-column')

  for (let i = 100; i < 150; i++) {
    const item = document.createElement('button')
    const buttonContents = document.createElement('div');
    const icon = document.createElement('img')
    const imgCol = document.createElement('div')
    const textCol = document.createElement('div')
    const gearName = document.createElement('p')
    const gearPrice = document.createElement('p')

    buttonContents.classList.add('row', 'vertical-align');
    imgCol.classList.add('col-3', 'img-container')
    textCol.classList.add('col', 'gear-text')


    item.classList.add('btn', 'gear-button', 'btn-lg', 'btn-block', 'container')
    icon.src = data[i].assets.imageMale;
    icon.width = "65"
    gearName.textContent = data[i].name;
    gearPrice.textContent = "Price: "

    imgCol.appendChild(icon);
    textCol.append(gearName, gearPrice)
    buttonContents.append(imgCol, textCol)
    item.append(buttonContents)
    col.appendChild(item)
    row.appendChild(col)
    container.appendChild(row)
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
