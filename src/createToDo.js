import { storeToDoList } from "./index.js";
import { formatDistanceToNow } from "date-fns";

export class toDoList {
    status = false;
    notes;
    id = crypto.randomUUID();
    dueDateDistance;

    constructor(title = 'to do list', project, dueDate, priority = false, notes) {
        this.title = title;
        this.project = project;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;

        getRelativeDistance(this);
        storeToDoList(this);
    };
}

export function getRelativeDistance(toDo) {
    return toDo.dueDateDistance = toDo.dueDate ? formatDistanceToNow(toDo.dueDate, {addSuffix: true}) : '';
    console.log(toDo.dueDateDistance)
}