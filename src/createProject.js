import { storage } from "./index.js";

export function createProject(name) {
    const existedProject = storage.find(element => element.project.toLowerCase() === name.toLowerCase())
    if (existedProject) {
        alert('project already exist');
        return
    }

    storage.push({project: name, toDoList: []})
}