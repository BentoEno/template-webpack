
import { sidebar, storage, toDoList } from './index.js'

const body = document.querySelector('body');
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

function getTodoList(projectName) {
    const project = storage.find(element => element.project === projectName);
    return project.toDoList;
}

function removeActiveProject() {
    const projectAll = document.querySelectorAll('.project');
    for (const project of projectAll) {
        project.classList.remove('activeProject')
    }
}

function renderToDos(projectName = 'Inbox') {
        const list = getTodoList(projectName);
        for (const toDo of list) {
        const toDoCard = document.createElement('div');
        const checklist = document.createElement('input');
        const toDoTitle = document.createElement('h3');
        const dueDate = document.createElement('p');
        const prioritySign = document.createElement('div');
        const detailBtn = document.createElement('button');
        const editSign = document.createElement('div');
        const deleteSign = document.createElement('div');
        const TDTextDiv = document.createElement('div');
        
        toDoCard.classList.add('toDo');
        prioritySign.classList.add('prioritySign', 'sign');
        editSign.classList.add('editSign', 'sign');
        deleteSign.classList.add('deleteSign', 'sign');
        TDTextDiv.classList.add('textTitle');
        toDoContainer.classList.add('toDoContainer');

        checklist.setAttribute('type', 'checkbox');
        checklist.checked = toDo.status;
        toDoTitle.textContent = toDo.title;
        dueDate.textContent = toDo.dueDateDistance;
        prioritySign.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>flag-variant</title><path d="M6,3A1,1 0 0,1 7,4V4.88C8.06,4.44 9.5,4 11,4C14,4 14,6 16,6C19,6 20,4 20,4V12C20,12 19,14 16,14C13,14 13,12 11,12C8,12 7,14 7,14V21H5V4A1,1 0 0,1 6,3Z" /></svg>';
        if (toDo.priority === true) {
            prioritySign.hidden =  false;
        } else {
            prioritySign.hidden = true;
        };
        detailBtn.textContent = 'detail';
        editSign.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>';
        deleteSign.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>';

        TDTextDiv.append(toDoTitle, dueDate);
        toDoCard.append(checklist, TDTextDiv, prioritySign);
        toDoContainer.appendChild(toDoCard);

        checklist.addEventListener('click', () => {
            if (checklist.checked) {
                toDoCard.classList.add('toDoDone');
                toDo.status = true;
            } else {
                toDoCard.classList.remove('toDoDone');
                toDo.status = false;
            }
        });
     }
    };

// Sort List Based on Project
sidebar.projectContainer.addEventListener('click', (event) => {
   const activeProject = event.target;
    if (!activeProject.classList.contains('project')) return;

    toDoContainer.innerHTML = '';
    renderToDos(activeProject.textContent);
    removeActiveProject();
    activeProject.classList.add('activeProject');
})

// Create To Do in App
const toDoDialog = (function () {
    const dialogToDo= document.createElement('dialog');
    const toDoForm = document.createElement('form');
    const title = document.createElement('h2');
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const titleDiv = document.createElement('div');
    const projectLabel = document.createElement('label');
    const projectInput = document.createElement('select');
    const projectDiv = document.createElement('div');
    const dueDateLabel = document.createElement('label');
    const dueDateInput = document.createElement('input');
    const dueDateDiv = document.createElement('div');
    const priorityLabel = document.createElement('label');
    const priorityInput = document.createElement('input');
    const priorityDiv = document.createElement('div');
    const notesLabel = document.createElement('label');
    const notesInput = document.createElement('textarea');
    const notesDiv = document.createElement('div');
    const tDCancelBtn = document.createElement('button');
    const tDSubmitBtn = document.createElement('button');
    const btnDiv = document.createElement('div');

    dialogToDo.setAttribute('id', 'dialogToDo');
    toDoForm.setAttribute('id', 'toDoForm');
    titleLabel.setAttribute('for', 'title');
    titleInput.setAttribute('id', 'title');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'title');

    projectLabel.setAttribute('for', 'project');
    projectInput.setAttribute('id', 'project');
    projectInput.setAttribute('name', 'project');
    projectDiv.classList.add('spacedForm');

    for (const toDo of storage) {
        const option = document.createElement('option');
        option.setAttribute('value', toDo.project);
        option.textContent = toDo.project;
        projectInput.appendChild(option)
    };

    dueDateLabel.setAttribute('for', 'dueDate');
    dueDateInput.setAttribute('id', 'dueDate');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.setAttribute('name', 'dueDate');
    dueDateDiv.classList.add('spacedForm');

    priorityLabel.setAttribute('for', 'priority');
    priorityInput.setAttribute('id', 'priority');
    priorityInput.setAttribute('type', 'checkbox');
    priorityInput.setAttribute('name', 'priority');
    priorityDiv.classList.add('spacedForm');

    notesLabel.setAttribute('for', 'notes');
    notesInput.setAttribute('id', 'notes');
    notesInput.setAttribute('name', 'notes');
    notesInput.setAttribute('rows', '4');
    notesInput.setAttribute('cols', '50');

    tDCancelBtn.setAttribute('value', 'cancel');
    tDCancelBtn.setAttribute('formmethod', 'dialog');
    tDSubmitBtn.setAttribute('type', 'submit');
    toDoForm.setAttribute('method', 'dialog');
    btnDiv.setAttribute('id', 'toDoBtn');

    title.textContent = 'New To Do';
    titleInput.placeholder = 'Title';
    projectLabel.textContent = 'Project';
    dueDateLabel.textContent = 'Due Date';
    notesInput.placeholder = 'Notes';
    priorityLabel.textContent = 'Priority';
    tDSubmitBtn.textContent = 'submit';
    tDCancelBtn.textContent = 'cancel';

    body.appendChild(dialogToDo);
    dialogToDo.appendChild(toDoForm);
    toDoForm.append(title, titleDiv, notesDiv, projectDiv, dueDateDiv, priorityDiv, btnDiv);
    titleDiv.append(titleLabel, titleInput);
    projectDiv.append(projectLabel, projectInput);
    dueDateDiv.append(dueDateLabel, dueDateInput);
    priorityDiv.append(priorityLabel, priorityInput);
    notesDiv.append(notesLabel, notesInput);
    btnDiv.append(tDSubmitBtn, tDCancelBtn);

    addList.addEventListener('click', () => {
        dialogToDo.showModal();

        projectInput.innerHTML = '';
        for (const toDo of storage) {
        const option = document.createElement('option');
        option.setAttribute('value', toDo.project);
        option.textContent = toDo.project;
        projectInput.appendChild(option)
    };
    });

    tDSubmitBtn.addEventListener('click', event => {
        event.preventDefault();
        const titleValue = titleInput.value.trim();
        const projectValue = projectInput.value;
        const dueDateValue = dueDateInput.value || '';
        let priorityValue = '';
        if (priorityInput.checked) {
            priorityValue = true;
        } else {
            priorityValue = false;
        };
        const notesValue = notesInput.value;
        const toDoItem = new toDoList(titleValue, projectValue, dueDateValue, priorityValue, notesValue);
        console.log(toDoItem);

        toDoContainer.innerHTML = '';
        renderToDos(projectInput.value);
        removeActiveProject();
        const projectAll = document.querySelectorAll('.project');
        for (const project of projectAll) {
            if (projectInput.value === project.textContent) {
                project.classList.add('activeProject')
            }
        }

        toDoForm.reset();
        dialogToDo.close();
    })
})();