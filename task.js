class Task {
  constructor(taskDescription, id) {
    this.taskDescription = taskDescription;
    this.id = id || (Date.now() + Math.random());
    this.checkedOff = false;
  }
  updateTask(){

  }
}
