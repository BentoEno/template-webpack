export function setDate(toDo, date) {
    toDo.dueDate = date;
    toDo.getRelativeDistance();
}