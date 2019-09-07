class Task {
  constructor(taskDescription, id){
    this.taskDescription = taskDescription;
    this.id = id || Date.now();
    this.checkedOff = false;
  }
  updateTask(){
    
  }
}
