import { storage, createProject } from "./index.js";

export { renderSidebar }

function renderSidebar(main) {
    const body = document.querySelector('body');
    const sidebar = document.createElement('div');

    // Overview
    const overview = document.createElement('div'); 
    const todayGroup = document.createElement('div');
    const allGroup = document.createElement('div');
    const flaggedGroup = document.createElement('div');
    const completedGroup = document.createElement('div');
    const scheduledGroup = document.createElement('div');
    const todayLabel = document.createElement('p');
    const allLabel = document.createElement('p');
    const flaggedLabel = document.createElement('p');
    const completedLabel = document.createElement('p');
    const scheduledLabel = document.createElement('p');
    const todayCount = document.createElement('p');
    const allCount = document.createElement('p');
    const flaggedCount = document.createElement('p');
    const completedCount = document.createElement('p');
    const scheduledCount = document.createElement('p');

    todayLabel.textContent = 'Today';
    allLabel.textContent = 'All';
    flaggedLabel.textContent = 'Flagged';
    completedLabel.textContent = 'Completed';
    scheduledLabel.textContent = 'Scheduled';

    sidebar.classList.add('sidebar');
    overview.classList.add('overview');
    todayCount.classList.add('count');
    allCount.classList.add('count');
    flaggedCount.classList.add('count');
    completedCount.classList.add('count');
    scheduledCount.classList.add('count');

    todayGroup.append(todayLabel, todayCount);
    allGroup.append(allLabel, allCount);
    flaggedGroup.append(flaggedLabel, flaggedCount);
    completedGroup.append(completedLabel, completedCount);
    scheduledGroup.append(scheduledLabel, scheduledCount);

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

    return { addPrjBtn };
}
// Overview render function

// Project list render function