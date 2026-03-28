import data from './data.json' assert { type: 'json' };

class Project {
  constructor(name, todos = []) {
    this.name = name;
    this.id = crypto.randomUUID();
    this.todos = todos;
  }
}

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.id = crypto.randomUUID();
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

class Library {
  constructor() {
    this.projects = []

    // Read initial data from data.json
    for (const project of data) {
      const name = project.name;
      const todos = []
      for (const todo of project.todos) {
        const {title, description, dueDate, priority} = todo
        const newTodo = new Todo(title, description, dueDate, priority)
        todos.push(newTodo)
      }
      const newProject = new Project(name, todos)
      this.projects.push(newProject)
    }
  }

  addProject(name) {
    const newProject = new Project(name);
    this.projects.push(newProject);
  }

  addTodo(id, title, description, dueDate= new Date(), priority=3) {
    const index = this.projects.findIndex((project) => project.id === id);
    const newTodo = new Todo(title, description, dueDate, priority)
    this.projects[index].todos.push(newTodo);
  }

  getProjects() {
    return this.projects;
  }
}

const projects = new Library()
projects.addProject("lala")
projects.addTodo(projects.getProjects()[1].id, "titulo", "desc", "2026-03-29", 4)
console.log(projects.getProjects())