class Inventory {
  constructor(){
    this.inventory = [];
  }
  addGearPiece(gearNode, gearStats){
    let gear = {
      node: gearNode,
      stats: gearStats
    };
    this.inventory.push(gear)
  }
  renderInventory(navElement, navBottom){
    navElement.classList.remove('d-none')
    navBottom.classList.remove('d-none')
    $(".page-name").text('Backpack')
    let row = document.createElement('div')
    row.classList.add('row', 'gear-list', 'justify-content-center', 'text-center', 'contents-column', 'inventory-column', 'bottom-scroll-margin')

    if(this.inventory.length === 0){
      let emptyText = document.createElement('div')
      emptyText.classList.add('empty-backpack-text')
      emptyText.textContent = "Backpack is empty"
      row.appendChild(emptyText)
      return row;
    }

    else{
      for(let i = 0; i < this.inventory.length; i++){
        this.inventory[i].node.addEventListener('click', function(){
          $("#gearStats").modal('show')
          $("#confirm-purchase").addClass('d-none')
          showGearStats(event, inventory.inventory[i].stats);
        })
        row.appendChild(this.inventory[i].node)
      }
      return row;
    }
  }
}
