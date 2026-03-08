import { storage, sidebar, main } from "./index.js";

export { renderList }

function renderList(projectName) {
    // Provide space for to do list
    const main = document.querySelector('.mainContent');
    const container = document.createElement('div');
    const toDoHeading = document.createElement('div');
    const toDoContainer = document.createElement('div');
    const headingText = document.createElement('h2');
    const addList = document.createElement('button');

    container.classList.add('contentContainer');
    toDoHeading.classList.add('contentHeader');
    headingText.textContent = 'My To Do List';
    addList.textContent = '+ New To Do List';

    toDoHeading.append(headingText, addList);
    container.append(toDoHeading, toDoContainer);
    main.appendChild(container);
    
    const list = getTodoList(projectName)
    for (const toDo of list) {
        const toDoCard = document.createElement('div');
        const checklist = document.createElement('input');
        const toDoTitle = document.createElement('h3');
        const dueDate = document.createElement('p');
        const prioritySign = document.createElement('div');
        const detailBtn = document.createElement('button');
        const editSign = document.createElement('div');
        const deleteSign = document.createElement('div');

        toDoCard.classList.add('toDo');
        prioritySign.classList.add('prioritySign');
        editSign.classList.add('editSign');
        deleteSign.classList.add('deleteSign');

        checklist.setAttribute('type', 'checkbox');
        checklist.checked = toDo.status;
        toDoTitle.textContent = toDo.title;
        dueDate.textContent = toDo.dueDateDistance;
        prioritySign.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>flag-variant</title><path d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3Z" /></svg>';
        if (toDo.priority === true) {
            prioritySign.classList.add('priority');
        } else {
            prioritySign.classList.remove('priority');
        };
        detailBtn.textContent = 'detail';
        editSign.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>';
        deleteSign.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>';


        toDoCard.append(checklist, toDoTitle, dueDate, prioritySign, detailBtn, editSign, deleteSign);
        toDoContainer.appendChild(toDoCard);
    }
};

function getTodoList(projectName) {
    const project = storage.find(element => element.project === projectName);
    return project.toDoList;
}

// function renderTodoList(arr) {
//     for (const toDo of arr) {
//         const toDoCard = document.createElement('div');
//         const checklist = document.createElement('input');
//         const toDoTitle = document.createElement('h3');
//         const dueDate = document.createElement('p');
//         const prioritySign = document.createElement('div');
//         const detailBtn = document.createElement('button');
//         const editSign = document.createElement('div');
//         const deleteSign = document.createElement('div');

//         toDoCard.classList.add('toDo');
//         prioritySign.classList.add('prioritySign');
//         editSign.classList.add('editSign');
//         deleteSign.classList.add('deleteSign');

//         toDoCard.append(checklist, toDoTitle, dueDate, prioritySign, detailBtn, editSign, deleteSign);
//         console.log('it works');
//     }
// }