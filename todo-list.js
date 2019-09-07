class TodoList {
<<<<<<< HEAD
  constructor(title, id, array) {
=======
  constructor(id, title, array) {
    this.id = id || Date.now();
>>>>>>> 27a1f05bbcae632b51687d859aa0f1d1b26f6711
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
