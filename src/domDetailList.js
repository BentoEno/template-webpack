
import { changeProject, storage, removeActiveProject, renderToDosPrj, getRelativeDistance } from "./index.js";

const body = document.querySelector('body');

export function dialogDetailList(toDoCard, toDo) {
    const detailDialog = document.createElement('dialog');
    const editForm = document.createElement('form');
    const title = document.createElement('h2');
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const titleDiv = document.createElement('div');
    const notesLabel = document.createElement('label');
    const notesInput = document.createElement('textarea');
    const notesDiv = document.createElement('div');
    const projectLabel = document.createElement('label');
    const projectInput = document.createElement('select');
    const projectDiv = document.createElement('div');
    const dueDateLabel = document.createElement('label');
    const dueDateInput = document.createElement('input');
    const dueDateDiv = document.createElement('div');
    const priorityLabel = document.createElement('label');
    const priorityInput = document.createElement('input');
    const priorityDiv = document.createElement('div');
    const tDCancelBtn = document.createElement('button');
    const tDSubmitBtn = document.createElement('button');
    const btnDiv = document.createElement('div');

    detailDialog.setAttribute('id', 'detailDialog');
    editForm.setAttribute('id', 'editForm');
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
        option.classList.add('optionProject');
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
    editForm.setAttribute('method', 'dialog');
    btnDiv.setAttribute('id', 'toDoBtn');

    title.textContent = 'Details';
    tDSubmitBtn.textContent = '✓';
    tDCancelBtn.textContent = 'X';
    titleInput.placeholder = 'Title';
    projectLabel.textContent = 'Project'; 
    dueDateLabel.textContent = 'Due Date';
    notesInput.placeholder = 'Notes';
    priorityLabel.textContent = 'Priority';
    

    body.appendChild(detailDialog);
    detailDialog.appendChild(editForm);
    editForm.append(btnDiv, titleDiv, notesDiv, projectDiv, dueDateDiv, priorityDiv);
    titleDiv.append(titleLabel, titleInput);
    projectDiv.append(projectLabel, projectInput);
    dueDateDiv.append(dueDateLabel, dueDateInput);
    priorityDiv.append(priorityLabel, priorityInput);
    notesDiv.append(notesLabel, notesInput);
    btnDiv.append(tDCancelBtn, title, tDSubmitBtn);

    detailDialog.showModal()
    titleInput.value = toDo.title;
    notesInput.value = toDo.notes ? toDo.notes : '';
    projectInput.value = toDo.project;
    dueDateInput.value = toDo.dueDate;
    priorityInput.checked = toDo.priority === true ? true : false;

    tDSubmitBtn.addEventListener('click', event => {
        event.preventDefault();
        toDo.title = titleInput.value;
        toDo.notes = notesInput.value;
        const oldProjectName = toDo.project;
        toDo.project = projectInput.value;
        toDo.dueDate = dueDateInput.value;
        toDo.priority = priorityInput.checked ? true : false;
        getRelativeDistance(toDo);

        console.log(toDo.dueDateDistance);
        const toDoTitle = toDoCard.querySelector('h3');
        const dueDate = toDoCard.querySelector('.dueDate');
        const prioritySign = toDoCard.querySelector('.prioritySign');

        toDoTitle.textContent = toDo.title;
        dueDate.textContent = toDo.dueDateDistance;
        prioritySign.hidden = toDo.priority === true ? false : true;
        changeProject(toDo, oldProjectName);
        removeActiveProject();
        const projectAll = document.querySelectorAll('.project');
        for (const project of projectAll) {
            if (projectInput.value === project.value) {
                project.classList.add('activeProject')
            }
        };
        const toDoContainer = document.querySelector('.toDoContainer');
        toDoContainer.innerHTML = '';
        renderToDosPrj(projectInput.value);
        console.log(toDo);
        console.log(storage);      
        detailDialog.close();
    })
}