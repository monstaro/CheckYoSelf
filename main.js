//Make new task and add to the array

var taskAddButton = document.getElementById('taskAddButton')
var taskInputField = document.getElementById('taskInputField')
var taskListParent = document.getElementById('taskListParent');

//may have to make this local var
var taskText = document.getElementById('taskText')

var taskListArray = [];

function addNewTask () {
  var taskListParent = document.getElementById('taskListParent');
  taskListParent.insertAdjacentHTML('beforeend', `<li class="toDoCreator-taskList-listItem">
    <img src="./images/delete.svg" class="taskList-listItem-delete">
    <p class="taskList-listItem-text" id="taskText">${taskInputField.value}</p>
  </li>`);
  taskListArray.push(taskInputField.value);
  console.log(taskListArray);
}

taskAddButton.addEventListener('click', addNewTask);


//ADD NEW CARDS
//doc query for parent section of main-card-bacgrkound
//insert innerHTML


function addNewCard() {
  var parentSectionCards = document.getElementById('parentSectionCards');
  parentSectionCards.insertAdjacentHTML('afterbegin', `<div class="main-card-yellowContainer">
    <section class="main-card-title">
      <h3></h3>
    </section>
      <hr>
    <section class="main-card-list">
      <ul class="main-task-checkbox" id="cardTasklistParent">

      </ul>
    </section>
    <hr>
    <section class="main-card-buttons">
      <button class="card-button-urgent">
        <img src="./images/urgent.svg" class="card-button-image" />
        <p class="card-button-text">Urgent</p>
      </button>
      <button class="card-button-delete">
        <img src="./images/delete.svg" class="card-button-image" />
        <p class="card-button-text">Delete</p>
      </button>
    </section>
    </div>`);
  var taskListParent = document.getElementById('cardTasklistParent');
  for (var i = 0; i < taskListArray.length; i++) {
    var taskListObject = new Task(taskListArray[i]);
    taskListObject.addArrayToCard(taskListParent);
  }
}


var makeToDoCard = document.getElementById('makeToDoCard');

makeToDoCard.addEventListener('click', addNewCard);


function disableTaskAddButton() {
  if (taskInputField.value !== ""){
    taskAddButton.disabled = false;
  }else{
    taskAddButton.disabled = true;
  }
}

taskInputField.addEventListener('keyup', disableTaskAddButton);

//Instantiate array and add to card

// function instantiateTaskList() {
//   for (var i = 0; i < taskListArray.length; i++) {
//     var taskListObject = new Task(taskListArray[i]);
//
//   }
// }
// Funtionality that lets us remove list items from side bar

taskListParent.addEventListener('click', deleteListItem)

function deleteListItem(event){
  if (event.target.classList.contains('taskList-listItem-delete')){
    event.target.parentNode.remove();
  }
}

