class Task {
  constructor(taskDescription, index){
    this.taskDescription = taskDescription;
    this.index = index;
  }
  addArrayToCard(listLocation){
    listLocation.insertAdjacentHTML('beforeend', `<li class="main-task-items">
      <img src="./images/checkbox-active.svg" class="main-task-icons">
      <p class="main-task-text">${this.taskDescription}</p>
    </li>`)

  }
}
