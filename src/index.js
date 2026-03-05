import './styles.css';

import { toDoList } from './createToDo.js';
import { storage, storeToDoList } from './storeToDo.js';
import { removeToDoList } from './removeToDo.js';
import { createProject } from "./createProject.js";

export { toDoList, storage, storeToDoList}

const todo1 = new toDoList('ini tugas');
createProject('dummy');

const todo2 = new toDoList('coba cobaaaa', 'dummy');
const todo3 = new toDoList('ketiga');

removeToDoList(todo1);

console.log(storage);









