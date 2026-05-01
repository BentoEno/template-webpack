

export function populateStorage(data) {
    localStorage.setItem('localToDoLists', JSON.stringify(data));
    console.log(JSON.parse(localStorage.getItem('localToDoLists')));
}
