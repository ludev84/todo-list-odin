import "./styles.css";
import Library from "./projects.js"

const projects = new Library()
projects.addProject("lala")
projects.addTodo(projects.getProjects()[1].id, "titulo", "desc", "2026-03-29", 4)
console.log(projects.getProjects())