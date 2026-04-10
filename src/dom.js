import Library from "./projects.js"

// const library = new Library()
// library.addProject("proyecto1")
// library.addTodo(library.getProjects()[1].id, "titulo", "desc", "2026-03-29", 4)
// console.log(library.getProjects())

const container = document.querySelector('.container');

export function screenConroller() {
  const library = new Library();
  let selectedProjectId = library.getProjects()[0].id

  function selectProject(id) {
    selectedProjectId = id;
    container.innerHTML = generateTodoView(library.getProjects(), library.getProjectsTodos(id), id);
  }

  const deleteProjectDOM = (event) => {
    const a = event.target.previousElementSibling
    const ul = event.target.parentElement.parentElement
    const id = a.id
    let newSelectedId;
    const firstProjectId = ul.children[0].children[0].id
    const secondProjectId = ul.children[1].children[0].id
    // const lastProjectId = ul.children[ul.childElementCount - 1].children[0].id
    if (a.classList.contains('selected')) {
      if (id === firstProjectId) {  // Selecciona primer proyecto
        newSelectedId = secondProjectId
      } else {  // Selecciona ultimo proyecto
        newSelectedId = firstProjectId
      }
      library.deleteProject(id)
      container.innerHTML = generateTodoView(library.getProjects(), library.getProjectsTodos(newSelectedId), newSelectedId);
    } else {
      library.deleteProject(id)
      container.innerHTML = generateTodoView(library.getProjects(), library.getProjectsTodos(firstProjectId), firstProjectId);
    }
  }
  
  container.addEventListener('click', (event) => {
    if (event.target.classList.contains('project')) {
      const projectId = event.target.id;
      selectProject(projectId);
    }
  })

  container.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteProjectBtn')) {
      deleteProjectDOM(event)
      // library.deleteProject(id)

      // container.innerHTML = generateTodoView(library.getProjects(), library.getProjectsTodos(selectedProjectId), selectedProjectId);
    }
  })

  // Generate initial view
  container.innerHTML = generateTodoView(library.getProjects(), library.getProjectsTodos(selectedProjectId), selectedProjectId);
}

// Gemini 3 pro:
function generateTodoView(projects, tasks, selectedProjectId) {
  console.log(projects)
  let projectsHtml = '';
  let tasksHtml = '';
  if (projects.length !== 0) {
    // 1. Generate the list items for Projects
    projectsHtml = projects.map(project => {
      const selectedClass = project.id === selectedProjectId ? 'class="project selected"' : 'class="project"';
      return `<li><a id="${project.id}" ${selectedClass} href="#">${project.name}</a> <button class="deleteProjectBtn">Delete</button></li>`;
    }).join('');
  
    // 2. Generate the list items for Notes/Tasks
    if (tasks.length !== 0) {
      tasksHtml = tasks.map(task => {
        const checkedAttribute = task.completed ? 'checked' : '';
        return `
          <li>
            <input ${checkedAttribute} type="checkbox" id="${task.id}">
            <label for="${task.id}">${task.title}</label>
            <button class="detailsBtn">Details</button>
            <button class="deleteBtn">Delete</button>
            <button class="editBtn">Edit</button>
          </li>
        `;
      }).join('');
    }
  } else {
    const projectsHtml = '';
    const tasksHtml = '';
  }

  // 3. Wrap them in your container structure and return the full HTML
  return `
    <div id="projects">
      <h1>Projects</h1>
      <ul>
        ${projectsHtml}
      </ul>
    </div>
    <div id="notes">
      <h1>Notes</h1>
      <ul>
        ${tasksHtml}
      </ul>
    </div>
  `;
}