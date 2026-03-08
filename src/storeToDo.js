export {storage, storeToDoList, assignToProject}

const storage = [{project: 'Inbox', toDoList:[]}]

function storeToDoList(toDo) {
    if (!toDo.project) {
        toDo.project = 'Inbox';
    }

    const projectList = storage.find(element => element.project === toDo.project);

    if (projectList) {
        projectList.toDoList.push(toDo);
    } else {
        storage[0].toDoList.push(toDo);
        toDo.project = 'Inbox';
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