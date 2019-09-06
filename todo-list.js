class TodoList {
  constructor(title, id, array) {
    this.title = title;
    this.id = id || Date.now();
    this.tasks = array;
    this.urgent = false;
  }
  saveToStorage() {

  }
  deleteFromStorage() {

  }
  updateToDo() {

  }
  updateTask() {

  }
}
