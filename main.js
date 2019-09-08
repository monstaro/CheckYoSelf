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
// parentSectionCards.addEventListener('click', checkOffTask);



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

function addNewCard() {
  var taskListArray = document.querySelectorAll("#taskText");
  var parentSectionCards = document.getElementById('parentSectionCards');
  var listTitle = document.querySelector('#taskTitleField').value;
  for (var i = 0; i < taskListArray.length; i++) {
    var taskListObject = new Task(taskListArray[i].innerText, (Date.now() + Math.random()));
    allTasksArray.push(taskListObject);
    console.log("array of tasks", allTasksArray);
    console.log("task list", taskListObject);
  }
  var toDoObj = new TodoList((Date.now() + Math.random()),listTitle, allTasksArray);
  allTodoCardsArray.push(toDoObj);
  console.log("array of todo lists", allTodoCardsArray);
  console.log("full todo card", toDoObj);
  parentSectionCards.insertAdjacentHTML('afterbegin', htmlToEmbed(toDoObj));
  var taskListParent = document.getElementById('cardTasklistParent');
  taskListParent.insertAdjacentHTML('beforeend', taskHtmlToEmbed(toDoObj));
}

function clearAll() {
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
  console.log(event.target);
  if (event.target.classList.contains('main-task-icons')) {
    var uniqueIdOfTask = event.target.closest.id;
    console.log("checking to see if we got the uid", uniqueIdOfTask);
    matchTaskIDtoDataModel(uniqueIdOfTask);

  }
}

function matchTaskIDtoDataModel(htmlId) {
  var matchingElement = 0;
  for (var i = 0; i < allTodoCardsArray.length; i++) {
    allTodoCardsArray[i].tasks.find(function(element));
    return element = htmlId;
      toDoObj.updateTask()
    // }
  }

}

// function taskUpdateCondition() {
//   if (taskListObject.checkedOff = true) {
//     img src =  ./images/checkbox-active.svg;
//     classList.add("class that has the greyed out text")
//   } else {
//     img src =  ./images/checkbox.svg;
//   }
// }

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
