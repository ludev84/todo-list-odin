import data from './data.json' assert { type: 'json' };

class Project {
  constructor(name, todos = []) {
    this.name = name;
    this.id = crypto.randomUUID();
    this.todos = todos;
  }
}

class Todo {
  constructor(title, description, dueDate, priority, completed) {
    this.title = title;
    this.id = crypto.randomUUID();
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

export default class Library {
  constructor() {
    this.projects = []

    // Read initial data from data.json
    for (const project of data) {
      const name = project.name;
      const todos = []
      for (const todo of project.todos) {
        const {title, description, dueDate, priority} = todo
        const newTodo = new Todo(title, description, dueDate, priority, false)
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

  addTodo(id, title, description, dueDate=new Date(), priority=3, completed=false) {
    const index = this.projects.findIndex((project) => project.id === id);
    const newTodo = new Todo(title, description, dueDate, priority, completed)
    this.projects[index].todos.push(newTodo);
  }

  toggleCompleteTodo(idProject, idTodo) {
    const indexProject = this.projects.findIndex((project) => project.id === idProject);
    const indexTodo = this.projects[index].todos.findIndex((todo) => todo.id === idTodo)
    this.projects[indexProject].todos[indexTodo].toggleComplete()
  }

  getProjects() {
    return this.projects;
  }

  getProjectById(id) {
    const index = this.projects.findIndex((project) => project.id === id);
    return this.projects[index];
  }

  getProjectsTodos(id) {
    const index = this.projects.findIndex((project) => project.id === id);
    return this.projects[index].todos;
  }
}