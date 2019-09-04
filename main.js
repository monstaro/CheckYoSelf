
var taskAddButton = document.getElementById('taskAddButton')
var taskInputField = document.getElementById('taskInputField')

//may have to make this local var
var taskText = document.getElementById('taskText')


function addNewTask () {
  var taskListParent = document.getElementById('taskListParent');
  taskListParent.insertAdjacentHTML('beforeend', `<li class="toDoCreator-taskList-listItem">
    <img src="./images/delete.svg" class="taskList-listItem-delete">
    <p class="taskList-listItem-text" id="taskText">${taskInputField.value}</p>
  </li>`)
}

taskAddButton.addEventListener('click', addNewTask);
// Add innerHTML function to add whole list item to
// proper spot in parent which is the UL


// Interpolate the value of the text input field
// into the <p> element on the HTML we are adding




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
      <ul class="main-task-checkbox">

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
