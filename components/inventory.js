class Inventory {
  constructor(){
    this.inventory = [];
  }
  addGearPiece(gear){
    this.inventory.push(gear)
  }
  renderInventory(navElement){
    navElement.classList.remove('d-none')
    let row = document.createElement('div')
    let col = document.createElement('div')
    row.classList.add('row', 'gear-list', 'justify-content-center', 'text-center')
    col.classList.add('col-11', 'contents-column')

    if(this.inventory.length === 0){
      let emptyText = document.createElement('div')
      emptyText.classList.add('empty-backpack-text')
      emptyText.textContent = "Backpack is empty"
      col.appendChild(emptyText)
      row.appendChild(col)
      return row;
    }
    else{
      for(let i = 0; i < this.inventory.length; i++){
        col.appendChild(this.inventory[i])
      }
      row.appendChild(col);
      return row;
    }
  }
}
