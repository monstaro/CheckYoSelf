class TodoList {
  constructor(id, title, array) {
    this.id = id || (Date.now() + Math.random());
    this.title = title;
    this.urgent = false;
    this.tasks = array;
  }
  saveToStorage() {

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
