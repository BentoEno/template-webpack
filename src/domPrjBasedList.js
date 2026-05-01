
import { isToday } from 'date-fns';
import { sidebar, storage, toDoList, detailList, removeToDoList, dialogDetailList, populateStorage, getStorage } from './index.js'

export { renderToDo, removeActiveProject, renderToDosPrj }

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
toDoContainer.classList.add('toDoContainer')

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
    todayGroup.classList.remove('activeProject');
    allGroup.classList.remove('activeProject');
    flaggedGroup.classList.remove('activeProject');
    scheduledGroup.classList.remove('activeProject');
    completedGroup.classList.remove('activeProject');
}

function renderToDo(toDo) {
    const toDoCard = document.createElement('div');
    const checklist = document.createElement('input');
    const toDoTitle = document.createElement('h3');
    const dueDate = document.createElement('p');
    const prioritySign = document.createElement('div');
    const detailBtn = document.createElement('button');
    const editSign = document.createElement('div');
    const deleteSign = document.createElement('div');
    const TDTextDiv = document.createElement('div');
    const uniqueID = document.createElement('p');
    
    toDoCard.classList.add('toDo');
    prioritySign.classList.add('prioritySign', 'sign');
    editSign.classList.add('editSign', 'sign');
    deleteSign.classList.add('deleteSign', 'sign');
    TDTextDiv.classList.add('textTitle');
    toDoContainer.classList.add('toDoContainer');
    uniqueID.classList.add('uniqueID');
    dueDate.classList.add('dueDate');

    editSign.innerHTML = '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>information-variant-circle-outline</title><path d="M12.3 7.29C12.5 7.11 12.74 7 13 7C13.27 7 13.5 7.11 13.71 7.29C13.9 7.5 14 7.74 14 8C14 8.27 13.9 8.5 13.71 8.71C13.5 8.9 13.27 9 13 9C12.74 9 12.5 8.9 12.3 8.71C12.11 8.5 12 8.27 12 8C12 7.74 12.11 7.5 12.3 7.29M9.8 11.97C9.8 11.97 11.97 10.25 12.76 10.18C13.5 10.12 13.35 10.97 13.28 11.41L13.27 11.47C13.13 12 12.96 12.64 12.79 13.25C12.41 14.64 12.04 16 12.13 16.25C12.23 16.59 12.85 16.16 13.3 15.86C13.36 15.82 13.41 15.78 13.46 15.75C13.46 15.75 13.54 15.67 13.62 15.78C13.64 15.81 13.66 15.84 13.68 15.86C13.77 16 13.82 16.05 13.7 16.13L13.66 16.15C13.44 16.3 12.5 16.96 12.12 17.2C11.71 17.47 10.14 18.37 10.38 16.62C10.59 15.39 10.87 14.33 11.09 13.5C11.5 12 11.68 11.32 10.76 11.91C10.39 12.13 10.17 12.27 10.04 12.36C9.93 12.44 9.92 12.44 9.85 12.31L9.82 12.25L9.77 12.17C9.7 12.07 9.7 12.06 9.8 11.97M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12M20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12Z" /></svg></div>'
    deleteSign.innerHTML = '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>'
    uniqueID.textContent = toDo.id;
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
    toDoCard.append(checklist, TDTextDiv, prioritySign, uniqueID, editSign, deleteSign);
    toDoContainer.appendChild(toDoCard);

    checklist.addEventListener('click', () => {
        if (checklist.checked) {
            toDoCard.classList.add('toDoDone');
            toDo.status = true;
        } else {
            toDoCard.classList.remove('toDoDone');
            toDo.status = false;
        }
    })
    if (toDo.status === true) {
        toDoCard.classList.add('toDoDone');
    } else {
        toDoCard.classList.remove('toDoDone');
    };

    toDoCard.addEventListener('mouseenter', () => {
        editSign.style.display = 'block';
        deleteSign.style.display = 'block'})

    toDoCard.addEventListener('mouseleave', () => {
        editSign.style.display = 'none';
        deleteSign.style.display = 'none'})

    // Delete Button
    deleteSign.addEventListener('click', () => {
        toDoCard.remove();
        removeToDoList(toDo);
        populateStorage(storage);
    });

    // Edit Button
    editSign.addEventListener('click', () => {
        dialogDetailList(toDoCard, toDo);
        populateStorage(storage);
    })
}

function renderToDosPrj(projectName = 'Inbox') {
        const list = getTodoList(projectName);
        for (const toDo of list) {
        renderToDo(toDo);
     }
    };

// Sort List Based on Project
sidebar.projectContainer.addEventListener('click', (event) => {
   const activeProject = event.target;
    if (!activeProject.classList.contains('project')) return;

    toDoContainer.innerHTML = '';
    renderToDosPrj(activeProject.textContent);
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

        toDoContainer.innerHTML = '';
        renderToDosPrj(projectInput.value);
        removeActiveProject();
        const projectAll = document.querySelectorAll('.project');
        for (const project of projectAll) {
            if (projectInput.value === project.textContent) {
                project.classList.add('activeProject')
            }
        }

        toDoForm.reset();
        dialogToDo.close();
        populateStorage(storage);
    })
})();

// To Do List based on Overview Sidebar
const todayGroup = document.querySelector('.todayGroup');
const allGroup = document.querySelector('.allGroup');
const flaggedGroup = document.querySelector('.flaggedGroup');
const completedGroup = document.querySelector('.completedGroup');
const scheduledGroup = document.querySelector('.scheduledGroup');

 // iterate all the project and to do 
    // IF - find the to dos with date within today
    // load it in DOM

todayGroup.addEventListener('click', event => {
    toDoContainer.innerHTML = '';
    removeActiveProject()
    event.target.classList.add('activeProject')
    for (const project of storage) {
        const toDoList = project.toDoList
        for (const toDo of toDoList) {
            if (isToday(toDo.dueDate)) {
                renderToDo(toDo);
            }
        }
    }
})

allGroup.addEventListener('click', event => {
    toDoContainer.innerHTML = '';
    removeActiveProject()
    event.target.classList.add('activeProject')
    for (const project of storage) {
        const toDoList = project.toDoList
        for (const toDo of toDoList) {
            renderToDo(toDo);
        }
    }
})

flaggedGroup.addEventListener('click', event => {
    toDoContainer.innerHTML = '';
    removeActiveProject()
    event.target.classList.add('activeProject')
    for (const project of storage) {
        const toDoList = project.toDoList
        for (const toDo of toDoList) {
            if (toDo.priority === true) {
                renderToDo(toDo);
            }
        }
    }
})

completedGroup.addEventListener('click', event => {
    toDoContainer.innerHTML = '';
    removeActiveProject()
    event.target.classList.add('activeProject')
    for (const project of storage) {
        const toDoList = project.toDoList
        for (const toDo of toDoList) {
            if (toDo.status === true) {
                renderToDo(toDo);
            }
        }
    }
})

scheduledGroup.addEventListener('click', event => {
    toDoContainer.innerHTML = '';
    removeActiveProject()
    event.target.classList.add('activeProject')
    for (const project of storage) {
        const toDoList = project.toDoList
        for (const toDo of toDoList) {
            if (toDo.dueDate) {
                renderToDo(toDo);
            }
        }
    }
})