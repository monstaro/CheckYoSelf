class TodoList {
  constructor(title, array, id, buttonID, urgent) {
    this.id = id || (Date.now() + Math.random());
    this.title = title;
    this.urgent = urgent || false;
    this.tasks = array;
    this.buttonID = buttonID || (Date.now() + Math.random());
  }
  saveToStorage(bigArray) {
    localStorage.setItem("bigArray", JSON.stringify(bigArray));
  }

  deleteFromStorage() {
    //not needed for this project
  }
  updateToDo() {
    this.urgent = !this.urgent;
  }
  updateTask(task) {
    task.checkedOff = !task.checkedOff;
  }
}
