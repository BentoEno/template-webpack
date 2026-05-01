import './styles.css';

import { toDoList } from './createToDo.js';
import { storage, storeToDoList, assignToProject, changeProject } from './storeToDo.js';
import { removeToDoList } from './removeToDo.js';
import { createProject } from "./createProject.js";
import { setDate } from "./setDate.js";
import { sidebar } from './domSidebar.js';
import * as domList from './domPrjBasedList.js';
import { dialogDetailList } from './domDetailList.js';
import { removeActiveProject } from "./domPrjBasedList.js";
import { populateStorage } from './localStorage.js';

export { toDoList, storage, storeToDoList, createProject, sidebar, removeToDoList, dialogDetailList, populateStorage, changeProject, removeActiveProject}








