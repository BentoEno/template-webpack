import './styles.css';

import { toDoList } from './createToDo.js';
import { storage, storeToDoList, assignToProject } from './storeToDo.js';
import { removeToDoList } from './removeToDo.js';
import { createProject } from "./createProject.js";
import { setDate } from "./setDate.js";
import { renderSidebar } from './domSidebar.js';

export { toDoList, storage, storeToDoList, main, createProject}

const main = document.querySelector('.mainContent');

const todo1 = new toDoList('ini tugas');
createProject('Dummy');

const todo2 = new toDoList('coba cobaaaa', 'Dummy');
const todo3 = new toDoList('ketiga');
setDate(todo3, '27 april 2026');

assignToProject(todo3, 'Dummy');

removeToDoList(todo1);

console.log(storage);

const sidebar = renderSidebar(main);

sidebar.addPrjBtn.addEventListener('click', function () {
        console.log('this work')
    })








