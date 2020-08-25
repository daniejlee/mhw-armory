class Inventory {
  constructor(){
    // this.inventory = [];
    // this.gearStats = [];
    this.inventory = [];
  }
  addGearPiece(gearNode, gearStats){
    // this.inventory.push(gearNode)
    // this.gearStats.push(gearStats)

    let gear = {
      node: gearNode,
      stats: gearStats
    };
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
    // else{
    //   for(let i = 0; i < this.inventory.length; i++){
    //     this.inventory[i].id = i;
    //     col.appendChild(this.inventory[i])
    //   }
    // col.addEventListener('click', function(){
    //   $("#gearStats").modal('show')
    //   $("#confirm-purchase").addClass('d-none')
    //   showGearStats(event, inventory.gearStats[event.target.id]);
    // })

    //test
    else{
      for(let i = 0; i < this.inventory.length; i++){
        this.inventory[i].node.addEventListener('click', function(){
          $("#gearStats").modal('show')
          $("#confirm-purchase").addClass('d-none')
          showGearStats(event, inventory.inventory[i].stats);
        })
        col.appendChild(this.inventory[i].node)
      }
    //test
      row.appendChild(col);
      return row;
    }
  }
}
