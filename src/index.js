import './styles.css';

import { toDoList } from './createToDo.js';
import { storage, storeToDoList } from './storeToDo.js';
import { removeToDoList } from './removeToDo.js';
import { projectList, project } from './project.js';

export { toDoList, storage}

const todo1 = new toDoList('ini tugas');
const todo2 = new toDoList('coba cobaaaa', 'dummy');
const todo3 = new toDoList('ketiga');

storeToDoList(todo2);
storeToDoList(todo1);
storeToDoList(todo3)

removeToDoList(todo1);

console.log(storage);









