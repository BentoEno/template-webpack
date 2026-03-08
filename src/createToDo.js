import { storeToDoList } from "./index.js";
import { formatDistanceToNow } from "date-fns";

export class toDoList {
    status = false;
    notes;
    id = crypto.randomUUID();
    dueDateDistance;

    constructor(title = 'to do list', project, dueDate = '27 april 2001', flagged = false) {
        this.title = title;
        this.project = project;
        this.dueDate = dueDate;
        this.flagged = flagged;
        this.getRelativeDistance();

        storeToDoList(this);
    };

    getRelativeDistance() {
        this.dueDateDistance = formatDistanceToNow(this.dueDate, {addSuffix: true});
    }
}

