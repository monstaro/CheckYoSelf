var taskAddButton = document.getElementById('taskAddButton');
var taskInputField = document.getElementById('taskInputField');
var taskListParent = document.getElementById('taskListParent');
var clearAllButton = document.getElementById('clearAllButton');
var taskTitleBox = document.getElementById('taskTitleField');
var taskListParent = document.getElementById('taskListParent');
var makeToDoCard = document.getElementById('makeToDoCard');
var sideBarInputSection = document.querySelector('.sidebar-toDoCreator-inputsAndList');
var parentSectionCards = document.getElementById('parentSectionCards');
var deleteDemoCardIcon = document.querySelector('.demoButton')
var searchInput = document.getElementById("searchbarInput");
var allTasksArray = [];
var allTodoCardsArray = [];
var filterByUrgentButton = document.getElementById("filterByUrgent");
var searchButton = document.getElementById("searchButton");

deleteDemoCardIcon.addEventListener('click', closeDemoCard);
taskAddButton.addEventListener('click', addNewTask);
sideBarInputSection.addEventListener('click', disableClearAllButton);
clearAllButton.addEventListener('blur', disableClearAllButton);
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
searchButton.addEventListener('click', searchByTitle);
searchInput.addEventListener('input', searchByTitle);
filterByUrgentButton.addEventListener('click', filterByUrgent);
filterByUrgentButton.addEventListener('click', noSearchWhenHidden);


getCardsBack();

function closeDemoCard(event) {
  event.target.parentNode.parentNode.parentNode.remove();
}

function addNewTask() {
  var taskListParent = document.getElementById('taskListParent');
  taskListParent.insertAdjacentHTML('beforeend', `<li class="toDoCreator-taskList-listItem">
    <img src="./images/delete.svg" class="taskList-listItem-delete button">
    <p class="taskList-listItem-text" id="taskText">${taskInputField.value}</p>
  </li>`);
  taskInputField.value = "";
}

function addNewCard() {
  instantiateTaskList();
  instantiateToDoCard();
  clearAll();
}

function instantiateTaskList() {
  var taskListArray = document.querySelectorAll("#taskText");
  for (var i = 0; i < taskListArray.length; i++) {
    var taskListObject = new Task(taskListArray[i].innerText);
    allTasksArray.push(taskListObject);
  }
}

function instantiateToDoCard() {
  var parentSectionCards = document.getElementById('parentSectionCards');
  var listTitle = document.querySelector('#taskTitleField').value;
  var toDoObj = new TodoList(listTitle, allTasksArray);
  allTodoCardsArray.push(toDoObj);
  parentSectionCards.insertAdjacentHTML('afterbegin', htmlToEmbed(toDoObj));
  var cardtaskListParent = document.getElementById('cardTasklistParent');
  cardtaskListParent.insertAdjacentHTML('beforeend', taskHtmlToEmbed(toDoObj));
  callSaveToStorage(toDoObj);
}

function clearAll() {
  allTasksArray = [];
  taskTitleBox.value = "";
  taskListParent.innerText = "";
  disableAddTaskListButton();
  disableClearAllButton();
}

function getCardsBack() {
  var retrievedCards = JSON.parse(localStorage.getItem("bigArray"));
  for (var i = 0; i < retrievedCards.length; i++) {
    var toDoObj = new TodoList(retrievedCards[i].title, retrievedCards[i].tasks, retrievedCards[i].id, retrievedCards[i].buttonID, retrievedCards[i].urgent)
    allTodoCardsArray.push(toDoObj);
    parentSectionCards.insertAdjacentHTML('afterbegin', htmlToEmbed(toDoObj));
    var cardtaskListParent = document.getElementById('cardTasklistParent');
    cardtaskListParent.insertAdjacentHTML('beforeend', taskHtmlToEmbed(toDoObj));
    cardUrgentCondition();
    taskCheckedCondition();
  }
}

