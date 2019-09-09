class TodoList {
  constructor(id, title, array, buttonID) {
    this.id = id || (Date.now() + Math.random());
    this.title = title;
    this.urgent = false;
    this.tasks = array;
    this.buttonID = buttonID || (Date.now() + Math.random());
  }
  saveToStorage() {
    // localStorage.setItem("name", name)
    //call on card object
  }
  deleteFromStorage() {

  }
  updateToDo() {
    this.urgent = !this.urgent;
  }
  updateTask(task) {
    task.checkedOff = !task.checkedOff;
  }
}
