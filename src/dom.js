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
  
  container.addEventListener('click', (event) => {
    if (event.target.classList.contains('project')) {
      const projectId = event.target.id;
      selectProject(projectId);
    }
  })

  // Generate initial view
  container.innerHTML = generateTodoView(library.getProjects(), library.getProjectsTodos(selectedProjectId), selectedProjectId);
}

// Gemini 3 pro:
function generateTodoView(projects, tasks, selectedProjectId) {
  // 1. Generate the list items for Projects
  const projectsHtml = projects.map(project => {
    const selectedClass = project.id === selectedProjectId ? 'class="project selected"' : 'class="project"';
    return `<li><a id="${project.id}" ${selectedClass} href="#">${project.name}</a></li>`;
  }).join('');

  // 2. Generate the list items for Notes/Tasks
  const tasksHtml = tasks.map(task => {
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