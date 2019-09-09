class TodoList {
<<<<<<< HEAD
  constructor(title, id, array) {
=======
  constructor(id, title, array) {
<<<<<<< HEAD
    this.id = id || Date.now();
>>>>>>> 27a1f05bbcae632b51687d859aa0f1d1b26f6711
=======
    this.id = id || (Date.now() + Math.random());
>>>>>>> bf9728f45c35b6beaea7193ed7aaad39872b8c2a
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
    this.urgent = !this.urgent;
  }
  updateTask(task) {
    task.checkedOff = !task.checkedOff;
  }
}
