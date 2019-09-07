//Make new task and add to the array

var taskAddButton = document.getElementById('taskAddButton');
var taskInputField = document.getElementById('taskInputField');
var taskListParent = document.getElementById('taskListParent');
<<<<<<< HEAD
var isolatedTextArray = [];
var toDoCardArray = [];
var clearAllButton = document.getElementById('clearAllButton');
var taskTitleBox = document.getElementById('taskTitleField');
var taskListParent = document.getElementById('taskListParent');
=======
var clearAllButton = document.getElementById('clearAllButton');
var taskTitleBox = document.getElementById('taskTitleField');
var taskListParent = document.getElementById('taskListParent');
// var sidebarAllItems = document.getElementById('sidebarAllItems');
>>>>>>> 27a1f05bbcae632b51687d859aa0f1d1b26f6711
var makeToDoCard = document.getElementById('makeToDoCard');
var sideBarInputSection = document.querySelector('.sidebar-toDoCreator-inputsAndList')

taskAddButton.addEventListener('click', addNewTask);
<<<<<<< HEAD
taskTitleBox.addEventListener('keyup', disableClearAllButton)
taskTitleField.addEventListener('keyup', disableTaskAddButton);
taskListParent.addEventListener('click', deleteListItem)
makeToDoCard.addEventListener("click", makeToDoList);
makeToDoCard.addEventListener('click', addNewCard);
sideBarInputSection.addEventListener('click', disableAddTaskListButton)
=======
// taskAddButton.addEventListener('click', addNewTask);
// clearAllButton.addEventListener('click', clearAll);
// work on this later!!!!!! <------
sideBarInputSection.addEventListener('click', disableClearAllButton); 
clearAllButton.addEventListener('click', clearAll);
  taskTitleBox.addEventListener('keyup', disableClearAllButton);
makeToDoCard.addEventListener('click', addNewCard);
taskTitleField.addEventListener('keyup', disableTaskAddButton);
taskAddButton.addEventListener("click", disableTaskAddButton);
taskListParent.addEventListener('click', deleteListItem);
sideBarInputSection.addEventListener('click', disableAddTaskListButton);
>>>>>>> 27a1f05bbcae632b51687d859aa0f1d1b26f6711


function addNewTask() {
  var taskListParent = document.getElementById('taskListParent');
  taskListParent.insertAdjacentHTML('beforeend', `<li class="toDoCreator-taskList-listItem">
    <img src="./images/delete.svg" class="taskList-listItem-delete">
    <p class="taskList-listItem-text" id="taskText">${taskInputField.value}</p>
  </li>`);
  taskInputField.value = "";
}

<<<<<<< HEAD


//ADD NEW CARDS
//Instantiate to Todolist



function addTaskListToArray() {
  var taskListArray = document.querySelectorAll(".taskList-listItem-text");
  console.log(taskListArray[0].innerText);
  for (var i = 0; i < taskListArray.length; i++) {
    var taskListInst = new Task(taskListArray[i].innerText, Date.now());
    isolatedTextArray.push(taskListInst);
=======
function addNewCard() {
  var taskListArray = document.querySelectorAll("#taskText");
  var parentSectionCards = document.getElementById('parentSectionCards');
  var listTitle = document.querySelector('#taskTitleField').value;
  var allTasksArray = [];
  for (var i = 0; i < taskListArray.length; i++) {
    var taskListObject = new Task(taskListArray[i].innerText, Date.now());
    allTasksArray.push(taskListObject);
    console.log(allTasksArray);
    console.log("task list", taskListObject);
>>>>>>> 27a1f05bbcae632b51687d859aa0f1d1b26f6711
  }
  var toDoObj = new TodoList(Date.now(),listTitle, allTasksArray);
  parentSectionCards.insertAdjacentHTML('afterbegin', htmlToEmbed(toDoObj));
  var taskListParent = document.getElementById('cardTasklistParent');
  taskListParent.insertAdjacentHTML('beforeend', taskHtmlToEmbed(toDoObj));
}

<<<<<<< HEAD

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
=======
function clearAll() {
>>>>>>> 27a1f05bbcae632b51687d859aa0f1d1b26f6711
  taskTitleBox.value = "";
  taskListParent.innerText = "";
}

<<<<<<< HEAD

function disableClearAllButton() {
  if (taskListParent.value !== "") {
    clearAllButton.disabled = false;
  } else {
=======
function disableClearAllButton() {
  if (taskTitleBox.value === "" && taskListParent.value === "") {
>>>>>>> 27a1f05bbcae632b51687d859aa0f1d1b26f6711
    clearAllButton.disabled = true;
  } else {
    clearAllButton.disabled = false;
  }
}

<<<<<<< HEAD
// Disable Task Add Button

=======
>>>>>>> 27a1f05bbcae632b51687d859aa0f1d1b26f6711
function disableTaskAddButton() {
  if (taskTitleField.value === "" || taskInputField.value === "") {
    taskAddButton.disabled = true;
  } else {
    taskAddButton.disabled = false;
  }
}

<<<<<<< HEAD


// Delete list item

=======
>>>>>>> 27a1f05bbcae632b51687d859aa0f1d1b26f6711
function deleteListItem(event) {
  if (event.target.classList.contains('taskList-listItem-delete')) {
    event.target.parentNode.remove();
  }
}

<<<<<<< HEAD
// Disable task list button

=======
function disableAddTaskListButton() {
  (taskListParent.innerText === "") || (taskTitleBox.value === "") ?
  (makeToDoCard.disabled = true) : (makeToDoCard.disabled = false)
}

function taskHtmlToEmbed(toDo) {
  var fullStringArray = [];
  for (var i = 0; i < toDo.tasks.length; i++) {
    fullStringArray.push(`<li class="main-task-items">
    <img src="./images/checkbox-active.svg" class="main-task-icons">
    <p class="main-task-text">${toDo.tasks[i].taskDescription}</p>
  </li>`)
  }
  return fullStringArray.join("");
}
>>>>>>> 27a1f05bbcae632b51687d859aa0f1d1b26f6711

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
