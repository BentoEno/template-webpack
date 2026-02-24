import './styles.css';
import { toDoStorage, toDoList } from './list.js';
import './project.js';

export { toDoStorage, toDoList}

const todo1 = new toDoList('ini tugas');
const todo2 = new toDoList('coba cobaaaa');
console.log(toDoStorage);


