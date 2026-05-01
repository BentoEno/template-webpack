import { storage, createProject, renderList} from "./index.js";

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
    projectHeading.textContent = 'My Project';
    addPrjBtn.textContent = 'Add Project +';

    projectContainer.append(projectHeading, addPrjBtn);

    for (const element of storage) {
        const project = document.createElement('div');
        project.textContent = element.project;
        project.classList.add('project');
        projectContainer.appendChild(project);
    }

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

        const project = document.createElement('div');
        project.textContent = titleValue;
        project.classList.add('project');
        projectContainer.appendChild(project);
        
        projectForm.reset();
        dialogProject.close();
    });

    const getProjectDoms = function() { return document.querySelectorAll('.project')};
    
    return { projectContainer, getProjectDoms };
})();

