class TodoList {
<<<<<<< HEAD
<<<<<<< HEAD
  constructor(title, id, array) {
=======
  constructor(id, title, array) {
<<<<<<< HEAD
    this.id = id || Date.now();
>>>>>>> 27a1f05bbcae632b51687d859aa0f1d1b26f6711
=======
=======
  constructor(id, title, array, buttonID) {
>>>>>>> 78bd67366bd9af713622f241165ae69f5218136f
    this.id = id || (Date.now() + Math.random());
>>>>>>> bf9728f45c35b6beaea7193ed7aaad39872b8c2a
    this.title = title;
    this.id = id || Date.now();
    this.tasks = array;
<<<<<<< HEAD
    this.urgent = false;
=======
    this.buttonID = buttonID || (Date.now() + Math.random());
>>>>>>> 78bd67366bd9af713622f241165ae69f5218136f
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
