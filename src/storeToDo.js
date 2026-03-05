export {storage, storeToDoList, assignToProject}

const storage = [{project: 'home', toDoList:[]}]

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
};

function assignToProject(toDo, projectName) {
    const oldProject = storage.find(element => element.project === toDo.project);
    const oldIndex = oldProject.toDoList.findIndex(element => element.id === toDo.id);

    if (!oldProject || oldIndex === -1) return;
    
    oldProject.toDoList.splice(oldIndex, 1);
    toDo.project = projectName;
    storeToDoList(toDo);
}