class Task {
  constructor(taskDescription, id){
    this.taskDescription = taskDescription;
    this.id = id || Date.now();
    this.checkedOff = false;
  }
  // addArrayToCard(listLocation){
  //   listLocation.insertAdjacentHTML('beforeend', `<li class="main-task-items">
  //     <img src="./images/checkbox-active.svg" class="main-task-icons">
  //     <p class="main-task-text">${this.taskDescription}</p>
  //   </li>`)
  //
  // }
}
