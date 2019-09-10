//Make new task and add to the array

var taskAddButton = document.getElementById('taskAddButton');
var taskInputField = document.getElementById('taskInputField');
var taskListParent = document.getElementById('taskListParent');
var clearAllButton = document.getElementById('clearAllButton');
var taskTitleBox = document.getElementById('taskTitleField');
var taskListParent = document.getElementById('taskListParent');
// var sidebarAllItems = document.getElementById('sidebarAllItems');
var makeToDoCard = document.getElementById('makeToDoCard');
var sideBarInputSection = document.querySelector('.sidebar-toDoCreator-inputsAndList');
var parentSectionCards = document.getElementById('parentSectionCards');
var deleteDemoCardIcon = document.querySelector('.demoButton')

deleteDemoCardIcon.addEventListener('click', closeDemoCard);
taskAddButton.addEventListener('click', addNewTask);
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
parentSectionCards.addEventListener('click', checkOffTask);
parentSectionCards.addEventListener('click', deleteCard);
parentSectionCards.addEventListener('click', makeCardUrgent);


function closeDemoCard(event) {
  event.target.parentNode.parentNode.parentNode.remove();
  }



function addNewTask() {
  var taskListParent = document.getElementById('taskListParent');
  taskListParent.insertAdjacentHTML('beforeend', `<li class="toDoCreator-taskList-listItem">
    <img src="./images/delete.svg" class="taskList-listItem-delete">
    <p class="taskList-listItem-text" id="taskText">${taskInputField.value}</p>
  </li>`);
  taskInputField.value = "";
}

var allTasksArray = [];
var allTodoCardsArray = [];

// function getCardsBack() {
//   JSON.parse(localStorage.getItem("bigArray"))
// }


function addNewCard() {
  var taskListArray = document.querySelectorAll("#taskText");
  var parentSectionCards = document.getElementById('parentSectionCards');
  var listTitle = document.querySelector('#taskTitleField').value;
  for (var i = 0; i < taskListArray.length; i++) {
    var taskListObject = new Task(taskListArray[i].innerText, (Date.now() + Math.random()));
    allTasksArray.push(taskListObject);
  }
  var toDoObj = new TodoList((Date.now() + Math.random()),listTitle, allTasksArray, (Date.now() + Math.random()));
  allTodoCardsArray.push(toDoObj);
  parentSectionCards.insertAdjacentHTML('afterbegin', htmlToEmbed(toDoObj));
  var cardtaskListParent = document.getElementById('cardTasklistParent');
  cardtaskListParent.insertAdjacentHTML('beforeend', taskHtmlToEmbed(toDoObj));
  toDoObj.saveToStorage(allTodoCardsArray);
  allTasksArray = [];
  taskTitleBox.value = "";
  taskListParent.innerText = "";
}

function clearAll() {
  allTasksArray = [];
  taskTitleBox.value = "";
  taskListParent.innerText = "";
}

function disableClearAllButton() {
  if (taskTitleBox.value === "" && taskListParent.value === "") {
    clearAllButton.disabled = true;
  } else {
    clearAllButton.disabled = false;
  }
}

function disableTaskAddButton() {
  if (taskTitleField.value === "" || taskInputField.value === "") {
    taskAddButton.disabled = true;
  } else {
    taskAddButton.disabled = false;
  }
}

function deleteListItem(event) {
  if (event.target.classList.contains('taskList-listItem-delete')) {
    event.target.parentNode.remove();
  }
}

function disableAddTaskListButton() {
  (taskListParent.innerText === "") || (taskTitleBox.value === "") ?
  (makeToDoCard.disabled = true) : (makeToDoCard.disabled = false)
}

function checkOffTask(event) {
  if (event.target.classList.contains('main-task-icons')) {
    var uniqueIdOfTask = parseFloat(event.target.parentNode.id);
    matchTaskIDtoDataModel(uniqueIdOfTask);
    taskCheckedCondition();
  }
}

function matchTaskIDtoDataModel(htmlId) {
  for (var i = 0; i < allTodoCardsArray.length; i++) {
    var arrayOfTasks = allTodoCardsArray[i].tasks
    for (var j = 0; j < arrayOfTasks.length; j++) {
      if (arrayOfTasks[j].id === htmlId) {
        allTodoCardsArray[i].updateTask(arrayOfTasks[j]);
      }
    }
  }
}

function taskCheckedCondition() {
  for (var i = 0; i < allTodoCardsArray.length; i++) {
    var arrayOfTasks = allTodoCardsArray[i].tasks
    for (var j = 0; j < arrayOfTasks.length; j++) {
      if (arrayOfTasks[j].checkedOff === true) {
        var checkedListItemParent = document.getElementById(`${arrayOfTasks[j].id}`);
        checkedListItemParent.innerHTML = taskHtmlToEmbedActive(arrayOfTasks[j]);
        callSaveToStorage(allTodoCardsArray[i]);
      } else {
        var checkedListItemParent = document.getElementById(`${arrayOfTasks[j].id}`);
        checkedListItemParent.innerHTML = taskHtmlToEmbedInactive(arrayOfTasks[j]);
        callSaveToStorage(allTodoCardsArray[i]);
      }
    }
  }
}

