import './styles.css';

import { toDoList } from './createToDo.js';
import { storage, storeToDoList, assignToProject } from './storeToDo.js';
import { removeToDoList } from './removeToDo.js';
import { createProject } from "./createProject.js";
import { setDate } from "./setDate.js";
import { sidebar } from './domSidebar.js';
import { renderList } from "./domList.js";
import * as domList from './domPrjBasedList.js';

export { toDoList, storage, storeToDoList, createProject, sidebar, renderList}

const todo1 = new toDoList('ini tugas');

const todo2 = new toDoList('ride a bike to mountain', 'Inbox', '26 maret 2026', true);
const todo3 = new toDoList('ketiga');



renderList.renderToDos();








