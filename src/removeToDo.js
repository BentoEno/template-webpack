import { storage } from './index.js';

export function removeToDoList(toDo) {
    const obj = storage.find(element => element.project === toDo.project);

    if (!obj) return;

    const removedIndex = obj.toDoList.findIndex(element => element.id === toDo.id);

    if (removedIndex === -1) return;

    obj.toDoList.splice(removedIndex, 1);
}

