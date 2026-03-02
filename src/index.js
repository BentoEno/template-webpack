import './styles.css';

import { toDoList } from './createToDo.js';
import { storage, storeToDoList } from './storeToDo.js';
import { projectList, project } from './project.js';

export { toDoList, projectList, project}

const todo1 = new toDoList('ini tugas');
const todo2 = new toDoList('coba cobaaaa', 'trial');
const todo3 = new toDoList('ketiga');

storeToDoList(todo2);
storeToDoList(todo1);
storeToDoList(todo3)
console.log(storage);



