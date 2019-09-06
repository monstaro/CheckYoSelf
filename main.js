//Make new task and add to the array

var taskAddButton = document.getElementById('taskAddButton');
var taskInputField = document.getElementById('taskInputField');
var taskListParent = document.getElementById('taskListParent');
var isolatedTextArray = [];
var toDoCardArray = [];
var clearAllButton = document.getElementById('clearAllButton');
var taskTitleBox = document.getElementById('taskTitleField');
var taskListParent = document.getElementById('taskListParent');
var makeToDoCard = document.getElementById('makeToDoCard');
var sideBarInputSection = document.querySelector('.sidebar-toDoCreator-inputsAndList')

taskAddButton.addEventListener('click', addNewTask);
taskTitleBox.addEventListener('keyup', disableClearAllButton)
taskTitleField.addEventListener('keyup', disableTaskAddButton);
taskListParent.addEventListener('click', deleteListItem)
makeToDoCard.addEventListener("click", makeToDoList);
makeToDoCard.addEventListener('click', addNewCard);
sideBarInputSection.addEventListener('click', disableAddTaskListButton)


function addNewTask() {
  var taskListParent = document.getElementById('taskListParent');
  taskListParent.insertAdjacentHTML('beforeend', `<li class="toDoCreator-taskList-listItem">
    <img src="./images/delete.svg" class="taskList-listItem-delete">
    <p class="taskList-listItem-text" id="taskText">${taskInputField.value}</p>
  </li>`);
}



//ADD NEW CARDS
//Instantiate to Todolist



function addTaskListToArray() {
  var taskListArray = document.querySelectorAll(".taskList-listItem-text");
  console.log(taskListArray[0].innerText);
  for (var i = 0; i < taskListArray.length; i++) {
    var taskListInst = new Task(taskListArray[i].innerText, Date.now());
    isolatedTextArray.push(taskListInst);
  }
}


function makeToDoList() {
  var toDoCard = new TodoList(taskTitleField.value, Date.now, isolatedTextArray);
  // might have to use param in isolatedTextArray if undefined
  // console.log("todocard", toDoCard);
  // console.log(toDoList);
  toDoCardArray.push(toDoCard);
  var parentSectionCards = document.getElementById('parentSectionCards')
  addNewCard(parentSectionCards, toDoCard);
  renderListOfTasks(taskListInst);
}

function renderListOfTasks(taskListInstParam) {
  var fullStringArray = []
  for (var i = 0; i < taskListInstParam.tasks.length; i++) {
    fullStringArray.push(`<li class="main-task-items">
    <img src="./images/checkbox-active.svg" class="main-task-icons">
    <p class="main-task-text">${taskListInstParam.tasks[i].taskDescription}</p>
  </li>`)
  }
  return fullStringArray.join("");
}

function addNewCard(cardLocation, toDoCard) {
  cardLocation.insertAdjacentHTML('afterbegin', `<div class="main-card-yellowContainer">
      <section class="main-card-title">
        <h3>${toDoCard.title}</h3>
      </section>
        <hr>
      <section class="main-card-list">
        <ul class="main-task-checkbox" id="cardTasklistParent">${renderListOfTasks(taskListInstParam)}
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
      </div>`)
}



// function addNewCard() {
//   var taskListArray = document.querySelectorAll("#taskText");
//   var parentSectionCards = document.getElementById('parentSectionCards');
//   parentSectionCards.insertAdjacentHTML('afterbegin', `<div class="main-card-yellowContainer">
//     <section class="main-card-title">
//       <h3>${taskTitleField.value}</h3>
//     </section>
//       <hr>
//     <section class="main-card-list">
//       <ul class="main-task-checkbox" id="cardTasklistParent">
//       </ul>
//     </section>
//     <hr>
//     <section class="main-card-buttons">
//       <button class="card-button-urgent">
//         <img src="./images/urgent.svg" class="card-button-image" />
//         <p class="card-button-text">Urgent</p>
//       </button>
//       <button class="card-button-delete">
//         <img src="./images/delete.svg" class="card-button-image" />
//         <p class="card-button-text">Delete</p>
//       </button>
//     </section>
//     </div>`);
//   var taskListParent = document.getElementById('cardTasklistParent');
//   console.log(taskListArray[0].innerText);
//   for (var i = 0; i < taskListArray.length; i++) {
//     var taskListObject = new Task(taskListArray[i].innerText, Date.now());
//     addArrayToCard(taskListParent, taskListArray[i].innerText);
//   }
// }

// function addArrayToCard(listLocation, taskDescription) {
//   listLocation.insertAdjacentHTML('beforeend', `<li class="main-task-items">
//     <img src="./images/checkbox-active.svg" class="main-task-icons">
//     <p class="main-task-text">${taskDescription}</p>
//   </li>`)
// }






/////////  ignore           var sidebarAllItems = document.getElementById('sidebarAllItems');

// sidebarAllItems.addEventListener("click", checkEvent);
//
// function checkEvent(event) {
//   console.log(event);
// }

//* CLEAR ALL BUTTON *//


clearAllButton.addEventListener('click', clearAll);

function clearAll(event) {
  taskTitleBox.value = "";
  taskListParent.innerText = "";
}


function disableClearAllButton() {
  if (taskListParent.value !== "") {
    clearAllButton.disabled = false;
  } else {
    clearAllButton.disabled = true;
  }
}

// Disable Task Add Button

function disableTaskAddButton() {
  if (taskTitleField.value !== "") {
    taskAddButton.disabled = false;
  } else {
    taskAddButton.disabled = true;
  }
}



// Delete list item

function deleteListItem(event) {
  if (event.target.classList.contains('taskList-listItem-delete')) {
    event.target.parentNode.remove();
  }
}

// Disable task list button


function disableAddTaskListButton() {
  (taskInputField.value == "") || (taskTitleBox.value == "") ?
  (makeToDoCard.disabled) = true: (makeToDoCard.disabled = false)
}