function disableClearAllButton() {
  if (taskTitleBox.value === "" || taskListParent.innerText === "" ) {
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

function findTodoListById(htmlId) {
  for (var i = 0; i < allTodoCardsArray.length; i++) {
    if (allTodoCardsArray[i].id === htmlId) {
      return allTodoCardsArray[i];
    }
  }
}

function deleteCard(event) {
  if (!event.target.classList.contains('button-image-delete')) {
    return
  }
  var taskUniqueId = parseFloat(event.target.parentNode.parentNode.parentNode.id);
  var toDoListToDelete = findTodoListById(taskUniqueId);
  if (toDoListToDelete.tasks.every(assertAllTasksCheckedOff)) {
    removeCardFromDom();
    removeCardFromArray(taskUniqueId);
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

function removeCardFromArray(htmlId) {
  var cardToBeRemoved = findTodoListById(htmlId);
  var bigArrayItemIndex = allTodoCardsArray.indexOf(cardToBeRemoved);
  allTodoCardsArray.splice(bigArrayItemIndex, 1);
  callSaveToStorage(cardToBeRemoved);
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
  if (event.target.classList.contains('button-image-urgent')) {
    var toDoListUniqueId = parseFloat(event.target.parentNode.parentNode.parentNode.id);
    updateUrgentStateInDM(toDoListUniqueId);
    cardUrgentCondition();
  }
}

function updateUrgentStateInDM(htmlId) {
  var urgentCard = findTodoListById(htmlId);
  urgentCard.updateToDo();
}

function cardUrgentCondition() {
  for (var i = 0; i < allTodoCardsArray.length; i++) {
    var cardStylingContainer = document.getElementById(`${allTodoCardsArray[i].id}`);
    var cardButtonElement = document.getElementById(`${allTodoCardsArray[i].buttonID}`);
    if (allTodoCardsArray[i].urgent === true) {
      cardStylingContainer.className = "main-card-yellowContainer";
      cardButtonElement.src = "./images/urgent-active.svg";
    } else {
      cardStylingContainer.className = "main-card-greyContainer";
      cardButtonElement.src = "./images/urgent.svg";
    }
    callSaveToStorage(allTodoCardsArray[i]);
  }
}

function searchByTitle() {
  for (var i = 0; i < allTodoCardsArray.length; i++) {
    var cardContainer = document.getElementById(allTodoCardsArray[i].id)
    if (allTodoCardsArray[i].title.includes(searchInput.value)) {
      cardContainer.classList.remove("hidden");
    } else {
      cardContainer.classList.add("hidden");
    }
  }
}

function filterByUrgent() {
  for (var i = 0; i < allTodoCardsArray.length; i++) {
    if (allTodoCardsArray[i].urgent !== true) {
      var cardContainer = document.getElementById(allTodoCardsArray[i].id)
      cardContainer.classList.toggle("hiddenNotUrgent");
    }
  }
  filterByUrgentButton.classList.toggle('sidebar-buttonsList-button-active');
}

function noSearchWhenHidden() {
  for (var i = 0; i < allTodoCardsArray.length; i++) {
    var cardContainer = document.getElementById(allTodoCardsArray[i].id)
    if (cardContainer.classList.contains("hiddenNotUrgent")) {
      allTodoCardsArray[i].title = "";
    } else {
      var storageTitle = getTitleFromStorage(allTodoCardsArray[i]);
      allTodoCardsArray[i].title = storageTitle;
    }
  }
}

function getTitleFromStorage(arrayItem) {
  var retrievedCards = JSON.parse(localStorage.getItem("bigArray"));
  for (var i = 0; i < retrievedCards.length; i++) {
    if (retrievedCards[i].id === arrayItem.id) {
      return retrievedCards[i].title;
    }
  }
}

function taskHtmlToEmbed(toDo) {
  var fullStringArray = [];
  for (var i = 0; i < toDo.tasks.length; i++) {
    fullStringArray.push(`<li class="main-task-items" id="${toDo.tasks[i].id}">
    <img src="./images/checkbox.svg" class="main-task-icons button">
    <p class="main-task-text">${toDo.tasks[i].taskDescription}</p>
  </li>`)
  }
  return fullStringArray.join("");
}

function taskHtmlToEmbedActive(task) {
  return `<img src="./images/checkbox-active.svg" class="main-task-icons button">
    <p class="main-task-text-checked">${task.taskDescription}</p>`
}

function taskHtmlToEmbedInactive(task) {
  return `<img src="./images/checkbox.svg" class="main-task-icons button">
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
