import './styles.css';

import { toDoList } from './createToDo.js';
import { storage, storeToDoList, assignToProject } from './storeToDo.js';
import { removeToDoList } from './removeToDo.js';
import { createProject } from "./createProject.js";
import { setDate } from "./setDate.js";

export { toDoList, storage, storeToDoList}

const todo1 = new toDoList('ini tugas');
createProject('dummy');

const todo2 = new toDoList('coba cobaaaa', 'dummy');
const todo3 = new toDoList('ketiga');
setDate(todo3, '27 april 2026');

assignToProject(todo3, 'dummy');

removeToDoList(todo1);

console.log(storage);









