export {storage, storeToDoList}

const storage = [{project: 'home', toDoList:[]}, ]

// store to do list tanpa project
// store to do list dengan project 

function storeToDoList(toDo) {
    if (!toDo.project) {
        toDo.project = 'home';
    }

    const projectList = storage.find(element => element.project === toDo.project);
    console.log(projectList)

    if (projectList) {
        projectList.toDoList.push(toDo);
    } else {
        storage[0].toDoList.push(toDo);
        toDo.project = 'home';
    }
}