function deleteCard(event) {
  console.log(event.target);
  var taskUniqueId = parseFloat(event.target.parentNode.parentNode.parentNode.id);
  var toDoListToDelete = findTodoListById(taskUniqueId);
  if (event.target.classList.contains('button-image-delete') && toDoListToDelete.tasks.every(assertAllTasksCheckedOff)) {
    removeCardFromDom();
    fromCardFromArray(taskUniqueId);
  }
}

function assertAllTasksCheckedOff(task) {
    if (task.checkedOff === true) {
      return true;
    }
  }

function removeCardFromDom() {
  event.target.parentNode.parentNode.parentNode.remove();
}

function fromCardFromArray(htmlId) {
  for (var i = 0; i < allTodoCardsArray.length; i++){
    if (allTodoCardsArray[i].id === htmlId) {
      var bigArrayItemIndex = allTodoCardsArray.indexOf(allTodoCardsArray[i]);
      allTodoCardsArray.splice(bigArrayItemIndex, 1);
      callSaveToStorage(allTodoCardsArray[i]);
    }
  }
}

function findTodoListById(htmlId) {
  for (var i = 0; i < allTodoCardsArray.length; i++) {
    if (allTodoCardsArray[i].id === htmlId) {
      return allTodoCardsArray[i];
    }
  }
}

function assertAllTasksCheckedOff(task) {
    if (task.checkedOff === true) {
      return true;
    }
  }

function callSaveToStorage(bigArrayObj) {
  bigArrayObj.saveToStorage(allTodoCardsArray);
}

function makeCardUrgent() {
  if (event.target.classList.contains('button-image-urgent')){
    var taskUniqueId = parseFloat(event.target.parentNode.parentNode.parentNode.id);
    updateUrgentStateInDM(taskUniqueId);
    cardUrgentCondition(event);
  }
}

function updateUrgentStateInDM(htmlId) {
  for (var i = 0; i < allTodoCardsArray.length; i++){
    if (allTodoCardsArray[i].id === htmlId) {
      allTodoCardsArray[i].updateToDo();
    }
  }
}

function cardUrgentCondition() {
  for (var i = 0; i < allTodoCardsArray.length; i++) {
    if (allTodoCardsArray[i].urgent === true) {
      var cardStylingContainer = document.getElementById(`${allTodoCardsArray[i].id}`);
      cardStylingContainer.className = "main-card-yellowContainer";
      var cardButtonElement = document.getElementById(`${allTodoCardsArray[i].buttonID}`);
      cardButtonElement.src = "./images/urgent-active.svg";
      callSaveToStorage(allTodoCardsArray[i]);
    } else {
      var cardStylingContainer = document.getElementById(`${allTodoCardsArray[i].id}`);
      cardStylingContainer.className = "main-card-greyContainer";
      var cardButtonElement = document.getElementById(`${allTodoCardsArray[i].buttonID}`);
      cardButtonElement.src = "./images/urgent.svg";
      callSaveToStorage(allTodoCardsArray[i]);
    }
  }
}

function taskHtmlToEmbed(toDo) {
  var fullStringArray = [];
  for (var i = 0; i < toDo.tasks.length; i++) {
    fullStringArray.push(`<li class="main-task-items" id="${toDo.tasks[i].id}">
    <img src="./images/checkbox.svg" class="main-task-icons">
    <p class="main-task-text">${toDo.tasks[i].taskDescription}</p>
  </li>`)
  }
  return fullStringArray.join("");
}

function taskHtmlToEmbedActive(task) {
  return `<img src="./images/checkbox-active.svg" class="main-task-icons">
    <p class="main-task-text-checked">${task.taskDescription}</p>`
}

function taskHtmlToEmbedInactive(task) {
  return `<img src="./images/checkbox.svg" class="main-task-icons">
    <p class="main-task-text">${task.taskDescription}</p>`
}

function htmlToEmbed(toDo) {
  return `<div class="main-card-greyContainer" id="${toDo.id}">
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
          <button class="card-button-urgent button">
            <img id="${toDo.buttonID}" src="./images/urgent.svg" class="card-button-image button-image-urgent" />
            <p class="card-button-text">Urgent</p>
          </button>
          <button class="card-button-delete button">
            <img src="./images/delete.svg" class="card-button-image button-image-delete" />
            <p class="card-button-text">Delete</p>
          </button>
        </section>
    </div>`
}
