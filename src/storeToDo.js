export {storage, storeToDoList}

const storage = [{project: 'home', toDoList:[]}, {project: 'dummy', toDoList:[]}]

function storeToDoList(toDo) {
    if (!toDo.project) {
        toDo.project = 'home';
    }

    const projectList = storage.find(element => element.project === toDo.project);

    if (projectList) {
        projectList.toDoList.push(toDo);
    } else {
        storage[0].toDoList.push(toDo);
        toDo.project = 'home';
    }
}