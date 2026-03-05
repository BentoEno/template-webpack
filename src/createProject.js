import { storage } from "./index.js";

export function createProject(name) {
    storage.push({project: name, toDoList: []})
}