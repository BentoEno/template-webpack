export {toDoStorage, toDoList}

class toDoStorageMaker {
    #toDos = [];

    constructor () {
        if (toDoStorageMaker.instance) {
            throw new Error('You Can Only Create One To Do List Storage');
        }
        toDoStorageMaker.instance = this.#toDos;
    };

    addTD(toDo) {
        this.#toDos.push(toDo);
    };

    remove(id){
        const index = this.#toDos.findIndex(todo => todo.id === id);

        if (index !== -1) {
            this.#toDos.splice(index, 1);
        };
    }

    getToDos() {
        return this.#toDos;
    }
}

const toDoStorage = new toDoStorageMaker();

class toDoList {
    status = false;
    notes;
    id = crypto.randomUUID();

    constructor(title = 'to do list', project, dueDate = '', priority = 'low') {
        this.title = title;
        this.project = project;
        this.dueDate = dueDate;
        this.priority = priority;

        toDoStorage.addTD(this);
    };

    removeTD() {
        toDoStorage.remove(this.id)
    }
}

