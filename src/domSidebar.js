import { storage, createProject, renderList, populateStorage} from "./index.js";

export { sidebar }

const sidebar = (function renderSidebar() {
    const main = document.querySelector('.mainContent');
    const body = document.querySelector('body');
    const sidebar = document.createElement('div');

    // Overview
    const overview = document.createElement('div'); 
    const todayGroup = document.createElement('div');
    const allGroup = document.createElement('div');
    const flaggedGroup = document.createElement('div');
    const completedGroup = document.createElement('div');
    const scheduledGroup = document.createElement('div');

    todayGroup.textContent = 'Today';
    allGroup.textContent = 'All';
    flaggedGroup.textContent = 'Flagged';
    completedGroup.textContent = 'Completed';
    scheduledGroup.textContent = 'Scheduled';

    sidebar.classList.add('sidebar');
    overview.classList.add('overview');
    todayGroup.classList.add('todayGroup');
    allGroup.classList.add('allGroup');
    flaggedGroup.classList.add('flaggedGroup');
    completedGroup.classList.add('completedGroup');
    scheduledGroup.classList.add('scheduledGroup');

    main.appendChild(sidebar);
    sidebar.appendChild(overview);
    overview.append(todayGroup, allGroup, flaggedGroup, completedGroup, scheduledGroup);

    // Project list
    const projectContainer = document.createElement('div');
    const projectHeading = document.createElement('h2');
    const addPrjBtn = document.createElement('button');

    projectContainer.classList.add('projectList');
    const projectHandling = document.createElement('div');
    projectHeading.textContent = 'My Project';
    addPrjBtn.textContent = 'Add Project +';

    projectContainer.append(projectHeading, addPrjBtn, projectHandling);

    displayProject(projectHandling)

    sidebar.appendChild(projectContainer);

    // Add Project Button Mechanic

    const dialogProject = document.createElement('dialog');
    const projectForm = document.createElement('form');
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const prjCancelBtn = document.createElement('button');
    const prjSubmitBtn = document.createElement('button');
    const prjBtnDiv = document.createElement('div');

    dialogProject.setAttribute('id', 'dialogProject')
    titleLabel.setAttribute('for', 'projectTitle');
    titleInput.setAttribute('id', 'projectTitle');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'projectTitle');
    prjCancelBtn.setAttribute('value', 'cancel');
    prjCancelBtn.setAttribute('formmethod', 'dialog');
    prjSubmitBtn.setAttribute('type', 'submit');
    projectForm.setAttribute('method', 'dialog');

    titleLabel.textContent = 'what is the project title?';
    prjSubmitBtn.textContent = 'submit';
    prjCancelBtn.textContent = 'cancel';

    body.appendChild(dialogProject);
    dialogProject.appendChild(projectForm);
    prjBtnDiv.append(prjSubmitBtn, prjCancelBtn)
    projectForm.append(titleLabel, titleInput, prjBtnDiv);

    addPrjBtn.addEventListener('click', () => dialogProject.showModal());

    prjSubmitBtn.addEventListener('click', event => {
        event.preventDefault()
        const titleValue = titleInput.value.trim();
        if (!titleValue) {
        return alert('please input a value')
        }
        createProject(titleValue)

        displayProject(projectHandling);
        
        populateStorage(storage);
        projectForm.reset();
        dialogProject.close();
    });

    const getProjectDoms = function() { return document.querySelectorAll('.project')};
    
    return { projectContainer };
})();

function displayProject(projectContainer) {
    projectContainer.innerHTML = '';
    for (const element of storage) {
        const project = document.createElement('div');
        const deleteProject = document.createElement('div');
        const projectName = document.createElement('h3');
        deleteProject.innerHTML = '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></div>';
        deleteProject.classList.add('deleteProject');
        projectName.textContent = element.project;
        project.value = element.project;
        project.classList.add('project');
        project.append(projectName, deleteProject);
        projectContainer.appendChild(project);

        project.addEventListener('mouseenter', () => {
            deleteProject.style.display = 'block';
        })

        project.addEventListener('mouseleave', () => {
            deleteProject.style.display = 'none';
        })

        deleteProject.addEventListener('click', event => {
            if (project.value === 'Inbox') {
                alert('Do Not Delete Inbox');
                return
            }
            const removedProjectIndex = storage.findIndex(obj => obj.project === element.project);
            storage.splice(removedProjectIndex, 1);
            populateStorage(storage);
            project.remove();
        })
    }
}
