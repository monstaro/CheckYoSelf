//Make new task and add to the array

var taskAddButton = document.getElementById('taskAddButton');
var taskInputField = document.getElementById('taskInputField');
var taskListParent = document.getElementById('taskListParent');


function addNewTask() {
  var taskListParent = document.getElementById('taskListParent');
  taskListParent.insertAdjacentHTML('beforeend', `<li class="toDoCreator-taskList-listItem">
    <img src="./images/delete.svg" class="taskList-listItem-delete">
    <p class="taskList-listItem-text" id="taskText">${taskInputField.value}</p>
  </li>`);
}

taskAddButton.addEventListener('click', addNewTask);

//ADD NEW CARDS
//Instantiate to Todolist

function addNewCard() {
  var taskListArray = document.querySelectorAll("#taskText");
  var parentSectionCards = document.getElementById('parentSectionCards');
  var listTitle = document.querySelector('#taskTitleField').value
  var toDoObj = new TodoList(Date.now(),listTitle, taskListArray);
  parentSectionCards.insertAdjacentHTML('afterbegin', htmlToEmbed(toDoObj));
  var taskListParent = document.getElementById('cardTasklistParent');
  for (var i = 0; i < taskListArray.length; i++) {
    var taskListObject = new Task(taskListArray[i].innerText, Date.now());
    console.log("task list", taskListObject);
    addArrayToCard(taskListParent, taskListArray[i].innerText);
    return taskListObject;
  }
}

function addArrayToCard(listLocation, taskDescription) {
  listLocation.insertAdjacentHTML('beforeend', `<li class="main-task-items">
    <img src="./images/checkbox-active.svg" class="main-task-icons">
    <p class="main-task-text">${taskDescription}</p>
  </li>`)
}

var sidebarAllItems = document.getElementById('sidebarAllItems');

// sidebarAllItems.addEventListener("click", checkEvent);
//
// function checkEvent(event) {
//   console.log(event);
// }

//* CLEAR ALL BUTTON *//
var clearAllButton = document.getElementById('clearAllButton');
var taskTitleBox = document.getElementById('taskTitleField');
var taskListParent = document.getElementById('taskListParent');

clearAllButton.addEventListener('click', clearAll);

function clearAll(event) {
  taskTitleBox.value = "";
  taskListParent.innerText = "";
}

taskTitleBox.addEventListener('keyup', disableClearAllButton)

function disableClearAllButton() {
  if (taskTitleBox.value !== "") {
    clearAllButton.disabled = false;
  } else {
    clearAllButton.disabled = true;
  }
}

var makeToDoCard = document.getElementById('makeToDoCard');

makeToDoCard.addEventListener('click', addNewCard);

// Disable Task Add Button

function disableTaskAddButton() {
  if (taskTitleField.value !== "") {
    taskAddButton.disabled = false;
  } else {
    taskAddButton.disabled = true;
  }
}

taskTitleField.addEventListener('keyup', disableTaskAddButton);

taskListParent.addEventListener('click', deleteListItem)

// Delete list item

function deleteListItem(event) {
  if (event.target.classList.contains('taskList-listItem-delete')) {
    event.target.parentNode.remove();
  }
}

// Disable task list button

var sideBarInputSection = document.querySelector('.sidebar-toDoCreator-inputsAndList')

sideBarInputSection.addEventListener('click', disableAddTaskListButton)

function disableAddTaskListButton() {
  (taskInputField.value == "") || (taskTitleBox.value == "") ?
  (makeToDoCard.disabled) = true: (makeToDoCard.disabled = false)
}


function htmlToEmbed(toDo) {
  return `<div class="main-card-yellowContainer">
    <section class="main-card-title">
      <h3>${toDo.title}</h3>
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
    </div>`
}