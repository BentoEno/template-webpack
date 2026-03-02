export { projectList, project};

const projectList = [];

class project {
    constructor(name) {
        for (const project of projectList) {
            if (name.toLowerCase() == project.name.toLowerCase()) {
                alert('project name already exist');
                return;
            }
        }
        this.name = name;

        projectList.push(this);
    }
}
