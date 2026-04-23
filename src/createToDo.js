import { storeToDoList } from "./index.js";
import { formatDistanceToNow } from "date-fns";

export class toDoList {
    status = false;
    notes;
    id = crypto.randomUUID();
    dueDateDistance;

    constructor(title = 'to do list', project, dueDate = '27 April 2001', priority = false, notes) {
        this.title = title;
        this.project = project;
        this.dueDate = dueDate;
        this.priority = priority;
        this.getRelativeDistance();
        this.notes = notes;

        storeToDoList(this);
    };

    getRelativeDistance() {
        this.dueDateDistance = formatDistanceToNow(this.dueDate, {addSuffix: true});
    }
}

