export { storage, storeToDoList, assignToProject, changeProject}

let storage = [{project: 'Inbox', toDoList:[]}];

// function getStorage() {
//     const saved = localStorage.getItem('localToDoLists');
    
//     if (saved) {
//         storage = JSON.parse(saved);
//     } else {
//         return
//     }
//     console.log(JSON.parse(saved))
//     // if no saved data, storage keeps the default Inbox
// }

// getStorage();

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

function changeProject(toDo, oldProject) {
    const projectList = storage.find(element => element.project === oldProject);
    const currentIndex = projectList.toDoList.indexOf(toDo);
    projectList.toDoList.splice(currentIndex, 1);

    storeToDoList(toDo);
}


function assignToProject(toDo, projectName) {
    const oldProject = storage.find(element => element.project === toDo.project);
    const oldIndex = oldProject.toDoList.findIndex(element => element.id === toDo.id);

    if (!oldProject || oldIndex === -1) return;
    
    oldProject.toDoList.splice(oldIndex, 1);
    toDo.project = projectName;
    storeToDoList(toDo);
}