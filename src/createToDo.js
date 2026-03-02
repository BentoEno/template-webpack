export {toDoList}

class toDoList {
    status = false;
    notes;
    id = crypto.randomUUID();

    constructor(title = 'to do list', project, dueDate = '', priority = 'low') {
        this.title = title;
        this.project = project;
        this.dueDate = dueDate;
        this.priority = priority;
    };
}

